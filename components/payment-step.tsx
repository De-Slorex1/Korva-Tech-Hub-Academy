"use client"

import { useMemo } from "react"
import { CheckCircle2, Lock } from "lucide-react"
import { Enrollment } from "@/types/enrollements"
import courses from "@/data/courses" // 👈 IMPORTANT: adjust path if needed

// helpers
const formatNaira = (value: number) =>
  "₦" + value.toLocaleString()

export function PaymentStep({
  data,
  setData,
  next,
  back,
}: {
  data: Partial<Enrollment>
  setData: React.Dispatch<React.SetStateAction<Partial<Enrollment>>>
  next: () => void
  back: () => void
}) {
  // ✅ FIND COURSE PROPERLY (THIS FIXES YOUR ₦0 ISSUE)
  const course = useMemo(() => {
    return courses.find((c) => c.code === data.programId)
  }, [data.programId])

  // ⚡ SAFE PRICES
  const fullPrice = Number(
    course?.price?.fullPayment?.discounted?.replace(/[₦,]/g, "") ||
    course?.price?.fullPayment?.original?.replace(/[₦,]/g, "") ||
    0
  )

  const installmentPrice = Number(
    course?.price?.installment?.discounted?.replace(/[₦,]/g, "") ||
    course?.price?.installment?.original?.replace(/[₦,]/g, "") ||
    0
  )

  const deposit25 = Math.round(fullPrice * 0.25)
  const remaining = fullPrice - deposit25

  const plans = [
    {
      id: "full",
      title: "Full Payment",
      amount: formatNaira(fullPrice),
      description: "Pay once and secure your seat immediately.",
      badge: "Best Value",
      disabled: false,
    },

    {
      id: "installment",
      title: "Installment Plan",
      amount: `${formatNaira(deposit25)} upfront (25%)`,
      description: `Pay ₦${deposit25.toLocaleString()} now and spread ₦${remaining.toLocaleString()} 2 times.`,
      badge: "Flexible",
      disabled: false,
    },

    {
      id: "scholarship",
      title: "100% Scholarship",
      amount: "Application Based",
      description: "Scholarship applications are currently unavailable.",
      badge: "Coming Soon",
      disabled: true,
    },
  ]

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Payment Plan
        </h2>

        <p className="mt-2 text-white/60">
          Choose how you'd like to pay for{" "}
          <span className="text-violet-300">
            {course?.title || "your course"}
          </span>
        </p>
      </div>

      {/* PLANS */}
      <div className="space-y-4">
        {plans.map((plan) => {
          const selected = data.paymentPlan === plan.id

          return (
            <button
              key={plan.id}
              type="button"
              disabled={plan.disabled}
              onClick={() => {
                if (plan.disabled) return

                setData((prev) => ({
                  ...prev,
                  paymentPlan: plan.id as any,
                }))
              }}
              className={`group w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                plan.disabled
                  ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-60"
                  : selected
                  ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20"
                  : "border-white/10 hover:border-white/30 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-white">
                      {plan.title}
                    </h3>

                    <span className="rounded-full px-2 py-1 text-xs border border-violet-500/30 bg-violet-500/10 text-violet-300">
                      {plan.badge}
                    </span>
                  </div>

                  <h4 className="mt-3 text-3xl font-bold text-violet-300">
                    {plan.amount}
                  </h4>

                  <p className="mt-2 text-sm text-white/60">
                    {plan.description}
                  </p>
                </div>

                <div>
                  {plan.disabled ? (
                    <Lock className="h-6 w-6 text-white/40" />
                  ) : selected ? (
                    <CheckCircle2 className="h-6 w-6 text-violet-400" />
                  ) : null}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* SUMMARY */}
      {data.paymentPlan && (
        <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm text-violet-300">Selected Plan</p>

          <h3 className="mt-1 text-xl font-semibold text-white">
            {plans.find((p) => p.id === data.paymentPlan)?.title}
          </h3>

          <p className="mt-2 text-2xl font-bold text-violet-300">
            {plans.find((p) => p.id === data.paymentPlan)?.amount}
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={back}
          className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 hover:bg-white/5"
        >
          Back
        </button>

        <button
          disabled={!data.paymentPlan || !course}
          onClick={next}
          className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-500 disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  )
}