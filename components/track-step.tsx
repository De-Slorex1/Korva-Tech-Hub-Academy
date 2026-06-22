"use client"

import Image from "next/image"
import courses from "@/data/courses"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Enrollment } from "@/types/enrollements"

type Props = {
  data: Partial<Enrollment>
  setData: React.Dispatch<React.SetStateAction<Partial<Enrollment>>>
  next: () => void
  back: () => void
}

export function TrackStep({ data, setData, next, back }: Props) {
  return (
    <div className="space-y-6 px-1 sm:px-0">
      
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Choose Your Program
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-white/60">
          Select the learning path that best aligns with your goals.
        </p>
      </div>

      {/* Programs */}
      <div className="grid gap-4 sm:gap-5">
        {courses.map((course) => {
          const selected = data.programId === course.code

          return (
            <button
              key={course.code}
              type="button"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  programId: course.code,
                  courseId: course.id,
                  programName: course.title,
                }))
              }
              className={`
                group relative overflow-hidden rounded-2xl sm:rounded-3xl
                border p-4 sm:p-5 text-left transition-all duration-300
                active:scale-[0.99]
                
                ${
                  selected
                    ? "border-[#8B5CF6] bg-[#8B5CF6]/10 shadow-[0_0_35px_rgba(139,92,246,0.25)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }
              `}
            >
              {/* Glow */}
              {selected && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 via-transparent to-transparent" />
              )}

              {/* Content */}
              <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-5">

                {/* Image - responsive sizing */}
                <div className="relative w-full sm:w-24 h-40 sm:h-24 overflow-hidden rounded-xl sm:rounded-2xl">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        {course.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-white/60 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {selected && (
                      <CheckCircle
                        className="text-[#8B5CF6] shrink-0"
                        size={20}
                      />
                    )}
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] sm:text-xs text-white/70">
                      {course.courseDuration}
                    </span>

                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] sm:text-xs text-white/70">
                      {course.levelLabel}
                    </span>

                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] sm:text-xs text-white/70">
                      {course.projects}+ Projects
                    </span>
                  </div>

                  {/* Price + Color */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] sm:text-xs text-white/40">
                        Full Payment
                      </p>

                      <p className="text-base sm:text-lg font-bold text-white">
                        {course.price.fullPayment.discounted}
                      </p>
                    </div>

                    <div
                      className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Summary */}
      {data.programName && (
        <div className="rounded-xl sm:rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-4 sm:p-5">
          <p className="text-xs sm:text-sm text-white/60">
            Selected Program
          </p>

          <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white">
            {data.programName}
          </h3>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between pt-2">

        <button
          onClick={back}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          disabled={!data.programId}
          onClick={next}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}