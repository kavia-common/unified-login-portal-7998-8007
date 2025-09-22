import React, { useState } from 'react';
import { useAuth } from '../utils/auth';
import { updateProfile } from '../utils/api';

/**
 * PUBLIC_INTERFACE
 * Profile page to display and edit user info.
 */
const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const updated = await updateProfile(form);
      setUser(updated.user);
      setMsg('Profile updated successfully!');
    } catch (err) {
      setMsg(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="surface" style={{ padding: 20 }}>
      <span className="kicker">Profile</span>
      <h2 className="title">Your information</h2>
      <hr className="sep" />
      <form className="form" onSubmit={onSave}>
        <label className="field">
          <span>Name</span>
          <input className="input" name="name" value={form.name} onChange={onChange} />
        </label>
        <label className="field">
          <span>Email</span>
          <input className="input" name="email" type="email" value={form.email} onChange={onChange} />
        </label>
        <label className="field">
          <span>Bio</span>
          <textarea className="input" name="bio" rows={4} value={form.bio} onChange={onChange} />
        </label>
        {msg && <div style={{ fontWeight: 700, color: msg.includes('success') ? '#10B981' : '#EF4444' }}>{msg}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          <button className="btn btn-outline" type="button" onClick={() => setForm({ name: user?.name || '', email: user?.email || '', bio: user?.bio || '' })}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
