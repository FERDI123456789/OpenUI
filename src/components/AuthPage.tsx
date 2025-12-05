import React, { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const signupMutation = useMutation(api.auth.signup);
  const loginMutation = useMutation(api.auth.login);

  // Check if user is already logged in
  useEffect(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 text-black">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none text-black focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-gray-600 hover:text-gray-900 text-sm mt-2"
          >
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
