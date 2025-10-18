/**
 * DIRECT ADMIN USER ADDITION BY UID
 * Use this script if you have the UID from Firebase Console
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

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
const database = getDatabase(app);

/**
 * Add admin user by UID (get UID from Firebase Console)
 */
async function addAdminByUID(uid, email, name) {
  try {
    console.log(`🔄 Adding admin user...`);
    console.log(`   UID: ${uid}`);
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);
    
    const adminUserRef = ref(database, `admin_users/${uid}`);
    const adminData = {
      email: email,
      name: name,
      role: "admin",
      created_at: new Date().toISOString(),
      created_by: "direct_uid_script",
      uid: uid
    };
    
    await set(adminUserRef, adminData);
    console.log(`✅ SUCCESS! ${email} added to admin_users!`);
    console.log(`📍 Database path: admin_users/${uid}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error adding admin user:`, error.message);
    return false;
  }
}

/**
 * USAGE: Replace "YOUR_UID_HERE" with actual UID from Firebase Console
 */
async function setupToiralAdminWithUID() {
  console.log('🚀 Direct UID Admin Setup\n');
  
  // REPLACE THIS WITH ACTUAL UID FROM FIREBASE CONSOLE
  const TOIRAL_UID = "YOUR_UID_HERE";
  
  if (TOIRAL_UID === "YOUR_UID_HERE") {
    console.log('⚠️  Please update the UID first!');
    console.log('\n📋 Steps:');
    console.log('1. Go to: https://console.firebase.google.com/project/lead-g-final/authentication/users');
    console.log('2. Find toiral.dev@gmail.com');
    console.log('3. Copy the UID (long string like: "Abc123XyZ...")');
    console.log('4. Replace "YOUR_UID_HERE" in this script with the actual UID');
    console.log('5. Run the script again');
    return;
  }
  
  const success = await addAdminByUID(
    TOIRAL_UID,
    "toiral.dev@gmail.com",
    "Toiral Admin"
  );
  
  if (success) {
    console.log('\n🎉 ADMIN SETUP COMPLETE!');
    console.log('\n✅ toiral.dev@gmail.com can now:');
    console.log('   - Use Google Sign-In at: https://lead-g-final.web.app/admin');
    console.log('   - Access full admin dashboard');
    console.log('   - Manage all admin features');
  }
}

// Export for manual use
export { addAdminByUID };

// Run setup
setupToiralAdminWithUID().catch(console.error);