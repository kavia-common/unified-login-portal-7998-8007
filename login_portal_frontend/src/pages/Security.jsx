import React, { useState } from 'react';
import { changePassword, listProviders, enableTwoFA, revokeSession } from '../utils/api';

/**
 * PUBLIC_INTERFACE
 * Security page for password change, 2FA placeholder, sessions, and providers.
 */
const Security = () => {
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });
  const [changing, setChanging] = useState(false);
  const [msg, setMsg] = useState('');
  const [providers] = useState(listProviders());
  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'MacOS Chrome', location: 'NY, USA', current: true },
    { id: 'sess-2', device: 'Windows Edge', location: 'TX, USA', current: false }
  ]);

  const onChangePwd = async (e) => {
    e.preventDefault();
    setChanging(true);
    setMsg('');
    try {
      await changePassword(passwordForm.current, passwordForm.next);
      setMsg('Password updated successfully!');
      setPasswordForm({ current: '', next: '' });
    } catch (e1) {
      setMsg(e1.message || 'Password update failed');
    } finally {
      setChanging(false);
    }
  };

  const onEnable2FA = async () => {
    const ok = await enableTwoFA();
    setMsg(ok ? '2FA setup link sent (placeholder).' : 'Failed to start 2FA setup.');
  };

  const onRevoke = async (id) => {
    await revokeSession(id);
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="surface" style={{ padding: 20 }}>
      <span className="kicker">Security</span>
      <h2 className="title">Protect your account</h2>
      <hr className="sep" />

      <div className="grid-2">
        <div className="card">
          <h3>Change password</h3>
          <form className="form" onSubmit={onChangePwd}>
            <label className="field">
              <span>Current password</span>
              <input className="input" type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} required />
            </label>
            <label className="field">
              <span>New password</span>
              <input className="input" type="password" value={passwordForm.next} onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })} required />
            </label>
            <button className="btn btn-primary" disabled={changing}>{changing ? 'Updating…' : 'Update password'}</button>
          </form>
        </div>

        <div className="card">
          <h3>Two‑Factor Authentication</h3>
          <p style={{ opacity: .75, marginBottom: 8 }}>
            Add an extra layer of security to your account. This is a placeholder that should be wired to backend.
          </p>
          <button className="btn btn-outline" onClick={onEnable2FA}>Start 2FA Setup</button>
        </div>
      </div>

      <hr className="sep" />

      <div className="grid-2">
        <div className="card">
          <h3>Sessions</h3>
          <ul className="list">
            {sessions.map(s => (
              <li key={s.id} className="surface" style={{ padding: 12, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{s.device}</strong> — <span style={{ opacity: .7 }}>{s.location}</span>
                    {s.current && <span className="kicker" style={{ marginLeft: 8 }}>Current</span>}
                  </div>
                  {!s.current && <button className="btn btn-outline" onClick={() => onRevoke(s.id)}>Revoke</button>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Connected Providers</h3>
          <ul className="list">
            {providers.map(p => (
              <li key={p} className="surface" style={{ padding: 12, borderRadius: 12 }}>
                <strong>{p}</strong>
                <span style={{ marginLeft: 8, opacity: .7 }}>linked</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {msg && (
        <>
          <hr className="sep" />
          <div style={{ fontWeight: 700, color: msg.includes('success') || msg.includes('sent') ? '#10B981' : '#EF4444' }}>{msg}</div>
        </>
      )}
    </div>
  );
};

export default Security;
