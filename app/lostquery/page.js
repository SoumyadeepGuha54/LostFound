"use client";

import { useState } from "react";
// location is now a free-text input instead of a Select

export default function Upload() {
  const [description, setDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Post a <span className="text-red-500">Lost</span> Item
          </h1>
          <p className="text-sm text-black/50 mt-2">
            Report a lost item to find it.
          </p>
        </div>

        {/* Card */}
        <div className="border border-black/10 rounded-2xl p-8 space-y-8 bg-white">
          {/* Item Name + Location side-by-side */}
          <div className="flex gap-4">
            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g., Black Wallet"
                className="w-full border border-black/20 rounded-xl px-4 py-3 mt-2.5 text-sm focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                name="itemName"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Library"
                className="w-full border border-black/20 rounded-xl px-4 py-3 mt-2.5 text-sm focus:outline-none focus:border-black transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">
                Additional Description
              </label>
              <span className="text-xs text-black/40">
                {description.length}/350
              </span>
            </div>

            <textarea
              maxLength={350}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details like color, brand, unique marks, specific location..."
              className="w-full h-32 border border-black/20 rounded-xl p-4 text-sm focus:outline-none focus:border-black transition-all resize-none"
            />
          </div>

          {/* Buttons / Location Select */}
          <div className="pt-2">
            <button className="w-full py-3 text-sm rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-300">
              Post Item
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
