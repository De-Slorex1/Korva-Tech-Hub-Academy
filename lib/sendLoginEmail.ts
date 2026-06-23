import { resend } from "./resend";

export async function sendLoginEmail({
  email,
  data,
}: {
  email: string;
  data: {
    email: string;
    studentId: string;
    password: string;
    loginUrl: string;
  };
}) {
  await resend.emails.send({
    from: "Korva Tech Hub <noreply@korvatechhub.com>",
    to: email,
    subject: "Your Login Details - Korva Tech Hub",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome to Korva Tech Hub 🎓</h2>

        <p>Your account has been successfully created after payment.</p>

        <p><strong>Login Details:</strong></p>

        <ul>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Student ID:</strong> ${data.studentId}</li>
          <li><strong>Password:</strong> ${data.password}</li>
        </ul>

        <p>
          Login here: 
          <a href="${data.loginUrl}">${data.loginUrl}</a>
        </p>

        <p style="margin-top:20px; color: gray;">
          Please keep these details safe. You will need them to access your dashboard.
        </p>
      </div>
    `,
  });
}