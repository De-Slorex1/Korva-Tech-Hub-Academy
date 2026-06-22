import crypto from "crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendReceiptEmail } from "@/lib/sendReceiptEmail";
import { numberToWords } from "@/lib/numberToWords";

export async function POST(req: Request) {
  try {
    // ✅ RAW BODY (IMPORTANT FOR PAYSTACK)
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    // ✅ HEADERS SAFE ACCESS
    const paystackSignature = req.headers.get("x-paystack-signature");

    // ✅ VERIFY SIGNATURE
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

    // ✅ FIND ENROLLMENT
    const { data: enrollment } = await supabaseAdmin
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (!enrollment) return Response.json({ received: true });

    // ✅ PREVENT DUPLICATES
    if (enrollment.payment_status === "paid") {
      return Response.json({ received: true });
    }

    // ✅ FETCH PROFILE + COURSE
    const [{ data: profile }, { data: course }] = await Promise.all([
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

    // ✅ SAFETY CHECK
    if (!profile || !course) {
      console.error("Missing profile/course:", reference);
      return Response.json({ received: true });
    }

    const fullName =
      `${profile.first_name || ""} ${profile.last_name || ""}`.trim();

    // ✅ UPDATE ENROLLMENT
    await supabaseAdmin
      .from("enrollments")
      .update({
        status: "active",
        payment_status: "paid",
      })
      .eq("id", enrollment.id);

    // ✅ PAYMENT RECORD
    await supabaseAdmin.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
    });

    // ✅ SEND EMAIL (RESEND)
    await sendReceiptEmail({
      email: profile.email,
      data: {
        name: fullName || "Student",
        email: profile.email,
        phone: profile.phone,
        country: profile.country,
        studentId: enrollment.user_id,
        receiptId: `KTH-${reference.slice(-8)}`,
        date: new Date(enrollment.created_at).toLocaleString(),
        reference,
        status: "PAID",
        program: course.name,
        duration: course.duration,
        startDate: enrollment.start_date,
        amount: course.price || amount,
        amountWords: `${numberToWords(course.price || amount)} Naira Only`,
      },
    });

    return Response.json({ received: true });
  } catch (error: any) {
    console.error("Webhook Error:", error);

    return Response.json(
      { error: error.message || "Webhook failed" },
      { status: 500 }
    );
  }
}