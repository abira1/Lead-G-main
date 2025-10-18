/**
 * Simple Firebase Admin Database Setup
 * Adds users to admin_users collection using Firebase JS SDK
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';

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
 * Add admin users to the database using known UIDs
 * You'll need to get the UIDs from Firebase Console → Authentication
 */
async function addAdminUsers() {
  console.log('🔄 Adding admin users to Firebase Database...\n');

  // These are the admin users we want to add
  // NOTE: You'll need to replace "USER_UID_HERE" with actual UIDs from Firebase Auth
  const adminUsers = [
    {
      // Replace with actual UID for toiral.dev@gmail.com
      uid: "toiral-dev-uid-placeholder", 
      email: "toiral.dev@gmail.com",
      name: "Toiral Admin",
      role: "admin"
    },
    {
      // Replace with actual UID for mdrudra60@gmail.com  
      uid: "mdrudra60-uid-placeholder",
      email: "mdrudra60@gmail.com", 
      name: "Mdrudra Admin",
      role: "admin"
    }
  ];

  for (const userData of adminUsers) {
    if (userData.uid.includes('placeholder')) {
      console.log(`⚠️  Skipping ${userData.email} - Need actual UID from Firebase Console`);
      continue;
    }

    try {
      const adminUserRef = ref(database, `admin_users/${userData.uid}`);
      
      // Check if user already exists
      const snapshot = await get(adminUserRef);
      
      const adminData = {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        created_at: new Date().toISOString(),
        created_by: "admin_setup_script"
      };

      if (snapshot.exists()) {
        console.log(`✅ User already exists in admin_users: ${userData.email}`);
        // Update the existing record
        adminData.updated_at = new Date().toISOString();
        await set(adminUserRef, adminData);
        console.log(`✅ Updated admin data for: ${userData.email}`);
      } else {
        await set(adminUserRef, adminData);
        console.log(`✅ Added new admin user: ${userData.email}`);
      }

    } catch (error) {
      console.error(`❌ Error adding ${userData.email}:`, error.message);
    }
  }

  console.log('\n🎉 Admin users setup process complete!');
  console.log('\n📋 Manual Steps Required:');
  console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/lead-g-final/authentication/users');
  console.log('2. Find the UIDs for:');
  console.log('   - toiral.dev@gmail.com');
  console.log('   - mdrudra60@gmail.com');
  console.log('3. Replace the placeholder UIDs in this script');
  console.log('4. Run the script again');
}

// Manual method to add specific user by UID
async function addAdminByUID(uid, email, name) {
  try {
    const adminUserRef = ref(database, `admin_users/${uid}`);
    const adminData = {
      email: email,
      name: name,
      role: "admin",
      created_at: new Date().toISOString(),
      created_by: "manual_admin_setup"
    };
    
    await set(adminUserRef, adminData);
    console.log(`✅ Successfully added admin: ${email} (UID: ${uid})`);
    return true;
  } catch (error) {
    console.error(`❌ Error adding admin ${email}:`, error.message);
    return false;
  }
}

// Export functions for manual use
export { addAdminUsers, addAdminByUID };

// Run the main setup
addAdminUsers().catch(console.error);