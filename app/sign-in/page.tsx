import { SiteHeader } from "@/components/site-header"
import { SignInCard } from "@/components/sign-in-card"

export default function SignInPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

      {/* floating glow orbs */}
      <div className="absolute -top-40 left-20 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-10 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_70%)]" />

      <div className="relative z-10">
        <SiteHeader />

        <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">

          {/* LEFT SIDE - HERO */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.35em] text-white/40">
                KORVA TECH HUB ACCESS
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight">
                Build Skills.
                <br />
                Launch Careers.
              </h1>

              <p className="mt-5 max-w-md text-white/60">
                Access your learning dashboard, continue real-world projects,
                and track your transformation into a professional developer.
              </p>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-bold text-emerald-400">200+</p>
                <p className="text-xs text-white/50">Students</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-bold text-purple-400">92%</p>
                <p className="text-xs text-white/50">Completion</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-lg font-bold text-blue-400">50+</p>
                <p className="text-xs text-white/50">Projects</p>
              </div>
            </div>

            {/* success strip */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/70">
                “I went from zero coding knowledge to building full-stack apps in 3 months.”
              </p>
              <p className="mt-2 text-xs text-white/40">— Korva Student Success Story</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-center gap-10">
            <SignInCard />
          </div>

        </main>
      </div>
    </div>
  )
}