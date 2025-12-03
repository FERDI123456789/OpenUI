import React, { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender";

export default function PublicComponentsList() {
  // Fetch public components from Convex
  const publicComponents = useQuery(api.components.getPublicComponents);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

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
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {component.name}
                  </h3>

                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      component.language === "html"
                        ? "bg-orange-100 text-orange-800"
                        : component.language === "jsx"
                          ? "bg-blue-100 text-blue-800"
                          : component.language === "vue"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                    }`}
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
    </div>
  );
}
