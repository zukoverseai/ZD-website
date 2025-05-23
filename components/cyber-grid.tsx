"use client"

import { useEffect, useRef } from "react"

export function CyberGrid() {
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
    const gridSize = 30
    const lineWidth = 0.5
    const lineColor = "rgba(62, 206, 247, 0.15)"

    // Animation properties
    let time = 0
    const speed = 0.001

    // Draw grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        const waveOffset = Math.sin(time + y * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(0, y + waveOffset)

        // Create wavy line
        for (let x = 0; x < canvas.width; x += 10) {
          const waveY = y + waveOffset + Math.sin(time + x * 0.01) * 2
          ctx.lineTo(x, waveY)
        }

        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const waveOffset = Math.cos(time + x * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(x + waveOffset, 0)

        // Create wavy line
        for (let y = 0; y < canvas.height; y += 10) {
          const waveX = x + waveOffset + Math.cos(time + y * 0.01) * 2
          ctx.lineTo(waveX, y)
        }

        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

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

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />
}
