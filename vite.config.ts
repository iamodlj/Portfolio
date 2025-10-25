import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// ...existing code...

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper module handling
    rollupOptions: {
      output: {
        // Ensure module scripts are properly formatted
        format: 'es',
        manualChunks: undefined,
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
}));
