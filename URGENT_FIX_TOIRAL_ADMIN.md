# 🚨 **URGENT FIX: Add toiral.dev@gmail.com to Admin Users**

## 🎯 **Problem:**
- `toiral.dev@gmail.com` exists in Firebase Authentication
- But NOT in the `admin_users` database collection
- Google Sign-In fails with "User is not authorized as an admin"

## 🚀 **IMMEDIATE SOLUTION (2 minutes):**

### **Step 1: Get the User UID**
1. **Go to Firebase Authentication**: 
   - https://console.firebase.google.com/project/lead-g-final/authentication/users
2. **Find `toiral.dev@gmail.com`** in the user list
3. **Copy the UID** (looks like: `Abc123XyZ789...`)

### **Step 2: Add to Admin Database**
1. **Go to Firebase Database**: 
   - https://console.firebase.google.com/project/lead-g-final/database/lead-g-final-default-rtdb/data
2. **Find the `admin_users` node**
3. **Click the "+" button** next to `admin_users`
4. **Enter the UID as the key** (paste the UID from Step 1)
5. **Add these fields** as children:

```json
{
  "email": "toiral.dev@gmail.com",
  "name": "Toiral Admin",
  "role": "admin",
  "created_at": "2025-10-19T12:00:00.000Z"
}
```

### **Step 3: Test**
1. **Go to Admin Panel**: https://lead-g-final.web.app/admin
2. **Try Google Sign-In** with `toiral.dev@gmail.com`
3. **Should work immediately!** ✅

---

## 📊 **Expected Database Structure:**

After adding, your Firebase Database should look like:

```
admin_users/
└── [COPIED_UID]/
    ├── email: "toiral.dev@gmail.com"
    ├── name: "Toiral Admin"
    ├── role: "admin"
    └── created_at: "2025-10-19T12:00:00.000Z"
```

---

## 🔧 **Alternative: JSON Import Method**

If you prefer, create this JSON file and import it:

```json
{
  "PUT_UID_HERE": {
    "email": "toiral.dev@gmail.com",
    "name": "Toiral Admin", 
    "role": "admin",
    "created_at": "2025-10-19T12:00:00.000Z"
  }
}
```

Then:
1. Replace `PUT_UID_HERE` with the actual UID
2. In Firebase Console → Database → Import JSON
3. Select the `admin_users` path
4. Upload the JSON

---

## ✅ **After Completion:**

- ✅ Google Sign-In will work for `toiral.dev@gmail.com`
- ✅ Email/password login will work (if password is set)
- ✅ Full admin panel access granted
- ✅ Can manage appointments, testimonials, companies

---

**This should fix the "User is not authorized as an admin" error immediately!**

**Need help with any of these steps? Let me know!**