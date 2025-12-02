import React from "react";
import PublicComponentsList from "./PublicComponents";

export default function LandingPage({
  onOpenSignup,
}: {
  onOpenSignup: () => void;
}) {
  return (
    <main className="">
      <div className="text-center mx-auto px-20 lg:px-20 pt-24 pb-24">
        <h1
          className="text-5xl md:text-6xl max-w-3xl lg:text-7xl font-serif mx-auto text-gray-900 mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-rotate">
            <span className="justify-items-center">
              <span>Organisierung</span>
              <span>Inspirationen</span>
            </span>
          </span>{" "}
          Für deine UI Komponenten
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed mx-auto">
          Open UI is eine offene UI library wo jeder seine UI Komponenten
          hochladen kann und anderen zeigen kann
        </p>
        <div className="flex flex-col justify-center sm:flex-row gap-4">
          <button
            onClick={onOpenSignup}
            className="bg-orange-600 text-white px-8 py-4 rounded-full font-medium hover:bg-orange-500 transition-colors text-sm"
          >
            Start for free
          </button>
        </div>
      </div>
      <div className="mt-10 bg-gradient-to-b from-orange-500 via-white to-white p-10 rounded-xl rounded-t-full">
        <div className="mx-auto px-20 lg:px-20 pt-24 pb-24">
          <PublicComponentsList />
        </div>
      </div>
    </main>
  );
}
