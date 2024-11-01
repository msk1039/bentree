// components/ui/LoadingSpinner.tsx
'use client';

import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <motion.div
    className="flex justify-center items-center h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

export default LoadingSpinner;