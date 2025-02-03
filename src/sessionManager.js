// Session management
export class SessionManager {
  static init() {
    // Clear any existing session data on initial load
    this.endSession();

    // Add event listener for storage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'isLoggedIn' && e.newValue === null) {
        window.location.href = '/login.html';
      }
    });

    // Check session status on page load
    if (!localStorage.getItem('isLoggedIn')) {
      if (window.location.pathname !== '/login.html') {
        window.location.href = '/login.html';
      }
    }
  }

  static startSession(user) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static endSession() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  static getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch {
      return null;
    }
  }

  static isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}