export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_55%)]
        "
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050816_100%)]"/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050816_100%)]" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0">

        <div className="absolute left-[15%] top-[25%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[20%] top-[35%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[35%] bottom-[20%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[40%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[8%] top-[60%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[10%] top-[70%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[80%] top-[15%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

      </div>

      {/* GLOW ORBS */}
      <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/20 blur-[150px]" />

      <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"/>

      <div
        className="
          absolute
          left-1/2
          top-0
          h-full
          w-px
          bg-gradient-to-b
          from-transparent
          via-violet-500/30
          to-transparent
        "
      />
      {/* HERO CONTENT */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-[180px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[90vh]
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          py-32
        "
      >

        {/* BADGE */}

        <div className="flex justify-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-5 py-2 text-sm font-medium text-[#C4B5FD] backdrop-blur-sm">

            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />

            Building Africa's Future Tech Leaders

          </div>

        </div>

        {/* HEADING */}

        <h1 className="mx-auto mt-8 max-w-5xl text-center text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">

          Cultivating the Next Era of

          <span className="block bg-gradient-to-r from-[#8B5CF6] via-violet-300 to-[#8B5CF6] bg-clip-text text-transparent">

            African Tech Excellence

          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-white/70 md:text-xl">

         Korva Tech Hub is a technology education ecosystem dedicated to developing world-class software engineers, designers, data professionals and digital innovators through practical learning, mentorship and AI-powered education.

        </p>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 w-full">

          {/* Card 1 */}
          <div className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-6
            text-center
            backdrop-blur-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-500/30
            hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]
          ">
            <h3 className="text-4xl font-bold text-white">
              500+
            </h3>
            <p className="mt-2 text-white/60">
              Students Trained
            </p>
          </div>

          {/* Card 2 */}
          <div className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-6
            text-center
            backdrop-blur-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-500/30
            hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]
          ">
            <h3 className="text-4xl font-bold text-white">
              10+
            </h3>
            <p className="mt-2 text-white/60">
              Career Pathways
            </p>
          </div>

          {/* Card 3 */}
          <div className="
            w-full
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-6
            text-center
            backdrop-blur-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-500/30
            hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]
          ">
            <h3 className="text-4xl font-bold text-white">
              AI
            </h3>
            <p className="mt-2 text-white/60">
              Integrated Learning
            </p>
          </div>

        </div>

        
        {/* CTA */}

        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button className="rounded-xl bg-[#8B5CF6] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#7C3AED]">

            Explore Programs

          </button>

          <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">

            Learn More About Us

          </button>

        </div>

      </div>

      <div className="mt-20 flex justify-center">
        <div className="h-12 w-6 rounded-full border border-white/20 p-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
        </div>
      </div>
    </section>
  )
}