const stats = [
  {
    value: "92%",
    title: "Job Placement Rate",
    subtitle: "Top Global Tech Firms",
  },
  {
    value: "500+",
    title: "Expert Mentors",
    subtitle: "Active Professionals",
  },
  {
    value: "15k+",
    title: "Global Graduates",
    subtitle: "In 40+ Countries",
  },
]

export function Stats() {
  return (
    <section className="bg-[#0a0a0f] py-16 text-neutral-200 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-neutral-800 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex items-center justify-center gap-5 px-6 py-8 md:py-2"
            >
              <span className="text-6xl font-bold leading-none tracking-tight text-[#b794f6] lg:text-7xl">
                {stat.value}
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-bold text-white">
                  {stat.title}
                </span>
                <span className="mt-1 block text-base text-neutral-400">
                  {stat.subtitle}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
