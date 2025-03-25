import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin-panel.html'),
        home: resolve(__dirname, 'public/home.html'),
        influencer: resolve(__dirname, 'public/influencer-calculator.html'),
        login: resolve(__dirname, 'public/login.html'),
        profile: resolve(__dirname, 'public/profile.html'),
        stream: resolve(__dirname, 'public/stream-tools.html'),
        tiktok: resolve(__dirname, 'public/tiktok-calculator.html')
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  publicDir: 'public',
  base: './',
  server: {
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    exclude: ['db.js']
  }
});