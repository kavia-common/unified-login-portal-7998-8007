import React from 'react';
import { useAuth } from '../../utils/auth';
import { useTheme } from '../../theme/ThemeContext';

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="status-pill">
        <span>●</span> {user ? 'Signed In' : 'Guest'}
      </div>

      <div className="profile-menu">
        <button className="btn btn-outline" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="avatar" />
        <div>
          <div style={{ fontWeight: 700 }}>{user?.name || 'Guest'}</div>
          <div style={{ fontSize: 12, opacity: .7 }}>{user?.email || 'Not signed in'}</div>
        </div>
        {user && (
          <button className="btn btn-primary" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Topbar;
