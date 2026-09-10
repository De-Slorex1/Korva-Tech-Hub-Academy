import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { resend } from "@/lib/resend"

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

  const { courseId, title, body } = await req.json()

  const { data: announcement, error } = await supabaseAdmin
    .from("announcements")
    .insert({
      instructor_id: user.id,
      course_id: courseId,
      title,
      body,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Get all active students in this course
  const { data: enrollments } = await supabaseAdmin
    .from("enrollments")
    .select("user_id, profile:profiles(first_name, email)")
    .eq("course_id", courseId)
    .eq("status", "active")

  if (enrollments && enrollments.length > 0) {
    // In-app notifications
    const notifications = enrollments.map((e: any) => ({
      user_id: e.user_id,
      title: `📢 ${title}`,
      body: body.slice(0, 100) + (body.length > 100 ? "..." : ""),
      type: "announcement",
      read: false,
      link: "/dashboard",
    }))

    await supabaseAdmin.from("notifications").insert(notifications)

    // Email each student
    for (const enrollment of enrollments) {
      const profile = Array.isArray((enrollment as any).profile)
        ? (enrollment as any).profile[0]
        : (enrollment as any).profile

      if (profile?.email) {
        await resend.emails.send({
          from: "Korva Tech Hub <noreply@korvatechhub.com>",
          to: profile.email,
          subject: `📢 ${title}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#ffffff;padding:32px;border-radius:16px;">
              <h2 style="color:#a78bfa;">New Announcement</h2>
              <p>Hi ${profile.first_name},</p>
              <p>Your instructor has posted a new announcement:</p>
              <div style="background:#1a1f2e;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #7c3aed;">
                <h3 style="color:#ffffff;margin:0 0 12px;">${title}</h3>
                <p style="color:#9ca3af;margin:0;white-space:pre-wrap;">${body}</p>
              </div>
              <a href="https://www.korvatechhub.com/dashboard"
                 style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#059669);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
                Go to Dashboard →
              </a>
              <p style="color:#6b7280;margin-top:24px;font-size:12px;">Korva Tech Hub Academy</p>
            </div>
          `,
        })
      }
    }
  }

  return NextResponse.json({ success: true, announcement })
}