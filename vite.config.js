import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/cloud': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        rewrite: (path) => path.replace('cloud', 'upload'),
      },
    },
  },
});
