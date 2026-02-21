"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="flex flex-col items-center justify-center px-4"
        style={{ minHeight: "calc(100vh - 73px)" }}
      >
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome to Lost / Found
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Join our community to help reunite lost items with their owners.
          </p>

          <div className="space-y-4">
            <a
              href="login"
              className="inline-flex w-full items-center justify-center bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Log In
            </a>

            <a
              href="signup"
              className="inline-flex w-full items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition duration-200"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
