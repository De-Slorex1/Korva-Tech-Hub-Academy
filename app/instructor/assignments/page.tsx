import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import InstructorAssignmentsClient from "./InstructorAssignmentsClient"

export default async function InstructorAssignmentsPage() {
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

  // Get assignments created by instructor
  const { data: assignments } = await supabaseAdmin
    .from("assignments")
    .select("*")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .eq("type", "assignment")
    .order("created_at", { ascending: false })

  // Get all submissions for these assignments
  // Get all submissions for these assignments
const assignmentIds = (assignments ?? []).map((a) => a.id)

const { data: submissions } = await supabaseAdmin
  .from("assignment_submissions")
  .select(`
    id,
    assignment_id,
    user_id,
    enrollment_id,
    submission_link,
    github_url,
    note,
    notes,
    status,
    grade,
    feedback,
    submitted_at,
    file_url
  `)
  .in("assignment_id", assignmentIds.length > 0 ? assignmentIds : [""])
  .order("submitted_at", { ascending: false })

// Get profiles separately
const submissionUserIds = (submissions ?? []).map((s) => s.user_id)
const { data: submissionProfiles } = await supabaseAdmin
  .from("profiles")
  .select("user_id, first_name, last_name, email, student_id")
  .in("user_id", submissionUserIds.length > 0 ? submissionUserIds : [""])

  // Get enrolled students
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select(`
      id,
      course_id,
      user_id,
      profile:profiles(first_name, last_name, email, student_id)
    `)
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .eq("status", "active")

  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    return {
      courseId,
      title: staticCourse?.title ?? "Unknown Course",
    }
  })

  return (
  <InstructorAssignmentsClient
    courses={enrichedCourses}
    assignments={assignments ?? []}
    submissions={(submissions ?? []).map((s: any) => ({
      ...s,
      profile: submissionProfiles?.find((p) => p.user_id === s.user_id) ?? null,
    }))}
    enrollments={(enrollments ?? []).map((e: any) => ({
      ...e,
      profile: Array.isArray(e.profile) ? e.profile[0] : e.profile,
    }))}
    instructorId={user.id}
  />
)
}