"use client"
import {GraduationCap} from "lucide-react"
import { useState } from "react"
import Image from "next/image";
const programs = [
  "Digital Foundation Program",
  "Frontend Engineering & UI/UX",
  "Backend Engineering wih AI",
  "Fullstack Engineering with AI",
  "Data Intelligence with AI",
]

const resources = [
  "Learning Materials",
  "Scholarships",
  "Tech Blog",
  "Student Portal",
  "Internships",
]

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"]

export function SiteFooter() {
   const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage("")

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setMessage(data.message)
      setEmail("")
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <footer className="w-full bg-[#0a0a0f] text-neutral-200 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center">
                       <Image
                         src="/logo.png"
                         alt="logo"
                         width={120}
                         height={120}
                         // className="h-10 w-auto object-contain"
                         priority
                       />
              </a> 
            </div>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-neutral-400">
              The leading academy for deep tech education in Africa. We empower the
              next generation of engineers with world-class skills and industry
              connections.
            </p>
            
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold text-white">Programs</h3>
            <ul className="mt-5 space-y-3">
              {programs.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-neutral-400 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-5 space-y-3">
              {resources.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-base text-neutral-400 transition-colors hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
           <div>
            <h3 className="text-lg font-semibold text-white">
              Newsletter
            </h3>

            <p className="mt-5 text-base leading-relaxed text-neutral-400">
              Get tech insights and academy updates directly in your inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full rounded-lg border border-neutral-800 bg-[#13131a] px-4 py-3 text-white"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#c4a8f5] px-4 py-3 font-semibold text-[#4c1d95] transition hover:bg-[#b794f6] disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>

              {message && (
                <p className="text-sm text-neutral-300">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 border-t border-neutral-800 pt-8">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
              {legalLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm uppercase tracking-wider text-neutral-500 transition-colors hover:text-white"
                >
                  {item}
                </a>
              ))}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm uppercase tracking-wider text-neutral-500">
              &copy; 2026 Korva Tech Hub Academy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Admissions bar */}
      <div className="w-full bg-[#1a1a22]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#9333ea]">
              <GraduationCap className="h-6 w-6 text-white" />
            </span>

            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Selected Specialization
              </p>
              <p className="text-base sm:text-lg font-semibold text-white">
                Full-Stack Development
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:gap-6">

            {/* DATE */}
            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Start Date
              </p>
              <p className="text-sm sm:text-base font-medium text-white">
                November 12, 2024
              </p>
            </div>

            {/* divider (only desktop) */}
            <div className="hidden h-10 w-px bg-neutral-700 lg:block" />

            {/* BUTTON */}
            <button className="
              w-full sm:w-auto
              rounded-xl sm:rounded-full
              bg-[#c4a8f5]
              px-6 sm:px-8
              py-3 sm:py-4
              text-sm sm:text-base
              font-semibold
              text-[#4c1d95]
              transition-colors
              hover:bg-[#b794f6]
              active:scale-[0.98]
            ">
              Continue to Admissions
            </button>
          </div>

        </div>
      </div>
    </footer>
  )
}
