/**
 * Admin User Setup Script for Lead G
 * 
 * This script helps you create an admin user in Firebase Authentication
 * and add them to the Realtime Database for admin access.
 * 
 * INSTRUCTIONS:
 * 1. Go to Firebase Console → Authentication → Users
 * 2. Click "Add user" and create user with:
 *    - Email: toiral.dev@gmail.com
 *    - Password: [create a strong password]
 * 3. Copy the UID from the new user
 * 4. Go to Firebase Console → Realtime Database
 * 5. Add this data structure with the actual UID:
 */

// ============================================
// ADMIN USER DATA TO ADD TO FIREBASE
// ============================================

const adminUserData = {
  "admin_users": {
    "PASTE_USER_UID_HERE": {
      "email": "toiral.dev@gmail.com",
      "full_name": "Lead G Administrator",
      "role": "super_admin",
      "created_at": new Date().toISOString(),
      "last_login": null,
      "permissions": {
        "manage_appointments": true,
        "manage_contacts": true,
        "manage_testimonials": true,
        "manage_companies": true,
        "view_analytics": true,
        "manage_users": true
      }
    }
  }
};

console.log('📋 Copy this data structure to Firebase Realtime Database:');
console.log(JSON.stringify(adminUserData, null, 2));

// ============================================
// STEP-BY-STEP INSTRUCTIONS
// ============================================

console.log(`
🔧 FIREBASE ADMIN SETUP INSTRUCTIONS:

1. 🔐 CREATE ADMIN USER IN AUTHENTICATION:
   - Go to: Firebase Console → Authentication → Users
   - Click "Add user"
   - Email: toiral.dev@gmail.com
   - Password: [Create a strong password - save it securely!]
   - Click "Add user"

2. 📝 COPY USER UID:
   - After creating the user, click on them in the user list
   - Copy the UID (format: abc123def456...)

3. 🗄️ ADD TO REALTIME DATABASE:
   - Go to: Firebase Console → Realtime Database
   - Click "Start in test mode" if prompted
   - Navigate to the root "/"
   - Click "+" to add child
   - Name: "admin_users"
   - Click "+" on admin_users to add child  
   - Name: [PASTE THE UID YOU COPIED]
   - Add these fields one by one:
     * email: "toiral.dev@gmail.com"
     * full_name: "Lead G Administrator"
     * role: "super_admin"
     * created_at: "${new Date().toISOString()}"

4. 🔒 DEPLOY SECURITY RULES:
   - Go to: Firebase Console → Realtime Database → Rules
   - Replace the rules with the content from:
     /firebase-deployment/database.rules.json
   - Click "Publish"

5. 🏗️ DEPLOY STORAGE RULES:
   - Go to: Firebase Console → Storage → Rules
   - Replace the rules with the content from:
     /firebase-deployment/storage.rules  
   - Click "Publish"

6. ✅ TEST ADMIN LOGIN:
   - Run the React app: npm start
   - Go to: /admin
   - Login with: toiral.dev@gmail.com and the password you created
   - You should be able to access the admin dashboard

🎉 SETUP COMPLETE!

📧 Admin Email: toiral.dev@gmail.com
🔑 Admin Password: [The one you created in step 1]
🌐 Admin URL: http://localhost:3000/admin (development)
🌐 Admin URL: https://your-domain.com/admin (production)

⚠️  SECURITY NOTES:
- Keep the admin password secure
- Never share the admin credentials
- The UID in the database identifies the admin user
- Only users in admin_users can access admin features
`);

export default adminUserData;