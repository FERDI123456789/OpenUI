import React, { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const signupMutation = useMutation(api.auth.signup);
  const loginMutation = useMutation(api.auth.login);

  // Check URL params for initial mode and if user is already logged in
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "signup") {
      setIsSignup(true);
    }

    const userId = localStorage.getItem("userId");
    if (userId) {
      // Redirect to dashboard if already logged in
      window.location.href = `/u/${userId}`;
    }
  }, []);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);

    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    try {
      const result = isSignup
        ? await signupMutation({
            username: usernameInput.value,
            password: passwordInput.value,
          })
        : await loginMutation({
            username: usernameInput.value,
            password: passwordInput.value,
          });

      if (result.userId) {
        // Save user info in localStorage
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("username", result.username);

        // Redirect to dashboard
        window.location.href = `/u/${result.userId}`;
      }
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-purple-900/30 border border-purple-800/30 relative z-10">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <svg
                className="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
              OpenUI
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            {isSignup ? "Registrieren" : "Anmelden"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSignup
              ? "Erstelle dein Konto, um zu beginnen"
              : "Willkommen zurück! Bitte melde dich an"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Benutzername
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 bg-gray-900/60 backdrop-blur-sm border border-purple-800/30 rounded-xl outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all hover:border-purple-700/50"
              placeholder="Gib deinen Benutzernamen ein"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Passwort
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full px-4 py-3 pr-12 bg-gray-900/60 backdrop-blur-sm border border-purple-800/30 rounded-xl outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all hover:border-purple-700/50"
                placeholder="Gib dein Passwort ein"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                title={
                  showPassword ? "Passwort verstecken" : "Passwort anzeigen"
                }
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {authError && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSignup ? "Registrieren" : "Anmelden"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-gray-400 hover:text-purple-400 text-sm mt-2 transition-colors"
          >
            {isSignup
              ? "Bereits ein Konto? Anmelden"
              : "Noch kein Konto? Registrieren"}
          </button>
        </form>
      </div>
    </div>
  );
}
