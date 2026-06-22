"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
})

export function CommunityGlobe() {
  const globeRef = useRef<any>(null)

    useEffect(() => {
    const timeout = setTimeout(() => {

        let lng = 0

        const interval = setInterval(() => {
        lng += 1

        globeRef.current?.pointOfView(
            {
            lat: 15,
            lng,
            altitude: 2.2,
            },
            0
        )
        }, 30)

        return () => clearInterval(interval)

    }, 1000)

    return () => clearTimeout(timeout)
    }, [])

  return (
    <div className="relative h-[320px] w-[320px]">

        {/* Purple Glow */}
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-3xl" />

        {/* OUTER ORBIT */}
        <div className="absolute inset-[-20px] rounded-full border border-violet-500/10 animate-spin [animation-duration:30s]" />

        {/* INNER ORBIT */}
        <div className="absolute inset-[15px] rounded-full border border-cyan-500/10 animate-spin [animation-duration:20s] [animation-direction:reverse]" />

        <Globe
            ref={globeRef}
            width={320}
            height={320}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        />

        </div>
  )
}