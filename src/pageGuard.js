// Page access control
import { SessionManager } from './sessionManager';

export class PageGuard {
  static adminPages = ['/admin-panel.html'];
  static authPages = [
    '/home.html',
    '/index.html',
    '/influencer-calculator.html',
    '/tiktok-calculator.html',
    '/profile.html'
  ];

  static init() {
    const currentPath = window.location.pathname;
    
    // Allow access to login page
    if (currentPath === '/login.html') {
      if (SessionManager.isAuthenticated()) {
        window.location.href = '/home.html';
      }
      return;
    }

    // Check authentication for protected pages
    if (this.authPages.includes(currentPath)) {
      if (!SessionManager.isAuthenticated()) {
        window.location.href = '/login.html';
        return;
      }
    }

    // Check admin access
    if (this.adminPages.includes(currentPath)) {
      const user = SessionManager.getCurrentUser();
      if (!user || user.role !== 'admin') {
        window.location.href = '/login.html';
        return;
      }
    }
  }
}