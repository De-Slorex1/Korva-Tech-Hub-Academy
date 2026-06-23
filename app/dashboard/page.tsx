import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import DashboardClient from "./DashboardClient"


export default async function DashboardPage() {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, student_id, email")
    .eq("user_id", user!.id)
    .single()

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      id,
      status,
      payment_status,
      payment_plan,
      start_date,
      course_id,
      cohort_id,
      cohort:cohorts(id, name, start_date, end_date, is_active)
    `)
    .eq("user_id", user!.id)

  // Enrich enrollments with static course data using COURSE_CODE_BY_ID
// Enrich enrollments with static course data using COURSE_CODE_BY_ID
  const enrichedEnrollments = (enrollments ?? []).map((enrollment) => {
    const code = COURSE_CODE_BY_ID[enrollment.course_id]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    return {
      id: enrollment.id,
      status: enrollment.status,
      payment_status: enrollment.payment_status,
      payment_plan: enrollment.payment_plan,
      start_date: enrollment.start_date,
      course_id: enrollment.course_id,
      cohort_id: enrollment.cohort_id,
      cohort: Array.isArray(enrollment.cohort) ? enrollment.cohort[0] ?? null : enrollment.cohort,
      staticCourse,
    }
  })

  const { data: payments } = await supabase
    .from("payments")
    .select("amount, status, paid_at")
    .in("enrollment_id", (enrollments ?? []).map((e) => e.id))
    .eq("status", "success")

  const totalPaid = payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  return (
    <DashboardClient
      profile={profile}
      enrollments={enrichedEnrollments}
      totalPaid={totalPaid}
    />
  )
}