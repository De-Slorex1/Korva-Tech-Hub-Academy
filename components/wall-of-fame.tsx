import { Star, Quote } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Korva Tech Hub completely transformed my perspective on what's possible. From Lagos, the mentorship I received helped me land a remote engineering role at a top company in just six months.",
    name: "Amara Okafor",
    role: "Frontend Engineer",
    avatar: "/images/avatar-1.png",
    initials: "AO",
  },
  {
    quote:
      "The community is unlike anything I've experienced. I learned more here than in a full degree, and the network opened doors I never imagined.",
    name: "Kwame Mensah",
    role: "Backend Developer",
    avatar: "/images/avatar-2.png",
    initials: "KM",
  },
  {
    quote:
      "Korva provided a safe and welcoming environment where I could learn, grow and connect with other ambitious builders.",
    name: "Zainab Yusuf",
    role: "Product Designer",
    avatar: "/images/avatar-3.png",
    initials: "ZY",
  },
]

export function WallOfFame() {
  return (
    <section className="relative overflow-hidden px-6 py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Badge */}

        <div className="flex justify-center">

          <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

            Community Stories

          </span>

        </div>

        {/* Heading */}

        <h2 className="mx-auto mt-6 max-w-4xl text-center text-4xl font-bold text-white md:text-5xl">

          Voices From The

          <span className="block bg-gradient-to-r from-violet-400 via-violet-200 to-violet-400 bg-clip-text text-transparent">

            Korva Community

          </span>

        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-white/70">

          Real stories from learners, professionals and innovators
          who are growing their careers through Korva Tech Hub.

        </p>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-violet-500/30
              "
            >
              {/* Glow */}

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

              </div>

              {/* Quote */}

              <Quote className="h-8 w-8 text-violet-400" />

              {/* Stars */}

              <div className="mt-5 flex gap-1">

                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-violet-400 text-violet-400"
                  />
                ))}

              </div>

              {/* Text */}

              <p className="mt-6 leading-relaxed text-white/70">
                "{item.quote}"
              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

                <Avatar className="h-12 w-12 border border-violet-500/30">

                  <AvatarImage src={item.avatar} />

                  <AvatarFallback>
                    {item.initials}
                  </AvatarFallback>

                </Avatar>

                <div>

                  <h4 className="font-semibold text-white">
                    {item.name}
                  </h4>

                  <p className="text-sm text-violet-300">
                    {item.role}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

         {/* BOTTOM CTA */}

        <div className="mt-20 text-center">

          <div className="inline-flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] px-10 py-8 backdrop-blur-sm">

            <h3 className="text-2xl font-semibold text-white">
              Ready to Begin Your Journey?
            </h3>

            <p className="mt-3 max-w-xl text-white/60">
              Join a growing ecosystem of learners, builders and innovators
              shaping the future of technology across Africa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
                {/* PRIMARY CTA */}
                <a
                  href="https://chat.whatsapp.com/JCKHLqVLkGcGwBUXV9GYOV"
                  className="
                    w-full sm:w-auto
                    relative overflow-hidden
                    rounded-2xl
                    bg-gradient-to-r from-violet-600 to-violet-500
                    px-8 py-4
                    text-center
                    font-semibold text-white

                    shadow-lg shadow-violet-500/20
                    transition-all duration-300

                    hover:shadow-violet-500/40
                    hover:brightness-110
                    active:scale-[0.98]

                    focus:outline-none focus:ring-2 focus:ring-violet-400/50
                  "
                >
                  <span className="relative z-10">Join Korva Community</span>

                  {/* subtle glow effect */}
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-white/10" />
                </a>

                {/* SECONDARY CTA */}
                <a
                  href="/enrollment"
                  className="
                    w-full sm:w-auto
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.03]
                    px-8 py-4
                    text-center
                    font-semibold text-white

                    backdrop-blur-md
                    transition-all duration-300

                    hover:bg-white/[0.08]
                    hover:border-white/20
                    active:scale-[0.98]

                    focus:outline-none focus:ring-2 focus:ring-white/20
                  "
                >
                  Enroll Now
                </a>

              </div>
          </div>

        </div>
      </div>
    </section>
  )
}