const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

/**
 * Placeholder fetcher. Swap with axios or real fetch as needed.
 */
async function pretend(delay = 600, data = {}, shouldFail = false) {
  await new Promise((r) => setTimeout(r, delay));
  if (shouldFail) throw new Error('Network error (placeholder).');
  return data;
}

// PUBLIC_INTERFACE
export async function oauthLogin(provider) {
  /** Simulate OAuth login redirect/response cycle. */
  // In a real implementation, redirect to `${API_BASE}/auth/${provider}`
  // and handle the callback to get the user.
  return pretend(800, {
    user: {
      id: 'u_' + provider,
      name: provider === 'github' ? 'Octo Cat' : provider === 'google' ? 'G. User' : 'F. Booker',
      email: provider + '@example.com',
      providers: ['email', provider]
    }
  });
}

// PUBLIC_INTERFACE
export async function emailPasswordLogin(email, password) {
  /** Simulate email/password login. POST to `${API_BASE}/auth/login`. */
  const shouldFail = !(email && password);
  return pretend(700, {
    user: { id: 'u_email', name: 'Rainbow User', email, providers: ['email'] }
  }, shouldFail);
}

// PUBLIC_INTERFACE
export async function emailPasswordSignup(name, email, password) {
  /** Simulate signup. POST to `${API_BASE}/auth/signup`. */
  const shouldFail = !(name && email && password);
  return pretend(900, {
    user: { id: 'u_new', name, email, providers: ['email'] }
  }, shouldFail);
}

// PUBLIC_INTERFACE
export async function updateProfile(profile) {
  /** Simulate profile update. PATCH to `${API_BASE}/me`. */
  return pretend(600, { user: { ...profile, id: 'u_email', providers: ['email'] } });
}

// PUBLIC_INTERFACE
export function listProviders() {
  /** Return connected providers list (placeholder). */
  return ['email', 'google'];
}

// PUBLIC_INTERFACE
export async function changePassword(current, next) {
  /** Simulate password change. POST to `${API_BASE}/me/password`. */
  if (!current || !next) throw new Error('Missing fields');
  return pretend(650, { ok: true });
}

// PUBLIC_INTERFACE
export async function enableTwoFA() {
  /** Simulate starting 2FA setup. POST to `${API_BASE}/me/2fa/start`. */
  return pretend(650, true);
}

// PUBLIC_INTERFACE
export async function revokeSession(id) {
  /** Simulate revoking a session. DELETE `${API_BASE}/me/sessions/${id}` */
  return pretend(450, { revoked: id });
}
