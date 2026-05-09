import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

const FloatCard = ({ icon: Icon, value, label, delay = 0, className }: FloatCardProps) => (
  <motion.div
    className={cn(
      "absolute flex items-center gap-2.5 bg-card/80 backdrop-blur-md border border-border rounded-xl px-3.5 py-2.5 shadow-lg",
      className,
    )}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: "easeOut" }}
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
