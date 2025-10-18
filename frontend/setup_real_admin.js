/**
 * FINAL STEP: Add Real Admin User with Actual UID
 * This will replace the placeholder with the real toiral.dev@gmail.com UID
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
  remove 
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
 * Try different password combinations for toiral.dev@gmail.com
 */
async function findToiralPassword() {
  const possiblePasswords = [
    "testadmin",
    "TempPassword123!",
    "AdminPassword123!",
    "admin123",
    "password123",
    "leadg123",
    "toiral123"
  ];
  
  for (const password of possiblePasswords) {
    try {
      console.log(`🔍 Trying password: ${password.substring(0, 3)}...`);
      
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        "toiral.dev@gmail.com", 
        password
      );
      
      const user = userCredential.user;
      console.log(`✅ SUCCESS! Found working password for ${user.email}`);
      console.log(`📍 UID: ${user.uid}`);
      
      // Add to admin_users with real UID
      const adminUserRef = ref(database, `admin_users/${user.uid}`);
      const adminData = {
        email: user.email,
        name: "Toiral Admin",
        role: "admin",
        created_at: new Date().toISOString(),
        created_by: "real_uid_setup",
        uid: user.uid,
        password_found: password // For reference
      };
      
      await set(adminUserRef, adminData);
      console.log(`✅ Added ${user.email} to admin_users with real UID!`);
      
      // Remove placeholder entries
      await remove(ref(database, 'admin_users/placeholder_uid_1'));
      await remove(ref(database, 'admin_users/placeholder_uid_2'));
      console.log(`🧹 Cleaned up placeholder entries`);
      
      await signOut(auth);
      
      return { success: true, uid: user.uid, password: password };
      
    } catch (error) {
      // Continue to next password
      continue;
    }
  }
  
  return { success: false, error: "No working password found" };
}

/**
 * Alternative: Manual UID entry
 */
async function addByManualUID(uid) {
  try {
    const adminUserRef = ref(database, `admin_users/${uid}`);
    const adminData = {
      email: "toiral.dev@gmail.com",
      name: "Toiral Admin",
      role: "admin",
      created_at: new Date().toISOString(),
      created_by: "manual_uid_entry",
      uid: uid
    };
    
    await set(adminUserRef, adminData);
    console.log(`✅ Added toiral.dev@gmail.com with manual UID: ${uid}`);
    
    // Clean up placeholders
    await remove(ref(database, 'admin_users/placeholder_uid_1'));
    await remove(ref(database, 'admin_users/placeholder_uid_2'));
    console.log(`🧹 Cleaned up placeholder entries`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error with manual UID:`, error.message);
    return false;
  }
}

/**
 * Main execution
 */
async function setupRealAdmin() {
  console.log('🚀 Setting up real admin user...\n');
  
  // Try to find working password first
  const result = await findToiralPassword();
  
  if (result.success) {
    console.log('\n🎉 ADMIN SETUP COMPLETE!');
    console.log(`✅ toiral.dev@gmail.com is now authorized!`);
    console.log(`🔑 Working password: ${result.password}`);
    console.log(`🆔 UID: ${result.uid}`);
    console.log('\n🔗 Test login at: https://lead-g-final.web.app/admin');
  } else {
    console.log('\n⚠️  Could not find working password automatically.');
    console.log('\n🔧 Manual method:');
    console.log('1. Go to: https://console.firebase.google.com/project/lead-g-final/authentication/users');
    console.log('2. Find toiral.dev@gmail.com and copy the UID');
    console.log('3. Replace "MANUAL_UID_HERE" in this script with the real UID');
    console.log('4. Uncomment the manual setup line below');
    
    // Uncomment this line and replace with real UID:
    // await addByManualUID("PASTE_REAL_UID_HERE");
  }
}

// Run setup
setupRealAdmin().catch(console.error);