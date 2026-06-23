import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { installmentId, enrollmentId } = await req.json()

  // Get installment
  const { data: installment } = await supabaseAdmin
    .from("installment_schedule")
    .select("*")
    .eq("id", installmentId)
    .single()

  if (!installment) return NextResponse.json({ error: "Installment not found" }, { status: 404 })
  if (installment.status === "paid") return NextResponse.json({ error: "Already paid" }, { status: 400 })

  // Get profile for email
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("email")
    .eq("user_id", user.id)
    .single()

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 })

  const reference = `KORVA_INST_${Date.now()}_${installmentId}`

  // Update installment with reference
  await supabaseAdmin
    .from("installment_schedule")
    .update({ payment_reference: reference })
    .eq("id", installmentId)

  // Initialize Paystack
  const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: profile.email,
      amount: installment.amount * 100,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      metadata: {
        enrollmentId,
        installmentId,
        installmentNumber: installment.installment_number,
      },
    }),
  })

  const paystackData = await paystackRes.json()

  if (!paystackData.status) {
    return NextResponse.json({ error: paystackData.message }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    authorization_url: paystackData.data.authorization_url,
  })
}