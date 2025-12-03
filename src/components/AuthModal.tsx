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
    <div className="fixed inset-0 backdrop-blur-xl bg-orange-500/70 bg-opacity-50 flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isSignup ? "Sign Up" : "Log in"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
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
            {isSignup ? "Sign Up" : "Log in"}
          </button>
          {!isSignup ? (
            <button
              type="button"
              onClick={() => onSwitchMode(true)}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Don't have an account? Sign up
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSwitchMode(false)}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Already have an account? Log in
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
