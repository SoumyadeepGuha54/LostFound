"use client";
import { useState } from "react";
import Link from "next/link";
import * as RadixSelect from "@radix-ui/react-select";

// --- Generate random data ---
const locations = [
  "Library",
  "Phase-II Building",
  "BCA Building",
  "Canteen",
  "Parking Lot",
  "Auditorium",
  "Playgrounds",
  "Other",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const itemNames = [
  "Black Wallet",
  "MacBook Charger",
  "Water Bottle",
  "Notebook",
  "Umbrella",
  "ID Card",
  "Keys",
  "Backpack",
  "USB Drive",
];

const descriptions = [
  "Found near the reading section.",
  "Left by the vending machines.",
  "On a bench outside.",
  "Inside the computer lab.",
  "Near the front desk.",
  "Under a table in the cafeteria.",
  "On the bus stop bench.",
  "In the locker room.",
  "At the information kiosk.",
];

function generateItems(type, count) {
  return Array.from({ length: count }, (_, i) => {
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomHour = Math.floor(Math.random() * 12) + 1;
    const randomMinute = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    const randomAmPm = Math.random() > 0.5 ? "AM" : "PM";
    const randomClaims = Math.floor(Math.random() * 5);
    const randomTimeString = `${randomDay} ${randomMonth} · ${randomHour}:${randomMinute} ${randomAmPm}`;

    return {
      id: `${type}-${i}`,
      name:
        itemNames[i % itemNames.length] +
        (i >= itemNames.length ? ` ${i + 1}` : ""),
      location: randomLocation,
      time: randomTimeString,
      claims: randomClaims,
      description: descriptions[i % descriptions.length],
      type,
      isClaimedByUser: false,
    };
  });
}

// create 9 sample found posts and 9 sample lost posts
const foundItems = generateItems("Found", 9);
const lostItems = generateItems("Lost", 9);
const items = [...foundItems, ...lostItems];

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [itemList, setItemList] = useState(items);
  const [viewType, setViewType] = useState("Found");

  const handleClaimToggle = (id) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isClaimedByUser: !item.isClaimedByUser,
              claims: !item.isClaimedByUser
                ? item.claims + 1
                : Math.max(0, item.claims - 1),
            }
          : item,
      ),
    );
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
            Showing {visibleItems.length} of {filteredItems.length} items
          </div>

          {/* Grid */}
          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="group border border-black/10 rounded-xl p-5 hover:shadow-sm transition-shadow duration-200 flex flex-col bg-white"
                >
                  {item.type === "Found" && (
                    <div className="h-44 bg-gray-50 rounded-xl flex items-center justify-center text-sm text-black/40 mb-5 overflow-hidden">
                      <span>Image Preview</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-3 py-1 border border-black/10 rounded-full bg-white text-black/80">
                      {item.location}
                    </span>
                    <span className="text-xs px-3 py-1 border border-black/10 rounded-full bg-white text-black/60">
                      {item.time}
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
                        onClick={() => handleClaimToggle(item.id)}
                        className={`text-sm px-4 py-2 rounded-lg transition duration-200 ${
                          item.isClaimedByUser
                            ? "bg-black text-white border border-black hover:opacity-90"
                            : "bg-white text-black border border-black/10 hover:bg-black hover:text-white"
                        }`}
                      >
                        Found
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaimToggle(item.id)}
                        className={`text-sm px-4 py-2 rounded-lg transition duration-200 ${
                          item.isClaimedByUser
                            ? "bg-black text-white border border-black hover:opacity-90"
                            : "bg-white text-black border border-black/10 hover:bg-black hover:text-white"
                        }`}
                      >
                        {item.isClaimedByUser ? "Claimed" : "Claim"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
