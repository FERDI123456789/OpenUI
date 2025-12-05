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
  currentPage: "components" | "saved" | "published";
  setCurrentPage: (p: "components" | "saved" | "published") => void;
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
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="text-lg text-black font-bold flex items-center">
            {/* Ghost block / skeleton */}
            {avatarSvg ? (
              <div
                className="inline-block w-8 h-8 rounded-full mr-2"
                dangerouslySetInnerHTML={{ __html: avatarSvg }}
              />
            ) : (
              <div className="inline-block w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-2" />
            )}
            {avatarSvg ? (
              displayUsername
            ) : (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            )}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {isOwnProfile && (
            <button
              onClick={() => setCurrentPage("components")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                currentPage === "components"
                  ? "bg-purple-600/20 text-purple-400 font-medium border border-purple-500/30"
                  : "text-gray-300 hover:bg-purple-900/20 hover:text-purple-400"
              }`}
            >
              <span>💻</span>
              <span>Components</span>
            </button>
          )}
          {isOwnProfile && (
            <button
              onClick={() => setCurrentPage("saved")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                currentPage === "saved"
                  ? "bg-purple-600/20 text-purple-400 font-medium border border-purple-500/30"
                  : "text-gray-300 hover:bg-purple-900/20 hover:text-purple-400"
              }`}
            >
              <span>⭐</span>
              <span>Saved</span>
            </button>
          )}
          <button
            onClick={() => setCurrentPage("published")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              currentPage === "published"
                ? "bg-purple-600/20 text-purple-400 font-medium border border-purple-500/30"
                : "text-gray-300 hover:bg-purple-900/20 hover:text-purple-400"
            }`}
          >
            <span>📦</span>
            <span>Published</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-gray-800/50 backdrop-blur-sm border-b border-purple-800/30">
          <div className="flex items-center justify-between px-8 h-16">
            <div className="text-purple-400 font-bold text-xl">OpenUI</div>
            {isOwnProfile ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-300 hover:text-purple-400 cursor-pointer transition-colors"
                  >
                    Logout
                  </button>
                </div>
                {topRightExtra}
              </div>
            ) : (
              <div className="flex items-center gap-4">{topRightExtra}</div>
            )}
          </div>
        </header>

        <main className="p-8 bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
