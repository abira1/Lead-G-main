/**
 * Firebase Service Layer for Lead G
 * Handles all Firebase operations: Realtime Database, Authentication, Storage
 * Replaces backend API calls with direct Firebase SDK usage
 */

import { 
  database, 
  auth,
  storage,
  ref, 
  set, 
  get, 
  update, 
  remove, 
  push,
  query,
  orderByChild,
  orderByKey,
  signInWithEmailAndPassword,
  signOut,
  googleProvider,
  signInWithPopup,
  storageRef,
  uploadBytes,
  getDownloadURL
} from '../firebase';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Handle Firebase errors with user-friendly messages
 */
const handleFirebaseError = (error, operation) => {
  console.error(`Firebase Error in ${operation}:`, error);
  
  // Common Firebase error messages
  const errorMap = {
    'auth/invalid-email': 'Invalid email address format',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'permission-denied': 'Permission denied. Please check your credentials',
    'network-error': 'Network error. Please check your connection'
  };
  
  return errorMap[error.code] || error.message || 'An unexpected error occurred';
};

/**
 * Generate timestamp in ISO format
 */
const getTimestamp = () => new Date().toISOString();

// ============================================
// APPOINTMENTS MANAGEMENT
// ============================================

/**
 * Create new appointment
 */
export const createAppointment = async (appointmentData) => {
  try {
    const appointmentsRef = ref(database, 'appointments');
    const newAppointmentRef = push(appointmentsRef);
    const id = newAppointmentRef.key;
    
    const appointment = {
      id,
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
      company: appointmentData.company || '',
      appointment_date: appointmentData.appointment_date,
      appointment_time: appointmentData.appointment_time,
      message: appointmentData.message || '',
      status: 'pending',
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    
    await set(newAppointmentRef, appointment);
    console.log('✅ Appointment created:', appointment);
    return { success: true, data: appointment };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'createAppointment');
    return { success: false, error: errorMessage };
  }
};

/**
 * Get all appointments with optional status filter
 */
export const getAppointments = async (statusFilter = null) => {
  try {
    const appointmentsRef = ref(database, 'appointments');
    const snapshot = await get(appointmentsRef);
    
    if (!snapshot.exists()) {
      return { success: true, data: [] };
    }
    
    let appointments = [];
    snapshot.forEach((childSnapshot) => {
      appointments.push(childSnapshot.val());
    });
    
    // Filter by status if provided
    if (statusFilter) {
      appointments = appointments.filter(apt => apt.status === statusFilter);
    }
    
    // Sort by created_at descending (newest first)
    appointments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    console.log(`✅ Retrieved ${appointments.length} appointments`);
    return { success: true, data: appointments };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'getAppointments');
    return { success: false, error: errorMessage };
  }
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const appointmentRef = ref(database, `appointments/${appointmentId}`);
    await update(appointmentRef, { 
      status,
      updated_at: getTimestamp()
    });
    console.log(`✅ Appointment ${appointmentId} status updated to ${status}`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'updateAppointmentStatus');
    return { success: false, error: errorMessage };
  }
};

/**
 * Delete appointment
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    const appointmentRef = ref(database, `appointments/${appointmentId}`);
    await remove(appointmentRef);
    console.log(`✅ Appointment ${appointmentId} deleted`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'deleteAppointment');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// CONTACT FORMS MANAGEMENT
// ============================================

/**
 * Submit contact form
 */
export const submitContactForm = async (contactData) => {
  try {
    const contactsRef = ref(database, 'contact_forms');
    const newContactRef = push(contactsRef);
    const id = newContactRef.key;
    
    const contact = {
      id,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone || '',
      company: contactData.company || '',
      subject: contactData.subject || '',
      message: contactData.message,
      status: 'new',
      submitted_at: getTimestamp()
    };
    
    await set(newContactRef, contact);
    console.log('✅ Contact form submitted:', contact);
    return { success: true, data: contact };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'submitContactForm');
    return { success: false, error: errorMessage };
  }
};

/**
 * Get all contact forms
 */
