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

/**
 * Admin Authentication
 */
export async function loginAdmin(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Fetch all CMS sections
 */
export async function fetchCmsContent() {
  return request('/content', { method: 'GET' });
}

/**
 * Save single CMS section (protected)
 */
export async function saveCmsSection(key, data, token) {
  return request(`/admin/content/${key}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({ data }),
  });
}

/**
 * Bulk save all CMS sections (protected)
 */
export async function bulkSaveCms(sections, token) {
  return request('/admin/content', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({ sections }),
  });
}

/**
 * Fetch inquiries for admin dashboard
 */
export async function fetchAdminInquiries(token) {
  return request('/admin/inquiries', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(id, status, token) {
  return request(`/admin/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({ status }),
  });
}

/**
 * Fetch consultations for admin dashboard
 */
export async function fetchAdminConsultations(token) {
  return request('/admin/consultations', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/**
 * Update consultation status
 */
export async function updateConsultationStatus(id, status, token) {
  return request(`/admin/consultations/${id}/status`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({ status }),
  });
}

/**
 * Fetch subscribers for admin dashboard
 */
export async function fetchAdminSubscribers(token) {
  return request('/admin/subscribers', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export default {
  checkApiHealth,
  submitInquiry,
  bookConsultation,
  subscribeNewsletter,
  loginAdmin,
  fetchCmsContent,
  saveCmsSection,
  bulkSaveCms,
  fetchAdminInquiries,
  updateInquiryStatus,
  fetchAdminConsultations,
  updateConsultationStatus,
  fetchAdminSubscribers,
};

