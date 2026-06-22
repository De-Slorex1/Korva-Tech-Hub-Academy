import { GraduationCap, BookOpen, Globe } from "lucide-react"
import { CommunityGlobe } from "@/components/community-globe"

const benefits = [
  {
    icon: GraduationCap,
    title: "Elite Mentorship",
    description: "Learn directly from senior engineers at world-class companies.",
  },
  {
    icon: BookOpen,
    title: "Curated Curriculum",
    description: "Industry-tested learning paths designed for modern tech demands.",
  },
  {
    icon: Globe,
    title: "Global Networking",
    description: "Connect with members across the fast-rising tech ecosystems.",
  },
]

export function Excellence() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
      {/* Left */}
      <div>
        <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            African Tech Excellence
        </h2>

        <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-white/70">
          Our mission is bold: empowering 1 million developers across the continent. By bridging the gap between local
          talent and global opportunities, we are building the infrastructure for Africa&apos;s digital century.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-2xl font-bold text-white">12k+</span>
          <span className="text-sm leading-tight text-white/70">
            Members Joined
            <br />
            Across 14 countries
          </span>
        </div>

        <ul className="mt-8 space-y-6">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                <benefit.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-white/70">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      
      {/* Right: Animated Globe */}
      <div className="relative flex items-center justify-center">

        <div className="absolute h-[420px] w-[420px] rounded-full border border-violet-500/10" />

        <div className="absolute h-[320px] w-[320px] rounded-full border border-violet-500/20" />

        <CommunityGlobe />

      </div>
    </section>
  )
}
