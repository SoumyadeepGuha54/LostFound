"use client";

import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md m-6">
        <SignUpForm />
        <div className="text-center mt-8 text-sm text-black/60">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-black underline hover:text-black">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-black underline hover:text-black">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
