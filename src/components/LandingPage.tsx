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
    <main className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 h-screen flex justify-center items-center overflow-hidden">
      {/* Hintergrundeffekte */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center relative z-10 w-full">
        <h1
          className="text-5xl md:text-8xl max-w-4xl lg:text-7xl font-serif mb-6 leading-tight mx-auto"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-rotate">
            <span className="justify-items-center">
              <span className="text-purple-400">Ordnung</span>
              <span className="text-purple-400">Inspiration</span>
            </span>
          </span>{" "}
          <span className="text-white">Für deine Komponenten mit</span>{" "}
          <span className="text-purple-400">OpenUI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed mx-auto">
          OpenUI ist wie eine offene see wo du deine UI Komponenten ordern
          kannst aber auch veröffentlichten und von anderen angucken kannst
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
    </main>
  );
}
