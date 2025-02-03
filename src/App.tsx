import React, { useEffect, useState } from 'react';
import { isAuthenticated, getCurrentUser, logout } from './auth';

function App() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    // Check authentication on mount
    if (!isAuthenticated()) {
      window.location.href = '/login.html';
      return;
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04456c] via-[#391334] to-[#04244c]">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info and logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || 'User'}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '/profile.html'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => window.location.href = '/index.html'}
            className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all"
          >
            Calculadora de Publis
          </button>
          
          <button
            className="p-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all"
          >
            Ferramentas para Streams (Em breve)
          </button>
          
          <button
            className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all"
          >
            Conteúdo para Criadores (Em breve)
          </button>
          
          <button
            className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white text-xl font-bold hover:opacity-90 transition-all"
          >
            Sets de Iluminação (Em breve)
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;