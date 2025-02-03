// Authentication utilities
export const AUTH_KEY = 'isLoggedIn';
export const CURRENT_USER_KEY = 'currentUser';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    return null;
  }
}

export function login(user) {
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = '/login.html';
}

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

export function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}