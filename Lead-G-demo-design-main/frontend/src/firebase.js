import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

// Firebase configuration
// Note: These are public API keys and are safe to expose in client-side code
const firebaseConfig = {
  apiKey: "AIzaSyCVTBmG1HTmx1Ueu5SYL81yOKvuSyiQYbc",
  authDomain: "lead-g-final.firebaseapp.com",
  databaseURL: "https://lead-g-final-default-rtdb.firebaseio.com",
  projectId: "lead-g-final",
  storageBucket: "lead-g-final.firebasestorage.app",
  messagingSenderId: "774050416171",
  appId: "1:774050416171:web:2936ac9778115fb11e0c6e",
  measurementId: "G-376LGYL832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google provider with flexible settings
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hosted_domain: '' // Allow all domains
});

// Add scopes
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.addScope('openid');

// Configure auth settings for cross-domain compatibility
auth.settings = {
  appVerificationDisabledForTesting: false
};

// Helper function to get backend URL dynamically
export const getBackendUrl = () => {
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
    return 'https://pricing-harmony.preview.emergentagent.com';
  } else {
    // Production fallback
    return 'https://pricing-harmony.preview.emergentagent.com';
  }
};

export { auth, googleProvider, signInWithPopup, signInWithRedirect, getRedirectResult };
export default app;
