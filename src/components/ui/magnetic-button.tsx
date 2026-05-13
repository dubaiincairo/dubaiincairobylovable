import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}

const MagneticButton = ({
  children,
  className,
  strength = 0.25,
  as = "div",
}: MagneticButtonProps) => {
  const { shouldReduce } = useMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref as never}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </MotionTag>
  );
};

export { MagneticButton };
