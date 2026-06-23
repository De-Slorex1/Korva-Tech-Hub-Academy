import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import LearningClient from "./LearningClient"
import { redirect } from "next/navigation" 


export default async function LearningPage() {
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

  // DELETE these lines from LearningClient.ts

  if (!user) {
    redirect("/sign-in")
  }

  // Fetch enrollments
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("id, course_id, status, cohort:cohorts(id, name)")
    .eq("user_id", user!.id)
    .eq("status", "active")

  // Fetch lesson progress
  const { data: lessonProgress } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", user!.id)

  // Fetch study sessions
  const { data: studySessions } = await supabase
    .from("study_sessions")
    .select("duration_minutes")
    .eq("user_id", user!.id)

  // Enrich enrollments with static course data
  const enrichedEnrollments = (enrollments ?? []).map((enrollment) => {
    const code = COURSE_CODE_BY_ID[enrollment.course_id]
    const staticCourse = courses.find((c) => c.code === code) ?? null

    // Calculate progress for this course
    const courseLessons = lessonProgress?.filter(
      (lp) => lp.course_code === code
    ) ?? []
    const completedLessons = courseLessons.filter((lp) => lp.completed).length

    // Total lessons from static data
    const totalLessons = staticCourse?.curriculum.reduce(
      (sum, module) => sum + module.lessons.length, 0
    ) ?? 0

    const progressPercent = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

    return {
      id: enrollment.id,
      course_id: enrollment.course_id,
      status: enrollment.status,
      cohort: Array.isArray(enrollment.cohort)
        ? enrollment.cohort[0] ?? null
        : enrollment.cohort,
      staticCourse,
      completedLessons,
      totalLessons,
      progressPercent,
    }
  })

  // Total study time in hours
  const totalStudyMinutes = studySessions?.reduce(
    (sum, s) => sum + s.duration_minutes, 0
  ) ?? 0
  const totalStudyHours = Math.round(totalStudyMinutes / 60)

  // Cohort members count (from first active enrollment's cohort)
  const cohortId = enrollments?.[0]?.cohort
  const { count: cohortCount } = await supabase
    .from("enrollments")
    .select("*", { count: "exact", head: true })
    .eq("cohort_id", typeof cohortId === "object" && cohortId !== null
      ? (cohortId as any).id
      : ""
    )

    console.log("user id:", user!.id)
    console.log("enrollments:", enrollments)
    console.log("lessonProgress:", lessonProgress)
    console.log("studySessions:", studySessions)

  return (
    <LearningClient
      enrollments={enrichedEnrollments}
      totalStudyHours={totalStudyHours}
      cohortMemberCount={cohortCount ?? 0}
      userId={user!.id}
    />
  )
}