import { Mail, MapPin, Phone, MapPinned, MessageCircleMore} from "lucide-react"


const cards = [
  {
    icon: Mail,
    title: "Support Team",
    detail: "support@korvatechhub.com",
    link: "mailto:support@korvatechhub.com",
  },
  {
    icon: MapPin,
    title: "Korva Tech Hub",
    detail: "Ibadan, Nigeria • Akobo - Ojurin",
    link: "https://maps.google.com/?q=Akobo,Ibadan,Nigeria",
  },
  {
    icon: MessageCircleMore,
    title: "Chat Us",
    detail: "+234 905 263 9990",
    link: "https://wa.me/2349052639990",
  },
  {
    icon: Phone,
    title: "Direct Line",
    detail: "+234 (905) 263-9990",
    link: "tel:+2349052639990",
  },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col">
      <span className="inline-flex w-fit items-center rounded-md bg-[#34D399]/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#34D399]">
        Direct Connection
      </span>

      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
        Bridge the gap between <span className="text-[#8B5CF6]">Vision</span> and{" "}
        <span className="text-[#34D399]">Reality.</span>
      </h1>

      <p className="mt-5 max-w-md leading-relaxed text-white/65">
        Our team of elite engineering mentors and curriculum designers is standing by to help you accelerate your
        technical journey.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.link}
            target={
              card.link.startsWith("http")
                ? "_blank"
                : undefined
            }
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.02]
              p-4
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-violet-500/30
              hover:bg-white/[0.04]
            "
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] transition-transform duration-300 group-hover:scale-110">
              <card.icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                {card.title}
              </p>

              <p className="text-sm text-white/60">
                {card.detail}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="relative mt-6 overflow-hidden rounded-xl border border-white/[0.08]">

      <iframe
        src="https://maps.google.com/maps?q=Ibadan,%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="h-64 w-full"
        loading="lazy"
        allowFullScreen
      />

      <div className="absolute top-4 left-4 rounded-xl border border-white/10 bg-[#050816]/80 px-4 py-3 backdrop-blur-md">
        <p className="text-xs text-violet-300">
          Korva Tech Hub
        </p>
        <p className="mt-1 text-sm text-white">
          Ibadan, Oyo State, Nigeria
        </p>
      </div>
      
      <a
        href="https://maps.google.com/?q=Ibadan,Nigeria"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-[#8B5CF6]/90 px-3 py-2 font-medium text-white backdrop-blur transition-all hover:bg-[#7C3AED]"
      >
        <MapPinned className="h-4 w-4" />
        Open in Google Maps
      </a>

    </div>
    </div>
  )
}
