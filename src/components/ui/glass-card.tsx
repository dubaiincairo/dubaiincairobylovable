import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "default" | "strong";
}

const intensityClasses: Record<NonNullable<GlassCardProps["intensity"]>, string> = {
  subtle: "bg-card/60 backdrop-blur-sm",
  default: "bg-card/80 backdrop-blur-md",
  strong: "bg-card/95 backdrop-blur-xl",
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border shadow-lg",
        intensityClasses[intensity],
        className,
      )}
      {...props}
    />
  ),
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
