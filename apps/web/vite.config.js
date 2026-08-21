import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const PORT = process.env.CLIENT_PORT || process.env.PORT || 5173;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'geist/font/sans.css': path.resolve(__dirname, 'src/geist.css'),
    },
  },
  server: {
    port: parseInt(PORT, 10) || 5173,
  },
});