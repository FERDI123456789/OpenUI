import React from "react";
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
  if (!component) return null;

  return (
    <div className="p-6 overflow-y-auto h-full">
      <span
        className={`inline-flex mt-1 px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(
          component.language
        )}`}
      >
        {component.language.toUpperCase()}
      </span>
      {component.user?.username && (
        <p className="text-xs text-gray-500 mt-1">
          by {component.user.username}
        </p>
      )}
      <div className="mt-4 border border-gray-200 rounded h-[400px]">
        <ComponentRenderer
          code={component.code}
          css={component.css}
          language={component.language}
        />
      </div>
      {/* Add more details here if needed, e.g., save/copy counts, code viewer */}
    </div>
  );
}
