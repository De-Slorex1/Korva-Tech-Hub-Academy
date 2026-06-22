import { Check } from "lucide-react"

function FeatureRow({ children, bold = false }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <li className="flex items-center gap-2.5">
      <Check className="h-4 w-4 shrink-0 text-[#34D399]" />
      <span className={`text-sm ${bold ? "font-semibold text-white" : "text-white/75"}`}>{children}</span>
    </li>
  )
}

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Card 1 - Standard */}
      <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-lg shadow-black/20">
        <span className="mb-6 w-fit rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/70">
          Standard
        </span>
        <h3 className="text-sm font-medium text-white/80">Installment Plan</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-[#8B5CF6]">$499</span>
          <span className="text-sm text-white/55">/month</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Pay comfortably over 4 months while you build your professional portfolio.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          <FeatureRow>Full Curriculum Access</FeatureRow>
          <FeatureRow>Weekly Mentorship</FeatureRow>
          <FeatureRow>Project Reviews</FeatureRow>
        </ul>
        <button
          type="button"
          className="mt-auto w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
          style={{ marginTop: "2.5rem" }}
        >
          Select Installments
        </button>
      </div>

      {/* Card 2 - Merit Scholarship (Featured) */}
      <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#34D399]/40 bg-[#34D399]/[0.04] p-7 shadow-2xl shadow-[#34D399]/10 ring-1 ring-[#34D399]/20">
        {/* BEST VALUE ribbon */}
        <div className="pointer-events-none absolute -right-12 top-5 w-44 rotate-45 bg-[#34D399] py-1 text-center text-[10px] font-bold tracking-wide text-[#04250f]">
          BEST VALUE
        </div>

        <span className="mb-6 w-fit rounded-full bg-[#34D399]/15 px-3 py-1 text-xs font-medium text-[#34D399]">
          Merit Scholarship
        </span>
        <h3 className="text-sm font-medium text-white/80">Founder&apos;s Grant</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-[#34D399]">$299</span>
          <span className="text-sm text-white/55">/month</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Apply for our merit-based scholarship. Limited to 15 students per cohort based on technical assessment.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          <FeatureRow>Everything in Standard</FeatureRow>
          <FeatureRow bold>1-on-1 Career Coaching</FeatureRow>
          <FeatureRow>Partner Network Referral</FeatureRow>
          <FeatureRow>Loom Video Feedback</FeatureRow>
        </ul>
        <button
          type="button"
          className="mt-auto w-full rounded-lg bg-[#34D399] px-4 py-3 text-sm font-semibold text-[#04250f] transition-colors hover:bg-[#2fc78d]"
          style={{ marginTop: "2.5rem" }}
        >
          Apply for Scholarship
        </button>
      </div>

      {/* Card 3 - Upfront Savings */}
      <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-lg shadow-black/20">
        <span className="mb-6 w-fit rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/70">
          Upfront Savings
        </span>
        <h3 className="text-sm font-medium text-white/80">Full Payment</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">$1,750</span>
          <span className="text-sm text-white/55">total</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Save 15% by paying the full tuition upfront. One-time payment, lifetime access to materials.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          <FeatureRow>Lifetime Course Access</FeatureRow>
          <FeatureRow>Alumni Community Status</FeatureRow>
          <FeatureRow>Certificates of Excellence</FeatureRow>
        </ul>
        <button
          type="button"
          className="mt-auto w-full rounded-lg bg-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c4ee0]"
          style={{ marginTop: "2.5rem" }}
        >
          Pay Full Tuition
        </button>
      </div>
    </div>
  )
}
