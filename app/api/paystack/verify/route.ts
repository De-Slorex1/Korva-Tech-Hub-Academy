import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Missing reference" },
        { status: 400 }
      );
    }

    // 1. Verify with Paystack (SAFE PARSE)
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    let paystackData;

    try {
      paystackData = await paystackRes.json();
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid Paystack response" },
        { status: 500 }
      );
    }

    if (!paystackRes.ok || !paystackData?.data) {
      return NextResponse.json(
        { error: "Paystack verification failed" },
        { status: 500 }
      );
    }

    const paymentData = paystackData.data;

    // 2. Validate payment status
    if (paymentData.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment not successful",
      });
    }

    // 3. Validate metadata safely
    const enrollmentId = paymentData?.metadata?.enrollmentId;

    if (!enrollmentId) {
      return NextResponse.json(
        { error: "Missing enrollment metadata" },
        { status: 400 }
      );
    }

    // 4. Check if already paid (prevents duplicates)
    const { data: existing } = await supabaseAdmin
      .from("enrollments")
      .select("payment_status")
      .eq("id", enrollmentId)
      .single();

    if (existing?.payment_status === "success") {
      return NextResponse.json({
        success: true,
        message: "Already verified",
      });
    }

    // 5. Update DB
    const { error: updateError } = await supabaseAdmin
      .from("enrollments")
      .update({
        payment_status: "success",
        status: "active",
        paystack_verified: true,
        paid_at: new Date().toISOString(),
      })
      .eq("id", enrollmentId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      enrollmentId,
    });

  } catch (error: any) {
    console.error("Verify Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}