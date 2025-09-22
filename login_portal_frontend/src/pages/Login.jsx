import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { oauthLogin, emailPasswordLogin, emailPasswordSignup } from '../utils/api';
import { useAuth } from '../utils/auth';

/**
 * PUBLIC_INTERFACE
 * Login page with OAuth providers and email/password forms.
 * Placeholder API calls are used and can be wired to a real backend.
 */
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProvider = async (provider) => {
    setError('');
    setLoading(true);
    try {
      const result = await oauthLogin(provider);
      setUser(result.user);
      navigate('/app/dashboard', { replace: true });
    } catch (e) {
      setError(e.message || 'OAuth failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result =
        mode === 'login'
          ? await emailPasswordLogin(form.email, form.password)
          : await emailPasswordSignup(form.name, form.email, form.password);
      setUser(result.user);
      navigate('/app/dashboard', { replace: true });
    } catch (e) {
      setError(e.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div className="login-hero" style={{ maxWidth: 1080, width: '100%' }}>
        <div className="hero-card surface">
          <span className="kicker">Welcome</span>
          <h1 className="title">Rainbow Login Portal</h1>
          <p className="subtitle">
            A playful, vibrant authentication experience. Sign in securely with your favorite
            provider or classic email and password.
          </p>
          <hr className="sep" />
          <div className="grid-2">
            <div className="card">
              <h3 style={{ marginBottom: 10 }}>One‑click Sign in</h3>
              <div className="provider-grid">
                <button
                  className="btn btn-outline oauth-btn btn-block"
                  onClick={() => handleProvider('google')}
                  disabled={loading}
                >
                  <span>🔎</span> Continue with Google
                </button>
                <button
                  className="btn btn-outline oauth-btn btn-block"
                  onClick={() => handleProvider('github')}
                  disabled={loading}
                >
                  <span>🐙</span> Continue with GitHub
                </button>
                <button
                  className="btn btn-outline oauth-btn btn-block"
                  onClick={() => handleProvider('facebook')}
                  disabled={loading}
                >
                  <span>📘</span> Continue with Facebook
                </button>
              </div>
            </div>
            <div className="card">
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <button
                  className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </div>

              <form className="form" onSubmit={handleEmailPassword}>
                {mode === 'signup' && (
                  <label className="field">
                    <span>Name</span>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      placeholder="Rainbow Unicorn"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </label>
                )}
                <label className="field">
                  <span>Email</span>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="you@rainbow.dev"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </label>
                {error && (
                  <div style={{ color: '#EF4444', fontWeight: 700 }}>
                    {error}
                  </div>
                )}
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>
            </div>
          </div>
          <hr className="sep" />
          <small style={{ opacity: .75 }}>
            By continuing you agree to our playful terms and rainbow policy.
          </small>
        </div>

        <div className="login-card surface">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, lineHeight: 1 }}>🌈</div>
            <h3 style={{ marginBottom: 8 }}>Rainbow Burst</h3>
            <p style={{ opacity: .75 }}>
              Vibrant, energetic theme with gradients, rounded corners, and delightful details.
            </p>
            <hr className="sep" />
            <ul className="list">
              <li>• OAuth with Google, GitHub, Facebook</li>
              <li>• Profile management</li>
              <li>• Security settings with 2FA placeholder</li>
              <li>• Responsive sidebar layout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
