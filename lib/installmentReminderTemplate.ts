export function installmentReminderTemplate(data: {
  name: string
  installmentNumber: number
  amount: number
  dueDate: string
  paymentUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Installment Payment Reminder</title>
</head>
<body style="margin:0;padding:0;background:#050816;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1117;border-radius:16px;border:1px solid #1f2937;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                Korva Tech Hub
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
                Payment Reminder
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;color:#9ca3af;font-size:14px;">Hello,</p>
              <h2 style="margin:0 0 24px;color:#ffffff;font-size:22px;font-weight:700;">
                Hi ${data.name} 👋
              </h2>

              <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.6;">
                This is a friendly reminder that your <strong style="color:#ffffff;">Installment ${data.installmentNumber} of 3</strong> is due in <strong style="color:#a78bfa;">7 days</strong>. Please make your payment before the due date to avoid suspension of your course access.
              </p>

              <!-- Payment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f2e;border-radius:12px;border:1px solid #7c3aed40;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:12px;border-bottom:1px solid #1f2937;">
                          <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Installment</p>
                          <p style="margin:4px 0 0;color:#ffffff;font-size:16px;font-weight:600;">Payment ${data.installmentNumber} of 3</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #1f2937;">
                          <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Amount Due</p>
                          <p style="margin:4px 0 0;color:#a78bfa;font-size:28px;font-weight:700;">₦${data.amount.toLocaleString()}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:12px;">
                          <p style="margin:0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Due Date</p>
                          <p style="margin:4px 0 0;color:#f59e0b;font-size:16px;font-weight:600;">${data.dueDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Warning -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#7c3aed15;border-radius:10px;border:1px solid #7c3aed40;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;color:#c4b5fd;font-size:13px;line-height:1.6;">
                      ⚠️ <strong>Important:</strong> If payment is not made by the due date, your course access will be automatically suspended until payment is completed.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${data.paymentUrl}"
                       style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                      Pay Now →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #1f2937;text-align:center;">
              <p style="margin:0;color:#4b5563;font-size:12px;">
                © ${new Date().getFullYear()} Korva Tech Hub. All rights reserved.
              </p>
              <p style="margin:8px 0 0;color:#4b5563;font-size:12px;">
                If you have any questions, contact us at
                <a href="mailto:support@korvatechhub.com" style="color:#7c3aed;text-decoration:none;">support@korvatechhub.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}