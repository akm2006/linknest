// /app/sign-up/[[...rest]]/page.js

'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <SignUp
        path="/sign-up"
        routing="path"
      />
    </div>
  );
}
