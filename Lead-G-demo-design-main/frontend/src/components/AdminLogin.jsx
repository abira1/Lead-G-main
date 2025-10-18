import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { Button } from './ui/button';
import GlassBox from './GlassBox';
import ScrollReveal from './ScrollReveal';
import { useAuth } from '../contexts/AuthContext';
import { auth, googleProvider, signInWithPopup, getBackendUrl } from '../firebase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION ===');
    console.log('Email:', email);
    console.log('Password length:', password ? password.length : 0);
    
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    console.log('Calling login function...');
    const result = await login(email, password);
    console.log('Login result:', result);
    
    if (!result.success) {
      console.log('Login failed:', result.error);
      setError(result.error);
    } else {
      console.log('Login successful!');
    }
    
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Attempting Google Sign-In...');
      
      // Try popup method first, fallback to redirect if blocked
      let result;
      try {
        result = await signInWithPopup(auth, googleProvider);
      } catch (popupError) {
        console.error('Popup blocked or failed:', popupError);
        
        // Check if it's a popup blocker or CORS issue
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.message?.includes('Cross-Origin-Opener-Policy')) {
          
          setError('Popup blocked. Please allow popups for this site or try refreshing the page.');
          setIsLoading(false);
          return;
        } else {
          throw popupError;
        }
      }
      
      const user = result.user;
      console.log('Google sign-in successful for:', user.email);
      
      // Verify the user email is authorized
      const authorizedEmails = [
        'toiral.dev@gmail.com',
        'mdrudra60@gmail.com'
      ];
      
      if (authorizedEmails.includes(user.email)) {
        // Get the Firebase ID token
        const idToken = await user.getIdToken();
        console.log('Got Firebase ID token, authenticating with backend...');
        
        // Authenticate with our backend
        const backendUrl = getBackendUrl();
        console.log('Backend URL:', backendUrl);
        
        const response = await fetch(`${backendUrl}/api/admin/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          mode: 'cors',
          credentials: 'omit',
          body: JSON.stringify({ 
            idToken: idToken,
            email: user.email 
          }),
        });

        console.log('Backend response status:', response.status);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const textResponse = await response.text();
          console.error('Non-JSON response received:', textResponse);
          throw new Error('Server returned invalid response. Please check server status.');
        }
        
        const data = await response.json();
        console.log('Backend response data:', data);

        if (response.ok) {
          // Store the token and redirect
          localStorage.setItem('admin_token', data.access_token);
          console.log('Login successful, redirecting...');
          window.location.href = '/admin';
        } else {
          throw new Error(data.detail || 'Backend authentication failed');
        }
      } else {
        throw new Error('Unauthorized email. Only admin accounts can access this panel.');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      
      if (error.message?.includes('NetworkError') || error.message?.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site and try again.');
      } else {
        setError(error.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="/lead-g-logo.png" 
                alt="Lead G Logo" 
                className="w-10 h-10"
              />
              <h1 className="text-3xl lg:text-4xl font-bold text-white">
                Lead G
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Admin <span className="text-[#00FFD1]">Login</span>
            </h2>
            <p className="text-white/70">
              Enter your credentials to access the admin panel
            </p>
          </div>
        </ScrollReveal>

        {/* Login Form */}
        <ScrollReveal delay={0.4}>
          <GlassBox className="p-8" blur={20} opacity={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#00FFD1] transition-all duration-300 rounded-none"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#00FFD1] text-black font-medium hover:bg-[#00FFD1]/90 transition-all duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-white/50">Or continue with</span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3 bg-white text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300 rounded-none border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </div>
                )}
              </Button>

            </form>
          </GlassBox>
        </ScrollReveal>

        {/* Help Text */}
        <ScrollReveal delay={0.6}>
          <div className="text-center mt-6">
            <p className="text-sm text-white/50">
              Contact system administrator if you need access
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default AdminLogin;