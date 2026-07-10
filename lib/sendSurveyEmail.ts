import { resend } from "./resend"
import { surveyEmailTemplate } from "./surveyEmailTemplate"

export async function sendSurveyEmail({
  email,
  data,
}: {
  email: string
  data: {
    fullName: string
    goal: string
    biggestChallenge: string
  }
}) {
  try {
    const result = await resend.emails.send({
      from: "Korva Tech Hub <noreply@korvatechhub.com>",
      to: email,
      subject: "About Your Tech Career Assessment",
      html: surveyEmailTemplate(data),
    })
    console.log("Survey email sent:", result)
  } catch (error) {
    console.error("Survey email failed:", error)
    throw error
  }
}