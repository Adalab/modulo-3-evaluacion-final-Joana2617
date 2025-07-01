import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// defineConfig como função
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/modulo-3-evaluacion-final-Joana2617/" : "/",
    plugins: [react()],
    server: {
      open: "/",
      watch: {
        usePolling: true,
      },
    },
  };
});
