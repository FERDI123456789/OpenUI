import React, { useState } from "react";
// Lucide Icons: Imports sind OK
import {
  Check,
  Eye,
  Code,
  Smartphone,
  Monitor,
  Copy as CopyIcon,
} from "lucide-react";

// 🚀 KORREKTUR: Syntax Highlighter Imports für maximale Kompatibilität
// (Wenn die Neuinstallation fehlschlägt, ist dies oft die Lösung)
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlusPkg from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

const { vscDarkPlus } = vscDarkPlusPkg;

import ComponentRenderer from "./ComponentRender"; // Assuming this is your renderer

// Definiere einen minimalen Typ für die Komponente, um Typsicherheit zu gewährleisten
interface Component {
  _id: string;
  name: string;
  description?: string;
  language: "html" | "css" | "javascript" | string;
  code: string;
  css?: string;
  userId?: string;
  user?: {
    username?: string;
  };
}

// Definiere den Typ für den Zustand des Kopierens
type CopyState = "idle" | "copied";

export default function ComponentDetail({
  component,
  getLanguageBadgeColor,
  onTogglePublish,
}: {
  component: Component;
  getLanguageBadgeColor: (lang: string) => string;
  showPublishButton?: boolean;
  onTogglePublish?: (componentId: string) => void;
}) {
  const [viewportMode, setViewportMode] = useState<"mobile" | "desktop">(
    "desktop"
  );
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  // Kombinierter State für die Copy-Funktion
  const [codeCopyStatus, setCodeCopyStatus] = useState<CopyState>("idle");
  const [cssCopyStatus, setCssCopyStatus] = useState<CopyState>("idle");

  // --- Copy-Funktion ---
  const copyToClipboard = async (text: string, type: "code" | "css") => {
    if (!text) return;

    const setStatus = type === "code" ? setCodeCopyStatus : setCssCopyStatus;

    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setStatus("idle");
    }
  };

  // --- Sprache für SyntaxHighlighter ---
  const getLanguageForSyntaxHighlighter = (lang: string) => {
    return lang.toLowerCase() as "html" | "css" | "javascript" | string;
  };

  // Extrahiere CSS-Code und prüfe auf JavaScript-Teile
  let componentCss = component.css || "";
  let componentJs = "";

  // Logik zur Trennung von JS (falls in <script>-Tags im CSS enthalten)
  const scriptMatch = componentCss.match(/<script>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    componentJs = scriptMatch[1].trim();
    // Entferne JavaScript-Teile aus dem CSS-Code für die Code-Anzeige
    componentCss = componentCss
      .replace(/<script>[\s\S]*?<\/script>/, "")
      .trim();
  }

  // Bestimme die Sprache des Hauptcodes
  let mainCodeLanguage = getLanguageForSyntaxHighlighter(component.language);
  if (mainCodeLanguage === "html" && component.code.startsWith("<")) {
    // Wenn der Code mit '<' beginnt, ist es wahrscheinlich HTML/JSX
  }

  return (
    <div
      className="p-6 overflow-y-auto h-full bg-transparent component-panel"
      style={
        {
          // animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1), slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }
      }
    >
      <div className="mb-4 space-y-2">
        {component.description && (
          <div className="mb-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl">
            <h3 className="text-sm font-semibold text-purple-300 mb-2">
              Beschreibung
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {component.description}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                component.language
              )}`}
            >
              {component.language.toUpperCase()}
            </span>
            {/* Defensive Checks für user und username */}
            {component.user?.username && component.userId && (
              <p className="text-xs text-gray-400">
                von{" "}
                <a
                  href={`/u/${component.userId}`}
                  className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {component.user.username}
                </a>
              </p>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
              <button
                onClick={() => setViewMode("preview")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "preview"
                    ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
                title="Vorschau"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "code"
                    ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
                title="Code-Ansicht"
              >
                <Code className="w-5 h-5" />
              </button>
            </div>

            {viewMode === "preview" && (
              <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1">
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewportMode === "mobile"
                      ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                  title="Handy-Ansicht"
                >
                  <Smartphone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewportMode === "desktop"
                      ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                  title="Desktop-Ansicht"
                >
                  <Monitor className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {viewMode === "preview" ? (
        <div
          className={`mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner transition-all duration-300 flex items-center justify-center ${
            viewportMode === "mobile"
              ? "max-w-[600px] mx-auto h-[900px] relative"
              : "h-[600px] w-full"
          }`}
        >
          {viewportMode === "mobile" && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Phone Frame */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-2.5 bg-gray-700 rounded-b-lg"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-700 rounded-t-lg"></div>
            </div>
          )}
          <div
            className={`w-full h-full transition-all duration-300 ${
              viewportMode === "mobile"
                ? "rounded-[2.5rem] scale-125 origin-top"
                : ""
            }`}
          >
            <ComponentRenderer
              // Verwende den vollständigen CSS-String mit JS-Tags für den Renderer
              code={component.code}
              css={component.css}
              language={"html"}
              viewportMode={viewportMode}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner">
          <div className="p-4 bg-gray-800/50 border-b border-purple-800/30">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(component.language)}`}
              >
                {component.language.toUpperCase()}
              </span>
              {component.css && ( // Prüfe, ob CSS vorhanden ist
                <span className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border bg-pink-500/20 text-pink-400 border-pink-500/30">
                  CSS/JS
                </span>
              )}
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {/* --- CSS/JS-CODE-BLOCK --- */}
            {component.css && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    CSS/JS
                  </h3>
                  <button
                    onClick={() => copyToClipboard(component.css || "", "css")} // Kopiere immer das Original-CSS
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-purple-200 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/30 rounded-lg transition-colors"
                    title="CSS kopieren"
                  >
                    {cssCopyStatus === "copied" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4" />
                        Kopieren
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <SyntaxHighlighter
                    language="css" // Zeige es immer als CSS an (auch wenn JS-Tags drin sind)
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {component.css} {/* Zeige den Original-String */}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {/* --- HAUPTCODE-BLOCK (HTML/JSX) --- */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  {component.language.toUpperCase()} Code
                </h3>
                <button
                  onClick={() => copyToClipboard(component.code, "code")}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-purple-200 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/30 rounded-lg transition-colors"
                  title="Code kopieren"
                >
                  {codeCopyStatus === "copied" ? (
                    <>
                      <Check className="w-4 h-4" />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-4 h-4" />
                      Kopieren
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <SyntaxHighlighter
                  language={mainCodeLanguage}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  {component.code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
