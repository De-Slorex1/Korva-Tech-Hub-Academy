import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import ProjectsClient from "./ProjectsClient"

export default async function ProjectsPage() {
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

  // Get user's active enrollments
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("id, course_id")
    .eq("user_id", user!.id)
    .eq("status", "active")

  const courseIds = (enrollments ?? []).map((e) => e.course_id)

  // Get projects for enrolled courses
  const { data: projects } = await supabaseAdmin
    .from("assignments")
    .select("*")
    .eq("type", "project")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .order("due_date", { ascending: true })

  // Get user's submissions for projects
  const { data: submissions } = await supabaseAdmin
    .from("assignment_submissions")
    .select("*")
    .eq("user_id", user!.id)
    .in(
      "assignment_id",
      (projects ?? []).map((p) => p.id)
    )

  const enrichedProjects = (projects ?? []).map((project) => {
    const code = COURSE_CODE_BY_ID[project.course_id]
    const submission = submissions?.find(
      (s) => s.assignment_id === project.id
    ) ?? null

    return {
      id: project.id as string,
      course_id: project.course_id as string,
      courseCode: code ?? null,
      title: project.title as string,
      description: project.description as string,
      due_date: project.due_date as string,
      max_grade: project.max_grade as number,
      type: project.type as string,
      submission: submission ? {
        id: submission.id as string,
        assignment_id: submission.assignment_id as string,
        submission_link: submission.submission_link as string | null,
        note: submission.note as string | null,
        status: submission.status as string,
        grade: submission.grade as number | null,
        feedback: submission.feedback as string | null,
        submitted_at: submission.submitted_at as string,
        graded_at: submission.graded_at as string | null,
      } : null,
    }
  })

  return (
    <ProjectsClient
      projects={enrichedProjects}
      userId={user!.id}
      enrollments={enrollments ?? []}
    />
  )
}