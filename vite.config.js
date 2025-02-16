import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/zap-af-visual-editor",
  plugins: [tailwindcss()],
});