export const getContactForms = async (statusFilter = null) => {
  try {
    const contactsRef = ref(database, 'contact_forms');
    const snapshot = await get(contactsRef);
    
    if (!snapshot.exists()) {
      return { success: true, data: [] };
    }
    
    let contacts = [];
    snapshot.forEach((childSnapshot) => {
      contacts.push(childSnapshot.val());
    });
    
    // Filter by status if provided
    if (statusFilter) {
      contacts = contacts.filter(contact => contact.status === statusFilter);
    }
    
    // Sort by submitted_at descending
    contacts.sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
    
    console.log(`✅ Retrieved ${contacts.length} contact forms`);
    return { success: true, data: contacts };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'getContactForms');
    return { success: false, error: errorMessage };
  }
};

/**
 * Update contact form status
 */
export const updateContactFormStatus = async (contactId, status) => {
  try {
    const contactRef = ref(database, `contact_forms/${contactId}`);
    await update(contactRef, { status });
    console.log(`✅ Contact form ${contactId} status updated to ${status}`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'updateContactFormStatus');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// TESTIMONIALS MANAGEMENT
// ============================================

/**
 * Get all testimonials
 */
export const getTestimonials = async () => {
  try {
    const testimonialsRef = ref(database, 'testimonials');
    const snapshot = await get(testimonialsRef);
    
    if (!snapshot.exists()) {
      return { success: true, data: [] };
    }
    
    const testimonials = [];
    snapshot.forEach((childSnapshot) => {
      testimonials.push(childSnapshot.val());
    });
    
    // Sort by display_order, then by created_at descending
    testimonials.sort((a, b) => {
      if (a.display_order !== undefined && b.display_order !== undefined) {
        return a.display_order - b.display_order;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });
    
    console.log(`✅ Retrieved ${testimonials.length} testimonials`);
    return { success: true, data: testimonials };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'getTestimonials');
    return { success: false, error: errorMessage };
  }
};

/**
 * Create new testimonial
 */
export const createTestimonial = async (testimonialData) => {
  try {
    const testimonialsRef = ref(database, 'testimonials');
    const newTestimonialRef = push(testimonialsRef);
    const id = newTestimonialRef.key;
    
    const testimonial = {
      id,
      client_name: testimonialData.client_name,
      company: testimonialData.company,
      position: testimonialData.position || '',
      testimonial_text: testimonialData.testimonial_text,
      rating: testimonialData.rating || 5,
      display_order: testimonialData.display_order || 0,
      is_featured: testimonialData.is_featured || false,
      image_url: testimonialData.image_url || '',
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    
    await set(newTestimonialRef, testimonial);
    console.log('✅ Testimonial created:', testimonial);
    return { success: true, data: testimonial };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'createTestimonial');
    return { success: false, error: errorMessage };
  }
};

/**
 * Update testimonial
 */
export const updateTestimonial = async (testimonialId, testimonialData) => {
  try {
    const testimonialRef = ref(database, `testimonials/${testimonialId}`);
    const updateData = {
      ...testimonialData,
      updated_at: getTimestamp()
    };
    await update(testimonialRef, updateData);
    console.log(`✅ Testimonial ${testimonialId} updated`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'updateTestimonial');
    return { success: false, error: errorMessage };
  }
};

/**
 * Delete testimonial
 */
export const deleteTestimonial = async (testimonialId) => {
  try {
    const testimonialRef = ref(database, `testimonials/${testimonialId}`);
    await remove(testimonialRef);
    console.log(`✅ Testimonial ${testimonialId} deleted`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'deleteTestimonial');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// WORKED WITH COMPANIES MANAGEMENT
// ============================================

/**
 * Get all worked with companies
 */
export const getWorkedWithCompanies = async () => {
  try {
    const companiesRef = ref(database, 'worked_with_companies');
    const snapshot = await get(companiesRef);
    
    if (!snapshot.exists()) {
      return { success: true, data: [] };
    }
    
    const companies = [];
    snapshot.forEach((childSnapshot) => {
      companies.push(childSnapshot.val());
    });
    
    // Sort by display_order, then by created_at
    companies.sort((a, b) => {
      if (a.display_order !== undefined && b.display_order !== undefined) {
        return a.display_order - b.display_order;
      }
      return new Date(a.created_at) - new Date(b.created_at);
    });
    
    console.log(`✅ Retrieved ${companies.length} companies`);
    return { success: true, data: companies };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'getWorkedWithCompanies');
    return { success: false, error: errorMessage };
  }
};

/**
 * Create new company
 */
export const createWorkedWithCompany = async (companyData) => {
  try {
    const companiesRef = ref(database, 'worked_with_companies');
    const newCompanyRef = push(companiesRef);
    const id = newCompanyRef.key;
    
    const company = {
      id,
      company_name: companyData.company_name,
      logo_url: companyData.logo_url || '',
      website_url: companyData.website_url || '',
      description: companyData.description || '',
      display_order: companyData.display_order || 0,
      is_featured: companyData.is_featured || false,
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    
    await set(newCompanyRef, company);
    console.log('✅ Company created:', company);
    return { success: true, data: company };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'createWorkedWithCompany');
    return { success: false, error: errorMessage };
  }
};

/**
 * Update company
 */
export const updateWorkedWithCompany = async (companyId, companyData) => {
  try {
    const companyRef = ref(database, `worked_with_companies/${companyId}`);
    const updateData = {
      ...companyData,
      updated_at: getTimestamp()
    };
    await update(companyRef, updateData);
    console.log(`✅ Company ${companyId} updated`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'updateWorkedWithCompany');
    return { success: false, error: errorMessage };
  }
};

/**
 * Delete company
 */
export const deleteWorkedWithCompany = async (companyId) => {
  try {
    const companyRef = ref(database, `worked_with_companies/${companyId}`);
    await remove(companyRef);
    console.log(`✅ Company ${companyId} deleted`);
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'deleteWorkedWithCompany');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// AUTHENTICATION
// ============================================

/**
 * Admin login with email and password - SIMPLE EMAIL CHECK
 */
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // List of authorized admin emails
    const authorizedAdminEmails = [
      'toiral.dev@gmail.com',
      'mdrudra60@gmail.com'
    ];
    
    // Check if user email is authorized
    if (!authorizedAdminEmails.includes(user.email)) {
      await signOut(auth);
      console.log('❌ Unauthorized email:', user.email);
      return { success: false, error: 'User is not authorized as an admin' };
    }
    
    console.log('✅ Admin login successful:', user.email);
    
    return { 
      success: true, 
      data: {
        uid: user.uid,
        email: user.email,
        role: 'admin',
        authorized_by: 'email_whitelist'
      }
    };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'loginAdmin');
    return { success: false, error: errorMessage };
  }
};

/**
 * Admin logout
 */
export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    console.log('✅ Admin logout successful');
    return { success: true };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'logoutAdmin');
    return { success: false, error: errorMessage };
  }
};

