import { BookOpen, Code2, Users, Rocket } from "lucide-react"

const journey = [
  {
    number: "01",
    title: "Learn",
    icon: BookOpen,
    description:
      "Master in-demand technology skills through structured courses, AI-powered learning and industry-focused training.",
  },
  {
    number: "02",
    title: "Build",
    icon: Code2,
    description:
      "Work on practical projects, strengthen your portfolio and gain real-world experience that employers value.",
  },
  {
    number: "03",
    title: "Collaborate",
    icon: Users,
    description:
      "Connect with mentors, peers and professionals through our growing technology community and events.",
  },
  {
    number: "04",
    title: "Launch",
    icon: Rocket,
    description:
      "Unlock career opportunities, internships and pathways designed to accelerate your journey into tech.",
  },
]

export function Growth() {
  return (
    <section className="relative px-6 py-24">

      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}

        <div className="text-center">

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Your Journey
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            What Happens After You Join Korva?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/60">
            We don't just teach technology. We guide you through a complete
            growth journey designed to help you learn, build, collaborate and
            launch a successful career in tech.
          </p>

        </div>

        {/* TIMELINE */}

        <div className="relative mt-20">

          {/* CONNECTOR LINE */}

          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {journey.map((step) => (
              <div
                key={step.number}
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
                "
              >

                {/* Glow */}

                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                  {/* Number */}

                  <div className="text-6xl font-bold text-violet-500/20">
                    {step.number}
                  </div>

                  {/* Icon */}

                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-400">

                    <step.icon className="h-7 w-7" />

                  </div>

                  {/* Title */}

                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-4 leading-relaxed text-white/60">
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

       

      </div>

    </section>
  )
}