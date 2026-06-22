import { SiteHeader } from "@/components/site-header"
import { EnrollmentWizard } from "@/components/enrollment-wizard"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#8B5CF6]/15 blur-[140px]"
      />

      <div className="relative z-10">
        <SiteHeader />

        <div className="mx-auto max-w-3xl px-6 py-14">
          <EnrollmentWizard />
        </div>
      </div>
    </main>
  )
}