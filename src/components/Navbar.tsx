import React from 'react';

// KEINE Imports für Icons!

// --- NAVIGATIONS-DATEN OHNE ICONS ---
const navItems = [
  { name: 'Docs', href: '#docs' }, 
];

interface NavbarProps {
  onOpenSignup?: () => void;
  onOpenLogin?: () => void;
}

// Platzhalter-Komponenten für Burger- und Schließen-Icon (als Text, da keine Icons erlaubt)
const MenuIconPlaceholder = () => <span className="text-xl">☰</span>;
const XIconPlaceholder = () => <span className="text-xl">✕</span>;


export default function Navbar({ onOpenSignup, onOpenLogin }: NavbarProps) {
  
  // State für die mobile Ansicht
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Toggle für die mobile Ansicht
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
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
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20"
              >
                {item.name}
              </a>
            ))}
            
            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20"
              >
                Login
              </button>
            )}
            
            {onOpenSignup && (
              <button
                onClick={onOpenSignup}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105"
              >
                Registrieren
              </button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-purple-400 p-2 rounded-md transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <XIconPlaceholder /> : <MenuIconPlaceholder />}
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
              {onOpenLogin && (
                <button
                  onClick={() => {
                    if (onOpenLogin) {
                      onOpenLogin();
                    }
                    toggleMenu();
                  }}
                  className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20 text-left"
                >
                  Login
                </button>
              )}
              {onOpenSignup && (
                <button
                  onClick={() => {
                    if (onOpenSignup) {
                      onOpenSignup();
                    }
                    toggleMenu();
                  }}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 mt-2"
                >
                  Registrieren
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}