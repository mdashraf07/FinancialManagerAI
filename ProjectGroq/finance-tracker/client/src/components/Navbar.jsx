import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold">💰 FinanceAI</span>
        <Link
          to="/"
          className={`text-sm px-3 py-1 rounded-lg transition ${
            isActive('/') ? 'bg-indigo-800' : 'hover:bg-indigo-500'
          }`}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/ai"
          className={`text-sm px-3 py-1 rounded-lg transition ${
            isActive('/ai') ? 'bg-indigo-800' : 'hover:bg-indigo-500'
          }`}
        >
          🤖 AI Insights
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-indigo-200">👤 {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-indigo-800 px-4 py-1 rounded-lg hover:bg-indigo-900 text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
