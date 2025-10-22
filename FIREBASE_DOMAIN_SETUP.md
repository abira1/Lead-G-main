# Firebase Domain Configuration for Google Authentication

## Firebase Project Details
- **Project ID**: `lead-g-final`
- **Auth Domain**: `lead-g-final.firebaseapp.com`

## Domains to Add in Firebase Console

To enable Google authentication across all domains, add these to your Firebase **Authorized domains**:

### Development Domains
```
localhost
127.0.0.1
```

### Preview/Staging Domains  
```
admin-dashboard-hub.preview.emergentagent.com
*.preview.emergentagent.com
```

### Production Domains (add as needed)
```
yourdomain.com
www.yourdomain.com
admin.yourdomain.com
```

## How to Add Domains in Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: `lead-g-final`
3. **Navigate to**: Authentication → Settings → Authorized domains
4. **Click**: "Add domain"
5. **Add each domain** from the list above
6. **Save changes**

## Current Firebase Configuration in Code

The app is configured to work with these Firebase settings:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCVTBmG1HTmx1Ueu5SYL81yOKvuSyiQYbc",
  authDomain: "lead-g-final.firebaseapp.com",
  projectId: "lead-g-final",
  // ... other settings
};
```

## Authorized Admin Emails

Only these emails can access the admin panel:
- ✅ `toiral.dev@gmail.com`
- ✅ `mdrudra60@gmail.com`

## Google OAuth Settings

Current Google provider configuration:
- **Prompt**: `select_account` (allows choosing Google account)
- **Scopes**: `email`, `profile`, `openid`
- **Domain restrictions**: None (accepts all Google accounts, but backend filters by email)

## Testing Google Authentication

After adding domains to Firebase:

1. **Go to**: `https://clean-services-7.preview.emergentagent.com/admin`
2. **Click**: "Sign in with Google"
3. **Select**: One of the authorized email accounts
4. **Result**: Should automatically log in to admin dashboard

## Troubleshooting

If Google authentication still doesn't work after adding domains:

1. **Check Firebase Console**: Verify domains are added and active
2. **Clear Browser Cache**: Clear cookies and localStorage
3. **Check Network Tab**: Look for CORS or authentication errors
4. **Verify Email**: Ensure the Google account email matches authorized list

## Security Recommendations

After testing is complete:

1. **Remove unnecessary domains** from Firebase authorized domains
2. **Add specific production domains** only
3. **Consider IP restrictions** for admin access
4. **Enable 2FA** for admin Google accounts
5. **Monitor authentication logs** in Firebase Console

---

**Next Steps**: 
1. Add the domains listed above to Firebase Console
2. Test Google authentication on each domain
3. Verify admin panel access with both authorized emails