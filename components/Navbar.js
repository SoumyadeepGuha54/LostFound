"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-black/5 px-6 py-4">
      <div className="max-w-10xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-black">Lost / Found</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={menuRef}>
            {pathname === "/" ? (
              <div className="flex items-center gap-2 rounded-full px-2 py-1 transition">
                <div className="w-9 h-9 rounded-full bg-gray-200 invisible" aria-hidden />
              </div>
            ) : (
              <button
                onClick={() => setOpen(prev => !prev)}
                aria-expanded={open}
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-black/5 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-black/70">
                  ME
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            {pathname !== "/" && open && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-black/10 rounded-lg shadow-md py-2 z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-black/5">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-black/5">Settings</button>
                <div className="border-t border-black/5 my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
