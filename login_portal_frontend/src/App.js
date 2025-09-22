import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Security from './pages/Security';
import Settings from './pages/Settings';
import { ThemeProvider } from './theme/ThemeContext';
import { AuthProvider, useAuth } from './utils/auth';

// PUBLIC_INTERFACE
function ProtectedRoute({ children }) {
  /** Ensures a user is authenticated, else redirects to login. */
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

// PUBLIC_INTERFACE
function App() {
  /** Root application component with routing and providers. */
  return (
    <ThemeProvider>
      <div className="app-bg" />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="security" element={<Security />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
