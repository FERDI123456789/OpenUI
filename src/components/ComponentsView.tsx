import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Heart } from "lucide-react";
import ComponentRenderer from "./ComponentRender";
import ComponentsSearchBar from "./ComponentSearchBar";
import ComponentPanel from "./ComponentPanel"; // New import
import * as jdenticon from "jdenticon";

export default function ComponentsView({
  components,
  filteredComponents,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onCreateClick,
  onSelectComponent,
  getLanguageBadgeColor,
  currentPage,
  handleTogglePublish,
  selectedComponent,
  setSelectedComponent,
}: {
  components: any[] | undefined;
  filteredComponents: any[];
  viewMode: "grid" | "list";
  setViewMode: (v: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  onCreateClick?: () => void;
  onSelectComponent: (c: any) => void;
  getLanguageBadgeColor: (lang: string) => string;
  currentPage: "components" | "saved" | "published" | "discover";
  handleTogglePublish?: (componentId: string) => void;
  selectedComponent: any | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<any | null>>;
}) {
  const [panelVisible, setPanelVisible] = useState(false);

  const handleSelect = (component: any) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    if (selectedComponent) {
      const id = setTimeout(() => setPanelVisible(true), 10);
      return () => clearTimeout(id);
    }
  }, [selectedComponent]);

  const closePanel = () => {
    setSelectedComponent(null); // No need for timeout/animation here; handle in ComponentPanel
  };

  // Helper function to check if JS is present in CSS
  const hasJs = (css: string | undefined) => {
    if (!css) return false;
    return /<script>([\s\S]*?)<\/script>/.test(css);
  };

  return (
    <>
      {/* Subtle background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mb-8 relative">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h1
              className="text-3xl md:text-4xl font-serif mb-2 bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {currentPage === "components"
                ? "Komponenten"
                : currentPage === "saved"
                  ? "Gespeicherte Komponenten"
                  : currentPage === "published"
                    ? "Veröffentlichte Komponenten"
                    : "Alle Komponenten entdecken"}
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              {currentPage === "discover"
                ? "Durchstöbere alle veröffentlichten Komponenten"
                : "Deine Komponenten-Bibliothek und Vorschauen"}
            </p>
          </div>
          {currentPage === "components" && onCreateClick && (
            <button
              onClick={onCreateClick}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full text-sm font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Komponente erstellen
            </button>
          )}
        </div>
      </div>

      <ComponentsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {(filteredComponents?.length ?? 0) === 0 ? (
        <div className="text-gray-400 text-center mt-10 py-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-lg">Keine Komponenten gefunden.</p>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 pb-8">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component._id}
              component={component}
              currentPage={currentPage}
              getLanguageBadgeColor={getLanguageBadgeColor}
              handleSelect={handleSelect}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-3 pb-8">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component._id}
              component={component}
              currentPage={currentPage}
              getLanguageBadgeColor={getLanguageBadgeColor}
              handleSelect={handleSelect}
              viewMode="list"
            />
          ))}
        </div>
      )}

      {/* Slide-in Panel */}
      <ComponentPanel
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        onClose={closePanel}
        getLanguageBadgeColor={getLanguageBadgeColor}
        handleTogglePublish={handleTogglePublish}
        onComponentUpdate={(updatedComponent) => {
          // Update the component in the filtered list
          setSelectedComponent(updatedComponent);
        }}
      />
    </>
  );
}

