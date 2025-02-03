// Main application entry point
import { SessionManager } from './sessionManager';
import { PageGuard } from './pageGuard';

// Clear any existing session data and initialize session management
SessionManager.init();
PageGuard.init();