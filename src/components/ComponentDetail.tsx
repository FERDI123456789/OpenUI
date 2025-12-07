import React, { useState } from "react";
import ComponentRenderer from "./ComponentRender"; // Assuming this is your renderer

export default function ComponentDetail({
  component,
  getLanguageBadgeColor,
  showPublishButton = false,
  onTogglePublish,
}: {
  component: any;
  getLanguageBadgeColor: (lang: string) => string;
  showPublishButton?: boolean;
  onTogglePublish?: (componentId: string) => void;
}) {
  const [viewportMode, setViewportMode] = useState<"mobile" | "desktop">("desktop");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  if (!component) return null;

  return (
    <div 
      className="p-6 overflow-y-auto h-full bg-transparent component-panel"
      style={{
        animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1), slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                component.language
              )}`}
            >
              {component.language.toUpperCase()}
            </span>
            {component.user?.username && (
              <p className="text-xs text-gray-400">
                von <span className="text-purple-400 font-medium">{component.user.username}</span>
              </p>
            )}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
              <button
                onClick={() => setViewMode("preview")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "preview"
                    ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
                title="Vorschau"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "code"
                    ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
                title="Code-Ansicht"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
            </div>
            
            {viewMode === "preview" && (
              <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewportMode === "mobile"
                      ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                  title="Handy-Ansicht"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewportMode === "desktop"
                      ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                  title="Desktop-Ansicht"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {viewMode === "preview" ? (
        <div className={`mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner transition-all duration-300 flex items-center justify-center ${
          viewportMode === "mobile" ? "max-w-[600px] mx-auto h-[900px] relative" : "h-[600px] w-full"
        }`}>
          {viewportMode === "mobile" && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Phone Frame */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-2.5 bg-gray-700 rounded-b-lg"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-700 rounded-t-lg"></div>
            </div>
          )}
          <div className={`w-full h-full transition-all duration-300 ${
            viewportMode === "mobile" ? "rounded-[2.5rem] scale-125 origin-top" : ""
          }`}>
            <ComponentRenderer
              code={component.code}
              css={component.css}
              language={component.language}
              viewportMode={viewportMode}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner">
          <div className="p-4 bg-gray-800/50 border-b border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(component.language)}`}>
                {component.language.toUpperCase()}
              </span>
              {component.css && (
                <span className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border bg-pink-500/20 text-pink-400 border-pink-500/30">
                  CSS
                </span>
              )}
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {component.css && (
              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  CSS
                </h3>
                <pre className="bg-gray-950/50 p-4 rounded-lg border border-purple-800/20 overflow-x-auto">
                  <code className="text-sm text-gray-300 font-mono">{component.css}</code>
                </pre>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {component.language.toUpperCase()} Code
              </h3>
              <pre className="bg-gray-950/50 p-4 rounded-lg border border-purple-800/20 overflow-x-auto">
                <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">{component.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
      {/* Add more details here if needed, e.g., save/copy counts, code viewer */}
    </div>
  );
}
