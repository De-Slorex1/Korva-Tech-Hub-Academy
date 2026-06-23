import { resend } from "./resend";

export async function sendLoginEmail({
  email,
  data,
}: {
  email: string;
  data: {
    email: string;
    userId: string;
    password: string;
    loginMethod: string;
    note?: string;
  };
}) {
  await resend.emails.send({
    from: "Korva Tech Hub <noreply@korvatechhub.com>",
    to: email,
    subject: "Your Login Details - Korva Tech Hub",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome to Korva Tech Hub 🎓</h2>

        <p>Here are your login details:</p>

        <ul>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>User ID:</strong> ${data.userId}</li>
          <li><strong>Password:</strong> ${data.password}</li>
          <li><strong>Login Method:</strong> ${data.loginMethod}</li>
        </ul>

        <p style="margin-top:20px; color: gray;">
          ${data.note || ""}
        </p>

        <p>Keep this safe.</p>
      </div>
    `,
  });
}