import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender";
import ComponentPanel from "./ComponentPanel"; // Import the panel component

export default function PublicComponentsList() {
  // Fetch public components from Convex
  const publicComponents = useQuery(api.components.getPublicComponents);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any | null>(null);

  // All possible languages in the dataset
  const languages = useMemo(() => {
    if (!publicComponents) return [];
    const langs = Array.from(
      new Set(publicComponents.map((c: any) => c.language))
    );
    return langs;
  }, [publicComponents]);

  // Filter components based on search query and selected languages
  const filteredComponents = useMemo(() => {
    if (!publicComponents) return [];
    return publicComponents.filter((component: any) => {
      const matchesSearch = component.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(component.language);
      return matchesSearch && matchesLanguage;
    });
  }, [publicComponents, searchQuery, selectedLanguages]);

  // Define getLanguageBadgeColor
  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case "html":
        return "bg-orange-100 text-orange-800";
      case "css":
        return "bg-blue-100 text-blue-800";
      case "javascript":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!publicComponents) {
    return (
      <div className="p-6 text-gray-500">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (publicComponents.length === 0) {
    return (
      <div className="p-6 text-gray-500 text-center">
        Keine öffentlichen Komponenten verfügbar.
      </div>
    );
  }

  return (
    <div className="flex text-black bg-orange-100 h-screen p-3">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border border-gray-200 p-4 bg-white rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Filter Components</h2>
        {/* Language filters */}
        <div>
          <h3 className="font-medium mb-2">Languages</h3>
          <div className="flex flex-col gap-2">
            {languages.map((lang) => (
              <label key={lang} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLanguages([...selectedLanguages, lang]);
                    } else {
                      setSelectedLanguages(
                        selectedLanguages.filter((l) => l !== lang)
                      );
                    }
                  }}
                />
                <span className="capitalize">{lang}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Components Grid */}
      <div className="w-full mt-10 px-10">
        <h1 className="font-bold text-3xl mb-2">UI Komponenten</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-96 mb-4 px-3 py-2 border border-orange-200 shadow-md bg-white rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
        />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component: any) => (
            <div
              key={component._id}
              onClick={() => setSelectedComponent(component)}
              className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {component.name}
                    </h3>
                    <div>
                      <p className="text-sm text-red-700 mt-1 inline font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 inline mb-0.5 mr-1"
                        >
                          <rect width="24" height="24" fill="none" />
                          <path
                            fill="currentColor"
                            d="M13.5 20c-6.6-6.1-10-9.2-10-12.9C3.5 4 5.9 1.6 9 1.6c1.7 0 3.4.8 4.5 2.1c1.1-1.3 2.8-2.1 4.5-2.1c3.1 0 5.5 2.4 5.5 5.5c0 3.8-3.4 6.9-10 12.9M12 21.1C5.4 15.2 1.5 11.7 1.5 7v-.6c-.6.9-1 2-1 3.2c0 3.8 3.4 6.9 10 12.8z"
                            stroke-width="0.5"
                            stroke="currentColor"
                          />
                        </svg>
                        {component.saveCount || 0}
                      </p>
                      <p className="text-sm text-blue-700 mt-1 inline ml-3 font-bold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 inline mb-0.5 mr-1"
                        >
                          <rect width="24" height="24" fill="none" />
                          <path
                            fill="currentColor"
                            d="M4 7H2v14c0 1.1.9 2 2 2h14v-2H4M20 3h-3.2c-.4-1.2-1.5-2-2.8-2s-2.4.8-2.8 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 0c.6 0 1 .5 1 1s-.5 1-1 1s-1-.5-1-1s.4-1 1-1m-1.7 12.1L9 11.8l1.4-1.4l1.9 1.9L17.6 7L19 8.4"
                            stroke-width="0.5"
                            stroke="currentColor"
                          />
                        </svg>
                        {component.copyCount || 0}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(
                      component.language
                    )}`}
                  >
                    {component.language.toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 border border-gray-200 rounded overflow-hidden h-64">
                  <ComponentRenderer
                    code={component.code}
                    language={component.language}
                    css={component.css}
                  />
                </div>
              </div>
            </div>
          ))}

          {filteredComponents.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No components found for your search/filter criteria.
            </div>
          )}
        </div>
      </div>

      <ComponentPanel
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        onClose={() => setSelectedComponent(null)}
        getLanguageBadgeColor={getLanguageBadgeColor}
        onComponentUpdate={(updatedComponent) => {
          setSelectedComponent(updatedComponent);
        }}
      />
    </div>
  );
}
