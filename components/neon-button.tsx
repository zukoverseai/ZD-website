import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/components/ui/button";

interface NeonButtonProps extends ButtonProps {
  color?: "cyan" | "green" | "purple";
}

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    { className, color = "cyan", variant = "default", children, ...props },
    ref
  ) => {
    const colorStyles = {
      cyan: {
        default:
          "bg-[#3ecef7] text-black hover:bg-[#3ecef7]/90 shadow-[0_0_15px_rgba(62,206,247,0.5)]",
        outline:
          "border-[#3ecef7] text-[#3ecef7] hover:bg-[#3ecef7] hover:text-black shadow-[0_0_10px_rgba(62,206,247,0.3)]",
      },
      green: {
        default:
          "bg-[#7deb7d] text-black hover:bg-[#7deb7d]/90 shadow-[0_0_15px_rgba(125,235,125,0.5)]",
        outline:
          "border-[#7deb7d] text-[#7deb7d] hover:bg-[#7deb7d] hover:text-black shadow-[0_0_10px_rgba(125,235,125,0.3)]",
      },
      purple: {
        default:
          "bg-[#a78bfa] text-black hover:bg-[#a78bfa]/90 shadow-[0_0_15px_rgba(167,139,250,0.5)]",
        outline:
          "border-[#a78bfa] text-[#a78bfa] hover:bg-[#a78bfa] hover:text-black shadow-[0_0_10px_rgba(167,139,250,0.3)]",
      },
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          variant === "outline"
            ? colorStyles[color].outline
            : colorStyles[color].default,
          className
        )}
        variant={variant}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-full w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
        </span>
      </Button>
    );
  }
);

NeonButton.displayName = "NeonButton";
