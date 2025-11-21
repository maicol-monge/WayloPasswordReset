// Central API configuration for Waylo Password Reset micro-app
// Reads from .env file: VITE_API_BASE
const apiBase = import.meta.env.VITE_API_BASE || 'https://wayloapi.onrender.com';
export const API_BASE = apiBase.replace(/\/+$/, '') + '/api/waylo';

export async function resetPasswordRequest(token, contrasena) {
  const res = await fetch(`${API_BASE}/auth/password/reset`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ token, contrasena })
  })
  return res.json()
}

// Optional future use to request a reset link
export async function forgotPasswordRequest(email) {
  const res = await fetch(`${API_BASE}/auth/password/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, ...data };
}
