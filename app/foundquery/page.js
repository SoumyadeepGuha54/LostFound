"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Cleanup image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large. Maximum size is 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Cleanup old preview URL
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToImageKit = async () => {
    if (!imageFile) return null;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");

      return data.url;
    } catch (error) {
      alert(`Failed to upload image: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !location) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      // Upload image if present
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadToImageKit();
        // If image upload fails, ask user if they want to continue without image
        if (!imageUrl) {
          const continueWithout = window.confirm(
            "Image upload failed. Do you want to post without an image?",
          );
          if (!continueWithout) {
            setSubmitting(false);
            return;
          }
        }
      }

      // Submit to API
      const res = await fetch("/api/items/found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName,
          location,
          description,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Found item posted successfully!");
        router.push("/dashboard");
      } else {
        alert(data.error || "Failed to post item");
      }
    } catch (error) {
      console.error("Error submitting found item:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        {/* Page Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Post a <span className="text-green-500">Found</span> Item
          </h1>
          <p className="text-sm text-black/50 mt-2">
            Help reconnect items with their owners.
          </p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit}>
          <div className="border border-black/10 rounded-2xl p-8 space-y-8 bg-white">
            {/* Upload Area */}
            <label className="group flex flex-col items-center justify-center border border-dashed border-black/20 rounded-2xl h-64 cursor-pointer hover:border-black transition-all duration-300">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (imagePreview?.startsWith("blob:")) {
                        URL.revokeObjectURL(imagePreview);
                      }
                      setImageFile(null);
                      setImagePreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 z-10"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-black/30 rounded-lg text-xl group-hover:bg-black group-hover:text-white transition-all duration-300">
                    +
                  </div>
                  <p className="text-sm text-black/60">
                    Upload an image of the item
                  </p>
                  <p className="text-xs text-black/40">PNG, JPG or JPEG</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
              />
            </label>

            {/* Item Name + Location side-by-side */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium">Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Black Wallet"
                  required
                  className="w-full border border-black/20 rounded-xl px-4 py-3 mt-2.5 text-sm focus:outline-none focus:border-black transition-all"
                />
              </div>

              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Library"
                  required
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
              <button
                type="submit"
                disabled={submitting || uploading}
                className="w-full py-3 text-sm rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Posting..."
                  : uploading
                    ? "Uploading Image..."
                    : "Post Item"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
