import { defineConfig } from "vite";  
import react from "@vitejs/plugin-react";  
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";  
import path, { dirname } from "path";  
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";  
import { fileURLToPath } from "url";  

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);  

export default defineConfig({  
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],  
  resolve: {  
    alias: {  
      "@db": path.resolve(__dirname, "db"),  
      "@": path.resolve(__dirname, "client", "src"),  
    },  
  },  
  root: path.resolve(__dirname, "client"), // 前端根目录  
  build: {  
    outDir: path.resolve(__dirname, "dist/public"), // 构建输出目录  
    emptyOutDir: true, // 清空输出目录  
    rollupOptions: {  
      input: path.resolve(__dirname, "client", "index.html"), // 指定入口文件  
    },  
  },  
  server: {  
    port: 3000, // 本地开发服务器端口  
    proxy: {  
      "/api": {  
        target: "http://localhost:3001", // 后端 API 地址  
        changeOrigin: true,  
        secure: false,  
      },  
    },  
  },  
});
