"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Code2,
  Database,
  Layers3,
  Cpu,
  Cloud,
} from "lucide-react"

const nodes = [
  {
    icon: Code2,
    label: "Frontend",
    angle: 0,
    color: "text-violet-400",
  },
  {
    icon: Layers3,
    label: "Backend",
    angle: 60,
    color: "text-blue-400",
  },
  {
    icon: Database,
    label: "Data",
    angle: 120,
    color: "text-emerald-400",
  },
  {
    icon: Brain,
    label: "AI",
    angle: 180,
    color: "text-pink-400",
  },
  {
    icon: Cpu,
    label: "Engineering",
    angle: 240,
    color: "text-cyan-400",
  },
  {
    icon: Cloud,
    label: "Cloud",
    angle: 300,
    color: "text-orange-400",
  },
  {
    icon: Cloud,
    label: "UI/UX Design",
    angle: 360,
    color: "text-orange-400",
  },
]

const RADIUS = 200

export function HeroNetwork() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/20
          blur-[140px]
        "
      />

      {/* Outer Ring */}

      {/* Inner Ring */}

      {/* Network System */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[520px] w-[520px]"
      >
        {/* Connection Lines */}
        <svg  className="absolute inset-0 h-full w-full"
        viewBox="0 0 520 520">
          {nodes.map((node, index) => {
            const angle =
              (node.angle * Math.PI) / 180

            const CENTER = 260

            const x = Number(
            (CENTER + Math.cos(angle) * RADIUS).toFixed(2)
            )

            const y = Number(
            (CENTER + Math.sin(angle) * RADIUS).toFixed(2)
            )
            return (
              <line
                key={index}
                x1="260"
                y1="260"
                x2={x}
                y2={y}
                stroke="rgba(139,92,246,.18)"
                strokeWidth="1"
              />
            )
          })}
        </svg>
        {/* Orbiting Cards */}
        {nodes.map((node) => {
          const Icon = node.icon

          return (
            <motion.div
              key={node.label}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `
                  rotate(${node.angle}deg)
                  translate(${RADIUS}px)
                `,
              }}
              transition={{
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                flex
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-5 w-5 ${node.color}`}
                  />

                  <span className="font-medium text-white">
                    {node.label}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Center Core */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          z-20
          flex
          h-44
          w-44
          items-center
          justify-center
          rounded-full
          border
          border-violet-500/20
          bg-white/[0.04]
          backdrop-blur-xl
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0
            rounded-full
            bg-violet-500/20
            blur-3xl
          "
        />

        <div className="text-center">
          <h3 className="text-3xl font-black text-white">
            KORVA
          </h3>

          <p className="mt-2 text-neutral-400">
            Tech Hub
          </p>
        </div>
      </motion.div>
      <motion.div
        animate={{
            rotate: 360,
        }}
        transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
        }}
        className="
            absolute
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-violet-500/10
        "
        />
        <motion.div
            animate={{
                rotate: -360,
            }}
            transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear",
            }}
            className="
                absolute
                h-[320px]
                w-[320px]
                rounded-full
                border
                border-white/5
            "
            />
    </div>
  )
}