"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ArrowLeft, ArrowRight, User, Mail, Phone, Globe, GraduationCap, Loader2 } from "lucide-react"

const COURSE_ID = "97436a3b-3046-48df-8c3a-05c92bae66ff" // ← paste the Course ID from Supabase here after inserting

export default function TeenRegisterClient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    country: "Nigeria",
    studentName: "",
    studentAge: "",
    howHeard: "",
  })

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const isValid =
    form.parentName &&
    form.email &&
    form.phone &&
    form.studentName &&
    form.studentAge

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.parentName.split(" ")[0],
          lastName: form.parentName.split(" ").slice(1).join(" ") || ".",
          phone: form.phone,
          country: form.country,
          courseId: COURSE_ID,
          paymentPlan: "full",
          studentName: form.studentName,
          studentAge: form.studentAge,
        }),
      })

      const result = await res.json()

      if (result.authorization_url) {
        window.location.href = result.authorization_url
      } else {
        alert(result.error ?? "Something went wrong")
      }
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const now = new Date()
  const earlyBirdEnd = new Date("2026-08-10T23:59:59")
  const isEarlyBird = now < earlyBirdEnd
  const price = isEarlyBird ? "₦75,000" : "₦100,000"

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <SiteHeader />

      <div className="mx-auto max-w-xl px-4 py-16">
        <button
          onClick={() => router.push("/teen-program")}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Program
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Register Your Child</h1>
          <p className="text-white/50 text-sm">
            Korva Tech Holiday Program • August 3 – September 14, 2026
          </p>
          {isEarlyBird && (
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mt-3">
              <span className="text-yellow-400 text-sm font-medium">
                🎉 Early Bird Price: {price}
              </span>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-5">

          {/* Parent Info */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Parent / Guardian Information</p>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Parent / Guardian Full Name *"
                  value={form.parentName}
                  onChange={(e) => set("parentName", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="tel"
                  placeholder="WhatsApp / Phone Number *"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:border-violet-500 text-sm appearance-none"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Student Information</p>
            <div className="space-y-4">
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Student Full Name *"
                  value={form.studentName}
                  onChange={(e) => set("studentName", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
              </div>

              <select
                value={form.studentAge}
                onChange={(e) => set("studentAge", e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:border-violet-500 text-sm appearance-none"
              >
                <option value="">Student Age *</option>
                {[11, 12, 13, 14, 15, 16, 17].map((age) => (
                  <option key={age} value={age}>{age} years old</option>
                ))}
              </select>

              <select
                value={form.howHeard}
                onChange={(e) => set("howHeard", e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:border-violet-500 text-sm appearance-none"
              >
                <option value="">How did you hear about us? (optional)</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="TikTok">TikTok</option>
                <option value="Friend / Family">Friend / Family</option>
                <option value="Google">Google</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-white">Korva Tech Holiday Program</p>
                <p className="text-xs text-white/40">August 3 – September 14, 2026 • Online</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-violet-300">{price}</p>
                <p className="text-xs text-white/40">Full Payment</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold py-4 rounded-2xl text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirecting to Payment...
              </>
            ) : (
              <>
                Proceed to Payment — {price}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/30">
            Secure payment via Paystack. Your child's spot is confirmed after payment.
          </p>
        </div>
      </div>
    </div>
  )
}