import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { enrollmentId, email } = await req.json();

    if (!enrollmentId || !email) {
      return NextResponse.json(
        { error: "Missing enrollmentId or email" },
        { status: 400 }
      );
    }

    // 1. Get enrollment
    const { data: enrollment, error: enrollError } =
      await supabaseAdmin
        .from("enrollments")
        .select("*")
        .eq("id", enrollmentId)
        .single();

    if (enrollError || !enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // 2. Get course separately
    const { data: course, error: courseError } =
      await supabaseAdmin
        .from("Course")
        .select("*")
        .eq("id", enrollment.course_id)
        .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // 3. Prevent duplicate payment
    if (enrollment.payment_status === "paid") {
      return NextResponse.json({ message: "Already paid" });
    }

    // 4. Amount logic
    let amount = course.price;

    if (enrollment.payment_plan === "installment") {
      amount = course.price / 2;
    }

    if (enrollment.payment_plan === "scholarship") {
      return NextResponse.json({
        success: true,
        message: "Scholarship does not require payment",
      });
    }

    // 5. Reference
    let reference = enrollment.paystack_reference;

    if (!reference) {
      reference = `KORVA_${Date.now()}_${enrollmentId}`;

      await supabaseAdmin
        .from("enrollments")
        .update({ paystack_reference: reference })
        .eq("id", enrollmentId);
    }

    // 6. Paystack init
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100,
          reference,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          metadata: {
            enrollmentId,
            courseId: course.id,
          },
        }),
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json(
        { error: paystackData.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      reference,
    });
  } catch (error: any) {
    console.error("Paystack Init Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}