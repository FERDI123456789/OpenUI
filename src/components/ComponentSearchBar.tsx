import React from "react";

export default function ComponentsSearchBar({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
}: {
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          title="Grid View"
        >
          <span className="text-lg">⊞</span>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
          title="List View"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>
    </div>
  );
}
