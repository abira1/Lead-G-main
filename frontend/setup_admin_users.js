/**
 * Firebase Admin Users Setup Script
 * Adds authorized admin users to Firebase Authentication and Realtime Database
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  set, 
  get 
} from 'firebase/database';

// Firebase configuration (same as your main app)
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

// Admin users to add
const adminUsers = [
  {
    email: "toiral.dev@gmail.com",
    password: "TempPassword123!", // They should change this after first login
    name: "Toiral Admin",
    role: "admin"
  },
  {
    email: "mdrudra60@gmail.com", 
    password: "TempPassword456!", // They should change this after first login
    name: "Mdrudra Admin",
    role: "admin"
  }
];

/**
 * Create admin user in Firebase Auth and add to admin_users database
 */
async function createAdminUser(userData) {
  try {
    console.log(`🔄 Creating admin user: ${userData.email}`);
    
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      userData.email, 
      userData.password
    );
    
    const user = userCredential.user;
    console.log(`✅ Created Firebase Auth user: ${user.email} (UID: ${user.uid})`);
    
    // Add user to admin_users in Realtime Database
    const adminUserRef = ref(database, `admin_users/${user.uid}`);
    const adminData = {
      email: userData.email,
      name: userData.name,
      role: userData.role,
      created_at: new Date().toISOString(),
      created_by: "setup_script"
    };
    
    await set(adminUserRef, adminData);
    console.log(`✅ Added to admin_users database: ${userData.email}`);
    
    // Sign out the user (since we're just setting up)
    await signOut(auth);
    
    return { success: true, uid: user.uid, email: user.email };
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`⚠️  User already exists: ${userData.email}`);
      
      // User exists, just add to admin_users if not already there
      try {
        // Sign in to get the user UID
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          userData.email, 
          userData.password
        );
        
        const user = userCredential.user;
        console.log(`📝 Found existing user: ${user.email} (UID: ${user.uid})`);
        
        // Check if already in admin_users
        const adminUserRef = ref(database, `admin_users/${user.uid}`);
        const snapshot = await get(adminUserRef);
        
        if (!snapshot.exists()) {
          const adminData = {
            email: userData.email,
            name: userData.name,
            role: userData.role,
            created_at: new Date().toISOString(),
            created_by: "setup_script",
            updated_at: new Date().toISOString()
          };
          
          await set(adminUserRef, adminData);
          console.log(`✅ Added existing user to admin_users: ${userData.email}`);
        } else {
          console.log(`✅ User already in admin_users: ${userData.email}`);
        }
        
        await signOut(auth);
        return { success: true, uid: user.uid, email: user.email };
        
      } catch (signInError) {
        console.error(`❌ Could not verify existing user: ${userData.email}`, signInError.message);
        return { success: false, error: signInError.message };
      }
    } else {
      console.error(`❌ Error creating user ${userData.email}:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

/**
 * Setup all admin users
 */
async function setupAdminUsers() {
  console.log('🚀 Starting Firebase Admin Users Setup...\n');
  
  const results = [];
  
  for (const userData of adminUsers) {
    const result = await createAdminUser(userData);
    results.push({ ...userData, ...result });
    console.log(''); // Empty line for readability
  }
  
  console.log('📊 Setup Summary:');
  console.log('==================');
  
  results.forEach(result => {
    const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
    console.log(`${status} - ${result.email}`);
    if (result.uid) {
      console.log(`   UID: ${result.uid}`);
    }
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  console.log('\n🎉 Admin users setup complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Users should login and change their temporary passwords');
  console.log('2. Test admin panel access: https://lead-g-final.web.app/admin');
  console.log('3. Verify users can access all admin features');
  
  console.log('\n🔐 Login Credentials:');
  adminUsers.forEach(user => {
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password} (CHANGE AFTER FIRST LOGIN)`);
    console.log('---');
  });
}

// Run the setup
setupAdminUsers().catch(console.error);

export { setupAdminUsers, createAdminUser };