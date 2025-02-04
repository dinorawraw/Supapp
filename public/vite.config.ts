import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'public/admin-panel.html',
        home: 'public/home.html',
        influencer: 'public/influencer-calculator.html',
        login: 'public/login.html',
        profile: 'public/profile.html',
        stream: 'public/stream-tools.html',
        tiktok: 'public/tiktok-calculator.html'
      }
    }
  }
});