/**
 * SalesAvatar — Frontend API & Lead Dispatcher Client
 * Backend and Admin Panel removed; all inquiries are dispatched directly in mail format.
 */

import { sendLeadEmail, RECIPIENT_EMAIL, generateMailtoUrl } from './services/leadService';

export { sendLeadEmail, RECIPIENT_EMAIL, generateMailtoUrl };

export async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Direct lead submission endpoints to mail service
  if (
    cleanEndpoint.includes('trial-signup') ||
    cleanEndpoint.includes('demo') ||
    cleanEndpoint.includes('contact') ||
    cleanEndpoint.includes('leads')
  ) {
    const leadData = typeof options.body === 'string' ? JSON.parse(options.body || '{}') : (options.body || {});
    const result = await sendLeadEmail(leadData);
    return {
      success: true,
      message: `Inquiry successfully formatted and dispatched to ${RECIPIENT_EMAIL}`,
      ...result
    };
  }

  // Fallback for any other requests
  return { success: true };
}

const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => apiFetch(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => apiFetch(endpoint, { method: 'PUT', body }),
  patch: (endpoint, body) => apiFetch(endpoint, { method: 'PATCH', body }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' })
};

export default api;
