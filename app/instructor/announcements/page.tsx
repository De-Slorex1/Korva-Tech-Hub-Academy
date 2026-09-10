import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import AnnouncementsClient from "./AnnouncementsClient"

export default async function AnnouncementsPage() {
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

  const { data: announcements } = await supabaseAdmin
    .from("announcements")
    .select("*")
    .eq("instructor_id", user.id)
    .order("created_at", { ascending: false })

  const enrichedCourses = courseIds.map((courseId) => {
    const code = COURSE_CODE_BY_ID[courseId]
    const staticCourse = courses.find((c) => c.code === code) ?? null
    return { courseId, title: staticCourse?.title ?? "Unknown Course" }
  })

  return (
    <AnnouncementsClient
      courses={enrichedCourses}
      announcements={announcements ?? []}
      instructorId={user.id}
    />
  )
}