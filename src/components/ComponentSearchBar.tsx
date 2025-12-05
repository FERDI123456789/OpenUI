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
          className="w-full px-4 py-2.5 bg-gray-800/40 backdrop-blur-sm text-white border border-purple-800/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-gray-500 transition-all"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2.5 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
              : "text-gray-400 hover:bg-purple-900/20 hover:text-purple-400 border border-transparent"
          }`}
          title="Grid View"
        >
          <span className="text-lg">⊞</span>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2.5 rounded-lg transition-colors ${
            viewMode === "list"
              ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
              : "text-gray-400 hover:bg-purple-900/20 hover:text-purple-400 border border-transparent"
          }`}
          title="List View"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>
    </div>
  );
}
