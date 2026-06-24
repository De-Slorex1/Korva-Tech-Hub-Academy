"use client"

import { useState, useEffect } from "react"
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setDone(true)
    setTimeout(() => router.push("/sign-in"), 3000)
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Password Updated!</h1>
        <p className="text-sm text-white/60">
          Your password has been reset. Redirecting to login...
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.15)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />

      <div className="relative">
        <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
        <p className="text-sm text-white/60 mb-6">Enter your new password below.</p>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border-white/10 bg-black/30 pl-10 pr-10 text-white"
              placeholder="New password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-11 border-white/10 bg-black/30 pl-10 text-white"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            disabled={loading}
            className="h-11 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 font-semibold text-black hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  )
}