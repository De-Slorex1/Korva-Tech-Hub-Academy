import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import InstructorCoursesClient from "./InstructorCoursesClient";

export default async function InstructorCoursesPage() {
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

  // Get cohorts for instructor's courses
  const { data: cohorts } = await supabaseAdmin
    .from("cohorts")
    .select("*")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])

  // Get class sessions logged by instructor
  const { data: sessions } = await supabaseAdmin
    .from("class_sessions")
    .select("*")
    .eq("instructor_id", user.id)
    .order("session_date", { ascending: false })

  // Enrich with static course data
  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    const courseCohorts = (cohorts ?? []).filter((ch) => ch.course_id === courseId)
    const courseSessions = (sessions ?? []).filter((s) => s.course_id === courseId)

    return {
      courseId,
      code: code ?? null,
      title: staticCourse?.title ?? "Unknown Course",
      image: staticCourse?.image ?? null,
      curriculum: staticCourse?.curriculum ?? [],
      cohorts: courseCohorts,
      sessions: courseSessions,
    }
  })

  return (
    <InstructorCoursesClient
      courses={enrichedCourses}
      instructorId={user.id}
    />
  )
}