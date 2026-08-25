function getRecommendedPath(workExcitement: string, goal: string) {
  if (workExcitement.includes("Building websites and apps")) {
    if (goal.includes("Freelance") || goal.includes("Build my own startup")) {
      return {
        path: "Fullstack Engineering with AI",
        code: "fsa",
        reason: "You want to build things people use AND create your own opportunities. Fullstack gives you both — frontend and backend — so you can build complete products independently.",
        link: "https://www.korvatechhub.com/courses/fsa",
      }
    }
    return {
      path: "Frontend Engineering & UI/UX",
      code: "feu",
      reason: "You love building things people can see. Frontend Engineering will teach you to build beautiful, modern websites and apps using HTML, CSS, JavaScript, React and Next.js.",
      link: "https://www.korvatechhub.com/courses/feu",
    }
  }

  if (workExcitement.includes("Working behind the scenes")) {
    return {
      path: "Backend Engineering with AI",
      code: "bea",
      reason: "You're drawn to the engine that powers everything. Backend Engineering will teach you APIs, databases, servers, authentication and cloud deployment.",
      link: "https://www.korvatechhub.com/courses/bea",
    }
  }

  if (workExcitement.includes("Designing beautiful interfaces")) {
    return {
      path: "UI/UX Design Mastery",
      code: "uix",
      reason: "You think in experiences and visuals. UI/UX Design will teach you Figma, user research, wireframing, prototyping and design systems — everything to become a professional product designer.",
      link: "https://www.korvatechhub.com/courses/uix",
    }
  }

  if (workExcitement.includes("Analyzing data")) {
    return {
      path: "Data Intelligence with AI",
      code: "dia",
      reason: "You want to turn numbers into decisions. Data Intelligence will teach you SQL, Python, Power BI, Excel and AI analytics workflows — skills companies pay premium for.",
      link: "https://www.korvatechhub.com/courses/dia",
    }
  }

  if (workExcitement.includes("Building AI and intelligent systems")) {
    return {
      path: "Data Science & Machine Learning",
      code: "dsm",
      reason: "You want to build the future. Data Science & Machine Learning will teach you Python, statistics, machine learning models, and AI workflows used by top companies worldwide.",
      link: "https://www.korvatechhub.com/courses/dsm",
    }
  }

  // Default — not sure yet
  return {
    path: "Digital Foundations Program",
    code: "dfp",
    reason: "Since you're still exploring, the best starting point is our Digital Foundations Program. It gives you a strong base in digital skills, AI tools and an overview of all tech paths — so you can make a confident decision about what to specialize in.",
    link: "https://www.korvatechhub.com/courses/dfp",
  }
}

export function surveyEmailTemplate(data: {
  fullName: string
  goal: string
  biggestChallenge: string
  workExcitement: string
}) {
  const firstName = data.fullName.split(" ")[0]
  const recommendation = getRecommendedPath(data.workExcitement, data.goal)

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
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Your Personalized Tech Path</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px;color:#ffffff;font-size:18px;font-weight:600;">Hi ${firstName} 👋</p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                A few minutes ago, you completed our Tech Path Assessment. Thank you.
              </p>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                Based on your answers, here's what stood out:
              </p>

              <!-- Their answers summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f2e;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your Goal</p>
                    <p style="margin:0 0 16px;color:#ffffff;font-size:14px;font-weight:600;">${data.goal}</p>
                    <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Your Biggest Challenge</p>
                    <p style="margin:0 0 16px;color:#ffffff;font-size:14px;font-weight:600;">${data.biggestChallenge}</p>
                    <p style="margin:0 0 8px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">What Excites You</p>
                    <p style="margin:0;color:#ffffff;font-size:14px;font-weight:600;">${data.workExcitement}</p>
                  </td>
                </tr>
              </table>

              <!-- Recommendation -->
              <p style="margin:0 0 12px;color:#ffffff;font-size:17px;font-weight:700;">
                Based on this, your best starting path is:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#7c3aed20,#05966920);border-radius:12px;border:1px solid #7c3aed40;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 8px;color:#a78bfa;font-size:20px;font-weight:700;">
                      🎯 ${recommendation.path}
                    </p>
                    <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.7;">
                      ${recommendation.reason}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid #1f2937;margin:24px 0;"></div>

              <p style="margin:0 0 16px;color:#9ca3af;font-size:15px;line-height:1.7;">
                One thing we hear again and again from people who are where you are right now:
              </p>

              <p style="margin:0 0 16px;color:#ffffff;font-size:15px;line-height:1.7;font-style:italic;">
                "I'm not afraid of learning. I'm afraid of making the wrong decision."
              </p>

              <p style="margin:0 0 24px;color:#9ca3af;font-size:15px;line-height:1.7;">
                That's exactly why Korva exists. Not to sell you another course. But to give you what most beginners never get:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1f2e;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;A clear roadmap built for your goal.</p>
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;Mentors who guide you step by step.</p>
                    <p style="margin:0 0 10px;color:#a78bfa;font-size:14px;">✓ &nbsp;Real projects that build confidence.</p>
                    <p style="margin:0;color:#a78bfa;font-size:14px;">✓ &nbsp;A community that keeps you moving when things get hard.</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;color:#9ca3af;font-size:14px;line-height:1.6;">
                For the next 7 days, we'd like you to experience that for yourself for free. No pressure . No long-term commitment just seven days to discover what learning with clarity feels like.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="https://chat.whatsapp.com/JCKHLqVLkGcGwBUXV9GYOV"
                       style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:10px;font-size:14px;font-weight:600;">
                      Start Your Free 7 day Experience
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