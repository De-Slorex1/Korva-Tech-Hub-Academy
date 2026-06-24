import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  try {
    const { userId, enrollmentId, courseId, studentName, courseName, issuedBy } = await req.json()

    // Check if certificate already exists
    const { data: existing } = await supabaseAdmin
      .from("certificates")
      .select("id")
      .eq("enrollment_id", enrollmentId)
      .single()

    if (existing) {
      return NextResponse.json({ error: "Certificate already issued" }, { status: 400 })
    }

    // Generate certificate number
    const { data: certNumber } = await supabaseAdmin
      .rpc("generate_certificate_number")

    const { data: certificate, error } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: userId,
        enrollment_id: enrollmentId,
        course_id: courseId,
        student_name: studentName,
        course_name: courseName,
        certificate_number: certNumber,
        issued_by: issuedBy ?? "system",
        issued_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true, certificate })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}