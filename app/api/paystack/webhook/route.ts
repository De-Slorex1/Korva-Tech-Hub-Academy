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

    // Payment record
    await supabaseAdmin.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
    });

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