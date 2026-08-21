import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'geist/font/sans.css': path.resolve(__dirname, 'src/geist.css'),
    },
  },
  server: {
    port: 5173,
  },
});