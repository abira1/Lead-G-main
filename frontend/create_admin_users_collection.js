/**
 * CREATE ADMIN_USERS COLLECTION IN FIREBASE
 * This script will create the admin_users collection and add toiral.dev@gmail.com
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
 * Create admin_users collection with initial admin users
 */
async function createAdminUsersCollection() {
  try {
    console.log('🚀 Creating admin_users collection in Firebase...');
    
    // Create admin_users with placeholder data
    // We'll use email as identifier since we don't have UIDs yet
    const adminUsersData = {
      // Placeholder structure - will be updated with actual UIDs
      "placeholder_uid_1": {
        email: "toiral.dev@gmail.com",
        name: "Toiral Admin",
        role: "admin",
        created_at: new Date().toISOString(),
        created_by: "initial_setup",
        status: "pending_uid_update",
        note: "Need to replace with actual Firebase Auth UID"
      },
      "placeholder_uid_2": {
        email: "mdrudra60@gmail.com", 
        name: "Mdrudra Admin",
        role: "admin",
        created_at: new Date().toISOString(),
        created_by: "initial_setup",
        status: "pending_uid_update",
        note: "Need to replace with actual Firebase Auth UID"
      }
    };
    
    const adminUsersRef = ref(database, 'admin_users');
    await set(adminUsersRef, adminUsersData);
    
    console.log('✅ admin_users collection created successfully!');
    console.log('📍 Location: /admin_users');
    console.log('👥 Added placeholder entries for both admin users');
    
    return true;
  } catch (error) {
    console.error('❌ Error creating admin_users collection:', error.message);
    return false;
  }
}

/**
 * Create other missing collections if needed
 */
async function initializeAllCollections() {
  console.log('🔄 Initializing Firebase Realtime Database collections...\n');
  
  try {
    // Create admin_users
    await createAdminUsersCollection();
    
    // Create empty collections for other data if they don't exist
    const collections = {
      appointments: {},
      contacts: {},
      testimonials: {},
      worked_with_companies: {}
    };
    
    for (const [collectionName, initialData] of Object.entries(collections)) {
      const collectionRef = ref(database, collectionName);
      await set(collectionRef, initialData);
      console.log(`✅ Created ${collectionName} collection`);
    }
    
    console.log('\n🎉 All collections initialized successfully!');
    console.log('\n📋 Database Structure Created:');
    console.log('├── admin_users/');
    console.log('│   ├── placeholder_uid_1/ (toiral.dev@gmail.com)');
    console.log('│   └── placeholder_uid_2/ (mdrudra60@gmail.com)');
    console.log('├── appointments/');
    console.log('├── contacts/');
    console.log('├── testimonials/');
    console.log('└── worked_with_companies/');
    
    console.log('\n🔧 Next Steps:');
    console.log('1. Check Firebase Console: https://console.firebase.google.com/project/lead-g-final/database');
    console.log('2. You should now see the admin_users collection');
    console.log('3. Update placeholder UIDs with real UIDs from Firebase Auth');
    
  } catch (error) {
    console.error('❌ Error initializing collections:', error.message);
  }
}

// Run initialization
initializeAllCollections().catch(console.error);