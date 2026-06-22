import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      firstName,
      lastName,
      phone,
      country,
      courseId,
      cohortId,
      paymentPlan,
    } = body;

    if (!email || !courseId || !paymentPlan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Get course ONCE (needed for amount)
    const { data: course } = await supabaseAdmin
      .from("Course")
      .select("id, price")
      .eq("id", courseId)
      .single();

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // 2. Calculate amount early (NO second fetch later)
    let amount = course.price;

    if (paymentPlan === "installment") {
      amount = course.price / 2;
    }

    if (paymentPlan === "scholarship") {
      return NextResponse.json({
        success: true,
        message: "Scholarship does not require payment",
      });
    }

    // 3. Create user (ONLY ONE auth call)
    const { data: newUser, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    if (createError) {
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      );
    }

    const userId = newUser.user.id;

    // 4. Create profile + enrollment IN PARALLEL
    const enrollmentPromise = supabaseAdmin
      .from("enrollments")
      .insert({
        user_id: userId,
        course_id: courseId,
        cohort_id: cohortId || null,
        payment_plan: paymentPlan,
        status: "pending",
        payment_status: "pending",
        start_date: new Date(),
      })
      .select()
      .single();

    const profilePromise = supabaseAdmin
      .from("profiles")
      .upsert({
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        phone,
        country,
        email,
        role: "student",
      });

    const [{ data: enrollment, error: enrollError }, profileResult] =
      await Promise.all([enrollmentPromise, profilePromise]);

    if (enrollError) throw enrollError;

    // 5. Generate reference immediately
    const reference = `KORVA_${Date.now()}_${enrollment.id}`;

    await supabaseAdmin
      .from("enrollments")
      .update({ paystack_reference: reference })
      .eq("id", enrollment.id);

    // 6. CALL PAYSTACK IMMEDIATELY (NO SECOND API)
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
            enrollmentId: enrollment.id,
            courseId,
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
    console.error("Enroll+Pay Error:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}