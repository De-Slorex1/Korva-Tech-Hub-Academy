import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import BillingClient from "./BillingClient"

export default async function BillingPage() {
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
  if (!user) redirect("/sign-in")

  // Fetch enrollments
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("id, course_id, payment_plan, status, payment_status, created_at")
    .eq("user_id", user.id)

  // Fetch payments
  const { data: payments } = await supabaseAdmin
    .from("payments")
    .select("id, amount, status, paid_at, reference, enrollment_id")
    .in("enrollment_id", (enrollments ?? []).map((e) => e.id))
    .order("paid_at", { ascending: false })

  // Fetch installment schedule
  const { data: installments } = await supabaseAdmin
    .from("installment_schedule")
    .select("*")
    .eq("user_id", user.id)
    .order("due_date", { ascending: true })

  // Enrich enrollments with course name
  const enrichedEnrollments = (enrollments ?? []).map((enrollment) => {
    const code = COURSE_CODE_BY_ID[enrollment.course_id]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    return {
      ...enrollment,
      courseName: staticCourse?.title ?? "Unknown Course",
    }
  })

  return (
    <BillingClient
      enrollments={enrichedEnrollments}
      payments={payments ?? []}
      installments={installments ?? []}
      userId={user.id}
    />
  )
}