import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import AttendanceClient from "./AttendanceClient"

export default async function AttendancePage() {
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

  // Get all active enrollments for instructor's courses with student profiles
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("id, course_id, user_id, status")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .eq("status", "active")

  // Get student profiles
  const studentIds = (enrollments ?? []).map((e) => e.user_id)
  const { data: profiles } = await supabaseAdmin
    .from("profiles")
    .select("user_id, first_name, last_name, email, student_id")
    .in("user_id", studentIds.length > 0 ? studentIds : [""])

  // Get class sessions for instructor
  const { data: sessions } = await supabaseAdmin
    .from("class_sessions")
    .select("*")
    .eq("instructor_id", user.id)
    .order("session_date", { ascending: false })

  // Get all attendance records
  const sessionIds = (sessions ?? []).map((s) => s.id)
  const { data: attendanceRecords } = await supabaseAdmin
    .from("attendance")
    .select("*")
    .in("session_id", sessionIds.length > 0 ? sessionIds : [""])

  // Enrich courses
  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    const courseEnrollments = (enrollments ?? []).filter(
      (e) => e.course_id === courseId
    )
    const students = courseEnrollments.map((e) => {
      const profile = profiles?.find((p) => p.user_id === e.user_id)
      return {
        enrollmentId: e.id,
        userId: e.user_id,
        firstName: profile?.first_name ?? "Unknown",
        lastName: profile?.last_name ?? "",
        email: profile?.email ?? "",
        studentId: profile?.student_id ?? "",
      }
    })

    const courseSessions = (sessions ?? []).filter(
      (s) => s.course_id === courseId
    )

    return {
      courseId,
      code: code ?? null,
      title: staticCourse?.title ?? "Unknown Course",
      students,
      sessions: courseSessions,
    }
  })

  return (
    <AttendanceClient
      courses={enrichedCourses}
      attendanceRecords={attendanceRecords ?? []}
      instructorId={user.id}
    />
  )
}