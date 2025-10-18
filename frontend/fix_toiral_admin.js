/**
 * Add specific admin user by email to Firebase admin_users database
 * This script will find the user by email and add them to admin_users
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  set, 
  get 
} from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVTBmG1HTmx1Ueu5SYL81yOKvuSyiQYbc",
  authDomain: "lead-g-final.firebaseapp.com",
  databaseURL: "https://lead-g-final-default-rtdb.firebaseio.com",
  projectId: "lead-g-final",
  storageBucket: "lead-g-final.firebasestorage.app",
  messagingSenderId: "774050416171",
  appId: "1:774050416171:web:2936ac9778115fb11e0c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

/**
 * Add user to admin_users using email and temporary password
 */
async function addAdminUserByEmail(email, tempPassword, name) {
  try {
    console.log(`🔄 Adding ${email} to admin_users...`);
    
    // Sign in with the user to get their UID
    const userCredential = await signInWithEmailAndPassword(auth, email, tempPassword);
    const user = userCredential.user;
    
    console.log(`✅ Found user: ${user.email} (UID: ${user.uid})`);
    
    // Add to admin_users database
    const adminUserRef = ref(database, `admin_users/${user.uid}`);
    const adminData = {
      email: user.email,
      name: name,
      role: "admin",
      created_at: new Date().toISOString(),
      created_by: "admin_setup_script",
      uid: user.uid
    };
    
    await set(adminUserRef, adminData);
    console.log(`✅ Successfully added ${user.email} to admin_users!`);
    
    // Sign out
    await signOut(auth);
    
    return { success: true, uid: user.uid, email: user.email };
    
  } catch (error) {
    console.error(`❌ Error adding ${email}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main setup function
 */
async function setupToiralAdmin() {
  console.log('🚀 Setting up toiral.dev@gmail.com as admin...\n');
  
  // Try with the temporary password we set earlier
  const result = await addAdminUserByEmail(
    "toiral.dev@gmail.com", 
    "TempPassword123!", 
    "Toiral Admin"
  );
  
  if (result.success) {
    console.log('\n🎉 SUCCESS! toiral.dev@gmail.com is now authorized as admin!');
    console.log('\n📋 Next Steps:');
    console.log('1. Test login at: https://lead-g-final.web.app/admin');
    console.log('2. Try Google Sign-In (should work now)');
    console.log('3. Try email/password login');
    console.log('4. Change password after first login');
  } else {
    console.log('\n❌ Setup failed. Let\'s try alternative methods...');
    console.log('\nPossible solutions:');
    console.log('1. Check if the temporary password is correct');
    console.log('2. Reset password in Firebase Console');
    console.log('3. Manually add to admin_users via Firebase Console');
    
    console.log('\n🔧 Manual Firebase Console Method:');
    console.log('1. Go to: https://console.firebase.google.com/project/lead-g-final/authentication/users');
    console.log('2. Find toiral.dev@gmail.com and copy the UID');
    console.log('3. Go to: https://console.firebase.google.com/project/lead-g-final/database');
    console.log('4. Navigate to admin_users and add new child with UID as key');
    console.log('5. Add these fields:');
    console.log('   - email: "toiral.dev@gmail.com"');
    console.log('   - name: "Toiral Admin"');
    console.log('   - role: "admin"');
    console.log('   - created_at: "' + new Date().toISOString() + '"');
  }
}

// Run the setup
setupToiralAdmin().catch(console.error);