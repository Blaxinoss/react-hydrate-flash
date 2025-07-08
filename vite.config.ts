import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode), // ✅ هنا السحر
    "process.env": {}, // تمنع access غير محسوب
  },
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "./src/main.jsx"),
      formats: ["es"],
      fileName: () => "client.bundle.js",
    },
  },
}));
