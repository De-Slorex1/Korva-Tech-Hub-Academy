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

    // 1. Verify with Paystack
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok) {
      return NextResponse.json(
        { error: "Paystack request failed" },
        { status: 500 }
      );
    }

    const paymentData = paystackData.data;

    // 2. Check payment success
    if (paymentData.status !== "success") {
      return NextResponse.json({
        success: false,
        message: "Payment not successful",
      });
    }

    const metadata = paymentData.metadata;
    const enrollmentId = metadata?.enrollmentId;

    if (!enrollmentId) {
      return NextResponse.json(
        { error: "Missing enrollment metadata" },
        { status: 400 }
      );
    }

    // 3. Update DB
    const { error: updateError } = await supabaseAdmin
      .from("enrollments")
      .update({
        payment_status: "paid",
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

    // ✅ SUCCESS RESPONSE (ONLY PLACE IT SHOULD EXIST)
    return NextResponse.json({
      success: true,
      message: "Payment verified and enrollment activated",
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