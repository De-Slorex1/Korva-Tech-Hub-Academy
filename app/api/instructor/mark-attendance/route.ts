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

  const { sessionId, courseId, attendance } = await req.json()

  // Delete existing attendance for this session first
  await supabaseAdmin
    .from("attendance")
    .delete()
    .eq("session_id", sessionId)

  // Insert new attendance records
  const records = attendance.map((a: any) => ({
    session_id: sessionId,
    student_id: a.studentId,
    enrollment_id: a.enrollmentId,
    status: a.status,
    marked_at: new Date().toISOString(),
  }))

  const { data, error } = await supabaseAdmin
    .from("attendance")
    .insert(records)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Create notifications for each student
  const notifications = attendance.map((a: any) => ({
    user_id: a.studentId,
    title: "Attendance Marked",
    body: `Your attendance has been marked as ${a.status} for today's class.`,
    type: "attendance",
    read: false,
    link: "/dashboard/learning",
  }))

  await supabaseAdmin.from("notifications").insert(notifications)

  return NextResponse.json({ success: true, records: data })
}