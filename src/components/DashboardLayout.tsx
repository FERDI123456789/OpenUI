import React, { useEffect, useState } from "react";
import * as jdenticon from "jdenticon";

export default function DashboardLayout({
  username,
  profileUsername,
  isOwnProfile,
  currentPage,
  setCurrentPage,
  onLogout,
  topRightExtra,
  children,
}: {
  username: string;
  profileUsername?: string;
  isOwnProfile: boolean;
  currentPage: "components" | "saved" | "published" | "discover";
  setCurrentPage: (p: "components" | "saved" | "published" | "discover") => void;
  onLogout: () => void;
  topRightExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  const displayUsername = profileUsername || username;

  const [avatarSvg, setAvatarSvg] = useState<string | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarSvg(jdenticon.toSvg(displayUsername, 32));
    }, 200); // small delay to simulate load, you can remove or adjust
    return () => clearTimeout(timer);
  }, [displayUsername]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r-2 border-purple-900/50 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-purple-900/30">
        {/* Logo/Brand Section */}
        <div className="p-6 border-b-2 border-purple-800/40 bg-gradient-to-br from-gray-800 via-purple-900/20 to-gray-800">
          <div className="flex items-center gap-3 mb-4">
            {/* Logo Icon - Purple abstract shape */}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">shattery</span>
          </div>
          {/* User Avatar */}
          <div className="text-sm text-gray-300 font-medium flex items-center">
            {avatarSvg ? (
              <div
                className="inline-block w-7 h-7 rounded-full mr-2 ring-2 ring-purple-500/60 shadow-lg shadow-purple-500/30"
                dangerouslySetInnerHTML={{ __html: avatarSvg }}
              />
            ) : (
              <div className="inline-block w-7 h-7 rounded-full bg-gray-700 animate-pulse mr-2" />
            )}
            {avatarSvg ? (
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                {displayUsername}
              </span>
            ) : (
              <div className="h-3 w-20 bg-gray-700 animate-pulse rounded" />
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-2">
          {isOwnProfile && (
            <button
              onClick={() => setCurrentPage("components")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                currentPage === "components"
                  ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]"
                  : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>Komponenten</span>
            </button>
          )}
          {isOwnProfile && (
            <button
              onClick={() => setCurrentPage("saved")}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                currentPage === "saved"
                  ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]"
                  : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Gespeichert</span>
            </button>
          )}
          <button
            onClick={() => setCurrentPage("published")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
              currentPage === "published"
                ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]"
                : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>Veröffentlicht</span>
          </button>
          <button
            onClick={() => setCurrentPage("discover")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
              currentPage === "discover"
                ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]"
                : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Entdecken</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-md border-b border-purple-800/30 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between px-8 h-16">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 font-bold text-xl">
              OpenUI
            </div>
            {isOwnProfile ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-800/50"
                  >
                    Abmelden
                  </button>
                </div>
                {topRightExtra}
              </div>
            ) : (
              <div className="flex items-center gap-4">{topRightExtra}</div>
            )}
          </div>
        </header>

        <main className="p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
