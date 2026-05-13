import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
  /**
   * Optional Framer Motion variants. When provided, the card is driven by a
   * parent stagger container instead of its own entrance animation.
   */
  variants?: Variants;
}

const FloatCard = ({ icon: Icon, value, label, className, variants }: FloatCardProps) => (
  <motion.div
    className={cn(
      "absolute flex items-center gap-2.5 bg-card/80 backdrop-blur-md border border-border rounded-xl px-3.5 py-2.5 shadow-lg",
      className,
    )}
    variants={variants}
  >
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-3.5 h-3.5 text-primary" />
    </div>
    <div>
      <div className="text-sm font-bold text-foreground leading-none">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  </motion.div>
);

export { FloatCard };
