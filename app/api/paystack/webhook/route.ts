import crypto from "crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. VERIFY PAYSTACK SIGNATURE (VERY IMPORTANT)
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(body))
      .digest("hex");

    const paystackSignature = (await headers()).get("x-paystack-signature");

    if (hash !== paystackSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    const event = body.event;

    if (event !== "charge.success") {
      return Response.json({ received: true });
    }

    const data = body.data;
    const reference = data.reference;
    const amount = data.amount / 100;

    // 2. FIND ENROLLMENT
    const { data: enrollment } = await supabaseAdmin
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (!enrollment) {
      return Response.json({ received: true });
    }

    // 3. PREVENT DUPLICATE PROCESSING
    if (enrollment.payment_status === "paid") {
      return Response.json({ received: true });
    }

    // 4. UPDATE ENROLLMENT
    await supabaseAdmin
      .from("enrollments")
      .update({
        status: "active",
        payment_status: "paid",
      })
      .eq("id", enrollment.id);

    // 5. CREATE PAYMENT RECORD (safe insert)
    await supabaseAdmin.from("payments").insert({
      enrollment_id: enrollment.id,
      amount,
      status: "success",
      reference,
    });

    return Response.json({ received: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Webhook failed" }, { status: 500 });
  }
}