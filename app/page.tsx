import { Hero } from "@/components/hero"
import { Roadmap } from "@/components/roadmap"
import { CommunityCta } from "@/components/community-cta"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { FeaturedPrograms } from "@/components/featured-courses"
import WhyKorvaSection from "@/components/why-korva"


export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <SiteHeader />
      <Hero />
      <FeaturedPrograms />
      <Roadmap />
      <CommunityCta />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
