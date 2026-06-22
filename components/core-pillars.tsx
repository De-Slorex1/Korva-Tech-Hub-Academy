import {
  Share2,
  Accessibility,
  Zap,
  ArrowUpRight,
} from "lucide-react"

const pillars = [
  {
    icon: Share2,
    title: "Practical Learning",
    description:
      "Every student learns by building. Real projects, real collaboration and real-world workflows from day one.",
  },
  {
    icon: Accessibility,
    title: "Mentorship & Community",
    description:
      "Learn alongside experienced mentors, industry professionals and a growing community of ambitious tech talents.",
  },
  {
    icon: Zap,
    title: "AI-Powered Education",
    description:
      "We integrate modern AI tools into every learning pathway, helping students learn faster and work smarter.",
  },
]

export function CorePillars() {
  return (
    <section className="relative overflow-hidden px-6 py-24">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[150px]" />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]
          bg-[size:48px_48px]
        "
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Why Korva
          </span>

          <h2 className="mt-6 text-3xl font-bold text-white md:text-5xl">
            The Foundation Behind
            <span className="block text-violet-400">
              Every Successful Learner
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-white/60">
            Everything we do at Korva Tech Hub is built around helping
            learners gain practical skills, confidence, mentorship and
            career-ready experience.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-violet-500/30
                hover:bg-white/[0.05]
              "
            >

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
              </div>

              {/* Number */}
              <div className="absolute right-6 top-6 text-6xl font-bold text-white/[0.04]">
                0{index + 1}
              </div>

              {/* Icon */}
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-violet-500/10
                  text-violet-400
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:bg-violet-500/20
                "
              >
                <pillar.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mt-8 text-2xl font-semibold text-white">
                {pillar.title}
              </h3>

              <p className="mt-4 leading-relaxed text-white/60">
                {pillar.description}
              </p>

              {/* Link */}
              <div className="mt-8 flex items-center gap-2 text-violet-400 opacity-0 transition-all duration-300 group-hover:opacity-100">

                <span className="text-sm font-medium">
                  Learn More
                </span>

                <ArrowUpRight className="h-4 w-4" />

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}