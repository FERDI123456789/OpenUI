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
    <div className="flex items-center justify-between mb-6 gap-4">
      <div className="flex-1 max-w-md relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Nach Titel suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm text-white border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none placeholder-gray-500 transition-all hover:border-purple-700/50"
        />
      </div>
      <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            viewMode === "grid"
              ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
          title="Rasteransicht"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2.5 rounded-lg transition-all duration-200 ${
            viewMode === "list"
              ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
          title="Listenansicht"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
