import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { sendSurveyEmail } from "@/lib/sendSurveyEmail"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      email,
      whatsapp,
      currentStatus,
      goal,
      biggestChallenge,
      triedBefore,
      stoppedReason,
      burningQuestion,
    } = body

    if (!fullName || !email || !whatsapp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save to database
    const { error: dbError } = await supabaseAdmin
      .from("survey_leads")
      .insert({
        full_name: fullName,
        email,
        whatsapp,
        current_status: currentStatus,
        goal,
        biggest_challenge: biggestChallenge,
        tried_before: triedBefore,
        stopped_reason: stoppedReason,
        burning_question: burningQuestion,
      })

    if (dbError) {
      console.error("DB Error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Send personalized email
    await sendSurveyEmail({
      email,
      data: { fullName, goal, biggestChallenge },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Survey Error:", error)
    return NextResponse.json(
      { error: error.message ?? "Internal server error" },
      { status: 500 }
    )
  }
}