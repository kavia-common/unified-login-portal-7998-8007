import React from 'react';
import { useAuth } from '../utils/auth';

const StatCard = ({ label, value, emoji }) => (
  <div className="card">
    <div style={{ fontSize: 20, fontWeight: 800 }}>{emoji} {value}</div>
    <div style={{ opacity: .7, marginTop: 4 }}>{label}</div>
  </div>
);

/**
 * PUBLIC_INTERFACE
 * Dashboard showing a friendly welcome and some playful stats.
 */
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="surface" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span className="kicker">Overview</span>
        <h2 className="title">Welcome back{user?.name ? `, ${user.name}` : ''}! ✨</h2>
      </div>
      <div className="grid-2">
        <StatCard label="Active Sessions" value="3" emoji="💻" />
        <StatCard label="Connected Providers" value="2" emoji="🔗" />
      </div>
    </div>
  );
};

export default Dashboard;
