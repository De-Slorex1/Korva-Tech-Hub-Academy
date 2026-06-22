import { FeatureCards } from "@/components/feature-cards"
import { Excellence } from "@/components/excellence"
import { Growth } from "@/components/growth"
import { WallOfFame } from "@/components/wall-of-fame"
import { Hero } from "@/components/hero-com"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FinalCta } from "@/components/final-cta"
import { GridBackground } from "@/components/grid-background"

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        <GridBackground />
   
        <div className="relative z-10">
            <SiteHeader />

            <main>
                <Hero />
                <Excellence />
                <Growth />
                <WallOfFame />
            </main>

            <SiteFooter />
        </div>
    </div>
  )
}
