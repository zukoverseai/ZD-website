// components/ThemeRegistry.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()
    useEffect(() => {
        if (theme) {
            document.documentElement.dataset.theme = theme
            document.documentElement.style.colorScheme = theme
        }
    }, [theme])
    return <>{children}</>
}
