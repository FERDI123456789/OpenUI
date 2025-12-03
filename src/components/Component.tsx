import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender";

export default function PublicComponentsList({ id }: { id: any }) {
  console.log("PublicComponentsList received id:", id); // Debug log - remove in production

  // Fetch the single public component by ID
  const component = useQuery(api.components.getPublicComponentById, { id });

  if (!component) {
    return (
      <div className="p-6 text-gray-500">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (component === null) {
    return (
      <div className="p-6 text-gray-500 text-center">
        Komponente nicht gefunden oder nicht öffentlich.
      </div>
    );
  }

  return (
    <div className="flex text-black bg-orange-100 h-screen p-3 justify-center">
      <div className="w-full max-w-4xl mt-10 px-10">
        <h1 className="font-bold text-3xl mb-2">{component.name}</h1>
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

        {/* Preview */}
        <div className="mt-6 border border-gray-200 rounded overflow-hidden h-96">
          <ComponentRenderer
            code={component.code}
            language={component.language}
            css={component.css}
          />
        </div>

        {/* Raw Code */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Code</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            <code>{component.code}</code>
          </pre>
        </div>

        {/* Raw CSS (if present) */}
        {component.css && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">CSS</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              <code>{component.css}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
