import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  const { fileName, fileType } = await req.json()

  const { data, error } = await supabaseAdmin.storage
    .from("assignments")
    .createSignedUploadUrl(`submissions/${fileName}`)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const publicUrl = supabaseAdmin.storage
    .from("assignments")
    .getPublicUrl(`submissions/${fileName}`).data.publicUrl

  return NextResponse.json({
    signedUrl: data.signedUrl,
    publicUrl,
  })
}