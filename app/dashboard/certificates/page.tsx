import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import courses from "@/data/courses"
import CertificatesClient from "./CertificatesClient"

export default async function CertificatesPage() {
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

  // Profile must come AFTER getUser
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("first_name, last_name")
    .eq("user_id", user.id)
    .single()

  const studentName = profile
    ? `${profile.first_name} ${profile.last_name}`.trim()
    : "Student"

  // Fetch certificates
  const { data: certificates } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false })

  // Fetch active enrollments
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("id, course_id, status")
    .eq("user_id", user.id)
    .eq("status", "active")

  // Fetch lesson progress
  const { data: lessonProgress } = await supabaseAdmin
    .from("lesson_progress")
    .select("course_code, completed")
    .eq("user_id", user.id)

  // Enrich enrollments with progress
  const enrichedEnrollments = (enrollments ?? []).map((enrollment) => {
    const code = COURSE_CODE_BY_ID[enrollment.course_id]
    const staticCourse = courses.find((c) => c.code === code) ?? null

    const totalLessons = staticCourse?.curriculum.reduce(
      (sum, module) => sum + module.lessons.length, 0
    ) ?? 0

    const completedLessons = (lessonProgress ?? []).filter(
      (lp) => lp.course_code === code && lp.completed
    ).length

    const progressPercent = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

    const hasCertificate = (certificates ?? []).some(
      (c) => c.enrollment_id === enrollment.id
    )

    return {
      id: enrollment.id,
      course_id: enrollment.course_id,
      courseCode: code ?? null,
      courseName: staticCourse?.title ?? "Unknown Course",
      totalLessons,
      completedLessons,
      progressPercent,
      hasCertificate,
    }
  })

  return (
    <CertificatesClient
      certificates={certificates ?? []}
      enrollments={enrichedEnrollments}
      userId={user.id}
      studentName={studentName}
    />
  )
}