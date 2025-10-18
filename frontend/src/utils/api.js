/**
 * Get the backend API URL based on environment
 * @returns {string} The backend URL
 */
export const getBackendUrl = () => {
  // Try environment variable first
  const envUrl = process.env.REACT_APP_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }
  
  // Fallback based on current domain
  const currentHost = window.location.host;
  
  if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
    return 'http://localhost:8001';
  }
  
  // For preview/production, use same origin (Kubernetes ingress routes /api to backend)
  return window.location.origin;
};

/**
 * Make an API request to the backend
 * @param {string} endpoint - The API endpoint (e.g., '/api/appointments')
 * @param {object} options - Fetch options
 * @returns {Promise<any>} The response data
 */
export const apiRequest = async (endpoint, options = {}) => {
  const backendUrl = getBackendUrl();
  const url = `${backendUrl}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || `Request failed: ${response.status}`);
  }
  
  return response.json();
};
