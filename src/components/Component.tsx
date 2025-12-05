import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender";

export default function PublicComponentsList({ id }: { id: any }) {
  console.log("PublicComponentsList received id:", id); // Debug log - remove in production

  // Fetch the single public component by ID
  const component = useQuery(api.components.getPublicComponentById, { id });

  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case "html":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "jsx":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "vue":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "astro":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (!component) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-800 rounded w-1/3"></div>
            <div className="h-96 bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (component === null) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16 flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-12 text-center max-w-md">
          <p className="text-gray-400 text-lg">
            Komponente nicht gefunden oder nicht öffentlich.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      {/* Purple gradient background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {component.name}
            </h1>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border ${getLanguageBadgeColor(
                component.language
              )}`}
            >
              {component.language.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-300">Vorschau</h2>
            </div>
            <div className="p-6 bg-gray-900/50 min-h-[400px]">
              <ComponentRenderer
                code={component.code}
                language={component.language}
                css={component.css}
              />
            </div>
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-8">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-lg font-semibold text-gray-300">Code</h2>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900/50 border border-gray-700/50 p-4 rounded-lg overflow-auto text-sm text-gray-300 font-mono">
                <code>{component.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* CSS Section (if present) */}
        {component.css && (
          <div className="mb-8">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-300">CSS</h2>
              </div>
              <div className="p-6">
                <pre className="bg-gray-900/50 border border-gray-700/50 p-4 rounded-lg overflow-auto text-sm text-gray-300 font-mono">
                  <code>{component.css}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
