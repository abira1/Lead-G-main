import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const getBackendUrl = () => {
    // Try different sources for backend URL
    const envUrl = process.env.REACT_APP_BACKEND_URL;
    
    if (envUrl) {
      return envUrl;
    }
    
    // Fallback based on current domain
    const currentHost = window.location.host;
    
    if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
      return 'http://localhost:8001';
    } else if (currentHost.includes('preview.emergentagent.com')) {
      return 'https://homepage-hero-edit.preview.emergentagent.com';
    } else {
      // Production fallback
      return 'https://homepage-hero-edit.preview.emergentagent.com';
    }
  };

  const verifyToken = async (tokenToVerify) => {
    try {
      const backendUrl = getBackendUrl();
      console.log('Verifying token with backend:', backendUrl);
      
      const response = await fetch(`${backendUrl}/api/admin/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
      });

      console.log('Token verification response status:', response.status);

      if (response.ok) {
        setToken(tokenToVerify);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', tokenToVerify);
      } else {
        // Token is invalid, remove it
        console.log('Token verification failed');
        localStorage.removeItem('admin_token');
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('admin_token');
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Email:', email);
      console.log('Password length:', password ? password.length : 0);
      
      const backendUrl = getBackendUrl();
      console.log('Backend URL:', backendUrl);
      const fullUrl = `${backendUrl}/api/admin/login`;
      console.log('Full API URL:', fullUrl);
      
      const requestBody = JSON.stringify({ email, password });
      console.log('Request body:', requestBody);
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: requestBody,
      });
      
      console.log('Fetch completed');

      console.log('Login response status:', response.status);
      console.log('Login response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        return { success: false, error: 'Server returned invalid response. Please check server status.' };
      }

      const data = await response.json();
      console.log('Login response data:', data);

      if (response.ok) {
        console.log('Login successful! Setting token...');
        setToken(data.access_token);
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', data.access_token);
        console.log('Token set, authentication complete');
        return { success: true };
      } else {
        console.log('Login failed with response:', response.status, data);
        return { success: false, error: data.detail || data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('=== LOGIN ERROR ===', error);
      
      if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        return { success: false, error: 'Cannot connect to server. Please check if the server is running.' };
      } else if (error.message?.includes('JSON')) {
        return { success: false, error: 'Server returned invalid response. Please try again.' };
      } else {
        return { success: false, error: 'Network error. Please try again.' };
      }
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('admin_token');
  };

  const value = {
    isAuthenticated,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};