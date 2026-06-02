import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The frontend imports the trade fixture and formatter directly from the
// existing ../src code via Vite — there is no backend server. Allowing fs
// access to the parent lets those cross-directory imports resolve in dev.
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [".."],
    },
  },
});
