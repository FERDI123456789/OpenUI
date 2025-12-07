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
  currentPage: "components" | "saved" | "published" | "discover";
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
      {/* Subtle background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="mb-8 relative">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1
              className="text-3xl md:text-4xl font-serif mb-2 bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {currentPage === "components"
                ? "Komponenten"
                : currentPage === "saved"
                  ? "Gespeicherte Komponenten"
                  : currentPage === "published"
                    ? "Veröffentlichte Komponenten"
                    : "Alle Komponenten entdecken"}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              {currentPage === "discover"
                ? "Durchstöbere alle veröffentlichten Komponenten"
                : "Deine Komponenten-Bibliothek und Vorschauen"}
            </p>
          </div>
          {currentPage === "components" && onCreateClick && (
            <button
              onClick={onCreateClick}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full text-sm font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Komponente erstellen
            </button>
          )}
        </div>
      </div>

      <ComponentsSearchBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {(filteredComponents?.length ?? 0) === 0 ? (
        <div className="text-gray-400 text-center mt-10 py-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-lg">Keine Komponenten gefunden.</p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 pb-8">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => handleSelect(component)}
              className="group bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl overflow-hidden hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-1 active:scale-[0.98]"
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="p-5 bg-gradient-to-b from-gray-800/80 to-transparent">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {component.name}
                  </h3>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                      component.language
                    )}`}
                  >
                    {component.language.toUpperCase()}
                  </span>
                  {component.user?.username && (
                    <p className="text-xs text-gray-400">
                      von <span className="text-purple-400">{component.user.username}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="border-t border-purple-800/20 bg-gray-900/40 h-64 overflow-hidden">
                <div className="h-full scale-95 group-hover:scale-100 transition-transform duration-300">
                  <ComponentRenderer
                    code={component.code}
                    css={component.css}
                    language={component.language}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-3 pb-8">
          {filteredComponents.map((component) => (
            <div
              key={component._id}
              onClick={() => handleSelect(component)}
              className="group p-5 bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-out cursor-pointer flex items-center justify-between active:scale-[0.98]"
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {component.name}
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                      component.language
                    )}`}
                  >
                    {component.language.toUpperCase()}
                  </span>
                  {component.user?.username && (
                    <p className="text-xs text-gray-400">
                      von <span className="text-purple-400">{component.user.username}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="w-48 h-24 border border-purple-800/30 rounded-lg overflow-hidden bg-gray-900/40 ml-4 group-hover:border-purple-500/50 transition-colors">
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
