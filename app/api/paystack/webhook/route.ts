import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendReceiptEmail } from "@/lib/sendReceiptEmail";
import { sendLoginEmail } from "@/lib/sendLoginEmail";
import { numberToWords } from "@/lib/numberToWords";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const paystackSignature = req.headers.get(
      "x-paystack-signature"
    );

    const hash = crypto
      .createHmac(
        "sha512",
        process.env.PAYSTACK_SECRET_KEY!
      )
      .update(rawBody)
      .digest("hex");

    if (
      !paystackSignature ||
      hash !== paystackSignature
    ) {
      return new Response("Invalid signature", {
        status: 401,
      });
    }

    if (body.event !== "charge.success") {
      return Response.json({ received: true });
    }

    const {
      reference,
      amount: rawAmount,
    } = body.data;

    const amount = rawAmount / 100;

    // Find enrollment
    const { data: enrollment, error: enrollmentError } =
      await supabaseAdmin
        .from("enrollments")
        .select("*")
        .eq("paystack_reference", reference)
        .single();

    if (enrollmentError || !enrollment) {
      console.error(
        "Enrollment not found:",
        enrollmentError
      );

      return Response.json({ received: true });
    }

    // Prevent duplicate processing
    if (enrollment.payment_status === "success") {
      return Response.json({ received: true });
    }

    // Get profile + course
    const [{ data: profile }, { data: course }] =
      await Promise.all([
        supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("user_id", enrollment.user_id)
          .single(),

        supabaseAdmin
          .from("Course")
          .select("*")
          .eq("id", enrollment.course_id)
          .single(),
      ]);

    if (!profile || !course) {
      console.error(
        "Missing profile or course:",
        reference
      );

      return Response.json({ received: true });
    }

    // Generate Student ID
    const studentId = `KTH-${new Date().getFullYear()}-${Date.now()
      .toString()
      .slice(-6)}`;

    // Generate Password
    const password = Math.random()
      .toString(36)
      .slice(-8);

    const fullName =
      `${profile.first_name || ""} ${
        profile.last_name || ""
      }`.trim();

    // Activate enrollment
    await supabaseAdmin
      .from("enrollments")
      .update({
        status: "active",
        payment_status: "success",
      })
      .eq("id", enrollment.id);

    // After activating enrollment, create installment schedule if payment_plan is installment
    if (enrollment.payment_plan === "installment") {
      const enrollmentDate = new Date()
      const fullCoursePrice = course.price

      const payment2Amount = Math.round(fullCoursePrice * 0.375)
      const payment3Amount = fullCoursePrice - Math.round(fullCoursePrice * 0.25) - payment2Amount

      const dueDate2 = new Date(enrollmentDate)
      dueDate2.setMonth(dueDate2.getMonth() + 1)

      const dueDate3 = new Date(enrollmentDate)
      dueDate3.setMonth(dueDate3.getMonth() + 2)

      await supabaseAdmin.from("installment_schedule").insert([
        {
          enrollment_id: enrollment.id,
          user_id: enrollment.user_id,
          installment_number: 2,
          amount: payment2Amount,
          due_date: dueDate2.toISOString(),
          status: "pending",
        },
        {
          enrollment_id: enrollment.id,
          user_id: enrollment.user_id,
          installment_number: 3,
          amount: payment3Amount,
          due_date: dueDate3.toISOString(),
          status: "pending",
        },
      ])
    }

    // Check if this is an installment payment
    const installmentId = body.data?.metadata?.installmentId

    if (installmentId) {
      // Handle installment payment
      await supabaseAdmin
        .from("installment_schedule")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          payment_reference: reference,
        })
        .eq("id", installmentId)

      // Record payment
      await supabaseAdmin.from("payments").insert({
        enrollment_id: body.data.metadata.enrollmentId,
        amount,
        status: "success",
        reference,
      })

      // Check if all installments are paid
      const { data: remaining } = await supabaseAdmin
        .from("installment_schedule")
        .select("id")
        .eq("enrollment_id", body.data.metadata.enrollmentId)
        .eq("status", "pending")

      if (!remaining || remaining.length === 0) {
        await supabaseAdmin
          .from("enrollments")
          .update({ payment_status: "success" })
          .eq("id", body.data.metadata.enrollmentId)
      }

      console.log("Installment payment processed:", installmentId)
      return Response.json({ received: true })
    }

    // Payment record
    await supabaseAdmin.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
      paid_at: new Date().toISOString(), // ← add this
    })

    // Save student ID and temp password
    await supabaseAdmin
      .from("profiles")
      .update({
        student_id: studentId,
        password_temp: password,
      })
      .eq("id", profile.id);

    // Update Supabase Auth password
    const { error: authError } =
      await supabaseAdmin.auth.admin.updateUserById(
        enrollment.user_id,
        {
          password,
        }
      );

    if (authError) {
      console.error(
        "Password update error:",
        authError
      );
    }

    // Send Receipt Email
    await sendReceiptEmail({
      email: profile.email,
      data: {
        name: fullName || "Student",
        email: profile.email,
        phone: profile.phone,
        country: profile.country,
        studentId,
        receiptId: `KTH-${reference.slice(-8)}`,
        date: new Date(
          enrollment.created_at
        ).toLocaleString(),
        reference,
        status: "PAID",
        program: course.name,
        duration: course.duration,
        startDate: enrollment.start_date,
        amount: amount,
        amountWords: `${numberToWords(
          course.price || amount
        )} Naira Only`,
      },
    });

    // Send Login Details Email
    await sendLoginEmail({
      email: profile.email,
      data: {
        email: profile.email,
        studentId,
        password,
        loginUrl: "https://www.korvatechhub.com/sign-in",
      },
    });

    console.log(
      "Student onboarding completed:",
      profile.email
    );

    return Response.json({
      received: true,
    });
  } catch (error: any) {
    console.error("Webhook Error:", error);

    return Response.json(
      {
        error:
          error.message || "Webhook failed",
      },
      {
        status: 500,
      }
    );
  }
}