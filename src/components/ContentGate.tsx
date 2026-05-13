import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { MOTION } from "@/lib/animations";

/**
 * Holds the app behind a brief dark splash on the very first visit, while CMS
 * content is fetched. Returning visitors hydrate from localStorage and skip
 * the splash entirely.
 */
const ContentGate = ({ children }: { children: ReactNode }) => {
  const { loading } = useSiteContent();

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: MOTION.duration.short, ease: MOTION.ease.exit }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Loading"
          />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MOTION.duration.entrance, ease: MOTION.ease.standard }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentGate;
