import { notFound } from "next/navigation"
import courses from "@/data/courses"
import Image from "next/image"
import CurriculumAccordion from "@/components/curriculumAccordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import CourseSidebar from "@/components/course-details-client"


type Props = {
  params: Promise<{
    code: string
  }>
}

export default async function CourseDetails({
  params,
}: Props) {
  const { code } = await params

  const course = courses.find(
    (c) => c.code === code
  )

  if (!course) {
    notFound()
  }

  return (
    <>
        <SiteHeader />
        <main className="min-h-screen bg-[#050816] text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* LEFT */}

            <div>

                <div className="mb-8">
                <h1 className="text-5xl font-bold">
                    {course.title}
                </h1>

                <p className="mt-4 text-lg text-neutral-400">
                    {course.tagline}
                </p>
                </div>

                <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
                <h2 className="text-2xl font-bold">
                    Course Overview
                </h2>

                <p className="mt-4 text-neutral-300">
                    {course.overview}
                </p>
                </div>

                <div className="mt-10">
                <h2 className="mb-6 text-2xl font-bold">
                    What You'll Learn
                </h2>
                <div className="mt-12">
                    <h2 className="mb-6 text-2xl font-bold">
                        Curriculum
                    </h2>

                    <CurriculumAccordion
                        sections={course.curriculum}
                    />
                </div>

                {course.projectsList && (
                    <div className="mt-14">
                        <h2 className="mb-6 text-2xl font-bold">
                        Projects You'll Build
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">
                        {course.projectsList.map((project) => (
                            <div
                            key={project.title}
                            className="
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.03]
                                p-6
                                backdrop-blur-sm
                            "
                            >
                            <h3 className="text-lg font-semibold text-white">
                                {project.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-white/70">
                                {project.description}
                            </p>
                            </div>
                        ))}
                        </div>
                    </div>
                )}

                <h2 className="my-10 text-2xl font-bold">
                        Expexted Learning Outcomes
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {course.outcomes.slice(0, 6).map((item) => (
                        <div
                            key={item}
                            className="rounded-xl border border-neutral-800 p-4"
                        >
                            ✓ {item}
                        </div>
                    ))}
                </div>
                </div>

                {course.careerPath && (
                    <div className="mt-14">
                        <h2 className="mb-6 text-2xl font-bold">
                        Career Opportunities
                        </h2>

                        <div
                        className="
                            rounded-3xl
                            border
                            border-violet-500/20
                            bg-violet-500/5
                            p-8
                        "
                        >
                        <p className="text-lg leading-relaxed text-white/80">
                            {course.careerPath}
                        </p>
                        </div>
                    </div>
                )}

            </div>

            {/* RIGHT SIDEBAR */}
            <aside>
            <CourseSidebar course={course} />
            </aside>
            
            </div>

        </div>
        </main>
        <SiteFooter />
    </>
  )
}