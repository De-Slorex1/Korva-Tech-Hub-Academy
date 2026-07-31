"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  CheckCircle2, Clock, Users, Star, ChevronDown,
  ChevronUp, MessageCircle, Zap, Code2, Brain,
  Palette, Rocket, Award, Play
} from "lucide-react"

// Countdown Timer Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

const curriculum = [
  {
    week: "Week 1",
    title: "Digital Foundations & AI Tools",
    icon: Brain,
    color: "#a78bfa",
    lessons: [
      "How the internet works",
      "Introduction to AI (ChatGPT, Gemini)",
      "Using AI for research and productivity",
      "Basic typing and computer skills",
    ],
  },
  {
    week: "Week 2",
    title: "Web Design with HTML & CSS",
    icon: Code2,
    color: "#60a5fa",
    lessons: [
      "Building your first webpage",
      "Colors, fonts and layouts",
      "Making pages look professional",
      "Responsive design basics",
    ],
  },
  {
    week: "Week 3",
    title: "Making Pages Interactive with JavaScript",
    icon: Zap,
    color: "#fbbf24",
    lessons: [
      "What is programming?",
      "Buttons, forms and animations",
      "Building a simple quiz app",
      "Problem solving with code",
    ],
  },
  {
    week: "Week 4",
    title: "UI/UX & Design Thinking",
    icon: Palette,
    color: "#34d399",
    lessons: [
      "Canva for digital design",
      "Figma basics",
      "Designing a mobile app screen",
      "User experience principles",
    ],
  },
  {
    week: "Week 5",
    title: "AI-Powered Projects",
    icon: Rocket,
    color: "#f87171",
    lessons: [
      "Building with AI tools",
      "ChatGPT for developers",
      "Creating an AI-powered webpage",
      "Presenting your work",
    ],
  },
  {
    week: "Week 6",
    title: "Capstone Project & Graduation",
    icon: Award,
    color: "#facc15",
    lessons: [
      "Build a complete personal portfolio website",
      "Present to mentors and parents",
      "Certificate ceremony",
      "Career path guidance",
    ],
  },
]

const faqs = [
  {
    question: "What age group is this program for?",
    answer: "The Korva Tech Holiday Program is designed for secondary school students aged 11 to 17 years old. No prior tech experience is needed.",
  },
  {
    question: "Does my child need a laptop?",
    answer: "Yes, your child will need a laptop or desktop computer with a stable internet connection to participate in the live online classes.",
  },
  {
    question: "How are the classes conducted?",
    answer: "All classes are conducted online via live video sessions, 4 days a week for 6 weeks. Each session is 2 hours long with hands-on projects and mentor guidance.",
  },
  {
    question: "What will my child build by the end of the program?",
    answer: "Your child will build a personal portfolio website from scratch, a quiz app, AI-powered projects, and digital design mockups. They'll have real work to show off!",
  },
  {
    question: "Will my child receive a certificate?",
    answer: "Yes! Every student who completes the program receives a Korva Tech Hub Certificate of Completion that they can add to their profile and share with schools.",
  },
  {
    question: "What is the early bird price?",
    answer: "The early bird price is ₦75,000 and is available until August 10, 2026. After that, the regular price of ₦100,000 applies.",
  },
  {
    question: "When does the program start?",
    answer: "The program starts on August 3, 2026 and runs for 6 weeks, ending September 14, 2026.",
  },
  {
    question: "Can I get a refund?",
    answer: "Refunds are available within 48 hours of registration if the program has not yet started. Please contact support@korvatechhub.com for assistance.",
  },
]

