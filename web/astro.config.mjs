import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://goelrishabh98.github.io",
  base: "/Project-Holocron",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
