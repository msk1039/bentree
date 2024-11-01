// components/ui/AnimatedLayout.tsx
'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Simplified AnimatedLayout that only handles the animation, not the layout
export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSection({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div 
      {...fadeInUp}
      transition={{ delay, ...fadeInUp.transition }}
    >
      {children}
    </motion.div>
  );
}