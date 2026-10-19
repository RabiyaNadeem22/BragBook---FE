const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiError extends Error {
  constructor(message, status, data = null, errors = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}

/**
 * Universal fetch wrapper for BragBook API
 * @param {string} endpoint
 * @param {RequestInit} [options={}]
 * @returns {Promise<any>}
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
    credentials: 'include', // Always send HTTP-only cookies
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({
      success: response.ok,
      message: response.statusText,
    }));

    if (!response.ok) {
      throw new ApiError(
        result.message || 'An error occurred while communicating with the server',
        response.status,
        result.data || null,
        result.errors || null
      );
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network connection failed', 0);
  }
}

export const api = {
  get: (url, options) => apiClient(url, { ...options, method: 'GET' }),
  post: (url, body, options) => apiClient(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => apiClient(url, { ...options, method: 'PUT', body }),
  patch: (url, body, options) => apiClient(url, { ...options, method: 'PATCH', body }),
  delete: (url, options) => apiClient(url, { ...options, method: 'DELETE' }),
};
