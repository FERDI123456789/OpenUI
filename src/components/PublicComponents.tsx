import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender"; // reuse your live preview iframe component

export default function PublicComponentsList() {
  // Fetch public components from Convex
  const publicComponents = useQuery(api.components.getPublicComponents);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicComponents.map((component: any) => (
        <div
          key={component._id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
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
    </div>
  );
}
