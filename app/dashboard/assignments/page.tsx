import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { COURSE_CODE_BY_ID } from "@/lib/course-ids"
import AssignmentsClient from "./AssignmentsClient"


export default async function AssignmentsPage() {
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
    .eq("user_id", user.id)
    .eq("status", "active")

  const courseIds = (enrollments ?? []).map((e) => e.course_id)

  // Get assignments for enrolled courses
  const { data: assignments } = await supabaseAdmin
    .from("assignments")
    .select("*")
    .in("course_id", courseIds.length > 0 ? courseIds : [""])
    .order("due_date", { ascending: true })

  // Get user's submissions
  const { data: submissions } = await supabaseAdmin
    .from("assignment_submissions")
    .select("*")
    .eq("user_id", user.id)

  // Enrich assignments with course name and submission status
  const enrichedAssignments = (assignments ?? []).map((assignment) => {
    const code = COURSE_CODE_BY_ID[assignment.course_id] ?? null
    const submission = submissions?.find(
      (s) => s.assignment_id === assignment.id
    ) ?? null

    return {
      id: assignment.id as string,
      course_id: assignment.course_id as string,
      courseCode: code,
      title: assignment.title as string,
      description: assignment.description as string,
      due_date: assignment.due_date as string,
      max_grade: assignment.max_grade as number,
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
    <AssignmentsClient
      assignments={enrichedAssignments}
      userId={user.id}
      enrollments={enrollments ?? []}
    />
  )
}