"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />

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
