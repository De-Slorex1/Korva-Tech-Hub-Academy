import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { fullName, email, inquiry, message, consent } = body

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .insert([
        {
          full_name: fullName,
          email,
          inquiry,
          message,
          consent,
        },
      ])

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}