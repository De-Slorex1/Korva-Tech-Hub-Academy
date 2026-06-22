import Image from "next/image"

const team = [
  {
    name: "Jacob Samson Aina",
    role: "Founder & CEO",
    image: "/image.jpg",
    bio: "Passionate about creating practical and accessible tech education opportunities for aspiring professionals.",
  },
  {
    name: "Adebayo Mojisola",
    role: "CFO/Social Media Manager",
    image: "/moji.jpeg",
    bio: "Guiding learners through real-world software engineering and modern development practices.",
  },
  
]

export function KorvaLeadership() {
  return (
    <section className="relative overflow-hidden px-6 py-24">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl">

        <div className="text-center">

          <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            Our Team
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            The People Building Korva
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-white/60">
            Meet the educators, builders and innovators dedicated to helping
            learners gain real-world skills, practical experience and career
            opportunities in technology.
          </p>

        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8">

          {team.map((member) => (
            <div key={member.name} className="
              w-full
              max-w-sm
              group
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-violet-500/30
            "
          >

              <div className="relative aspect-[4/5] overflow-hidden">

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

              </div>

              <div className="p-6">

                <h3 className="text-xl font-semibold text-white">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-violet-300">
                  {member.role}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}