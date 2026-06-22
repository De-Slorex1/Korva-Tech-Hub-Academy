"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Section = {
  title: string
  lessons: string[]
}

export default function CurriculumAccordion({
  sections,
}: {
  sections: Section[]
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div
          key={section.title}
          className="rounded-xl border border-neutral-800"
        >
          <button
            onClick={() =>
              setOpen(open === index ? null : index)
            }
            className="flex w-full items-center justify-between p-5"
          >
            <span>{section.title}</span>

            <ChevronDown
              className={`transition ${
                open === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === index && (
            <div className="border-t border-neutral-800 p-5">
              {section.lessons.map((lesson) => (
                <div
                  key={lesson}
                  className="py-2 text-neutral-400"
                >
                  • {lesson}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}