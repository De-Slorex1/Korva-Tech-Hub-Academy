import { resend } from "./resend"

export async function sendLoginEmail({
  email,
  userId,
  password,
}: {
  email: string
  userId: string
  password: string
}) {
  await resend.emails.send({
    from: "Korva Tech Hub <noreply@korvatechhub.com>",
    to: email,
    subject: "Your Login Details - Korva Tech Hub",
    html: `
      <div style="font-family: Arial; padding:20px">
        <h2>Welcome to Korva Tech Hub 🎓</h2>

        <p>Your payment was successful. Here are your login details:</p>

        <div style="background:#111;color:#fff;padding:15px;border-radius:8px">
          <p><b>User ID:</b> ${userId}</p>
          <p><b>Password:</b> ${password}</p>
        </div>

        <p>Login here: https://korvatechhub.com/signin</p>

        <p>Keep this safe.</p>
      </div>
    `,
  })
}