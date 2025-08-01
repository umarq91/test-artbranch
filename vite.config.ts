import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: process.env.VITE_APP_BASE_NAME,
  plugins: [react(), viteTsconfigPaths()],
  define: {
    global: "window",
  },
  resolve: {
    alias: [
      // { find: '', replacement: path.resolve(__dirname, 'src') },
      // {
      //   find: /^~(.+)/,
      //   replacement: path.join(process.cwd(), 'node_modules/$1')
      // },
      // {
      //   find: /^src(.+)/,
      //   replacement: path.join(process.cwd(), 'src/$1')
      // }
      // {
      //   find: 'assets',
      //   replacement: path.join(process.cwd(), 'src/assets')
      // },
    ],
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
});
