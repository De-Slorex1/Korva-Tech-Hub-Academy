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

  const { submissionId, grade, feedback } = await req.json()

  // Update submission
  const { data: submission, error } = await supabaseAdmin
  .from("assignment_submissions")
  .update({ grade, feedback, status: "graded" })
  .eq("id", submissionId)
  .select(`
    *,
    assignment:assignments(title, type)
  `)
  .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Get student profile
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("first_name, email, user_id")
    .eq("user_id", submission.user_id)
    .single()

  if (profile) {
    const assignmentData = Array.isArray(submission.assignment)
      ? submission.assignment[0]
      : submission.assignment

    // In-app notification
    await supabaseAdmin.from("notifications").insert({
      user_id: profile.user_id,
      title: `Your ${assignmentData?.type === 'project' ? 'project' : 'assignment'} has been graded`,
      body: `You received ${grade}/100 for "${assignmentData?.title}". ${feedback ? 'Check your feedback.' : ''}`,
      type: "grade",
      read: false,
      link: `/dashboard/${assignmentData?.type === 'project' ? 'projects' : 'assignments'}`,
    })

    // Email notification
    await resend.emails.send({
      from: "Korva Tech Hub <noreply@korvatechhub.com>",
      to: profile.email,
      subject: `Your ${assignmentData?.type === 'project' ? 'Project' : 'Assignment'} Has Been Graded`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#ffffff;padding:32px;border-radius:16px;">
          <h2 style="color:#a78bfa;">Your Submission Has Been Graded</h2>
          <p>Hi ${profile.first_name},</p>
          <p>Your instructor has graded your submission for <strong>${assignmentData?.title}</strong>.</p>
          <div style="background:#1a1f2e;border-radius:12px;padding:24px;margin:20px 0;text-align:center;border:1px solid #2d3748;">
            <p style="color:#9ca3af;margin:0 0 8px;font-size:14px;">Your Grade</p>
            <p style="font-size:48px;font-weight:700;margin:0;color:${grade >= 75 ? '#34d399' : grade >= 50 ? '#fbbf24' : '#f87171'};">
              ${grade}/100
            </p>
          </div>
          ${feedback ? `
          <div style="background:#1a1f2e;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #7c3aed;">
            <p style="color:#9ca3af;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Instructor Feedback</p>
            <p style="color:#ffffff;margin:0;">${feedback}</p>
          </div>
          ` : ''}
          <a href="https://www.korvatechhub.com/dashboard/${assignmentData?.type === 'project' ? 'projects' : 'assignments'}"
             style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#059669);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
            View Full Details →
          </a>
          <p style="color:#6b7280;margin-top:24px;font-size:12px;">Korva Tech Hub Academy</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}