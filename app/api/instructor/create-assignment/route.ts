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


  // Create assignment
  const { courseId, title, description, dueDate, type, fileUrl } = await req.json()

  const { data: assignment, error } = await supabaseAdmin
    .from("assignments")
    .insert({
      course_id: courseId,
      title,
      description,
      due_date: dueDate,
      type,
      created_by: user.id,
      file_url: fileUrl ?? null,  // ← add this
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
    // Create in-app notifications
    const notifications = enrollments.map((e: any) => ({
      user_id: e.user_id,
      title: `New ${type === 'project' ? 'Project' : 'Assignment'}: ${title}`,
      body: description.slice(0, 100) + (description.length > 100 ? "..." : ""),
      type: type,
      read: false,
      link: `/dashboard/${type === 'project' ? 'projects' : 'assignments'}`,
    }))

    await supabaseAdmin.from("notifications").insert(notifications)

    // Send email notifications to each student
    for (const enrollment of enrollments) {
      const profile = Array.isArray((enrollment as any).profile)
        ? (enrollment as any).profile[0]
        : (enrollment as any).profile

      if (profile?.email) {
        await resend.emails.send({
          from: "Korva Tech Hub <noreply@korvatechhub.com>",
          to: profile.email,
          subject: `New ${type === 'project' ? 'Project' : 'Assignment'}: ${title}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#ffffff;padding:32px;border-radius:16px;">
              <h2 style="color:#a78bfa;">New ${type === 'project' ? 'Project' : 'Assignment'} Posted</h2>
              <p>Hi ${profile.first_name},</p>
              <p>Your instructor has posted a new ${type === 'project' ? 'project' : 'assignment'}:</p>
              <div style="background:#1a1f2e;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2d3748;">
                <h3 style="color:#ffffff;margin:0 0 10px;">${title}</h3>
                <p style="color:#9ca3af;margin:0;">${description}</p>
                ${dueDate ? `<p style="color:#fbbf24;margin-top:12px;font-size:14px;">Due: ${new Date(dueDate).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>` : ''}
              </div>
              <a href="https://www.korvatechhub.com/dashboard/${type === 'project' ? 'projects' : 'assignments'}"
                 style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#059669);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
                View ${type === 'project' ? 'Project' : 'Assignment'} →
              </a>
              <p style="color:#6b7280;margin-top:24px;font-size:12px;">Korva Tech Hub Academy</p>
            </div>
          `,
        })
      }
    }
  }

  return NextResponse.json({ success: true, assignment })
}