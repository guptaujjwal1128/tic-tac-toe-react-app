import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "src/styles/_variables"; 
          @use "src/styles/_mixins";
        `,
      },
    },
  },
});
