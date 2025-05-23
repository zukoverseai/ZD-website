import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CyberCardProps {
  icon: ReactNode
  title: string
  description: string
  color?: "cyan" | "green" | "purple"
}

export function CyberCard({ icon, title, description, color = "cyan" }: CyberCardProps) {
  const colorStyles = {
    cyan: {
      iconBg: "bg-[#3ecef7]/10",
      iconBorder: "border-[#3ecef7]/30",
      iconColor: "text-[#3ecef7]",
      shadow: "shadow-[0_0_15px_rgba(62,206,247,0.15)]",
      glow: "from-[#3ecef7]",
    },
    green: {
      iconBg: "bg-[#7deb7d]/10",
      iconBorder: "border-[#7deb7d]/30",
      iconColor: "text-[#7deb7d]",
      shadow: "shadow-[0_0_15px_rgba(125,235,125,0.15)]",
      glow: "from-[#7deb7d]",
    },
    purple: {
      iconBg: "bg-[#a78bfa]/10",
      iconBorder: "border-[#a78bfa]/30",
      iconColor: "text-[#a78bfa]",
      shadow: "shadow-[0_0_15px_rgba(167,139,250,0.15)]",
      glow: "from-[#a78bfa]",
    },
  }

  return (
    <Card className="group relative h-full overflow-hidden border-[#1a1a2e] bg-[#0f0f1a] transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 blur transition duration-300 group-hover:opacity-70 group-hover:via-[#3ecef7]"></div>

      <div className="relative h-full rounded-sm bg-[#0f0f1a] p-6">
        <div
          className={cn(
            "mb-4 flex h-14 w-14 items-center justify-center rounded-lg border",
            colorStyles[color].iconBg,
            colorStyles[color].iconBorder,
            colorStyles[color].shadow,
          )}
        >
          <div className={cn("h-6 w-6", colorStyles[color].iconColor)}>{icon}</div>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>

        <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] transition-all duration-500 group-hover:w-full"></div>
        </div>
      </div>
    </Card>
  )
}
