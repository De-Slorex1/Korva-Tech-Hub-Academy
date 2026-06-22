"use client"

import { useState } from "react"
import { AtSign, Lock, Eye, EyeOff, Fingerprint, KeyRound } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function SignInCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    // store session securely
    sessionStorage.setItem("korva-session", JSON.stringify(data.session))

    // ROLE ROUTING
    switch (data.role) {
      case "admin":
        window.location.href = "/admin"
        break
      case "instructor":
        window.location.href = "/instructor"
        break
      default:
        window.location.href = "/dashboard"
    }
  }
 

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.15)]">

      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" />

      <div className="relative text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="mt-2 text-sm text-white/60">
          Continue your learning journey
        </p>
      </div>

      <form onSubmit={handleLogin} className="relative mt-8 flex flex-col gap-5">

        {/* email */}
        <div className="space-y-2">
          <Label className="text-white/70">User ID</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input value={userId}
              onChange={(e) => setUserId(e.target.value)} className="h-11 border-white/10 bg-black/30 pl-10 text-white"  placeholder="KTH-2026-001" />
          </div>
        </div>

        {/* password */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-white/70">Password</Label>
            <a className="text-xs text-emerald-400">Forgot?</a>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
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

        {/* remember */}
        {/* <div className="flex items-center gap-2">
          <Checkbox className="border-white/20" />
          <span className="text-sm text-white/50">Remember device</span>
        </div> */}

        {/* button */}
        <button disabled={loading} className="h-11 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 font-semibold text-black hover:opacity-90">
          {loading ? "Authenticating..." : "Access Dashboard"}
        </button>
      </form>

      {/* security */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
        <Fingerprint className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="text-sm text-emerald-400">Secure Authentication Active</p>
          <p className="text-[10px] text-emerald-400/60">FULL TRUSTED SYSTEM</p>
        </div>
      </div>
    </div>
  )
}