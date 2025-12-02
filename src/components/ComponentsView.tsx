import React from "react";
import ComponentRenderer from "./ComponentRender";
import ComponentsSearchBar from "./ComponentSearchBar";

export default function ComponentsView({
  components,
  filteredComponents,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onCreateClick,
  onSelectComponent,
  getLanguageBadgeColor,
  currentPage,
}: {
  components: any[] | undefined;
  filteredComponents: any[];
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  onCreateClick: () => void;
  onSelectComponent: (c: any) => void;
  getLanguageBadgeColor: (lang: string) => string;
  currentPage: "components" | "saved" | "published";
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          {currentPage === "components"
            ? "Components"
            : currentPage === "saved"
              ? "Saved Components"
              : "Published Components"}
        </h1>
        <p className="text-gray-600">Your component library and previews</p>
      </div>

      {/* Create CTA */}
      {currentPage === "components" && (
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Create component
          </button>
        </div>
      )}

      {/* Search and View Toggle */}
      <ComponentsSearchBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Components Display */}
      {/* ... rest of your grid/list rendering remains unchanged ... */}
    </>
  );
}
