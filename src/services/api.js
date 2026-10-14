/**
 * Sovereign2Fresh Empire - API Client Service
 * Connects the React frontend with the Laravel REST API backend.
 */

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === ''
);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (!isLocalhost ? '/api/v1' : 'http://localhost:8000/api/v1');


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

/**
 * Upload media file (image) from Admin CMS.
 * Sends multipart/form-data to Laravel API, with automatic local DataURL fallback.
 */
export async function uploadMedia(file, token, folder = 'cms') {
  if (!file) throw new Error('No file provided for upload.');

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const headers = {};
    if (token && !token.startsWith('local_master_token_')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/admin/media/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      if (result.data?.url) {
        return result.data.url;
      }
    } else if (response.status === 422) {
      const result = await response.json().catch(() => ({}));
      const errorMsg = result.message || (result.errors ? Object.values(result.errors).flat().join(', ') : 'Image upload validation failed.');
      throw new Error(errorMsg);
    }
  } catch (err) {
    if (err.message && !err.message.includes('fetch')) {
      throw err;
    }
    console.warn('[uploadMedia] Remote upload failed or server unreachable, falling back to local reader:', err);
  }

  // Fallback: convert directly to base64 DataURL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
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
  uploadMedia,
  fetchAdminInquiries,
  updateInquiryStatus,
  fetchAdminConsultations,
  updateConsultationStatus,
  fetchAdminSubscribers,
};


