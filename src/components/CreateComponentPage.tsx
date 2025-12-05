import React from "react";
import ComponentRenderer from "./ComponentRender";

export default function CreateComponentPage({
  newComponent,
  onChange,
  onSubmit,
  onCancel,
  getLanguageBadgeColor,
}: {
  newComponent: { name: string; language: string; css: string; code: string };
  onChange: (
    field: "name" | "language" | "css" | "code",
    value: string
  ) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  getLanguageBadgeColor: (lang: string) => string;
}) {
  return (
    <div className="fixed inset-0 bg-gray-900 z-40 overflow-y-auto text-gray-100">
      {/* Purple gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <button
                onClick={onCancel}
                className="text-sm text-gray-300 hover:text-purple-400 transition-colors mb-4 flex items-center gap-2"
              >
                <span>←</span>
                <span>Back to dashboard</span>
              </button>
              <h2 
                className="text-4xl font-semibold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Create a <span className="text-purple-400">Component</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Build your component while seeing a live preview update as you
                type.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Component Name
                </label>
                <input
                  type="text"
                  value={newComponent.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="e.g., Pricing Hero"
                  required
                  className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all hover:border-purple-700/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={newComponent.language}
                  onChange={(e) => onChange("language", e.target.value)}
                  className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all hover:border-purple-700/50"
                >
                  <option className="text-orange-100 bg-orange-800" value="html">
                    HTML
                  </option>
                  <option className="text-blue-100 bg-blue-800" value="jsx">
                    JSX
                  </option>
                  <option className="text-green-100 bg-green-800" value="vue">
                    Vue
                  </option>
                  <option className="text-purple-100 bg-purple-800" value="astro">
                    Astro
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CSS (optional)
                </label>
                <textarea
                  value={newComponent.css}
                  onChange={(e) => onChange("css", e.target.value)}
                  placeholder=".card { background: white; }"
                  className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-28 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code
                </label>
                <textarea
                  value={newComponent.code}
                  onChange={(e) => onChange("code", e.target.value)}
                  placeholder="<section>...</section>"
                  required
                  className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-60 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
                />
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span>💡</span>
                  <span>Tip: the preview on the right updates live as you type.</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                >
                  Save component
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 border border-purple-800/30 rounded-xl text-sm font-medium text-gray-300 hover:bg-purple-900/20 hover:text-purple-400 hover:border-purple-700/50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Live Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-base font-semibold text-white mb-1">
                    Live Preview
                  </p>
                  <p className="text-xs text-gray-400">
                    Rendering {newComponent.language.toUpperCase()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(newComponent.language)}`}
                >
                  {newComponent.language.toUpperCase()}
                </span>
              </div>
              <div className="border border-purple-800/20 rounded-xl bg-gray-900/50 backdrop-blur-sm overflow-hidden min-h-[500px] shadow-inner">
                <ComponentRenderer
                  code={newComponent.code}
                  language={newComponent.language as any}
                  css={newComponent.css}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
