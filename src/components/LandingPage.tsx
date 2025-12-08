import { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ComponentRenderer } from "./ComponentRender";
import ComponentPanel from "./ComponentPanel";
import "../styles/global.css";

export default function LandingPageWrapper() {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL);
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);

  if (!client) return null; // oder ein Ladezustand

  return (
    <ConvexProvider client={client}>
      <LandingPage />
    </ConvexProvider>
  );
}

function LandingPage() {
  const publicComponents = useQuery(api.components.getPublicComponents);
  const [selectedComponent, setSelectedComponent] = useState<any | null>(null);

  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case "html":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "css":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "javascript":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const closePanel = () => {
    setSelectedComponent(null);
  };

  return (
    <main className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 overflow-hidden">
      {/* Hintergrundeffekte */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 w-full mb-20">
        <h1
          className="text-5xl md:text-6xl max-w-4xl lg:text-6xl font-serif mb-6 leading-tight mx-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-rotate">
            <span className="justify-items-center">
              <span className="text-purple-400">Organisierung</span>
              <span className="text-purple-400">Inspirationen</span>
            </span>
          </span>{" "}
          <span className="text-white">Für deine Komponenten mit</span>{" "}
          <span className="text-purple-400">OpenUI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed mx-auto">
          Streamline your component development with seamless automation for
          every custom UI, tailored by OpenUI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/u"
            className="bg-purple-600 font-bold text-white px-8 py-4 rounded-full cursor-pointer hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
          >
            Jetzt Starten!
          </a>
        </div>
      </div>

      {/* Komponentenbereich */}
      {publicComponents === undefined ? (
        <div className="relative z-10 mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/20 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="p-6">
                  <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-4"></div>
                  <div className="h-56 bg-gray-700/50 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : publicComponents.length > 0 ? (
        <div className="relative z-10 mt-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-3xl text-white mb-4">
              Entdecke von anderen luten die Öffentlichen{" "}
              <span className="text-purple-400">Komponenten</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {publicComponents.map((component: any) => (
              <div
                key={component._id}
                onClick={() => setSelectedComponent(component)}
                className="group bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer active:scale-[0.98]"
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors pr-2 flex-1">
                      {component.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border shrink-0 ${getLanguageBadgeColor(
                        component.language
                      )}`}
                    >
                      {component.language.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-5 border border-gray-700/50 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm h-56 shadow-inner">
                    <ComponentRenderer
                      code={component.code}
                      language={component.language}
                      css={component.css}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 mt-40 text-center py-20">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-12 max-w-md mx-auto">
            <p className="text-gray-400 text-lg mb-2">
              Noch keine Komponenten verfügbar
            </p>
            <p className="text-gray-500 text-sm">
              Sei der Erste und teile deine Komponente!
            </p>
          </div>
        </div>
      )}

      {/* Component Panel - slides in from the side */}
      <ComponentPanel
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        onClose={closePanel}
        getLanguageBadgeColor={getLanguageBadgeColor}
        onComponentUpdate={(updatedComponent) => {
          setSelectedComponent(updatedComponent);
        }}
      />
    </main>
  );
}
