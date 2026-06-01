const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function token() { return localStorage.getItem('token'); }

async function req<T>(path: string, opts: RequestInit = {}): Promise<T> {
  const t = token();
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(t ? { Authorization: `Bearer ${t}` } : {}), ...(opts.headers || {}) },
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(e.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  get: <T>(p: string) => req<T>(p),
  post: <T>(p: string, b: unknown) => req<T>(p, { method: 'POST', body: JSON.stringify(b) }),
};
