import { installmentReminderTemplate } from "./installmentReminderTemplate"
import { resend } from "./resend"


export async function sendInstallmentReminderEmail({
  email,
  data,
}: {
  email: string
  data: {
    name: string
    installmentNumber: number
    amount: number
    dueDate: string
    paymentUrl: string
  }
}) {
  try {
    await resend.emails.send({
      from: "Korva Tech Hub <noreply@korvatechhub.com>",
      to: email,
      subject: `Installment ${data.installmentNumber} Due Soon - Korva Tech Hub`,
      html: installmentReminderTemplate(data),
    })

    console.log("Installment reminder email sent successfully")
  } catch (error) {
    console.error("Installment reminder email failed:", error)
    throw error
  }
}