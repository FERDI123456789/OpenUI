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
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
      <div className="grid grid-cols-3 px-6 lg:px-8 py-10">
        <div className="flex flex-col justify-between mb-8 mr-8">
          <div>
            <button
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              ← Back to dashboard
            </button>
            <h2 className="text-3xl font-semibold text-gray-900 mt-2">
              Create a Component
            </h2>
            <p className="text-gray-600">
              Build your component while seeing a live preview update as you
              type.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Component Name
              </label>
              <input
                type="text"
                value={newComponent.name}
                onChange={(e) => onChange("name", e.target.value)}
                placeholder="e.g., Pricing Hero"
                required
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={newComponent.language}
                onChange={(e) => onChange("language", e.target.value)}
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
              >
                <option className="text-orange-800 bg-orange-100" value="html">
                  HTML
                </option>
                <option className="text-blue-800 bg-blue-100" value="jsx">
                  JSX
                </option>
                <option className="text-green-800 bg-green-100" value="vue">
                  Vue
                </option>
                <option className="text-purple-800 bg-purple-100" value="astro">
                  Astro
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSS (optional)
              </label>
              <textarea
                value={newComponent.css}
                onChange={(e) => onChange("css", e.target.value)}
                placeholder=".card { background: white; }"
                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none min-h-28 font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code
              </label>
              <textarea
                value={newComponent.code}
                onChange={(e) => onChange("code", e.target.value)}
                placeholder="<section>...</section>"
                required
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none min-h-60 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: the preview on the right updates live as you type.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Save component
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-2">
          {/* Live Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Live Preview
                </p>
                <p className="text-xs text-gray-500">
                  Rendering {newComponent.language.toUpperCase()}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(newComponent.language)}`}
              >
                {newComponent.language.toUpperCase()}
              </span>
            </div>
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden min-h-[400px]">
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
  );
}
