"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Globe, ArrowRight, AlertCircle } from "lucide-react"

import { Enrollment } from "@/types/enrollements"

interface ProfileStepProps {
  data: Partial<Enrollment>
  setData: React.Dispatch<
    React.SetStateAction<Partial<Enrollment>>
  >
  next: () => void
}

export function ProfileStep({
  data,
  setData,
  next,
}: ProfileStepProps) {
  const isValid = useMemo(() => {
    return (
      data.firstName?.trim() &&
      data.lastName?.trim() &&
      data.email?.trim() &&
      data.phone?.trim() &&
      data.country?.trim()
    )
  }, [data])

  const handleContinue = () => {
    if (!isValid) return

    next()
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="
      relative
      space-y-10
      "
    >
      <div className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        h-72
        w-72
        -translate-x-1/2
        rounded-full
        bg-[#8B5CF6]/20
        blur-[120px]
        "/>
      {/* Header */}

      <div className="text-center relative z-10">
        <div className="
          mb-5
          inline-flex
          items-center
          rounded-full
          border
          border-purple-400/20
          bg-purple-400/10
          px-5
          py-2
          text-xs
          font-semibold
          tracking-widest
          text-purple-300
          ">
          STEP 01 • PROFILE
          </div>

        <h2 className="
          text-4xl
          font-bold
          tracking-tight
          text-white
        ">
          Personal Information
        </h2>

        <p className="
          mt-3
          mx-auto
          max-w-md
          text-sm
          leading-6
          text-white/60
        ">
          Create your Korva student profile and start your application journey.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Main Form */}

        <motion.div
          whileHover={{
            scale: 1.005,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            rounded-[28px]
            border
            border-white/10
            bg-gradient-to-br
            from-white/[0.08]
            to-white/[0.02]
            p-8
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            "
        >
          {/* Name */}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First Name">
              <InputWithIcon
                icon={User}
                placeholder="John"
                value={data.firstName || ""}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }

              />
            </Field>

            <Field label="Last Name">
              <InputWithIcon
                icon={User}
                placeholder="Doe"
                value={data.lastName || ""}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </Field>
          </div>

          {/* Email */}

          <div className="mt-5">
            <Field label="Email Address">
              <InputWithIcon
                icon={Mail}
                type="email"
                placeholder="john@example.com"
                value={data.email || ""}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Field>
          </div>

          {/* Phone + Country */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Phone Number">
              <InputWithIcon
                icon={Phone}
                placeholder="+234 800 000 0000"
                value={data.phone || ""}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </Field>

            <Field label="Country">
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                <select
                  value={data.country || ""}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                 className="
                  h-14
                  w-full
                  appearance-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  focus:border-purple-400
                  focus:ring-4
                  focus:ring-purple-500/10
                  "
                >
                  <option value="">Select Country</option>

                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                </select>
              </div>
            </Field>
          </div>

          {/* Validation Message */}

          {!isValid && (
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">
              <AlertCircle className="h-4 w-4" />
              Complete all required fields to continue.
            </div>
          )}

          {/* Actions */}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!isValid}
              className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                isValid
                  ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
            >
              Continue

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Live Summary */}

        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.15,
          }}
         className="
          h-fit
          rounded-[28px]
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.08]
          to-white/[0.02]
          p-7
          shadow-xl
          backdrop-blur-xl
          "
        >
          <h3 className="mb-4 text-sm font-semibold text-white">
            Enrollment Summary
          </h3>

          <div className="space-y-4 text-sm">
            <SummaryItem
              label="Student"
              value={
                data.firstName || data.lastName
                  ? `${data.firstName ?? ""} ${data.lastName ?? ""}`
                  : "Not provided"
              }
            />

            <SummaryItem
              label="Email"
              value={data.email || "Not provided"}
            />

            <SummaryItem
              label="Program"
              value="Not selected"
            />

            <SummaryItem
              label="Payment Plan"
              value="Not selected"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/55">
        {label}
      </label>

      {children}
    </div>
  )
}

function SummaryItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40">
        {label}
      </p>

      <p className="mt-1 text-white/90">
        {value}
      </p>
    </div>
  )
}

function InputWithIcon({
  icon: Icon,
  className,
  ...props
}: {
  icon: React.ComponentType<{
    className?: string
  }>
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

      <input
        {...props}
        className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/20"
      />
    </div>
  )
}