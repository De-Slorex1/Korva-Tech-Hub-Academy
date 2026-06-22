import { ShieldCheck, CreditCard, Landmark, Wallet } from "lucide-react"

export function GuaranteeSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left card - Secure Enrollment */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-[#8B5CF6]" />
          <h3 className="text-base font-semibold text-white">Secure Enrollment</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Your payment is processed through industry-standard encryption protocols. We support all major credit cards,
          Paystack, and direct bank transfers across Pan-African regions.
        </p>
        <div className="mt-6 flex items-center gap-3 text-white/50">
          <CreditCard className="h-6 w-6" />
          <Landmark className="h-6 w-6" />
          <Wallet className="h-6 w-6" />
        </div>
      </div>

      {/* Right card - Media / Guarantee */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
        <img
          src="/analytics-dashboard.png"
          alt="Analytics dashboard preview showing an upward growth trend"
          className="h-full max-h-72 w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040A1A] via-transparent to-transparent" />
        <span className="absolute bottom-12 left-6 rounded-md bg-[#8B5CF6]/85 px-3 py-1 text-xs font-medium text-white">
          Academic Promise
        </span>
        <p className="absolute bottom-5 left-6 text-sm font-medium text-white/90">14-Day Money Back Guarantee</p>
      </div>
    </div>
  )
}