export default function TeenProgramClient() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const earlyBirdEnd = new Date("2026-08-10T23:59:59")
  const programStart = new Date("2026-08-03T00:00:00")
  const earlyBirdCountdown = useCountdown(earlyBirdEnd)
  const programCountdown = useCountdown(programStart)
  const now = new Date()
  const isEarlyBird = now < earlyBirdEnd
  const price = isEarlyBird ? "₦75,000" : "₦100,000"

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
        <span className="text-2xl md:text-3xl font-bold text-white">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-white/50 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  )

  return (
    <div className="bg-[#050816] text-white min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/15 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-violet-300 text-sm font-medium">
              Enrolling Now — Starts August 3, 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            What If This Holiday
            <span className="block bg-gradient-to-r from-violet-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              Changes Your Child's Future?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4">
            In just 6 weeks, your child aged 11–17 will learn to build software, use AI tools, and create real digital projects — all from home.
          </p>

          <p className="text-base text-white/40 max-w-xl mx-auto mb-10">
            Instead of spending this holiday only consuming technology... they'll begin creating with it.
          </p>

          {/* Early Bird Banner */}
          {isEarlyBird && (
            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl px-6 py-3 mb-8">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">
                Early Bird Price Ends In:
              </span>
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                <span>{String(earlyBirdCountdown.days).padStart(2, "0")}d</span>
                <span>:</span>
                <span>{String(earlyBirdCountdown.hours).padStart(2, "0")}h</span>
                <span>:</span>
                <span>{String(earlyBirdCountdown.minutes).padStart(2, "0")}m</span>
                <span>:</span>
                <span>{String(earlyBirdCountdown.seconds).padStart(2, "0")}s</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/teen-program/register")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity shadow-[0_0_40px_rgba(139,92,246,0.4)]"
            >
              Register My Child Now
              <Rocket className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{price}</p>
              {isEarlyBird && (
                <p className="text-xs text-white/40 line-through">₦100,000</p>
              )}
            </div>
          </div>

          <p className="mt-4 text-white/30 text-xs">
            Online • Live Classes • Certificate Included • Ages 11–17
          </p>
        </div>
      </section>

      {/* PROGRAM COUNTDOWN */}
      <section className="py-16 px-4 border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-white/50 text-sm uppercase tracking-widest mb-4">
            Program Starts In
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <CountdownBox value={programCountdown.days} label="Days" />
            <span className="text-white/30 text-3xl font-thin mb-6">:</span>
            <CountdownBox value={programCountdown.hours} label="Hours" />
            <span className="text-white/30 text-3xl font-thin mb-6">:</span>
            <CountdownBox value={programCountdown.minutes} label="Minutes" />
            <span className="text-white/30 text-3xl font-thin mb-6">:</span>
            <CountdownBox value={programCountdown.seconds} label="Seconds" />
          </div>
          <p className="mt-6 text-white/40 text-sm">
            August 3 — September 14, 2026
          </p>
        </div>
      </section>

      {/* WHY THIS PROGRAM */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Young People We Call "Tech Bros" Today
              <span className="block text-violet-400">Simply Started Early.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Today, many of them work with companies around the world, earn well, and create opportunities for themselves instead of chasing jobs. Your child can start that journey this holiday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🧠",
                title: "Build Real Skills",
                description: "Not just theory. Your child will build actual websites, apps, and AI-powered projects they can show off.",
              },
              {
                icon: "🏠",
                title: "Learn From Home",
                description: "Live online classes, 4 days a week. No commute, no risk. Just focused learning from your living room.",
              },
              {
                icon: "🏆",
                title: "Earn a Certificate",
                description: "Every student who completes the program receives a Korva Tech Hub Certificate of Completion.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-violet-500/40 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4 bg-gradient-to-r from-violet-500/10 to-pink-500/10 border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "6", label: "Weeks Program" },
              { value: "11-17", label: "Age Range" },
              { value: "4", label: "Days / Week" },
              { value: "100%", label: "Online & Live" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Your Child Will Learn
            </h2>
            <p className="text-white/50">
              A carefully structured 6-week journey from zero to building real projects.
            </p>
          </div>

          <div className="space-y-4">
            {curriculum.map((week, idx) => {
              const Icon = week.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${week.color}20`, border: `1px solid ${week.color}40` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: week.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${week.color}20`, color: week.color }}
                        >
                          {week.week}
                        </span>
                        <h3 className="font-bold text-white">{week.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {week.lessons.map((lesson, lidx) => (
                          <p key={lidx} className="text-sm text-white/50 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                            {lesson}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20 px-4 bg-white/[0.02] border-y border-white/10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything Included</h2>
            <p className="text-white/50">One price. Everything your child needs to succeed.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "🎥", text: "Live Online Classes (4 days/week)" },
              { icon: "👨‍💻", text: "Experienced Tech Mentors" },
              { icon: "🛠️", text: "Hands-On Projects Every Week" },
              { icon: "🤖", text: "AI Tools Training" },
              { icon: "🎨", text: "UI/UX & Design Training" },
              { icon: "📁", text: "Study Materials & Resources" },
              { icon: "🏆", text: "Certificate of Completion" },
              { icon: "👥", text: "Student Community Access" },
              { icon: "🎓", text: "Career Path Guidance" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="text-2xl">{item.icon}</span>
                <p className="text-sm text-white/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PLACEHOLDER */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Parents Are Saying</h2>
            <p className="text-white/50">Real feedback from parents who invested in their children's future.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mrs. Adebayo",
                location: "Lagos",
                text: "My son built his first website in week 2. I was shocked. He now wants to study Computer Science. Best holiday investment we've made.",
                stars: 5,
              },
              {
                name: "Mr. Okonkwo",
                location: "Abuja",
                text: "I was skeptical at first but the mentors are excellent. My daughter is more confident and focused. She even teaches me things now!",
                stars: 5,
              },
              {
                name: "Mrs. Ibrahim",
                location: "Port Harcourt",
                text: "Worth every kobo. Instead of TikTok all day, my child is now building apps. The certificate looks great too.",
                stars: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-white/70 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-white/40">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-violet-500/10 to-pink-500/10 border-y border-white/10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Give Your Child a Head Start
            <span className="block text-violet-400">That Could Last a Lifetime</span>
          </h2>
          <p className="text-white/50 mb-8">
            The next school term will come whether they learn a new skill or not. The difference is what they'll have to show for this holiday.
          </p>

          <div className="rounded-3xl border border-violet-500/30 bg-white/[0.03] p-8 mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              {isEarlyBird && (
                <span className="text-white/40 line-through text-2xl">₦100,000</span>
              )}
              <span className="text-5xl font-extrabold text-white">{price}</span>
            </div>
            {isEarlyBird && (
              <p className="text-yellow-400 text-sm font-medium mb-4">
                🎉 Early Bird Discount — Ends August 10
              </p>
            )}
            <div className="space-y-2 text-sm text-white/60 mb-6">
              <p>✓ 6 Weeks Live Online Program</p>
              <p>✓ Ages 11–17 | Beginner Friendly</p>
              <p>✓ Certificate of Completion</p>
              <p>✓ Starts August 3, 2026</p>
            </div>
            <button
              onClick={() => router.push("/teen-program/register")}
              className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              Register My Child Now →
            </button>
          </div>

          <p className="text-white/30 text-xs">
            Questions? Chat with us on WhatsApp below ↓
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/50">Everything parents need to know before registering.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  {openFaq === idx
                    ? <ChevronUp className="w-5 h-5 text-white/40 shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />
                  }
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Let This Holiday Pass Without Purpose
          </h2>
          <p className="text-white/50 mb-8">
            Spaces are limited. Register today and secure your child's spot in the Korva Tech Holiday Program.
          </p>
          <button
            onClick={() => router.push("/teen-program/register")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity"
          >
            Register Now — {price}
            <Rocket className="w-5 h-5" />
          </button>
          <p className="mt-4 text-white/30 text-xs">
            August 3 — September 14, 2026 • Online • Ages 11–17
          </p>
        </div>
      </section>

      {/* WHATSAPP BUTTON */}
      
      {/* WHATSAPP BUTTON */}

        <a href="https://wa.me/2349052639990?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20Korva%20Tech%20Holiday%20Program"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-105"
        >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">Chat with Us</span>
        </a>

      <SiteFooter />
    </div>
  )
}