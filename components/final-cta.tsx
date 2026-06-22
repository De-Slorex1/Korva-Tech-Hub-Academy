export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#050816] px-4 py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-7xl">

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#7c3aed]/90 via-[#6d28d9]/90 to-[#4c1d95]/90 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-12">

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

          {/* Main Glow */}
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[180px]" />

          {/* Top Left Glow */}
          <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-violet-300/20 blur-[120px]" />

          {/* Bottom Right Glow */}
          <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-fuchsia-300/20 blur-[140px]" />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              🚀 Applications Open
            </div>

            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to Start Your Tech Journey?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-white/80 sm:text-sm">
              Applications are now open for our next cohort. Gain hands-on
              experience, work on real projects, receive expert mentorship,
              and build the skills employers are actively looking for.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <a
                href="/enrollment"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#6d28d9] shadow-[0_10px_40px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 hover:bg-white sm:w-auto"
              >
                Apply Now
              </a>

              <a
                href="https://wa.me/2349052639990?text=Hello%20Korva%20Tech%20Hub,%20I%20would%20like%20to%20speak%20with%20an%20advisor%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                Talk to an Advisor
              </a>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}