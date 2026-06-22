import Image from "next/image"

export function KorvaStory() {
return ( <section className="relative px-6 py-24">

```
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />

  <div className="relative mx-auto max-w-7xl">

    <div className="mb-16 text-center">

      <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
        Our Journey
      </span>

      <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
        The Story Behind Korva Tech Hub
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
        Building a future where talent is not limited by access.
      </p>

    </div>

    <div className="grid items-center gap-16 lg:grid-cols-2">

      {/* IMAGE */}

      <div className="relative">

        <div className="absolute -inset-4 rounded-3xl bg-violet-500/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-3xl border border-white/10">

          <Image
            src="/about.png"
            alt="Korva Tech Hub Students"
            width={900}
            height={700}
            className="h-full w-full object-cover"
          />

        </div>

      </div>

      {/* CONTENT */}

      <div>

        <div className="mb-8 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-violet-300" />

        <div className="space-y-6 text-sm leading-relaxed text-white/70">

          <p>
            Korva Tech Hub was born from a simple observation:
            countless talented young people are eager to build careers
            in technology, yet many struggle to find practical,
            structured and affordable learning opportunities.
          </p>

          <p>
            We saw learners spending months consuming tutorials,
            jumping from one course to another, yet still lacking
            the confidence, mentorship and real-world experience
            needed to break into the industry.
          </p>

          <p>
            Korva Tech Hub was created to bridge that gap by providing
            industry-relevant training, hands-on projects, mentorship,
            community support and AI-powered learning experiences that
            prepare students for the realities of the modern technology
            workforce.
          </p>

          <p>
            Our mission is not just to teach technology. It is to
            empower a new generation of African innovators,
            problem-solvers and builders who can create solutions,
            launch products and compete on a global stage.
          </p>

        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-5 px-3 backdrop-blur-sm">
            <div className="text-3xl font-bold text-violet-400">
              AI
            </div>
            <div className="mt-2 text-xs text-white/60">
              Integrated Learning
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-5 px-3 backdrop-blur-sm">
            <div className="text-3xl font-bold text-violet-400">
              100%
            </div>
            <div className="mt-2 text-xs text-white/60">
              Practical Focus
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-5 px-3 backdrop-blur-sm">
            <div className="text-3xl font-bold text-violet-400">
              Real
            </div>
            <div className="mt-2 text-xs text-white/60">
              Industry Projects
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-5 px-3 backdrop-blur-sm">
            <div className="text-3xl font-bold text-violet-400">
              Global
            </div>
            <div className="mt-2 text-xs text-white/60">
              Career Mindset
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
)
}
