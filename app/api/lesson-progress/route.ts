import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

  const { enrollmentId, courseCode, moduleIndex, lessonIndex, lessonTitle } = await req.json()

  const { error } = await supabase
    .from("lesson_progress")
    .upsert({
      user_id: user.id,
      enrollment_id: enrollmentId,
      course_code: courseCode,
      module_index: moduleIndex,
      lesson_index: lessonIndex,
      lesson_title: lessonTitle,
      completed: true,
      completed_at: new Date().toISOString(),
    }, {
      onConflict: "user_id,course_code,module_index,lesson_index"
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}