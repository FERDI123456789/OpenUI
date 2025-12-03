import React from "react";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="text-lg text-gray-500 mt-1 flex items-center">
            {" "}
            <div className="inline-block w-8 h-8 rounded-full bg-gray-300 mr-2"></div>{" "}
            / {displayUsername}
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {isOwnProfile && (
            <button
              onClick={() => setCurrentPage("components")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                currentPage === "components"
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
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
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
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
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
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
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-8 h-16">
            <div className="text-black font-bold">OpenUI</div>
            {isOwnProfile ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onLogout}
                    className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
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

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
