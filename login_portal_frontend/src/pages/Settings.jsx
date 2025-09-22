import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Generic settings page placeholder.
 */
const Settings = () => {
  return (
    <div className="surface" style={{ padding: 20 }}>
      <span className="kicker">Settings</span>
      <h2 className="title">Application preferences</h2>
      <hr className="sep" />
      <div className="grid-2">
        <div className="card">
          <h3>Notifications</h3>
          <p style={{ opacity: .75 }}>Enable email alerts and playful confetti on success.</p>
          <button className="btn btn-outline">Configure</button>
        </div>
        <div className="card">
          <h3>Accessibility</h3>
          <p style={{ opacity: .75 }}>High contrast mode, bigger fonts, and reduced motion.</p>
          <button className="btn btn-outline">Configure</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
