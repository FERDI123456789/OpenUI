import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ComponentDetail from "./ComponentDetail";

export default function ComponentPanel({
  selectedComponent,
  setSelectedComponent,
  onClose,
  getLanguageBadgeColor,
  handleTogglePublish,
}: {
  selectedComponent: any | null;
  setSelectedComponent?: React.Dispatch<React.SetStateAction<any | null>>;
  onClose: () => void;
  getLanguageBadgeColor: (lang: string) => string;
  handleTogglePublish?: (componentId: string) => void;
}) {
  const [panelVisible, setPanelVisible] = useState(false);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const componentId = selectedComponent?._id;

  const latestComponent =
    useQuery(
      api.components.getPublicComponentById,
      componentId ? { id: componentId } : "skip"
    ) || selectedComponent;

  const isOwnComponent = latestComponent?.userId === userId;

  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);

  const isCopied = useQuery(
    api.components.isCopied,
    userId && componentId ? { componentId, userId } : "skip"
  );
  const [localIsCopied, setLocalIsCopied] = useState(false);
  useEffect(() => {
    setLocalIsCopied(isCopied ?? false);
  }, [isCopied]);

  const saveComponent = useMutation(api.components.saveComponent);
  const unsaveComponent = useMutation(api.components.unsaveComponent);
  const copyComponent = useMutation(api.components.copyComponent);
  const uncopyComponent = useMutation(api.components.uncopyComponent);

  useEffect(() => {
    if (selectedComponent) {
      const id = setTimeout(() => setPanelVisible(true), 10);
      return () => clearTimeout(id);
    }
  }, [selectedComponent]);

  const closePanel = () => {
    setPanelVisible(false);
    setTimeout(() => onClose(), 400); // Delay matches transition duration-400
  };

  const handleToggleSave = async () => {
    if (!userId || !componentId) return;
    const newIsSaved = !localIsSaved;
    setLocalIsSaved(newIsSaved);
    try {
      if (newIsSaved) {
        await saveComponent({ componentId, userId });
      } else {
        await unsaveComponent({ componentId, userId });
      }
    } catch (err: any) {
      console.error("Save toggle failed:", err);
      setLocalIsSaved(!newIsSaved);
      alert(err.message || "Failed to save component");
    }
  };

  const handleToggleCopy = async () => {
    if (!userId || !componentId) return;
    const newIsCopied = !localIsCopied;
    setLocalIsCopied(newIsCopied);
    try {
      if (newIsCopied) {
        await copyComponent({ componentId, userId });
      } else {
        await uncopyComponent({ componentId, userId });
      }
    } catch (err: any) {
      console.error("Copy toggle failed:", err);
      setLocalIsCopied(!newIsCopied);
      alert(err.message || "Failed to copy component");
    }
  };

  const handleCopyComponent = async () => {
    if (!userId || !componentId || localIsCopied) return;
    setLocalIsCopied(true);
    try {
      await copyComponent({ componentId, userId });
    } catch (err: any) {
      console.error("Copy failed:", err);
      setLocalIsCopied(false);
      alert(err.message || "Failed to copy component");
    }
  };

  if (!selectedComponent) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-400 ${
          panelVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={closePanel}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-2xl z-50 transition-all duration-400 ${
          panelVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center text-black border-b border-gray-200">
          <h2 className="text-2xl font-bold">{latestComponent.name}</h2>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1 text-sm font-bold text-red-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fill="currentColor"
                  d="M13.5 20c-6.6-6.1-10-9.2-10-12.9C3.5 4 5.9 1.6 9 1.6c1.7 0 3.4.8 4.5 2.1c1.1-1.3 2.8-2.1 4.5-2.1c3.1 0 5.5 2.4 5.5 5.5c0 3.8-3.4 6.9-10 12.9M12 21.1C5.4 15.2 1.5 11.7 1.5 7v-.6c-.6.9-1 2-1 3.2c0 3.8 3.4 6.9 10 12.8z"
                  stroke-width="0.5"
                  stroke="currentColor"
                />
              </svg>
              {latestComponent.saveCount || 0}
            </p>
            <p className="flex items-center gap-1 text-sm font-bold text-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fill="currentColor"
                  d="M4 7H2v14c0 1.1.9 2 2 2h14v-2H4M20 3h-3.2c-.4-1.2-1.5-2-2.8-2s-2.4.8-2.8 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 0c.6 0 1 .5 1 1s-.5 1-1 1s-1-.5-1-1s.4-1 1-1m-1.7 12.1L9 11.8l1.4-1.4l1.9 1.9L17.6 7L19 8.4"
                  stroke-width="0.5"
                  stroke="currentColor"
                />
              </svg>
              {latestComponent.copyCount || 0}
            </p>
            {handleTogglePublish && (
              <button
                onClick={() => handleTogglePublish(selectedComponent._id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  latestComponent?.published
                    ? "bg-gray-300 text-black hover:bg-gray-400"
                    : "bg-green-600 text-white hover:bg-green-500"
                }`}
              >
                {latestComponent?.published ? "Unpublish" : "Publish"}
              </button>
            )}
            <button
              onClick={closePanel}
              className="text-gray-500 hover:text-gray-900 text-xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
        <ComponentDetail
          component={latestComponent}
          onToggleSave={isOwnComponent ? undefined : handleToggleSave}
          isSaved={localIsSaved}
          userId={userId}
          onCopyComponent={isOwnComponent ? undefined : handleCopyComponent}
          getLanguageBadgeColor={getLanguageBadgeColor}
          showPublishButton={!!handleTogglePublish}
          onTogglePublish={handleTogglePublish}
        />
      </div>
    </>
  );
}
