/**
 * Sovereign2Fresh Empire - API Client Service
 * Connects the React frontend with the Laravel REST API backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Standard HTTP request wrapper with JSON headers & error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || (data.errors ? Object.values(data.errors).flat().join(', ') : 'An unexpected server error occurred.');
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    throw err;
  }
}

/**
 * Check backend health status
 */
export async function checkApiHealth() {
  return request('/health', { method: 'GET' });
}

/**
 * Submit general contact & enterprise inquiry form
 */
export async function submitInquiry(payload) {
  return request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Book technical discovery consultation (from Discovery Modal)
 */
export async function bookConsultation(payload) {
  return request('/consultations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Subscribe to newsletters & engineering insights
 */
export async function subscribeNewsletter(email, source = 'website') {
  return request('/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email, source }),
  });
}

export default {
  checkApiHealth,
  submitInquiry,
  bookConsultation,
  subscribeNewsletter,
};
