# 🔥 **STEP-BY-STEP: Add Admin Users to Firebase**

## 📋 **Admin Users to Add:**
1. `toiral.dev@gmail.com`
2. `mdrudra60@gmail.com`

---

## 🚀 **Method 1: Firebase Console (Recommended)**

### **Step 1: Create Users in Firebase Authentication**

1. **Go to Firebase Console Authentication**:
   - Visit: https://console.firebase.google.com/project/lead-g-final/authentication/users
   - Click **"Add user"**

2. **Add toiral.dev@gmail.com**:
   - Email: `toiral.dev@gmail.com`
   - Password: `AdminPassword123!` (they can change later)
   - Click **"Add user"**
   - **Copy the UID** (something like: `Kxj9P2mQoEVgH8sT7uY6nZ1cF3`)

3. **Add mdrudra60@gmail.com**:
   - Email: `mdrudra60@gmail.com`  
   - Password: `AdminPassword456!` (they can change later)
   - Click **"Add user"**
   - **Copy the UID**

### **Step 2: Add Users to Admin Database**

1. **Go to Firebase Realtime Database**:
   - Visit: https://console.firebase.google.com/project/lead-g-final/database/lead-g-final-default-rtdb/data

2. **Navigate to admin_users**:
   - Find the `admin_users` node
   - Click the **"+"** button next to it

3. **Add toiral.dev@gmail.com**:
   - **Key**: Paste the UID from Step 1 (e.g., `Kxj9P2mQoEVgH8sT7uY6nZ1cF3`)
   - **Value**: Click "Add child" and create this structure:
   ```json
   {
     "email": "toiral.dev@gmail.com",
     "name": "Toiral Admin", 
     "role": "admin",
     "created_at": "2025-10-19T12:00:00.000Z"
   }
   ```

4. **Add mdrudra60@gmail.com**:
   - **Key**: Paste the UID from Step 1
   - **Value**: Same structure as above but with:
   ```json
   {
     "email": "mdrudra60@gmail.com",
     "name": "Mdrudra Admin",
     "role": "admin", 
     "created_at": "2025-10-19T12:00:00.000Z"
   }
   ```

---

## 🚀 **Method 2: Firebase CLI (Alternative)**

If you prefer using Firebase CLI:

1. **Create JSON data file**:
   ```bash
   # Create admin_users.json
   {
     "admin_users": {
       "PUT_UID_HERE_1": {
         "email": "toiral.dev@gmail.com",
         "name": "Toiral Admin",
         "role": "admin",
         "created_at": "2025-10-19T12:00:00.000Z"
       },
       "PUT_UID_HERE_2": {
         "email": "mdrudra60@gmail.com", 
         "name": "Mdrudra Admin",
         "role": "admin",
         "created_at": "2025-10-19T12:00:00.000Z"
       }
     }
   }
   ```

2. **Import to Firebase**:
   ```bash
   firebase database:set /admin_users admin_users.json
   ```

---

## 🎯 **Expected Result:**

After completion, your Firebase Realtime Database should look like:

```
lead-g-final-default-rtdb/
├── admin_users/
│   ├── [UID_1]/
│   │   ├── email: "toiral.dev@gmail.com"
│   │   ├── name: "Toiral Admin"
│   │   ├── role: "admin"
│   │   └── created_at: "2025-10-19..."
│   └── [UID_2]/
│       ├── email: "mdrudra60@gmail.com"
│       ├── name: "Mdrudra Admin"
│       ├── role: "admin"
│       └── created_at: "2025-10-19..."
├── appointments/
├── contacts/
└── testimonials/
```

---

## ✅ **Testing Admin Access:**

1. **Visit Admin Panel**: https://lead-g-final.web.app/admin

2. **Test toiral.dev@gmail.com**:
   - Try email/password login
   - Try Google Sign-In (if they have Google account)
   - Should see admin dashboard

3. **Test mdrudra60@gmail.com**:
   - Same tests as above
   - Should see admin dashboard

---

## 🔐 **Login Credentials:**

| Email | Method | Password |
|-------|--------|----------|
| `toiral.dev@gmail.com` | Email/Password | `AdminPassword123!` |
| `toiral.dev@gmail.com` | Google Sign-In | (Use their Google account) |
| `mdrudra60@gmail.com` | Email/Password | `AdminPassword456!` |
| `mdrudra60@gmail.com` | Google Sign-In | (Use their Google account) |

---

## 🚨 **Important Notes:**

1. **UIDs are unique** - Each Firebase user has a unique UID that never changes
2. **Security Rules** - Only users in `admin_users` can access admin features
3. **Password Changes** - Users should change temporary passwords after first login
4. **Google Sign-In** - Works if the Google account email matches the email in `admin_users`

---

**Ready to proceed? Follow Method 1 (Firebase Console) for the most reliable setup!**