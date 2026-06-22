"use client"

import { useRouter } from "next/navigation"
import courses from "@/data/courses"
import Image from "next/image"
import { Star, Clock3, Wallet, Cpu } from "lucide-react"
import { GridBackground } from "./grid-background"
import Link from "next/link"

export function FeaturedPrograms() {
  const router = useRouter()

  const featuredCourses = courses.slice(0, 4) ?? []

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-neutral-200">

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Main Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[180px]" />

        {/* Top Left Ambient Glow */}
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

        {/* Bottom Right Ambient Glow */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />

        {/* Floating Orb */}
        <div className="absolute right-[10%] top-24 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Floating Orb */}
        <div className="absolute left-[15%] bottom-24 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Spotlight Behind Program Cards */}
        <div className="pointer-events-none absolute left-1/2 top-[420px] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              Featured Programs
            </h2>

            <p className="mt-3 text-neutral-400">
              Industry-aligned learning paths designed to help you build real-world skills,
              create portfolio projects and launch a tech career.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20 hover:border-violet-400/40"
          >
            View All Programs →
          </Link>
        </div>

        {/* GRID */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredCourses.map((p) => (
            <article
              key={p.code}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#0B1120]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-violet-400/40 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div
                  className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-black"
                  style={{ backgroundColor: p.color }}
                >
                  {p.duration}
                </div>
              </div>

              {/* BODY */}
              <div className="flex flex-col p-6">

                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-3.5 w-3.5" />
                    {p.code}
                  </div>

                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {p.rating}
                  </span>
                </div>

                <h3 className="mt-3 text-2xl font-extrabold text-white group-hover:text-violet-300">
                  {p.title}
                </h3>

                <p className="mt-2 text-sm italic text-neutral-300">
                  {p.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-xs">
                    <Clock3 className="h-4 w-4 text-neutral-400" />
                    {p.duration}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1 text-xs">
                    <Wallet className="h-4 w-4 text-neutral-400" />
                    {p.category}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(p.stack ?? []).slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-neutral-700 bg-neutral-800/80 px-2 py-1 text-[11px] text-neutral-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 text-xs text-violet-300">
                    <Cpu className="h-3.5 w-3.5" />
                    AI Integrated Curriculum
                  </span>
                </div>

                <button
                  onClick={() =>
                    router.push(`/courses/${p.code.toLowerCase()}`)
                  }
                  className="mt-6 w-full rounded-lg py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
                  style={{ backgroundColor: p.color }}
                >
                  View Program
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* EMPTY STATE */}
        {featuredCourses.length === 0 && (
          <div className="py-16 text-center text-neutral-400">
            No featured programs yet.
          </div>
        )}
      </div>
    </section>
  )
}