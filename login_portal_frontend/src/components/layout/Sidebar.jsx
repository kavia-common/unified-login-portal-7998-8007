import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge" />
        <div>
          <div style={{ fontWeight: 900, letterSpacing: '.02em' }}>Rainbow Portal</div>
          <div style={{ fontSize: 12, opacity: .8 }}>Playful & Secure</div>
        </div>
      </div>

      <nav className="nav">
        <NavLink to="/app/dashboard">
          <span>📊</span> Dashboard
        </NavLink>
        <NavLink to="/app/profile">
          <span>👤</span> Profile
        </NavLink>
        <NavLink to="/app/security">
          <span>🔐</span> Security
        </NavLink>
        <NavLink to="/app/settings">
          <span>⚙️</span> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
