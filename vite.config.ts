import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 개발 서버(serve)일 땐 루트('/'), 빌드할 때만 경로 추가
  base: command === "serve" ? "/" : "/React-Study/",
}));
