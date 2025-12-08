import React from "react";
import ComponentRenderer from "./ComponentRender";

export default function CreateComponentPage({
  newComponent,
  onChange,
  onSubmit,
  onCancel,
  getLanguageBadgeColor,
}: {
  newComponent: {
    name: string;
    description: string;
    language: string;
    css: string;
    code: string;
    javascript: string;
  };
  onChange: (
    field: "name" | "description" | "language" | "css" | "code" | "javascript",
    value: string
  ) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  getLanguageBadgeColor: (lang: string) => string;
}) {
  const [activeTab, setActiveTab] = React.useState<
    "html" | "css" | "javascript"
  >("html");
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
                <span>Zurück zum Dashboard</span>
              </button>
              <h2
                className="text-4xl font-semibold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Erstelle eine{" "}
                <span className="text-purple-400">Komponente</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Baue deine Komponente und sieh eine Live-Vorschau, während du
                tippst.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Komponentenname
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
                  Beschreibung (optional)
                </label>
                <textarea
                  value={newComponent.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="Beschreibe, wofür diese Komponente verwendet wird..."
                  className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-24 transition-all hover:border-purple-700/50 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code
                </label>
                <div className="flex gap-2 mb-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("html")}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === "html"
                        ? "bg-purple-600/30 text-purple-300"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    HTML (Pflicht)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("css")}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === "css"
                        ? "bg-purple-600/30 text-purple-300"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    CSS (Optional)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("javascript")}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === "javascript"
                        ? "bg-purple-600/30 text-purple-300"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    JavaScript (Optional)
                  </button>
                </div>
                {activeTab === "html" && (
                  <textarea
                    value={newComponent.code}
                    onChange={(e) => onChange("code", e.target.value)}
                    placeholder="<section>...</section>"
                    required
                    className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-60 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
                  />
                )}
                {activeTab === "css" && (
                  <textarea
                    value={newComponent.css}
                    onChange={(e) => onChange("css", e.target.value)}
                    placeholder=".card { background: white; }"
                    className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-60 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
                  />
                )}
                {activeTab === "javascript" && (
                  <textarea
                    value={newComponent.javascript}
                    onChange={(e) => onChange("javascript", e.target.value)}
                    placeholder="// JavaScript Code"
                    className="w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-60 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
                  />
                )}
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <span>💡</span>
                  <span>
                    Tipp: Tailwind wird auch automatish gerenderd also kannst du
                    auch Tailwind benutzen!
                  </span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
                >
                  Komponente speichern
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 border border-purple-800/30 rounded-xl text-sm font-medium text-gray-300 hover:bg-purple-900/20 hover:text-purple-400 hover:border-purple-700/50 transition-all"
                >
                  Abbrechen
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
                    Live-Vorschau
                  </p>
                  <p className="text-xs text-gray-400">
                    Rendert {newComponent.language.toUpperCase()}
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
                  language="html"
                  css={newComponent.css}
                  javascript={newComponent.javascript}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