interface ComponentCardProps {
  component: any;
  currentPage: "components" | "saved" | "published" | "discover";
  getLanguageBadgeColor: (lang: string) => string;
  handleSelect: (c: any) => void;
  viewMode: "grid" | "list";
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  currentPage,
  getLanguageBadgeColor,
  handleSelect,
  viewMode,
}) => {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const isOwnComponent = component.userId === userId;
  const componentId = component._id;

  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId: userId as any } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(isSaved ?? false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);

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
    componentId
      ? {
          componentId,
          userId: userId as any,
          sessionId: sessionId || undefined,
        }
      : "skip"
  );
  const [hasLiked, setHasLiked] = useState(isLiked ?? false);
  useEffect(() => {
    setHasLiked(isLiked ?? false);
  }, [isLiked]);

  const [localLikeCount, setLocalLikeCount] = useState(
    component.likeCount || 0
  );
  const [localSaveCount, setLocalSaveCount] = useState(
    component.saveCount || 0
  );

  useEffect(() => {
    setLocalLikeCount(component.likeCount || 0);
    setLocalSaveCount(component.saveCount || 0);
  }, [component.likeCount, component.saveCount]);

  const likeComponent = useMutation(api.components.likeComponent);
  const saveComponent = useMutation(api.components.saveComponent);
  const unsaveComponent = useMutation(api.components.unsaveComponent);

  const handleLike = async () => {
    if (!componentId || hasLiked) return;
    const oldLikeCount = localLikeCount;
    const newLikeCount = localLikeCount + 1;
    setLocalLikeCount(newLikeCount);
    setHasLiked(true);

    try {
      const sessionId = !userId ? getSessionId() : undefined;
      await likeComponent({
        componentId,
        userId: userId as any,
        sessionId: sessionId || undefined,
      });
    } catch (err) {
      console.error("Like failed", err);
      setLocalLikeCount(oldLikeCount);
      setHasLiked(false);
    }
  };

  const handleToggleSave = async () => {
    if (!userId || !componentId || isOwnComponent) return;
    const oldIsSaved = localIsSaved;
    const oldSaveCount = localSaveCount;
    const newIsSaved = !localIsSaved;
    const newSaveCount = newIsSaved
      ? localSaveCount + 1
      : Math.max(0, localSaveCount - 1);
    setLocalIsSaved(newIsSaved);
    setLocalSaveCount(newSaveCount);

    try {
      if (newIsSaved) {
        await saveComponent({ componentId, userId: userId as any });
      } else {
        await unsaveComponent({ componentId, userId: userId as any });
      }
    } catch (err) {
      console.error("Save toggle failed", err);
      setLocalIsSaved(oldIsSaved);
      setLocalSaveCount(oldSaveCount);
    }
  };

  const hasJs = (css: string | undefined) => {
    if (!css) return false;
    return /<script>([\s\S]*?)<\/script>/.test(css);
  };

  const showCreator =
    (currentPage === "discover" || currentPage === "saved") &&
    component.user?.username;

  const creatorAvatar = showCreator
    ? jdenticon.toSvg(component.user.username, 20)
    : null;

  return (
    <div
      onClick={() => handleSelect(component)}
      className={
        viewMode === "grid"
          ? "group bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl overflow-hidden hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-1 active:scale-[0.98]"
          : "group p-5 bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-out cursor-pointer flex items-center justify-between active:scale-[0.98]"
      }
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {viewMode === "grid" ? (
        <>
          <div className="p-5 pb-2 bg-gradient-to-b from-gray-800/80 to-transparent">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {component.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  className={`flex items-center gap-1 text-sm font-medium transition px-2 py-1 rounded-md ${
                    hasLiked
                      ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                      : "text-gray-400 hover:text-red-400 hover:bg-gray-700/50 border border-transparent"
                  }`}
                  disabled={hasLiked}
                  title={hasLiked ? "Bereits geliked" : "Gefällt mir"}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={hasLiked ? "currentColor" : "none"}
                    strokeWidth={hasLiked ? 0 : 1.5}
                  />
                  {localLikeCount}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSave();
                  }}
                  className={`flex items-center gap-1 text-sm font-medium transition px-2 py-1 rounded-md ${
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {localSaveCount}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {showCreator ? (
                <div className="flex items-center gap-1">
                  <div
                    className="w-5 h-5 rounded-full shadow-lg shadow-purple-500/30"
                    dangerouslySetInnerHTML={{ __html: creatorAvatar! }}
                  />
                  <p className="text-xs text-gray-400">
                    <span className="text-purple-400 font-bold">
                      {component.user.username}
                    </span>
                  </p>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>
                {component.css && (
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor("css")}`}
                  >
                    CSS
                  </span>
                )}
                {hasJs(component.css) && (
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor("javascript")}`}
                  >
                    JS
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-purple-800/20 bg-gray-900/40 h-64 overflow-hidden">
            <div className="h-full scale-95 group-hover:scale-100 transition-transform duration-300">
              <ComponentRenderer
                code={component.code}
                css={component.css}
                language={component.language}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-1 justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {component.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  className={`flex items-center gap-1 text-sm font-medium transition px-2 py-1 rounded-md ${
                    hasLiked
                      ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                      : "text-gray-400 hover:text-red-400 hover:bg-gray-700/50 border border-transparent"
                  }`}
                  disabled={hasLiked}
                  title={hasLiked ? "Bereits geliked" : "Gefällt mir"}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={hasLiked ? "currentColor" : "none"}
                    strokeWidth={hasLiked ? 0 : 1.5}
                  />
                  {localLikeCount}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleSave();
                  }}
                  className={`flex items-center gap-1 text-sm font-medium transition px-2 py-1 rounded-md ${
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  {localSaveCount}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center gap-1">
              {showCreator ? (
                <div className="flex items-center">
                  <div
                    className="w-5 h-5 rounded-full shadow-lg shadow-purple-500/30"
                    dangerouslySetInnerHTML={{ __html: creatorAvatar! }}
                  />
                  <p className="text-xs text-gray-400">
                    <span className="text-purple-400 font-bold">
                      {component.user.username}
                    </span>
                  </p>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                    component.language
                  )}`}
                >
                  {component.language.toUpperCase()}
                </span>
                {component.css && (
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor("css")}`}
                  >
                    CSS
                  </span>
                )}
                {hasJs(component.css) && (
                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor("javascript")}`}
                  >
                    JS
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-48 h-24 border border-purple-800/30 rounded-lg overflow-hidden bg-gray-900/40 ml-4 group-hover:border-purple-500/50 transition-colors">
            <ComponentRenderer
              code={component.code}
              css={component.css}
              language={component.language}
            />
          </div>
        </>
      )}
    </div>
  );
};
