"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  glitchClassName?: string
}

export function GlitchText({ text, className, glitchClassName }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <h1 className={cn("relative", className)}>
      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
        {text}
      </span>

      {isGlitching && (
        <>
          <span
            className={cn(
              "absolute left-0 top-0 z-0 translate-x-[2px] translate-y-[-2px] text-transparent bg-clip-text bg-gradient-to-r",
              glitchClassName || "from-red-500 to-purple-500",
            )}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className={cn(
              "absolute left-0 top-0 z-0 translate-x-[-2px] translate-y-[2px] text-transparent bg-clip-text bg-gradient-to-r",
              glitchClassName || "from-blue-500 to-teal-500",
            )}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </h1>
  )
}
