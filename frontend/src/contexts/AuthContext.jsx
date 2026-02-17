import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../firebase';
import { loginAdmin, logoutAdmin, checkAdminStatus } from '../services/firebaseService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Monitor Firebase Auth state changes
  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('admin_token');
    const storedEmail = localStorage.getItem('admin_email');
    
    if (storedToken && storedEmail) {
      console.log('🔑 Found stored admin token for:', storedEmail);
      setToken(storedToken);
    }
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user?.email || 'No user');
      setError(null);
      
      if (user) {
        setCurrentUser(user);
        
        // Check if user is admin
        const adminCheck = await checkAdminStatus(user);
        if (adminCheck.success && adminCheck.isAdmin) {
          setIsAuthenticated(true);
          setIsAdmin(true);
          
          // Get token from localStorage
          const storedToken = localStorage.getItem('admin_token');
          if (storedToken) {
            setToken(storedToken);
            console.log('✅ Admin user authenticated with token:', user.email);
          } else {
            console.log('⚠️ Admin authenticated but no token found');
          }
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setToken(null);
          console.log('❌ User is not an admin:', user.email);
          // Sign out non-admin users
          await logoutAdmin();
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setToken(null);
        console.log('👤 No user authenticated');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔑 Attempting admin login:', email);
      
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        console.log('✅ Login successful');
        // The onAuthStateChanged will handle setting the user state
        return { success: true, data: result.data };
      } else {
        console.log('❌ Login failed:', result.error);
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      const errorMessage = 'An unexpected error occurred during login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚪 Logging out admin');
      
      const result = await logoutAdmin();
      
      if (result.success) {
        console.log('✅ Logout successful');
        // The onAuthStateChanged will handle clearing the user state
        return { success: true };
      } else {
        console.log('❌ Logout failed:', result.error);
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('🚨 Logout error:', error);
      const errorMessage = 'An error occurred during logout';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    // User state
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    
    // Methods
    login,
    logout,
    clearError,
    
    // Legacy compatibility (for existing components)
    token: currentUser?.accessToken || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};