import React from "react";
import ComponentRenderer from "./ComponentRender";

export default function ComponentDetailModal({
  component,
  onClose,
  onSave,
  onPublish,
  onUnpublish,
  getLanguageBadgeColor,
  currentPage,
}: {
  component: any;
  onClose: () => void;
  onSave: (id: any) => Promise<void>;
  onPublish: (id: any) => Promise<void>;
  onUnpublish: (id: any) => Promise<void>;
  getLanguageBadgeColor: (lang: string) => string;
  currentPage: "components" | "saved" | "published";
}) {
  if (!component) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {component.name}
            </h2>
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mt-2 ${getLanguageBadgeColor(component.language)}`}
            >
              {component.language.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentPage === "components" && (
              <>
                {!component.saved && (
                  <button
                    onClick={() => onSave(component._id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Save
                  </button>
                )}
                {!component.published && (
                  <button
                    onClick={() => onPublish(component._id)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    Publish
                  </button>
                )}
                {component.published && (
                  <button
                    onClick={() => onUnpublish(component._id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Unpublish
                  </button>
                )}
              </>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <ComponentRenderer
                code={component.code}
                language={component.language}
                css={component.css}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {component.css && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">CSS</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                  <code>{component.css}</code>
                </pre>
              </div>
            )}
            <div className={component.css ? "" : "lg:col-span-2"}>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Code</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs max-h-96">
                <code>{component.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
