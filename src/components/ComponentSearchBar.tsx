import React from "react";

export default function ComponentsSearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (s: string) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      <div className="flex px-3 py-3 max-w-md relative backdrop-blur-sm bg-gray-800/60 border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none placeholder-gray-500 transition-all hover:border-purple-700/50">
        <svg
          className="w-5 h-5 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Nach Titel suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-white ml-3"
        />
      </div>
    </div>
  );
}
