import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Use polling if you're on a network file system
    },
  },
  resolve: {
    alias: {
      '@mui/x-date-pickers': '@mui/x-date-pickers/modern',
    },
  },
});
