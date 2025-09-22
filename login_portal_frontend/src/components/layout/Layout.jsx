import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Layout for the protected app area with sidebar/topbar and main content.
 */
const Layout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <Topbar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
