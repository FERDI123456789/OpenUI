import React, { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// --- NAVIGATION-DATEN ---
const navItems: { name: string; href: string }[] = [];

interface NavbarProps {}

export default function NavbarWrapper() {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL);
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);

  if (!client) return null; // loading state

  return (
    <ConvexProvider client={client}>
      <Navbar />
    </ConvexProvider>
  );
}

function Navbar({}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-purple-800/30">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              OpenUI
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20"
              >
                {item.name}
              </a>
            ))}

            {userId ? (
              <a
                href={`/u`}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30"
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href={`/u`}
                  className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20"
                >
                  Anmelden
                </a>
                <a
                  href={`/u?mode=signup`}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30"
                >
                  Registrieren
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-purple-400 p-2 rounded-md transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-purple-800/30 mt-2 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20"
                >
                  {item.name}
                </a>
              ))}

              {userId ? (
                <a
                  href={`/u`}
                  onClick={toggleMenu}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 mt-2 text-center"
                >
                  Dashboard
                </a>
              ) : (
                <>
                  <a
                    href={`/u`}
                    onClick={toggleMenu}
                    className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20 text-left"
                  >
                    Anmelden
                  </a>
                  <a
                    href={`/u?mode=signup`}
                    onClick={toggleMenu}
                    className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 mt-2 text-center"
                  >
                    Registrieren
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
