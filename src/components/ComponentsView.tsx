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
  onCreateClick?: () => void;
  onSelectComponent: (c: any) => void;
  getLanguageBadgeColor: (lang: string) => string;
  currentPage: "components" | "saved" | "published";
}) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {currentPage === "components"
            ? "Components"
            : currentPage === "saved"
              ? "Saved Components"
              : "Published Components"}
        </h1>
        <p className="text-gray-400">Your component library and previews</p>
      </div>

      {/* Create CTA */}
      {currentPage === "components" && onCreateClick && (
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={onCreateClick}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
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
      {(filteredComponents?.length ?? 0) === 0 ? (
        <div className="text-gray-400 text-center mt-10 py-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-lg">No components found.</p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => onSelectComponent(component)}
              className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl overflow-hidden hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {component.name}
                </h3>

                <span
                  className={`inline-flex mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>

                {/* Optional: show creator */}
                {component.user?.username && (
                  <p className="text-xs text-gray-400 mt-2">
                    by {component.user.username}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-700/50 h-56 bg-gray-900/50">
                <ComponentRenderer
                  code={component.code}
                  css={component.css}
                  language={component.language}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="mt-6 space-y-3">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => onSelectComponent(component)}
              className="p-4 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {component.name}
                </h3>
                <span
                  className={`inline-flex mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>

                {component.user?.username && (
                  <p className="text-xs text-gray-400 mt-2">
                    by {component.user.username}
                  </p>
                )}
              </div>

              <div className="w-48 h-24 border border-gray-700/50 rounded overflow-hidden bg-gray-900/50">
                <ComponentRenderer
                  code={component.code}
                  css={component.css}
                  language={component.language}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
