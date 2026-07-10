export function surveyEmailTemplate({
  fullName,
  goal,
  biggestChallenge,
}: {
  fullName: string
  goal: string
  biggestChallenge: string
}) {
  const firstName = fullName.split(" ")[0]

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#050816;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0d1117;border-radius:16px;border:1px solid #1f2937;overflow:hidden;max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7c3aed,#059669);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Korva Tech Hub</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Tech Career Assessment</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px;color:#ffffff;font-size:18px;font-weight:600;">Hi ${firstName},</p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                A few minutes ago, you completed our Tech Career Assessment. Thank you.
              </p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                One answer kept coming up again and again.
              </p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                People aren't just afraid of learning tech. They're afraid of making the <strong style="color:#ffffff;">wrong decision.</strong>
              </p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                And that's understandable. Because the wrong decision doesn't just cost money. It can cost <strong style="color:#ffffff;">months of your life.</strong>
              </p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                Months spent watching tutorials. Months jumping from Software Engineering to AI... then to Data Analytics... then back again.
              </p>

              <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.7;">
                If you've ever felt that way, you're not alone. In fact, it's one of the biggest reasons people never break into tech. Not because they aren't capable. Because they never had a <strong style="color:#ffffff;">clear path.</strong>
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid #1f2937;margin:24px 0;"></div>

              <p style="margin:0 0 16px;color:#ffffff;font-size:16px;font-weight:600;">That's why Korva exists.</p>

              <p style="margin:0 0 20px;color:#9ca3af;font-size:15px;line-height:1.7;">
                Not to sell you another course. But to give you what most beginners never get:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f2e;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;A clear roadmap.</p>
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;Mentors who guide you.</p>
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;Real projects that build confidence.</p>
                    <p style="margin:0;color:#a78bfa;font-size:14px;">✓ &nbsp;A community that keeps you moving when things get hard.</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.7;">
                For the next 7 days, we'd like you to experience that for yourself. No pressure. No long-term commitment. Just seven days to discover what learning with clarity feels like.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="https://www.korvatechhub.com/courses"
                       style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#059669);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:10px;font-size:15px;font-weight:600;">
                      Start Your Free 7-Day Experience →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
                See you inside,<br/>
                <strong style="color:#9ca3af;">The Korva Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #1f2937;text-align:center;">
              <p style="margin:0;color:#4b5563;font-size:12px;">
                © ${new Date().getFullYear()} Korva Tech Hub. All rights reserved.
              </p>
              <p style="margin:8px 0 0;color:#4b5563;font-size:12px;">
                Questions? <a href="mailto:support@korvatechhub.com" style="color:#7c3aed;text-decoration:none;">support@korvatechhub.com</a>
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