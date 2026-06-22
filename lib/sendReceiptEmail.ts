import { resend } from "./resend";
import { receiptTemplate } from "./receiptTemplate";

export async function sendReceiptEmail({
  email,
  data,
}: {
  email: string;
  data: any;
}) {
  try {
    await resend.emails.send({
      from: "Korva Tech Hub <noreply@korvatechhub.com>",
      to: email,
      subject: "Your Payment Receipt - Korva Tech Hub",
      html: receiptTemplate(data),
    });

    console.log("Receipt email sent successfully");
  } catch (error) {
    console.error("Email failed:", error);
    throw error;
  }
}