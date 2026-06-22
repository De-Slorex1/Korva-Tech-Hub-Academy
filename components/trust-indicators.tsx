import { Lock, Zap, MessageCircle } from "lucide-react"

const items = [
  {
    icon: Lock,
    title: "Secure Application",
    description: "Your data is encrypted with enterprise-grade standards.",
  },
  {
    icon: Zap,
    title: "Fast Track",
    description: "Complete this form in under 5 minutes.",
  },
  {
    icon: MessageCircle,
    title: "Live Support",
    description: "Need help? Our mentors are available 24/7 via chat.",
  },
]

export function TrustIndicators() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8B5CF6]" />
            <div>
              <p className="text-sm font-medium text-white/90">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/50">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
