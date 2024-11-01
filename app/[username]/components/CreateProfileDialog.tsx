"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface CreateProfileDialogProps {
  children: React.ReactNode;
}

export const CreateProfileDialog: React.FC<CreateProfileDialogProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/user/signup');
  };

  return (
    <>
      {/* Trigger Button */}
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>

      {/* Create Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.5
              }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900">Create Profile</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full hover:bg-gray-100"
                  >
                    <XIcon className ="h-5 w-5" />
                  </Button>
                </div>

                <p className="text-lg text-gray-600 mb-8">
                  To create your profile, you&apos;ll need to sign up first. Click the button below to go to the signup page.
                </p>

                <div className="flex space-x-4 pt-6">
                  <Button
                    onClick={handleRedirect}
                    className="flex-1 h-14 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  >
                    Go to Signup
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-14 text-lg font-medium border-2"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};