import React, { Suspense } from 'react';
import SignUpFlow from '@/app/user/signup/components/SignUpForm';

export default function SignUpPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
      }
    >
      <SignUpFlow />
    </Suspense>
  );
}