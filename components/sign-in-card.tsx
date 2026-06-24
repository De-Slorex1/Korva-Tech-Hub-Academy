"use client"

import { useState } from "react"
import { AtSign, Lock, Eye, EyeOff, Fingerprint, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export function SignInCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [mode, setMode] = useState<"login" | "forgot" | "sent">("login")
  const [resetLoading, setResetLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", data.user.id)
      .single()

    if (profile?.role === "admin") {
      router.push("/admin")
    } else if (profile?.role === "instructor") {
      router.push("/instructor")
    } else {
      router.push("/dashboard")
    }

    setLoading(false)
  }

  async function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setResetLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setResetLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setMode("sent")
  }

  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.15)]">

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />

      {/* LOGIN MODE */}
      {mode === "login" && (
        <>
          <div className="relative text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-sm text-white/60">Continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="relative mt-8 flex flex-col gap-5">
            <Label className="text-white/70">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-white/10 bg-black/30 pl-10 text-white"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-white/70">Password</Label>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-white/10 bg-black/30 px-10 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="h-11 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 font-semibold text-black hover:opacity-90"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
            <Fingerprint className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-sm text-emerald-400">Secure Authentication Active</p>
              <p className="text-[10px] text-emerald-400/60">FULL TRUSTED SYSTEM</p>
            </div>
          </div>
        </>
      )}

      {/* FORGOT PASSWORD MODE */}
      {mode === "forgot" && (
        <div className="relative">
          <button
            onClick={() => setMode("login")}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to login
          </button>

          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-sm text-white/60 mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-white/10 bg-black/30 pl-10 text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              disabled={resetLoading}
              className="h-11 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 font-semibold text-black hover:opacity-90 disabled:opacity-50"
            >
              {resetLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      )}

      {/* EMAIL SENT MODE */}
      {mode === "sent" && (
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <Fingerprint className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-sm text-white/60 mb-6">
            We sent a password reset link to <span className="text-emerald-400">{email}</span>.
            Check your inbox and follow the link to reset your password.
          </p>
          <button
            onClick={() => setMode("login")}
            className="w-full h-11 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors text-sm"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  )
}