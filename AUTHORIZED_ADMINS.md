# Authorized Admin Emails

## Current Authorized Administrators

The following email addresses are authorized to access the Lead G admin panel:

1. **toiral.dev@gmail.com**
2. **mdrudra60@gmail.com**

## Login Methods

### Method 1: Google OAuth (Recommended)
- Click "Sign in with Google" button on the admin login page
- Select one of the authorized Google accounts
- You'll be automatically authenticated and redirected to the admin dashboard

### Method 2: Email & Password
- Email: `toiral.dev@gmail.com`
- Password: `testadmin`
- Enter credentials and click "Sign In"

## Admin Panel Access

**URL**: https://json-repair-1.preview.emergentagent.com/admin

## Security Notes

- Only the emails listed above can access the admin panel
- Google OAuth is verified on both frontend and backend
- JWT tokens are issued with 24-hour expiration
- Unauthorized emails will receive an "Unauthorized email address" error

## Files Updated

The following files contain the authorized email list:

1. **Backend**: `/app/backend/server.py` (lines 37-40)
   ```python
   AUTHORIZED_ADMIN_EMAILS = [
       "toiral.dev@gmail.com",
       "mdrudra60@gmail.com"
   ]
   ```

2. **Frontend**: `/app/frontend/src/components/AdminLogin.jsx` (lines 44-47)
   ```javascript
   const authorizedEmails = [
       'toiral.dev@gmail.com',
       'mdrudra60@gmail.com'
   ];
   ```

3. **Environment**: `/app/backend/.env`
   ```
   ADMIN_EMAIL=toiral.dev@gmail.com
   AUTHORIZED_EMAILS=toiral.dev@gmail.com,mdrudra60@gmail.com
   ```

## Adding More Admins

To add additional authorized emails in the future:

1. Update `AUTHORIZED_ADMIN_EMAILS` array in `/app/backend/server.py`
2. Update `authorizedEmails` array in `/app/frontend/src/components/AdminLogin.jsx`
3. Restart the backend and frontend services:
   ```bash
   sudo supervisorctl restart backend frontend
   ```

---

**Last Updated**: October 9, 2025
**Changed By**: E1 Agent
**Reason**: User request to authorize toiral.dev@gmail.com and mdrudra60@gmail.com
