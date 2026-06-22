"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Zap } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiry: "",
    message: "",
    consent: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.message
    ) {
      toast.error("Please complete all required fields.")
      return
    }

    if (!formData.consent) {
      toast.error("Please accept the consent policy.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error()
      }

      toast.success(
        "Message sent successfully. We'll contact you shortly."
      )

      setFormData({
        fullName: "",
        email: "",
        inquiry: "",
        message: "",
        consent: false,
      })
    } catch {
      toast.error(
        "Unable to send message. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

      <div className="mb-8">

        <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          Contact Korva Tech Hub
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Start Your Tech Journey
        </h2>

        <p className="mt-3 text-white/60">
          Tell us about your goals and our team
          will guide you toward the right
          learning pathway.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <Label>Full Name</Label>

          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Fullname"
            className="mt-2 bg-white/[0.08] rounded-lg border outline-violet-500/30 border-white/[0.08] transition-all duration-300  hover:border-violet-500/30 hover:bg-white/[0.04]"
          />
        </div>

        <div>
          <Label>Email Address</Label>

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-2 bg-white/[0.08] rounded-lg border outline-violet-500/30 border-white/[0.08] transition-all duration-300  hover:border-violet-500/30 hover:bg-white/[0.04]"
          />
        </div>

        <div>
          <Label>Program Interest</Label>

          <Input
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            placeholder="Frontend Engineering"
            className="mt-2 bg-white/[0.08] rounded-lg border outline-violet-500/30 border-white/[0.08] transition-all duration-300  hover:border-violet-500/30 hover:bg-white/[0.04]"
          />
        </div>

        <div>
          <Label>Message</Label>

          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your goals..."
            className="mt-2 bg-white/[0.08] rounded-lg border outline-violet-500/30 border-white/[0.08] transition-all duration-300  hover:border-violet-500/30 hover:bg-white/[0.04]"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">

          <Checkbox
            checked={formData.consent}
            onCheckedChange={(value) =>
              setFormData({
                ...formData,
                consent: Boolean(value),
              })
            }
          />

          <p className="text-sm text-white/60">
            I agree to be contacted by
            Korva Tech Hub regarding
            programs and opportunities.
          </p>

        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Submit Inquiry
              <Zap className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}