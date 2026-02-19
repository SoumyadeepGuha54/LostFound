"use client";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Campus Lost & Found
            </h1>
          </div>
          <p className="text-gray-600">Reunite lost items with their owners</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
