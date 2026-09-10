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

  const { assignmentId, enrollmentId, submissionLink, note, fileUrl } = await req.json()

  const { data: submission, error } = await supabaseAdmin
  .from("assignment_submissions")
  .insert({
    assignment_id: assignmentId,
    user_id: user.id,
    enrollment_id: enrollmentId,
    submission_link: submissionLink,
    file_url: fileUrl ?? null,  // ← add this
    note,
    status: "submitted",
    submitted_at: new Date().toISOString(),
  })
  .select()
  .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, submission })
}