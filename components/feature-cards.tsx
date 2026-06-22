import { ArrowUpRight, MessageCircle, MessagesSquare } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "Chat with Us",
    description: "Connect with our support team and student ambassadors instantly.",
  },
  {
    icon: MessagesSquare,
    title: "Join our WhatsApp",
    description: "Daily tech news, peer learning, and networking at your fingertips.",
  },
]

export function FeatureCards() {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-6 pb-20 md:grid-cols-2">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent"
        >
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <feature.icon className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          </div>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
      ))}
    </section>
  )
}
