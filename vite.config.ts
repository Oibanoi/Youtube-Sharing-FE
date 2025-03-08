import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
