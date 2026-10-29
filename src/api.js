// Compute normalized API_BASE that reliably ends with /api
let rawBase = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
if (rawBase && !rawBase.endsWith('/api') && !rawBase.endsWith('/api/')) {
  rawBase = rawBase.replace(/\/+$/, '') + '/api';
}
const API_BASE = rawBase.replace(/\/+$/, '');

export async function apiFetch(endpoint, options = {}) {
  // Normalize endpoint: ensure it attaches cleanly to API_BASE without double /api/api
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.slice(4); // Remove redundant '/api'
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${cleanEndpoint}`;
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('salesavatar_admin_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      body: options.body ? (typeof options.body === 'string' ? options.body : JSON.stringify(options.body)) : undefined
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API] fetch to ${url} failed:`, error.message);
    throw error;
  }
}

const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiFetch(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => apiFetch(endpoint, { method: 'PUT', body }),
  patch: (endpoint, body) => apiFetch(endpoint, { method: 'PATCH', body }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' })
};

export default api;
