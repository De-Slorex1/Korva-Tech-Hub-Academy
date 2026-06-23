import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendReceiptEmail } from "@/lib/sendReceiptEmail";
import { sendLoginEmail } from "@/lib/sendLoginEmail";
import { numberToWords } from "@/lib/numberToWords";

export async function POST(req: Request) {
  try {
    // ================================
    // 1. RAW PAYSTACK BODY
    // ================================
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const paystackSignature = req.headers.get("x-paystack-signature");

    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(rawBody)
      .digest("hex");

    if (!paystackSignature || hash !== paystackSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (body.event !== "charge.success") {
      return Response.json({ received: true });
    }

    const { reference, amount: rawAmount } = body.data;
    const amount = rawAmount / 100;

    // ================================
    // 2. FIND ENROLLMENT
    // ================================
    const { data: enrollment } = await supabaseAdmin
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (!enrollment) {
      return Response.json({ received: true });
    }

    // prevent duplicate processing
    if (enrollment.payment_status === "paid") {
      return Response.json({ received: true });
    }

    // ================================
    // 3. FETCH PROFILE + COURSE
    // ================================
    const [{ data: profile }, { data: course }] = await Promise.all([
      supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", enrollment.user_id)
        .single(),

      supabaseAdmin
        .from("Course")
        .select("*")
        .eq("id", enrollment.course_id)
        .single(),
    ]);

    if (!profile || !course) {
      console.error("Missing profile or course:", reference);
      return Response.json({ received: true });
    }

    // ================================
    // 4. GENERATE CREDENTIALS
    // ================================
    const userId = `KTH-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const password = Math.random().toString(36).slice(-8);

    const fullName =
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim();

    // ================================
    // 5. UPDATE ENROLLMENT
    // ================================
    await supabaseAdmin
      .from("enrollments")
      .update({
        status: "active",
        payment_status: "paid",
      })
      .eq("id", enrollment.id);

    // ================================
    // 6. PAYMENT RECORD
    // ================================
    await supabaseAdmin.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
    });

    // ================================
    // 7. UPDATE PROFILE (CLEAN SINGLE UPDATE)
    // ================================
    await supabaseAdmin
      .from("profiles")
      .update({
        user_id: userId,
        password_temp: password,
      })
      .eq("id", profile.id);

    // ================================
    // 8. UPDATE SUPABASE AUTH PASSWORD
    // (THIS MAKES LOGIN WORK)
    // ================================
    await supabaseAdmin.auth.admin.updateUserById(
      enrollment.user_id,
      {
        password,
      }
    );

    // ================================
    // 9. SEND RECEIPT EMAIL
    // ================================
    await sendReceiptEmail({
      email: profile.email,
      data: {
        name: fullName || "Student",
        email: profile.email, // ✅ included as requested
        phone: profile.phone,
        country: profile.country,
        studentId: userId,
        receiptId: `KTH-${reference.slice(-8)}`,
        date: new Date(enrollment.created_at).toLocaleString(),
        reference,
        status: "PAID",
        program: course.name,
        duration: course.duration,
        startDate: enrollment.start_date,
        amount: course.price || amount,
        amountWords: `${numberToWords(
          course.price || amount
        )} Naira Only`,
      },
    });

    // ================================
    // 10. SEND LOGIN EMAIL
    // ================================
    await sendLoginEmail({
      email: profile.email,
      data: {
        email: profile.email,
        userId,
        password,
        loginMethod: "Email + Password",
        note: "Use this email and password to access your dashboard",
      },
    });

    return Response.json({ received: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);

    return Response.json(
      {
        error: error.message || "Webhook failed",
      },
      { status: 500 }
    );
  }
}