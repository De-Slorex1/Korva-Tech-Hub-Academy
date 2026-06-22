export function GridBackground() {
  return (
    <>
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* RADIAL GLOWS */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_55%)]
        "
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#050816_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050816_100%)]" />

      {/* CENTER GRID LINES */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />

      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0">

        <div className="absolute left-[15%] top-[25%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[20%] top-[35%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[35%] bottom-[20%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[40%] bottom-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[8%] top-[60%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

        <div className="absolute right-[10%] top-[70%] h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />

        <div className="absolute left-[80%] top-[15%] h-1 w-1 rounded-full bg-violet-400 animate-pulse" />

      </div>

      {/* GLOW ORBS */}
      <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/20 blur-[150px]" />

      <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[140px]" />

      {/* EXTRA CROSS LINES */}
      <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div
        className="
          absolute
          left-1/2
          top-0
          h-full
          w-px
          bg-gradient-to-b
          from-transparent
          via-violet-500/30
          to-transparent
        "
      />

      {/* CENTER GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/10
          blur-[180px]
        "
      />
    </>
  )
}