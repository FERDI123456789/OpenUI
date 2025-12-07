import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { Heart, X } from "lucide-react";
import { api } from "../../convex/_generated/api";
import ComponentDetail from "./ComponentDetail";
// CreateComponentPage wird nicht mehr benötigt und entfernt

export default function ComponentPanel({
  selectedComponent,
  setSelectedComponent,
  onClose,
  getLanguageBadgeColor,
  handleTogglePublish,
  onComponentUpdate,
}: {
  selectedComponent: any | null;
  setSelectedComponent?: React.Dispatch<React.SetStateAction<any | null>>;
  onClose: () => void;
  getLanguageBadgeColor: (lang: string) => string;
  handleTogglePublish?: (componentId: string) => void;
  onComponentUpdate?: (updatedComponent: any) => void;
}) {
  const [panelVisible, setPanelVisible] = useState(false);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const componentId = selectedComponent?._id;
  const isOwnComponent = selectedComponent?.userId === userId;

  // --- ENTFERNT: useMutation(api.components.updateComponent) ---
  
  // States und Funktionen für die Bearbeitung entfernt
  // const [showEditPage, setShowEditPage] = useState(false); 
  // const [editComponent, setEditComponent] = useState({...});

  // Query und State für Speichern/Unspeichern
  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId: userId as any } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);


  // Mutations (UpdateComponent entfernt)
  const likeComponent = useMutation(api.components.likeComponent);
  const saveComponent = useMutation(api.components.saveComponent);
  const unsaveComponent = useMutation(api.components.unsaveComponent);
  const deleteComponent = useMutation(api.components.deleteComponent);
  
  // Get or create session ID for users without account
  const getSessionId = () => {
    if (typeof window === "undefined") return null;
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  const sessionId = !userId ? getSessionId() : undefined;
  const isLiked = useQuery(
    api.components.isLiked,
    componentId ? { 
      componentId, 
      userId: userId as any,
      sessionId: sessionId || undefined
    } : "skip"
  );
  
  const [localLikeCount, setLocalLikeCount] = useState(selectedComponent?.likeCount || 0);
  const [hasLiked, setHasLiked] = useState(false);

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

  useEffect(() => {
    if (selectedComponent) {
      setLocalLikeCount(selectedComponent.likeCount || 0);
    }
  }, [selectedComponent]);

  useEffect(() => {
    setHasLiked(isLiked ?? false);
  }, [isLiked]);

  const handleLike = async () => {
    if (!componentId || !setSelectedComponent || hasLiked) return;
    const newLikeCount = localLikeCount + 1;
    setLocalLikeCount(newLikeCount);
    setHasLiked(true);
    
    const updatedComponent = {
      ...selectedComponent,
      likeCount: newLikeCount,
    };
    
    if (setSelectedComponent) {
      setSelectedComponent(updatedComponent);
    }
    
    // Update parent component list immediately
    if (onComponentUpdate) {
      onComponentUpdate(updatedComponent);
    }
    
    try {
      const sessionId = !userId ? getSessionId() : undefined;
      await likeComponent({ 
        componentId, 
        userId: userId as any,
        sessionId: sessionId || undefined
      });
    } catch (err) {
      console.error("Like failed", err);
      setLocalLikeCount(localLikeCount);
      setHasLiked(false);
      const revertedComponent = {
        ...selectedComponent,
        likeCount: localLikeCount,
      };
      if (setSelectedComponent) {
        setSelectedComponent(revertedComponent);
      }
      if (onComponentUpdate) {
        onComponentUpdate(revertedComponent);
      }
    }
  };

  const handleToggleSave = async () => {
    if (!userId || !componentId || !setSelectedComponent) return;
    const newIsSaved = !localIsSaved;
    setLocalIsSaved(newIsSaved);
    const oldSaveCount = selectedComponent.saveCount || 0;
    const newSaveCount = newIsSaved ? oldSaveCount + 1 : Math.max(0, oldSaveCount - 1);
    
    const updatedComponent = {
      ...selectedComponent,
      saveCount: newSaveCount,
    };
    
    setSelectedComponent(updatedComponent);
    
    // Update parent component list immediately
    if (onComponentUpdate) {
      onComponentUpdate(updatedComponent);
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
      const revertedComponent = {
        ...selectedComponent,
        saveCount: oldSaveCount,
      };
      setSelectedComponent(revertedComponent);
      if (onComponentUpdate) {
        onComponentUpdate(revertedComponent);
      }
    }
  };


  if (!selectedComponent) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${
          panelVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closePanel}
        style={{
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-4xl bg-linear-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-md shadow-2xl shadow-purple-900/30 z-50 component-panel rounded-l-3xl ${
          panelVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
          borderLeft: '1px solid rgba(147, 51, 234, 0.1)'
        }}
      >
        <div className="p-6 flex justify-between items-center text-white border-b border-purple-800/20 bg-linear-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90">
          <h2 className="text-2xl font-bold bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent">{selectedComponent.name}</h2>
          <div className="flex items-center gap-3">
            {/* --- BEARBEITEN-BUTTON ENTFERNT --- */}
            
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${
                hasLiked
                  ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30" 
                  : "text-gray-400 hover:text-red-400 hover:bg-gray-700/50 border border-transparent"
              }`}
              disabled={hasLiked}
              title={hasLiked ? "Bereits geliked" : "Gefällt mir"}
            >
              <Heart className="w-5 h-5" fill={hasLiked ? "currentColor" : "none"} strokeWidth={hasLiked ? 0 : 1.5} />
              {localLikeCount}
            </button>
            <button
              onClick={handleToggleSave}
              className={`flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${
                !userId || isOwnComponent
                  ? "text-gray-500 bg-gray-800/30 border border-gray-700/30 cursor-not-allowed opacity-50"
                  : localIsSaved 
                    ? "text-blue-400 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30" 
                    : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-transparent"
              }`}
              disabled={!userId || isOwnComponent}
              title={
                isOwnComponent 
                  ? "Eigene Komponenten können nicht gespeichert werden" 
                  : !userId
                    ? "Anmelden zum Speichern"
                    : localIsSaved 
                      ? "Entfernen" 
                      : "Speichern"
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {selectedComponent.saveCount || 0}
            </button>
            {isOwnComponent && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!userId || !componentId || !setSelectedComponent) return;
                  if (!confirm("Möchtest du diese Komponente wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.")) return;
                  try {
                    await deleteComponent({ componentId, userId: userId as any });
                    closePanel();
                    // Refresh the page to update the component list
                    window.location.reload();
                  } catch (err) {
                    console.error("Delete failed", err);
                    alert("Fehler beim Löschen der Komponente");
                  }
                }}
                className="flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50"
                title="Komponente löschen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            {handleTogglePublish && isOwnComponent && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePublish(selectedComponent._id);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedComponent?.published
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    : "bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 border border-purple-500/50"
                }`}
              >
                {selectedComponent?.published ? "Veröffentlichung aufheben" : "Veröffentlichen"}
              </button>
            )}
            <button
              onClick={closePanel}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-colors text-xl font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* KEINE bedingte Anzeige für showEditPage mehr, direkt ComponentDetail anzeigen */}
        <ComponentDetail
          component={selectedComponent}
          getLanguageBadgeColor={getLanguageBadgeColor}
          showPublishButton={!!handleTogglePublish}
          onTogglePublish={handleTogglePublish}
        />
      </div>
    </>
  );
}