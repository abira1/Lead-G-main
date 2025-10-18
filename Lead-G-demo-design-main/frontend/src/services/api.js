/**
 * API service for communicating with the Lead G backend
 * Centralized HTTP client with error handling and request/response interceptors
 */

import axios from 'axios';

// Get backend URL from environment variables
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth tokens or logging
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (process.env.REACT_APP_ENVIRONMENT === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.REACT_APP_ENVIRONMENT === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error(`❌ API Error: ${error.response.status} - ${error.response.data?.message || error.message}`);
    } else if (error.request) {
      // Network error - no response received
      console.error('❌ Network Error: No response from server');
    } else {
      // Other error
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * API Service Class
 * Contains all API endpoints organized by feature
 */
class ApiService {
  
  // Health Check Endpoints
  async healthCheck() {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Health check failed');
    }
  }

  async detailedHealthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Detailed health check failed');
    }
  }

  // Status Check Endpoints
  async createStatusCheck(data) {
    try {
      const response = await apiClient.post('/api/status', data);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create status check');
    }
  }

  async getStatusChecks(limit = 100) {
    try {
      const response = await apiClient.get('/api/status', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch status checks');
    }
  }

  // Contact Form Endpoints
  async submitContactForm(formData) {
    try {
      const response = await apiClient.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to submit contact form');
    }
  }

  async getContactForms(limit = 100, statusFilter = null) {
    try {
      const params = { limit };
      if (statusFilter) {
        params.status_filter = statusFilter;
      }
      
      const response = await apiClient.get('/api/contact', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch contact forms');
    }
  }

  // Error handling helper
  handleError(error, defaultMessage) {
    let errorMessage = defaultMessage;
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error.response) {
      // Server error with response
      const { status, data } = error.response;
      errorMessage = data?.message || data?.detail || `Server error: ${status}`;
      errorCode = `HTTP_${status}`;
    } else if (error.request) {
      // Network error
      errorMessage = 'Unable to connect to server. Please check your internet connection.';
      errorCode = 'NETWORK_ERROR';
    } else {
      // Other errors
      errorMessage = error.message || defaultMessage;
      errorCode = 'CLIENT_ERROR';
    }

    return {
      message: errorMessage,
      code: errorCode,
      originalError: error
    };
  }
}

// Create and export singleton instance
const apiService = new ApiService();

export default apiService;

// Export individual methods for convenience
export const {
  healthCheck,
  detailedHealthCheck,
  createStatusCheck,
  getStatusChecks,
  submitContactForm,
  getContactForms
} = apiService;