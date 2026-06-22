import { SiteHeader } from "@/components/site-header"
import { CourseCatalog } from "@/components/course-catalog"
import { GridBackground } from "@/components/grid-background"
import { SiteFooter } from "@/components/site-footer"

export default function CoursesPage() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10 text-white">
        <SiteHeader />
        <CourseCatalog />
        <SiteFooter />
      </div>
    </main>
  )
}
