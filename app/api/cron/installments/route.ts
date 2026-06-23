import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { sendInstallmentReminderEmail } from "@/lib/sendInstallmentReminderEmail"


export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const in7Days = new Date(now)
  in7Days.setDate(in7Days.getDate() + 7)

  // 1. Find installments due in 7 days — send reminder
  const { data: upcoming } = await supabaseAdmin
    .from("installment_schedule")
    .select("*, profiles!installment_schedule_user_id_fkey(email, first_name)")
    .eq("status", "pending")
    .gte("due_date", now.toISOString())
    .lte("due_date", in7Days.toISOString())

  for (const installment of upcoming ?? []) {
    const profile = (installment as any).profiles
    if (profile?.email) {
      await sendInstallmentReminderEmail({
        email: profile.email,
        data: {
          name: profile.first_name,
          installmentNumber: installment.installment_number,
          amount: installment.amount,
          dueDate: new Date(installment.due_date).toLocaleDateString("en-NG", {
            day: "numeric", month: "long", year: "numeric"
          }),
          paymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
        },
      })
    }
  }

  // 2. Find overdue installments — mark overdue and suspend enrollment
  const { data: overdue } = await supabaseAdmin
    .from("installment_schedule")
    .select("*")
    .eq("status", "pending")
    .lt("due_date", now.toISOString())

  for (const installment of overdue ?? []) {
    await supabaseAdmin
      .from("installment_schedule")
      .update({ status: "overdue" })
      .eq("id", installment.id)

    await supabaseAdmin
      .from("enrollments")
      .update({ status: "suspended" })
      .eq("id", installment.enrollment_id)
  }

  console.log(`Processed ${upcoming?.length ?? 0} reminders, ${overdue?.length ?? 0} suspensions`)

  return NextResponse.json({ success: true })
}