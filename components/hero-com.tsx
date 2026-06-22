import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"


export function Hero() {
  return (
    <section className="relative">

      {/* CONTENT */}

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-32 text-center md:py-40">

        {/* BADGE */}

        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300 backdrop-blur-sm">

          <Sparkles className="size-4" />

          Korva Community

        </div>

        {/* HEADING */}

        <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">

          Our Community:

          <span className="block bg-gradient-to-r from-violet-400 via-violet-200 to-violet-400 bg-clip-text text-transparent">

            The Heart of African Tech

          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">

          We aren't just building an academy.

          We're creating a thriving ecosystem where developers,
          designers, data professionals and innovators connect,
          collaborate, learn and grow together through mentorship,
          opportunities and shared ambition.

        </p>

        {/* CTA */}

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <a
                  href="https://chat.whatsapp.com/JCKHLqVLkGcGwBUXV9GYOV"
                  className="
                    w-full sm:w-auto
                    relative overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r from-violet-600 to-violet-500
                    px-8 py-4
                    text-center
                    font-semibold text-white

                    shadow-lg shadow-violet-500/20
                    transition-all duration-300

                    hover:shadow-violet-500/40
                    hover:brightness-110
                    active:scale-[0.98]

                    focus:outline-none focus:ring-2 focus:ring-violet-400/50
                  "
                >
                  <span className="relative z-10">Join Our Community</span>

                  {/* subtle glow effect */}
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-white/10" />
                </a>

          {/* <Button
            variant="outline"
            className="
              h-12
              rounded-xl
              border-white/10
              bg-white/[0.03]
              px-8
              text-white
              backdrop-blur-sm
              transition-all
              duration-300
              hover:bg-white/[0.06]
            "
          >
            Explore Benefits
          </Button> */}

        </div>

        {/* COMMUNITY STATS */}

        <div className="mt-20 grid w-full max-w-4xl gap-6 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">

            <h3 className="text-4xl font-bold text-white">
              500+
            </h3>

            <p className="mt-2 text-white/60">
              Community Members
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">

            <h3 className="text-4xl font-bold text-white">
              24/7
            </h3>

            <p className="mt-2 text-white/60">
              Peer Support
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">

            <h3 className="text-4xl font-bold text-white">
              Weekly
            </h3>

            <p className="mt-2 text-white/60">
              Events & Sessions
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}