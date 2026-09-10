import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import InstructorStudentsClient from "./InstructorStudentsClient"

export default async function InstructorStudentsPage() {
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

  const { data: instructorCourses } = await supabaseAdmin
    .from("instructor_courses")
    .select("course_id")
    .eq("instructor_id", user.id)

  const courseIds = (instructorCourses ?? []).map((ic) => ic.course_id)

  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select(`
      id, course_id, user_id, status, payment_status, payment_plan, start_date,
      profile:profiles(first_name, last_name, email, phone, country, student_id)
    `)
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .eq("status", "active")
    .order("start_date", { ascending: false })

  // Get attendance stats per student
  const { data: sessions } = await supabaseAdmin
    .from("class_sessions")
    .select("id, course_id")
    .eq("instructor_id", user.id)

  const sessionIds = (sessions ?? []).map((s) => s.id)

  const { data: attendance } = await supabaseAdmin
    .from("attendance")
    .select("student_id, session_id, status")
    .in("session_id", sessionIds.length > 0 ? sessionIds : [""])

  // Get submission counts per student
  const { data: submissions } = await supabaseAdmin
    .from("assignment_submissions")
    .select("user_id, status, grade")

  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    return {
      courseId,
      title: staticCourse?.title ?? "Unknown Course",
    }
  })

  const enrichedEnrollments = (enrollments ?? []).map((e: any) => {
    const profile = Array.isArray(e.profile) ? e.profile[0] : e.profile
    const courseSessions = (sessions ?? []).filter((s) => s.course_id === e.course_id)
    const studentAttendance = (attendance ?? []).filter(
      (a) => a.student_id === e.user_id &&
      courseSessions.some((s) => s.id === a.session_id)
    )
    const present = studentAttendance.filter((a) => a.status === 'present' || a.status === 'late').length
    const total = courseSessions.length
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0

    const studentSubmissions = (submissions ?? []).filter((s) => s.user_id === e.user_id)
    const graded = studentSubmissions.filter((s) => s.status === 'graded')
    const avgGrade = graded.length > 0
      ? Math.round(graded.reduce((sum, s) => sum + (s.grade ?? 0), 0) / graded.length)
      : null

    return {
      enrollmentId: e.id,
      userId: e.user_id,
      courseId: e.course_id,
      firstName: profile?.first_name ?? "Unknown",
      lastName: profile?.last_name ?? "",
      email: profile?.email ?? "",
      phone: profile?.phone ?? "",
      country: profile?.country ?? "",
      studentId: profile?.student_id ?? "",
      startDate: e.start_date,
      paymentStatus: e.payment_status,
      attendanceRate,
      attendedSessions: present,
      totalSessions: total,
      submissionsCount: studentSubmissions.length,
      avgGrade,
    }
  })

  return (
    <InstructorStudentsClient
      courses={enrichedCourses}
      students={enrichedEnrollments}
    />
  )
}