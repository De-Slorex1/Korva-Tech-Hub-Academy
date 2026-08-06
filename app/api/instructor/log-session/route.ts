import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
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
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const {
    courseId,
    cohortId,
    topicTitle,
    moduleIndex,
    lessonIndex,
    sessionDate,
    notes,
  } = await req.json()

  const { data: session, error } = await supabaseAdmin
    .from("class_sessions")
    .insert({
      instructor_id: user.id,
      course_id: courseId,
      cohort_id: cohortId || null,
      topic_title: topicTitle,
      module_index: moduleIndex,
      lesson_index: lessonIndex,
      session_date: sessionDate,
      notes: notes || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, session })
}