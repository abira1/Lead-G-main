# 🔐 Firebase Admin User Setup Guide

## Overview
This guide walks you through creating an admin user for the Lead G application using Firebase Authentication and Realtime Database.

## Prerequisites
- Firebase project created and configured
- Firebase Console access
- Lead G application with Firebase integration complete

---

## Step 1: Create Admin User in Firebase Authentication

1. **Open Firebase Console**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your Lead G project

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Users" tab

3. **Add New User**
   - Click "Add user" button
   - Enter the following details:
     - **Email**: `toiral.dev@gmail.com`
     - **Password**: Create a strong password (save it securely!)
   - Click "Add user"

4. **Copy User UID**
   - After creating the user, click on them in the user list
   - Copy the **UID** (format: `abc123def456...`)
   - **IMPORTANT**: You'll need this UID for the next step

---

## Step 2: Add Admin User to Realtime Database

1. **Navigate to Realtime Database**
   - In Firebase Console, click "Realtime Database"
   - If prompted, click "Create database" → "Start in test mode"

2. **Add Admin Users Structure**
   - Click on the root node "/"
   - Click "+" to add a child
   - **Key**: `admin_users`
   - **Value**: Leave empty for now
   - Click "Add"

3. **Add Your Admin User**
   - Click "+" on the `admin_users` node
   - **Key**: [PASTE THE UID YOU COPIED FROM STEP 1]
   - Click "+" to add fields:

   ```json
   {
     "email": "toiral.dev@gmail.com",
     "full_name": "Lead G Administrator", 
     "role": "super_admin",
     "created_at": "2024-12-13T00:00:00Z",
     "permissions": {
       "manage_appointments": true,
       "manage_contacts": true,
       "manage_testimonials": true,
       "manage_companies": true,
       "view_analytics": true,
       "manage_users": true
     }
   }
   ```

4. **Final Database Structure**
   Your database should look like this:
   ```
   /
   ├── admin_users/
   │   └── [YOUR_USER_UID]/
   │       ├── email: "toiral.dev@gmail.com"
   │       ├── full_name: "Lead G Administrator"
   │       ├── role: "super_admin"
   │       ├── created_at: "2024-12-13T00:00:00Z"
   │       └── permissions: { ... }
   ```

---

## Step 3: Deploy Security Rules

### Database Rules

1. **Navigate to Database Rules**
   - In Realtime Database, click "Rules" tab

2. **Replace Rules**
   - Copy the content from `/firebase-deployment/database.rules.json`
   - Paste it in the rules editor
   - Click "Publish"

**Rules Content:**
```json
{
  "rules": {
    "appointments": {
      ".read": "auth != null",
      ".write": true,
      "$appointmentId": {
        ".validate": "newData.hasChildren(['id', 'name', 'email', 'phone', 'appointment_date', 'appointment_time', 'status', 'created_at'])"
      }
    },
    "contact_forms": {
      ".read": "auth != null", 
      ".write": true,
      "$contactId": {
        ".validate": "newData.hasChildren(['id', 'name', 'email', 'message', 'submitted_at'])"
      }
    },
    "testimonials": {
      ".read": true,
      ".write": "auth != null",
      "$testimonialId": {
        ".validate": "newData.hasChildren(['id', 'client_name', 'company', 'testimonial_text'])"
      }
    },
    "worked_with_companies": {
      ".read": true,
      ".write": "auth != null",
      "$companyId": {
        ".validate": "newData.hasChildren(['id', 'company_name'])"
      }
    },
    "admin_users": {
      ".read": "auth != null",
      ".write": "auth != null && root.child('admin_users').child(auth.uid).exists()"
    }
  }
}
```

### Storage Rules

1. **Navigate to Storage Rules**
   - Click "Storage" in Firebase Console
   - Click "Rules" tab

2. **Replace Rules**
   - Copy the content from `/firebase-deployment/storage.rules`
   - Paste it in the rules editor
   - Click "Publish"

---

## Step 4: Test Admin Login

1. **Start the Application**
   ```bash
   cd frontend
   npm start
   ```

2. **Access Admin Panel**
   - Open browser to: `http://localhost:3000/admin`
   - You should see the admin login page

3. **Login with Admin Credentials**
   - **Email**: `toiral.dev@gmail.com`
   - **Password**: [The password you created in Step 1]
   - Click "Sign In"

4. **Verify Access**
   - You should be redirected to the admin dashboard
   - You should see admin features like:
     - Appointments management
     - Testimonials management
     - Companies management
     - Contact forms

---

## Troubleshooting

### ❌ Login Failed: "User is not authorized as an admin"
- **Cause**: User not found in `admin_users` in database
- **Solution**: Double-check the UID in the database matches the Authentication UID

### ❌ Permission Denied Errors
- **Cause**: Security rules not deployed correctly
- **Solution**: Re-deploy database and storage rules from Firebase Console

### ❌ Cannot Access Admin Features
- **Cause**: User authenticated but not recognized as admin
- **Solution**: Verify the user exists in both Authentication and `admin_users` database

### ❌ File Upload Fails
- **Cause**: Storage rules not set up correctly
- **Solution**: Deploy storage rules and check file size limits

---

## Security Best Practices

### 🔒 Password Security
- Use a strong password (12+ characters, mixed case, numbers, symbols)
- Store password securely (password manager recommended)
- Never share admin credentials

### 🛡️ Access Control
- Only add trusted users to `admin_users`
- Regularly review admin user list
- Remove inactive admin users

### 🔄 Regular Maintenance
- Monitor admin activity in Firebase Console
- Review security rules periodically
- Keep Firebase SDK updated

---

## Admin Credentials Summary

After completing this setup:

| Item | Value |
|------|-------|
| **Admin Email** | `toiral.dev@gmail.com` |
| **Admin Password** | [Set by you in Step 1] |
| **Admin URL (Dev)** | `http://localhost:3000/admin` |
| **Admin URL (Prod)** | `https://your-domain.com/admin` |
| **Firebase Project** | lead-g-final |

---

## Next Steps

1. ✅ **Test All Features**: Test appointment booking, testimonials, companies management
2. ✅ **Deploy to Production**: Deploy the app to Firebase Hosting
3. ✅ **Connect Custom Domain**: Set up leadgenerationg.com domain
4. ✅ **Monitor Usage**: Check Firebase Console for activity and errors

---

## Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Check Firebase Console → Authentication → Users
3. Check Firebase Console → Realtime Database data structure
4. Verify security rules are published
5. Contact development team if needed

**🎉 Setup Complete! Your admin user is ready to use.**