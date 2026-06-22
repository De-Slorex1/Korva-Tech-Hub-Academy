"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Brain,
  Code2,
  Database,
  Layers3,
} from "lucide-react"

import { GridBackground } from "./grid-background"
import { HeroNetwork } from "./hero-network"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"


export function Hero() {
  const router = useRouter()
  function Counter({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 10, damping: 30 })
  const display = useTransform(spring, (latest) => Math.floor(latest))

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <motion.span>{display}</motion.span>
  }
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Background Grid */}
      <GridBackground />

      {/* Aurora Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              AI-Powered Tech Education
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl font-black leading-none text-white md:text-6xl">
              Build The
              <span className="block bg-gradient-to-r from-violet-400 via-white to-violet-400 bg-clip-text text-transparent">
                Future Skills
              </span>
              Employers Want
            </h1>

            {/* Paragraph */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
              Learn software engineering, AI, frontend, backend,
              fullstack development and data intelligence through
              practical projects, mentorship and career-focused
              learning experiences.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button 
              onClick={() => router.push("/enrollment")}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500">
                Start Learning

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
              onClick={() => router.push("/courses")}
              className="rounded-xl border border-neutral-700 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10">
                Explore Programs
              </button>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-white">
                 200+
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  Students
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  5
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  Career Tracks
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  AI
                </h3>

                <p className="mt-1 text-sm text-neutral-400">
                  Integrated
                </p>
              </div>
            </div>
          </div>
           {/* RIGHT CONTENT */}
         <div className="relative hidden lg:block">
          <HeroNetwork />
        </div>

        </div>
      </div>
    </section>
  )
}