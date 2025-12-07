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
  const isOwnComponent = selectedComponent?.userId === userId;

  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId: userId as any } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);

  const isCopied = useQuery(
    api.components.isCopied,
    userId && componentId ? { componentId, userId: userId as any } : "skip"
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
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden';
      // Small delay for smooth animation
      const id = requestAnimationFrame(() => {
        setPanelVisible(true);
      });
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedComponent]);

  const closePanel = () => {
    setPanelVisible(false);
    document.body.style.overflow = '';
    setTimeout(() => onClose(), 500); // Delay matches transition duration-500
  };

  const handleToggleSave = async () => {
    if (!userId || !componentId || !setSelectedComponent) return;
    const newIsSaved = !localIsSaved;
    setLocalIsSaved(newIsSaved);
    const oldSaveCount = selectedComponent.saveCount || 0;
    if (newIsSaved) {
      setSelectedComponent((prev: any) => ({
        ...prev,
        saveCount: oldSaveCount + 1,
      }));
    }
    try {
      if (newIsSaved) {
        await saveComponent({ componentId, userId: userId as any });
      } else {
        await unsaveComponent({ componentId, userId: userId as any });
      }
    } catch (err) {
      console.error("Save toggle failed", err);
      setLocalIsSaved(!newIsSaved);
      if (newIsSaved) {
        setSelectedComponent((prev: any) => ({
          ...prev,
          saveCount: oldSaveCount,
        }));
      }
    }
  };

  const handleToggleCopy = async () => {
    if (!userId || !componentId || !setSelectedComponent) return;
    const newIsCopied = !localIsCopied;
    setLocalIsCopied(newIsCopied);
    const oldCopyCount = selectedComponent.copyCount || 0;
    if (newIsCopied) {
      setSelectedComponent((prev: any) => ({
        ...prev,
        copyCount: oldCopyCount + 1,
      }));
    }
    try {
      if (newIsCopied) {
        await copyComponent({ componentId, userId: userId as any });
      } else {
        await uncopyComponent({ componentId, userId: userId as any });
      }
    } catch (err) {
      console.error("Copy toggle failed", err);
      setLocalIsCopied(!newIsCopied);
      if (newIsCopied) {
        setSelectedComponent((prev: any) => ({
          ...prev,
          copyCount: oldCopyCount,
        }));
      }
    }
  };

  if (!selectedComponent) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${
          panelVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closePanel}
        style={{
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-4xl bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-md shadow-2xl shadow-purple-900/30 z-50 component-panel rounded-l-3xl ${
          panelVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
          borderLeft: '1px solid rgba(147, 51, 234, 0.1)'
        }}
      >
        <div className="p-6 flex justify-between items-center text-white border-b border-purple-800/20 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{selectedComponent.name}</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleSave}
              className={`flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${
                isOwnComponent
                  ? "text-gray-500 bg-gray-800/30 border border-gray-700/30 cursor-not-allowed opacity-50"
                  : localIsSaved 
                    ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30" 
                    : "text-gray-400 hover:text-red-400 hover:bg-gray-700/50 border border-transparent"
              }`}
              disabled={!userId || isOwnComponent}
              title={
                isOwnComponent 
                  ? "Eigene Komponenten können nicht gespeichert werden" 
                  : userId 
                    ? (localIsSaved ? "Entfernen" : "Speichern") 
                    : "Anmelden zum Speichern"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill={localIsSaved ? "currentColor" : "none"}
              >
                <rect width="24" height="24" fill="none" />
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={localIsSaved ? 0 : 1.5}
                  d="M13.5 20c-6.6-6.1-10-9.2-10-12.9C3.5 4 5.9 1.6 9 1.6c1.7 0 3.4.8 4.5 2.1c1.1-1.3 2.8-2.1 4.5-2.1c3.1 0 5.5 2.4 5.5 5.5c0 3.8-3.4 6.9-10 12.9z"
                />
              </svg>
              {selectedComponent.saveCount || 0}
            </button>
            <button
              onClick={handleToggleCopy}
              className={`flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${
                isOwnComponent
                  ? "text-gray-500 bg-gray-800/30 border border-gray-700/30 cursor-not-allowed opacity-50"
                  : localIsCopied 
                    ? "text-blue-400 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30" 
                    : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-transparent"
              }`}
              disabled={!userId || isOwnComponent}
              title={
                isOwnComponent 
                  ? "Eigene Komponenten können nicht kopiert werden" 
                  : userId 
                    ? (localIsCopied ? "Kopie entfernen" : "Kopieren") 
                    : "Anmelden zum Kopieren"
              }
            >
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
              {selectedComponent.copyCount || 0}
            </button>
            {handleTogglePublish && isOwnComponent && (
              <button
                onClick={() => handleTogglePublish(selectedComponent._id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedComponent?.published
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 border border-purple-500/50"
                }`}
              >
                {selectedComponent?.published ? "Veröffentlichung aufheben" : "Veröffentlichen"}
              </button>
            )}
            <button
              onClick={closePanel}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-colors text-xl font-bold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <ComponentDetail
          component={selectedComponent}
          getLanguageBadgeColor={getLanguageBadgeColor}
          showPublishButton={!!handleTogglePublish} // Optional: if you want to move the button here instead
          onTogglePublish={handleTogglePublish}
        />
      </div>
    </>
  );
}
