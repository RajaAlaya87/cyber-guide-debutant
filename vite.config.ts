import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use a repo-relative base only in production (for GitHub Pages).
  // During development we keep '/' so things like HMR and local routing work normally.
  base: mode === "production" ? "/cyber-guide-debutant/" : "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Build to `docs/` so you can serve from the repository's docs folder via GitHub Pages.
  // If you prefer to deploy from a gh-pages branch, you can remove or change outDir back to 'dist'.
  build: {
    outDir: "docs",
    assetsDir: "assets",
  },
}));
