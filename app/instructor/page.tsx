import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import InstructorDashboardClient from "./InstructorDashboardClient"

export default async function InstructorDashboardPage() {
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

  // Get instructor's courses
  const { data: instructorCourses } = await supabaseAdmin
    .from("instructor_courses")
    .select("course_id")
    .eq("instructor_id", user.id)

  const courseIds = (instructorCourses ?? []).map((ic) => ic.course_id)

  // Get enrollments for instructor's courses
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("id, course_id, user_id, status")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .eq("status", "active")

  // Get pending submissions
  const { data: submissions } = await supabaseAdmin
    .from("assignment_submissions")
    .select("id, status, assignment_id, submitted_at")
    .eq("status", "submitted")

  // Get recent class sessions
  const { data: sessions } = await supabaseAdmin
    .from("class_sessions")
    .select("*")
    .eq("instructor_id", user.id)
    .order("session_date", { ascending: false })
    .limit(5)

  // Enrich with static course data
  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    const courseEnrollments = (enrollments ?? []).filter(
      (e) => e.course_id === courseId
    )
    return {
      courseId,
      code: code ?? null,
      title: staticCourse?.title ?? "Unknown Course",
      image: staticCourse?.image ?? null,
      studentCount: courseEnrollments.length,
    }
  })

  return (
    <InstructorDashboardClient
      courses={enrichedCourses}
      totalStudents={enrollments?.length ?? 0}
      pendingSubmissions={submissions?.length ?? 0}
      recentSessions={sessions ?? []}
      instructorId={user.id}
    />
  )
}