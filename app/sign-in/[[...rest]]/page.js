// /app/sign-in/[[...rest]]/page.js

'use client';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/40">
      <SignIn
        path="/sign-in"
        routing="path"
      />
    </div>
  );
}
