import React from "react";

export default function AuthModal({
  isSignup,
  onClose,
  onSwitchMode,
  onSubmit,
  authError,
}: {
  isSignup: boolean;
  onClose: () => void;
  onSwitchMode: (next: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  authError: string | null;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-purple-950/90 flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl border border-purple-800/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {isSignup ? "Sign Up" : "Log in"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-gray-700 text-white px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>
          {authError && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
              {authError}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/30"
          >
            {isSignup ? "Sign Up" : "Log in"}
          </button>
          {!isSignup ? (
            <button
              type="button"
              onClick={() => onSwitchMode(true)}
              className="w-full text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              Don't have an account? Sign up
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSwitchMode(false)}
              className="w-full text-gray-400 hover:text-purple-400 text-sm transition-colors"
            >
              Already have an account? Log in
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
