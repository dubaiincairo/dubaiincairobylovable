import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageVariants, pageVariantsReduced, useMotionPref } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => {
  const { shouldReduce } = useMotionPref();
  const variants = shouldReduce ? pageVariantsReduced : pageVariants;

  return (
    <motion.div
      className={cn("min-h-screen bg-background", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
