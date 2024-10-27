import React, { Suspense } from 'react';
import SignUpConfirmation from './components/SignUp';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpConfirmation />
    </Suspense>
  );
}