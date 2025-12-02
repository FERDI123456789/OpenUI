import React from "react";
import ComponentRenderer from "./ComponentRender";

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
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
            Export
          </button>
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Create component
          </button>
        </div>
      )}

      {/* Search and View Toggle */}
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

      {/* Components Display */}
      <div>
        {components === undefined ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600 text-sm">Loading components...</p>
          </div>
        ) : filteredComponents.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? "No components found" : "No components yet"}
            </h3>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? "Try a different search term"
                : currentPage === "components"
                  ? "Create your first component above to get started!"
                  : `No ${currentPage} components yet.`}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredComponents.map((component: any) => (
              <div
                key={component._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-2 h-64">
                  {/* Preview Side */}
                  <div className="border-r border-gray-200 overflow-hidden">
                    <ComponentRenderer
                      code={component.code}
                      language={component.language}
                      css={component.css}
                    />
                  </div>
                  {/* Info Side */}
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {component.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(component.language)}`}
                      >
                        {component.language.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectComponent(component)}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                    >
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComponents.map((component: any) => (
              <div
                key={component._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-32 h-24 border border-gray-200 rounded overflow-hidden shrink-0">
                      <ComponentRenderer
                        code={component.code}
                        language={component.language}
                        css={component.css}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {component.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(component.language)}`}
                        >
                          {component.language.toUpperCase()}
                        </span>
                        {"_creationTime" in component && (
                          <span className="text-xs text-gray-500">
                            {new Date(
                              (component as any)._creationTime
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectComponent(component)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 ml-4"
                  >
                    View Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