/**
 * Admin login with Google Sign-In - SIMPLE EMAIL CHECK
 */
export const loginAdminWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // List of authorized admin emails
    const authorizedAdminEmails = [
      'toiral.dev@gmail.com',
      'mdrudra60@gmail.com'
    ];
    
    // Check if user email is authorized
    if (!authorizedAdminEmails.includes(user.email)) {
      await signOut(auth);
      console.log('❌ Unauthorized email:', user.email);
      return { success: false, error: 'User is not authorized as an admin' };
    }
    
    console.log('✅ Firebase Google login successful:', user.email);
    
    // Get Firebase ID token
    const idToken = await user.getIdToken();
    
    // Call backend to get JWT token
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
    console.log('🔑 Getting backend JWT token...');
    
    const backendResponse = await fetch(`${backendUrl}/api/admin/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        idToken: idToken
      })
    });
    
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      throw new Error(errorData.detail || 'Failed to authenticate with backend');
    }
    
    const backendData = await backendResponse.json();
    const jwtToken = backendData.access_token;
    
    // Store JWT token in localStorage
    localStorage.setItem('admin_token', jwtToken);
    localStorage.setItem('admin_email', user.email);
    
    console.log('✅ Backend JWT token obtained and stored');
    
    return { 
      success: true, 
      data: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'admin',
        authorized_by: 'email_whitelist',
        token: jwtToken
      }
    };
  } catch (error) {
    console.error('❌ Google Sign-In error:', error);
    
    // Handle specific Google Sign-In errors
    if (error.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'Sign-in was cancelled' };
    } else if (error.code === 'auth/popup-blocked') {
      return { success: false, error: 'Please allow popups for this site and try again' };
    } else if (error.code === 'auth/network-request-failed') {
      return { success: false, error: 'Network error. Please check your connection' };
    }
    
    const errorMessage = handleFirebaseError(error, 'loginAdminWithGoogle');
    return { success: false, error: errorMessage };
  }
};

/**
 * Check if current user is admin - SIMPLE EMAIL CHECK
 */
export const checkAdminStatus = async (user) => {
  try {
    if (!user) return { success: false, error: 'No user provided' };
    
    // List of authorized admin emails
    const authorizedAdminEmails = [
      'toiral.dev@gmail.com',
      'mdrudra60@gmail.com'
    ];
    
    // Check if user email is in authorized list
    const isAdmin = authorizedAdminEmails.includes(user.email);
    
    console.log(`🔍 Admin check for: ${user.email} - ${isAdmin ? 'AUTHORIZED' : 'NOT AUTHORIZED'}`);
    
    return { 
      success: true, 
      isAdmin: isAdmin,
      data: isAdmin ? {
        email: user.email,
        uid: user.uid,
        role: 'admin',
        authorized_by: 'email_whitelist'
      } : null
    };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'checkAdminStatus');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// FILE UPLOAD (STORAGE)
// ============================================

/**
 * Upload logo file to Firebase Storage
 */
export const uploadLogo = async (file) => {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 5MB' };
    }
    
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const logoRef = storageRef(storage, `logos/${fileName}`);
    
    console.log('📤 Uploading logo:', fileName);
    await uploadBytes(logoRef, file);
    const downloadURL = await getDownloadURL(logoRef);
    
    console.log('✅ Logo uploaded successfully:', downloadURL);
    return { success: true, url: downloadURL, fileName };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'uploadLogo');
    return { success: false, error: errorMessage };
  }
};

/**
 * Upload general file to Firebase Storage
 */
export const uploadFile = async (file, folder = 'uploads') => {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }
    
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 10MB' };
    }
    
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const fileRef = storageRef(storage, `${folder}/${fileName}`);
    
    console.log('📤 Uploading file:', fileName);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    
    console.log('✅ File uploaded successfully:', downloadURL);
    return { success: true, url: downloadURL, fileName };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'uploadFile');
    return { success: false, error: errorMessage };
  }
};

/**
 * Upload logo to ImgBB via backend API
 * @param {File} file - The image file to upload
 * @param {string} type - Type of upload: 'testimonial' or 'worked-with'
 * @param {string} token - Admin authentication token
 */
export const uploadLogoToImgBB = async (file, type = 'testimonial', token) => {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }
    
    if (!token) {
      return { success: false, error: 'Authentication token required' };
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' };
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { success: false, error: 'File size must be less than 5MB' };
    }
    
    // Determine the endpoint based on type
    const endpoint = type === 'worked-with' 
      ? '/api/worked-with/upload-logo'
      : '/api/testimonials/upload-logo';
    
    // Get backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    console.log(`📤 Uploading ${type} logo to ImgBB via backend:`, file.name);
    
    // Upload to backend (which will forward to ImgBB)
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to upload logo');
    }
    
    const result = await response.json();
    
    console.log('✅ Logo uploaded successfully to ImgBB:', result.logo_url);
    return { 
      success: true, 
      url: result.logo_url,
      displayUrl: result.display_url,
      fileName: result.filename 
    };
  } catch (error) {
    const errorMessage = error.message || 'Failed to upload logo';
    console.error('❌ Error uploading logo to ImgBB:', errorMessage);
    return { success: false, error: errorMessage };
  }
};


// ============================================
// HEALTH CHECK / STATUS
// ============================================

/**
 * Check Firebase connection
 */
export const checkFirebaseConnection = async () => {
  try {
    const testRef = ref(database, '.info/connected');
    const snapshot = await get(testRef);
    const isConnected = snapshot.val();
    
    return { 
      success: true, 
      connected: isConnected,
      timestamp: getTimestamp()
    };
  } catch (error) {
    const errorMessage = handleFirebaseError(error, 'checkFirebaseConnection');
    return { success: false, error: errorMessage };
  }
};

// ============================================
// EXPORTS
// ============================================

export default {
  // Appointments
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  
  // Contact Forms
  submitContactForm,
  getContactForms,
  updateContactFormStatus,
  
  // Testimonials
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  
  // Worked With Companies
  getWorkedWithCompanies,
  createWorkedWithCompany,
  updateWorkedWithCompany,
  deleteWorkedWithCompany,
  
  // Authentication
  loginAdmin,
  loginAdminWithGoogle,
  logoutAdmin,
  checkAdminStatus,
  
  // File Upload
  uploadLogo,
  uploadFile,
  uploadLogoToImgBB,
  
  // Health Check
  checkFirebaseConnection
};