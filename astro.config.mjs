// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import dotenv from "dotenv";

const dev = import.meta.env.DEV;

if (process.env.NODE_ENV === "development") {
  dotenv.config();
}

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },

  output: "server",
  site: "https://openui-work.vercel.app",
  integrations: [react()],
  adapter: vercel(),
});
