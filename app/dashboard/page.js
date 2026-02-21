"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import * as RadixSelect from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(6);
  const [itemList, setItemList] = useState([]);
  const [viewType, setViewType] = useState("Found");
  const [loading, setLoading] = useState(true);
  const [userClaims, setUserClaims] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch items and user claims
  useEffect(() => {
    if (status === "authenticated") {
      fetchItems();
      fetchUserClaims();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const [foundRes, lostRes] = await Promise.all([
        fetch("/api/items/found"),
        fetch("/api/items/lost"),
      ]);

      const foundData = await foundRes.json();
      const lostData = await lostRes.json();

      const foundItems = (foundData.data || []).map((item) => ({
        id: item.id,
        name: item.item_name,
        location: item.location,
        time: formatDateTime(item.created_at),
        claims: item.claims,
        description: item.description,
        type: "Found",
        imageUrl: item.image_url,
        posterName: item.users?.name || "Unknown",
      }));

      const lostItems = (lostData.data || []).map((item) => ({
        id: item.id,
        name: item.item_name,
        location: item.location,
        time: formatDateTime(item.created_at),
        claims: item.matches,
        description: item.description,
        type: "Lost",
        posterName: item.users?.name || "Unknown",
      }));

      setItemList([...foundItems, ...lostItems]);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserClaims = async () => {
    try {
      const res = await fetch("/api/items/claims");
      const data = await res.json();
      setUserClaims(data.data || []);
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMM · h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  const isItemClaimedByUser = (itemId, type) => {
    if (type === "Found") {
      return userClaims.some(
        (claim) =>
          claim.found_item_id === itemId && claim.claim_type === "found",
      );
    } else {
      return userClaims.some(
        (claim) =>
          claim.lost_item_id === itemId && claim.claim_type === "match",
      );
    }
  };

  const handleClaimToggle = async (item) => {
    const isClaimed = isItemClaimedByUser(item.id, item.type);
    const claimType = item.type === "Found" ? "found" : "match";
    const action = isClaimed ? "remove" : "add";

    try {
      const res = await fetch("/api/items/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          claimType,
          action,
        }),
      });

      if (res.ok) {
        // Refresh claims and items
        await fetchUserClaims();
        await fetchItems();
      }
    } catch (error) {
      console.error("Error toggling claim:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      const max = itemList.filter((i) => i.type === viewType).length;
      return Math.min(prev + 3, max);
    });
  };

  // filter by selected view type (Found or Lost)
  const filteredItems = itemList.filter((item) => item.type === viewType);
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white text-black px-8 py-10">
      {/* Outer Container */}
      <div className="max-w-10xl mx-auto flex gap-10">
        {/* Sidebar */}
        <aside className="w-64 flex flex-col justify-between pr-6 py-6 border-r border-black/5">
          <div>
            <h1 className="text-xl font-semibold tracking-tight mb-6">
              Add or search for items
            </h1>

            <div className="space-y-3">
              <Link
                href="/lostquery"
                className="w-full flex items-center justify-start gap-3 py-2 px-4 rounded-lg border border-black/10 bg-red-500 text-white hover:bg-red-600 hover:opacity-95 transition"
                aria-label="Add Lost Item"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium text-sm p-1">Add Lost Item</span>
              </Link>

              <Link
                href="/foundquery"
                className="w-full flex items-center justify-start gap-3 py-2 px-4 rounded-lg border border-black/10 bg-green-500 text-white hover:bg-green-600 hover:opacity-95 transition"
                aria-label="Add Found Item"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium text-sm p-1">Add Found Item</span>
              </Link>

              <button className="w-full flex items-center justify-start gap-3 py-2 px-4 rounded-lg border border-black/10 bg-white text-black hover:bg-gray-100 transition">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-medium text-sm p-1">Search</span>
              </button>

              {/* sidebar view switches removed (moved to top-right filter) */}
            </div>
          </div>

          <p className="text-xs text-black/40">
            Centralized campus recovery system.
          </p>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col">
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Recently Posted
              </h2>
              <p className="text-sm text-black/50 mt-1">
                Browse lost and found items across campus
              </p>
            </div>

            <div className="relative inline-block text-left">
              <RadixSelect.Root
                value={viewType}
                onValueChange={(val) => {
                  setViewType(val);
                  setVisibleCount(6);
                }}
              >
                <RadixSelect.Trigger
                  className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white text-sm text-black shadow-sm hover:shadow transition focus:outline-none"
                  aria-label="Filter posts by type"
                >
                  <RadixSelect.Value />
                  <RadixSelect.Icon className="text-black/50">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </RadixSelect.Icon>
                </RadixSelect.Trigger>

                <RadixSelect.Portal>
                  <RadixSelect.Content className="mt-2 w-44 rounded-md bg-white shadow-lg z-50 overflow-hidden">
                    <RadixSelect.ScrollUpButton className="flex items-center justify-center text-black/50 py-1">
                      ▲
                    </RadixSelect.ScrollUpButton>
                    <RadixSelect.Viewport className="p-1">
                      <RadixSelect.Item
                        value="Found"
                        className="relative flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0 hover:outline-none"
                      >
                        <RadixSelect.ItemText>Found</RadixSelect.ItemText>
                      </RadixSelect.Item>
                      <RadixSelect.Item
                        value="Lost"
                        className="relative flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0 hover:outline-none"
                      >
                        <RadixSelect.ItemText>Lost</RadixSelect.ItemText>
                      </RadixSelect.Item>
                    </RadixSelect.Viewport>
                    <RadixSelect.ScrollDownButton className="flex items-center justify-center text-black/50 py-1">
                      ▼
                    </RadixSelect.ScrollDownButton>
                  </RadixSelect.Content>
                </RadixSelect.Portal>
              </RadixSelect.Root>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-black/50">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing {visibleItems.length} of {filteredItems.length} items
              </>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-black/40">Loading items...</p>
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {visibleItems.map((item) => {
                const isClaimed = isItemClaimedByUser(item.id, item.type);
                return (
                  <div
                    key={item.id}
                    className="group border border-black/10 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200 flex flex-col bg-white"
                  >
                    {item.type === "Found" && (
                      <div className="relative h-44 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-black/40 mb-5 overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-3 py-1 border border-black/10 rounded-full bg-white text-black/80">
                        {item.location}
                      </span>
                      <span className="text-xs px-3 py-1 border border-black/10 rounded-full bg-white text-black/60">
                        {item.time}
                      </span>
                      <span className="text-xs px-3 py-1 border border-black/10 rounded-full bg-white text-black/70">
                        Posted by {item.posterName}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium mb-2">{item.name}</h3>

                    <p className="text-sm text-black/60 mb-6">
                      {item.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs text-black/40">
                        {item.type === "Lost"
                          ? `${item.claims} possible match${item.claims !== 1 ? "es" : ""}`
                          : `${item.claims} claim request${item.claims !== 1 ? "s" : ""}`}
                      </span>

                      {item.type === "Lost" ? (
                        <button
                          onClick={() => handleClaimToggle(item)}
                          className={`text-sm px-4 py-2 rounded-lg transition duration-200 ${
                            isClaimed
                              ? "bg-black text-white border border-black hover:opacity-90"
                              : "bg-white text-black border border-black/10 hover:bg-black hover:text-white"
                          }`}
                        >
                          Found
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClaimToggle(item)}
                          className={`text-sm px-4 py-2 rounded-lg transition duration-200 ${
                            isClaimed
                              ? "bg-black text-white border border-black hover:opacity-90"
                              : "bg-white text-black border border-black/10 hover:bg-black hover:text-white"
                          }`}
                        >
                          {isClaimed ? "Claimed" : "Claim"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-black/40">
                No items match the selected filter.
              </p>
            </div>
          )}

          {/* Load More */}
          {visibleCount < filteredItems.length && (
            <div className="flex justify-center mt-14">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-black/10 shadow-sm hover:bg-black hover:text-white transition-all duration-200"
              >
                <span className="text-sm font-medium">Load more</span>
                <span className="text-xs text-black/40">
                  {filteredItems.length - visibleCount} left
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
