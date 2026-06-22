import { SiteHeader } from "@/components/site-header"
import { ContactInfo } from "@/components/contact-info"
import { ContactForm } from "@/components/contact-form"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

        {/* GRID BACKGROUND */}

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* RADIAL FADE */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050816_100%)]" />

        {/* CENTER GRID CROSS */}

        <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />

        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

        {/* FLOATING PARTICLES */}

        <div className="absolute inset-0">

          <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

          <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

          <div className="absolute left-[35%] bottom-[25%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

          <div className="absolute right-[40%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

          <div className="absolute left-[10%] top-[65%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

          <div className="absolute right-[10%] top-[75%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        </div>

        {/* GLOW ORBS */}

        <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[150px]" />

        <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px]" />

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

        {/* CONTENT */}

        <div className="relative z-10">

          <SiteHeader />

          <main className="mx-auto max-w-7xl px-6 py-16">

            {/* CONTACT CARD */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-10">

              <div className="grid gap-12 lg:grid-cols-2">

                <ContactInfo />

                <ContactForm />

              </div>

            </div>

          </main>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}