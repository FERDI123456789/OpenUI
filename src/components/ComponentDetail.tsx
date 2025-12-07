import React, { useState } from "react";
import ComponentRenderer from "./ComponentRender";
import { Heart, HeartCrack } from "lucide-react";

export default function ComponentDetail({
  component,
  onToggleSave,
  isSaved,
  userId,
  onCopyComponent,
}: {
  component: any;
  onToggleSave?: () => void;
  isSaved: boolean;
  userId: string | null;
  onCopyComponent?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "css">(
    "preview"
  );
  const [isHoveringSave, setIsHoveringSave] = useState(false);

  if (!component) return null;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (onCopyComponent) {
        onCopyComponent();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveIcon = () => {
    if (isSaved) {
      if (isHoveringSave) {
        return <HeartCrack className="w-6 h-6" />;
      } else {
        return <Heart className="w-8 h-8" fill="#7f1d1d " />;
      }
    } else {
      if (isHoveringSave) {
        return <Heart className="w-8 h-8" fill="#7f1d1d " />;
      } else {
        return <Heart className="w-8 h-8" />;
      }
    }
  };

  return (
    <div className="p-6 h-full flex flex-col gap-4">
      {/* Tabs and Buttons */}
      <div className="flex justify-between items-center">
        <div role="tablist" className="tabs tabs-boxed w-fit">
          <button
            role="tab"
            className={`tab ${activeTab === "preview" && "tab-active"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>

          <button
            role="tab"
            className={`tab ${activeTab === "code" && "tab-active"}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>

          {component.css && component.css.trim().length > 0 && (
            <button
              role="tab"
              className={`tab ${activeTab === "css" && "tab-active"}`}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mr-5">
          {activeTab === "code" && (
            <button
              onClick={() => handleCopy(component.code)}
              className="btn btn-sm btn-outline"
              title="Copy code to clipboard"
            >
              Copy
            </button>
          )}
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              disabled={!userId}
              className={``}
              title={userId ? (isSaved ? "Unsave" : "Save") : "Login to save"}
              onMouseEnter={() => setIsHoveringSave(true)}
              onMouseLeave={() => setIsHoveringSave(false)}
            >
              {saveIcon()}
            </button>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="border rounded-xl bg-base-200 p-4 relative flex-1 overflow-auto">
        {/* Preview Tab */}
        {activeTab === "preview" && (
          <ComponentRenderer
            code={component.code}
            language={component.language || "html"}
            css={component.css}
          />
        )}

        {/* Code Tab */}
        {activeTab === "code" && (
          <pre className="text-sm whitespace-pre-wrap">{component.code}</pre>
        )}

        {/* CSS Tab */}
        {activeTab === "css" && (
          <pre className="text-sm whitespace-pre-wrap">{component.css}</pre>
        )}
      </div>
    </div>
  );
}
