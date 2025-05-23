"use client"

import { useEffect, useRef } from "react"

export function HolographicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Grid properties
    const gridSize = 40
    const lineWidth = 0.5
    const lineColor = "rgba(62, 206, 247, 0.2)"
    const highlightColor = "rgba(125, 235, 125, 0.4)"

    // Animation properties
    let time = 0
    const speed = 0.002

    // Draw grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate perspective vanishing point
      const vpX = canvas.width / 2
      const vpY = canvas.height / 2

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const distanceFromCenter = Math.abs(y - vpY)
        const opacity = Math.max(0.05, 1 - distanceFromCenter / (canvas.height / 2))

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = opacity
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const distanceFromCenter = Math.abs(x - vpX)
        const opacity = Math.max(0.05, 1 - distanceFromCenter / (canvas.width / 2))

        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = opacity
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw moving highlight
      const highlightX = vpX + Math.cos(time) * (canvas.width / 3)
      const highlightY = vpY + Math.sin(time * 0.7) * (canvas.height / 3)

      ctx.beginPath()
      const gradient = ctx.createRadialGradient(highlightX, highlightY, 0, highlightX, highlightY, canvas.width / 4)
      gradient.addColorStop(0, highlightColor)
      gradient.addColorStop(1, "rgba(125, 235, 125, 0)")

      ctx.fillStyle = gradient
      ctx.globalAlpha = 0.3
      ctx.arc(highlightX, highlightY, canvas.width / 4, 0, Math.PI * 2)
      ctx.fill()

      // Reset global alpha
      ctx.globalAlpha = 1

      // Update time
      time += speed

      // Request next frame
      requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" aria-hidden="true" />
}
