"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Code2,
  Users,
  Rocket,
  ArrowRight,
} from "lucide-react"

const steps = [
  {
    icon: Brain,
    title: "Deep Learning",
    badge: "Foundation Stage",
    description:
      "Live sessions and rigorous curriculum designed by industry leaders.",
  },
  {
    icon: Code2,
    title: "Real Projects",
    badge: "Hands-On Experience",
    description:
      "Build production-ready applications for startups and ecosystem partners.",
  },
  {
    icon: Users,
    title: "Mentorship",
    badge: "Expert Guidance",
    description:
      "Weekly guidance from experienced engineers and industry professionals.",
  },
  {
    icon: Rocket,
    title: "Dream Career",
    badge: "Career Launch",
    description:
      "Resume reviews, interview preparation, portfolio building, and hiring opportunities.",
  },
]

export function Roadmap() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-28">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Radial Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/15 blur-[180px]" />

      {/* Decorative Orb */}
      <div className="absolute right-10 top-32 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur">
            Why Korva Tech Hub
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Your Path to Excellence
          </h2>

          <div className="mx-auto mt-4 h-[2px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Korva Tech Hub Academy was created to bridge the gap between
            traditional education and the real demands of the tech industry.
            Our programs combine AI-powered learning, practical projects,
            mentorship, and career preparation to help students become
            job-ready software engineers.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-16 hidden items-center justify-center gap-4 lg:flex">
          {[
            "Beginner",
            "Learner",
            "Builder",
            "Professional Engineer",
          ].map((item, index) => (
            <div key={item} className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.9)]" />
                <span className="text-sm font-medium text-slate-300">
                  {item}
                </span>
              </div>

              {index < 3 && (
                <ArrowRight className="mx-6 h-4 w-4 text-purple-400" />
              )}
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="relative mt-24">
          {/* Desktop Connection Line */}
          <div className="absolute left-0 right-0 top-12 hidden h-[2px] bg-gradient-to-r from-purple-600/0 via-purple-500/50 to-purple-600/0 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="group relative"
                >
                  {/* Step Circle */}
                  <div className="relative z-20 mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-purple-500/30 bg-gradient-to-b from-purple-500/30 to-purple-900/20 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.45)]">
                    <Icon className="h-10 w-10 text-purple-300" />
                  </div>

                  {/* Card */}
                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_20px_80px_rgba(168,85,247,0.2)]">
                    <div className="mb-4">
                      <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-relaxed text-slate-400">
                      {step.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-sm font-medium text-purple-300">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Card Glow */}
                  <div className="absolute inset-0 -z-10 rounded-3xl bg-purple-600/0 blur-3xl transition-all duration-500 group-hover:bg-purple-600/10" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}