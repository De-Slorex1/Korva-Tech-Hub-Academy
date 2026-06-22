import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { CommunityGlobe } from "./community-globe"

const WHATSAPP_INVITE_URL = "https://chat.whatsapp.com/JCKHLqVLkGcGwBUXV9GYOV"

export function CommunityCta() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 text-neutral-200">

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Large Ambient Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/12 blur-[220px]" />

        {/* Top Left Blend */}
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[180px]" />

        {/* Bottom Right Blend */}
        <div className="absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-fuchsia-500/8 blur-[200px]" />

        {/* Globe Spotlight */}
        <div className="absolute right-[12%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-500/10 blur-[160px]" />

        {/* Soft Radial Overlay */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, rgba(5,8,22,0) 70%)",
          }}
        />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9333ea]/20 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#b794f6]">
              Community
            </span>
            <h2 className="mt-6 text-pretty text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Join Our Community
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">
              Learn together with thousands of ambitious developers. Get direct mentorship, build your network, and stay
              ahead with the latest tech opportunities, job openings, and exclusive resources.
            </p>
            <div className="mt-8">
              <a
                href={WHATSAPP_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#9333ea] px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-[#7e22ce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b794f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                Join Our WhatsApp Community
              </a>
            </div>
          </div>

          {/* Right: visual */}
          {/* Right: Animated Globe */}
                <div className="relative flex items-center justify-center">
          
                  <div className="absolute h-[420px] w-[420px] rounded-full border border-violet-500/10" />
          
                  <div className="absolute h-[320px] w-[320px] rounded-full border border-violet-500/20" />
          
                  <CommunityGlobe />
          
                </div>
        </div>
      </div>
    </section>
  )
}
