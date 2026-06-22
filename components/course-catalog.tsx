"use client"

import { useRouter } from "next/navigation"
import courses from "@/data/courses"
import Image from "next/image"
import { useState } from "react"
import {Search, ChevronDown, SlidersHorizontal, Star, Clock3, Wallet, Cpu } from "lucide-react";
import { GridBackground } from "./grid-background";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Program = {
  level: number
  code: string
  title: string
  tagline: string
  description: string
  image: string
  duration: string
  price: {
    fullPayment: {
      discounted: string
      original: string
    }

    installment: {
      discounted: string
      original: string
    }
  }
  rating: number
  category: string
  color: string
  stack: string[]
  aiTouch: string[]
  mentors: string[]
  featured?: boolean
  courseOutline: string
  courseDuration: string
  classSchedule: string
  classFormat: string
  internship: boolean
  certificate: boolean
  studyMaterials: boolean
  projects: number
  examIncluded: boolean
  communityAccess: boolean
  mentorSupport: boolean
  lifetimeAccess: boolean
}



export function CourseCatalog() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredCourses = courses.filter((course) => {
    const searchTerm = query.toLowerCase()
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm) ||
      course.tagline.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.stack.some((item) =>
        item.toLowerCase().includes(searchTerm)
      ) ||
      course.aiTouch.some((item) =>
        item.toLowerCase().includes(searchTerm)
      )

    const matchesLevel =
      levelFilter === "all" ||
      course.levelLabel === levelFilter

    const matchesCategory =
      categoryFilter === "all" ||
      course.category === categoryFilter

    return (
      matchesSearch &&
      matchesLevel &&
      matchesCategory
    )
  })

  return (
    <section className="relative overflow-hidden bg-[#050816] py-16 text-neutral-200">
    <GridBackground />
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Build The Skills
            <span className="block bg-gradient-to-r from-violet-400 via-violet-200 to-violet-400 bg-clip-text text-transparent">
              Powering Africa's Future
            </span>
          </h1>
          <p className="mt-4 text-neutral-400">
            A structured learning pathway designed for real-world job readiness with AI-powered education.
          </p>
        </div>


        {/* SEARCH */}
        <div className="mt-10 rounded-2xl border border-neutral-800 bg-[#0B1120]/80 backdrop-blur-md p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search programs, skills, AI tools..."
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-neutral-800
                  bg-[#0a0a0f]
                  pl-12
                  pr-4
                  text-white
                  outline-none
                  focus:border-violet-500
                "
              />
            </div>

            <Select
              value={levelFilter}
              onValueChange={(value: any) => setLevelFilter(value)}
            >
              <SelectTrigger
                 className="
                  !h-12
                  min-w-[220px]
                  rounded-xl
                  border-neutral-800
                  bg-[#0a0a0f]
                  text-white
                "
              >
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>

              <SelectContent className="border-neutral-800 bg-[#0a0a0f] text-white">
                <SelectItem value="all">All Levels</SelectItem>

                <SelectItem value="Beginner">
                  Beginner
                </SelectItem>

                <SelectItem value="Beginner to Intermediate">
                  Beginner to Intermediate
                </SelectItem>

                <SelectItem value="Intermediate">
                  Intermediate
                </SelectItem>

                <SelectItem value="Intermediate to Advanced">
                  Intermediate to Advanced
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={categoryFilter}
              onValueChange={(value: any) => setCategoryFilter(value)}
            >
              <SelectTrigger
                 className="
                  !h-12
                  min-w-[220px]
                  rounded-xl
                  border-neutral-800
                  bg-[#0a0a0f]
                  text-white
                "
              >
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

            <SelectContent className="border-neutral-800 bg-[#0a0a0f] text-white">
              <SelectItem value="all">
                All Categories
              </SelectItem>

              <SelectItem value="Foundations">
                Foundations
              </SelectItem>

              <SelectItem value="Frontend">
                Frontend
              </SelectItem>

              <SelectItem value="Backend">
                Backend
              </SelectItem>

              <SelectItem value="Fullstack">
                Fullstack
              </SelectItem>

              <SelectItem value="Data">
                Data Intelligence
              </SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>
        

        {/* GRID */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {filteredCourses.map((p) => (
            <article
              key={p.code}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#0B1120]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-violet-400/40 hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]"
              style={{
                boxShadow: `0 0 0px ${p.color}40`,
              }}
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* LEVEL BADGE */}
                <div
                  className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-black"
                  style={{ backgroundColor: p.color }}
                >
                  {p.duration}
                </div>
              </div>

                {/* BODY */}
                <div className="flex flex-1 flex-col p-7">

                  {/* HEADER */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400">
                      <Cpu className="h-3.5 w-3.5" />
                      {p.code}
                    </div>

                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {p.rating}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-violet-300">
                    {p.title}
                  </h3>

                  {/* TAGLINE */}
                  <p className="mt-3 text-base italic text-neutral-300">
                    {p.tagline}
                  </p>

                  {/* INFO */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">

                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-200">
                      <Clock3 className="h-4 w-4 text-neutral-400" />
                      {p.duration}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-200">
                      <Wallet className="h-4 w-4 text-neutral-400" />
                      {p.category}
                    </span>

                  </div>

                  {/* STACK */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-neutral-700 bg-neutral-800/80 px-3 py-1 text-xs text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* AI TAG */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                      <Cpu className="h-4 w-4" />
                      AI Integrated Curriculum
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 border-t border-neutral-800 pt-5">
                    
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      {/* PRICE SECTION */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">

                          <span className="text-lg sm:text-xl font-bold text-white">
                            {p.price.fullPayment.discounted}
                          </span>

                          <span className="text-sm text-neutral-500 line-through">
                            {p.price.fullPayment.original}
                          </span>

                        </div>

                        {/* optional tag (kept ready) */}
                        {/* <span className="inline-flex w-fit rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                          Limited Offer
                        </span> */}
                      </div>

                      {/* BUTTON SECTION */}
                      <button
                        onClick={() =>
                          router.push(`/courses/${p.code.toLowerCase()}`)
                        }
                        className="
                          w-full sm:w-auto
                          rounded-xl
                          px-5 py-3
                          text-sm font-bold text-black
                          transition-all duration-300
                          hover:scale-[1.03]
                          active:scale-[0.98]
                        "
                        style={{ backgroundColor: p.color }}
                      >
                        View Program
                      </button>

                    </div>
                  </div>

                </div>
                </article>
                ))}
            </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl font-semibold text-white">
            No courses found
          </h3>

          <p className="mt-2 text-neutral-400">
            Try another keyword or filter.
          </p>
        </div>
      )}
  </div>
</section>
)
}