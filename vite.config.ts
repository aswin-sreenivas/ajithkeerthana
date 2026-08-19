import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }

              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }

              if (id.includes('canvas-confetti')) {
                return 'vendor-confetti';
              }

              return 'vendor';
            }
          },
        },
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',

      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  };
});