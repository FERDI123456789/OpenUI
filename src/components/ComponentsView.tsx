import React, { useState, useEffect } from "react";
import ComponentRenderer from "./ComponentRender";
import ComponentsSearchBar from "./ComponentSearchBar";
import ComponentPanel from "./ComponentPanel"; // New import

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
  handleTogglePublish,
  selectedComponent,
  setSelectedComponent,
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
  handleTogglePublish?: (componentId: string) => void;
  selectedComponent: any | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<any | null>>;
}) {
  const [panelVisible, setPanelVisible] = useState(false);

  const handleSelect = (component: any) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    if (selectedComponent) {
      const id = setTimeout(() => setPanelVisible(true), 10);
      return () => clearTimeout(id);
    }
  }, [selectedComponent]);

  const closePanel = () => {
    setSelectedComponent(null); // No need for timeout/animation here; handle in ComponentPanel
  };

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

      {currentPage === "components" && onCreateClick && (
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
          >
            Create component
          </button>
        </div>
      )}

      <ComponentsSearchBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {(filteredComponents?.length ?? 0) === 0 ? (
        <div className="text-gray-500 text-center mt-10">
          No components found.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 h-screen gap-6 mt-6">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => handleSelect(component)}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {component.name}
                </h3>
                <span
                  className={`inline-flex mt-1 px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>
                {component.user?.username && (
                  <p className="text-xs text-gray-500 mt-1">
                    by {component.user.username}
                  </p>
                )}
              </div>
              <div className="border-t border-gray-200 h-56">
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
        <div className="mt-6 space-y-3">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => handleSelect(component)}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition cursor-pointer flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {component.name}
                </h3>
                <span
                  className={`inline-flex mt-1 px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>
                {component.user?.username && (
                  <p className="text-xs text-gray-500 mt-1">
                    by {component.user.username}
                  </p>
                )}
              </div>
              <div className="w-48 h-24 border border-gray-200 rounded overflow-hidden">
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

      {/* Slide-in Panel */}
      <ComponentPanel
        selectedComponent={selectedComponent}
        onClose={closePanel}
        getLanguageBadgeColor={getLanguageBadgeColor}
        handleTogglePublish={handleTogglePublish}
      />
    </>
  );
}
