import { SiteHeader } from "@/components/site-header"
import { AboutHero } from "@/components/about-hero"
import { KorvaStory } from "@/components/korva-story"
import { CorePillars } from "@/components/core-pillars"
import { KorvaLeadership } from "@/components/architects-vision"
import { SiteFooter } from "@/components/site-footer"


export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent_70%)]"
      />
      <div className="relative z-10">
        <SiteHeader />
        <AboutHero />
        <KorvaStory />
        <CorePillars />
        <KorvaLeadership />
        <div className="h-16" />
        <SiteFooter />
      </div>
    </main>
  )
}
