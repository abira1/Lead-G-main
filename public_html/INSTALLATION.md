# Lead G - Hostinger Installation Guide

## 🚀 Quick Installation Steps

### Step 1: Upload Files
1. Login to Hostinger File Manager
2. Navigate to `public_html` directory
3. Upload ALL files from this package
4. Ensure file structure matches the original

### Step 2: Database Setup
1. Login to Hostinger Control Panel
2. Go to "MySQL Databases"
3. You should have:
   - **Database**: u530488780_toiraldbhub
   - **User**: u530488780_leadgdb
   - **Password**: 2oiraldb#passLeadG123

4. Click on "phpMyAdmin"
5. Select your database from the left sidebar
6. Click on "SQL" tab
7. Copy the contents of `database.sql` file
8. Paste and click "Go" to execute

### Step 3: Set File Permissions

Set the following permissions (chmod) in File Manager:

```
config/                 755
config/*.php            644
config/.htaccess        644

uploads/                755
uploads/logos/          755

api/                    755
api/*.php               644
api/admin/              755
api/admin/*.php         644

admin/                  755
admin/*.php             644

*.php files             644
.htaccess              644
```

### Step 4: Create Upload Directory
Ensure `uploads/logos/` directory exists and is writable:
1. Navigate to `public_html/uploads/`
2. Create folder named `logos` if it doesn't exist
3. Set permission to 755

### Step 5: Test the Installation

1. **Visit your website**: https://leadgenerationg.com
2. **Test admin login**: https://leadgenerationg.com/admin/login.php
   - Email: toiral.dev@gmail.com
   - Password: Admin@LeadG2024
   - **⚠️ CHANGE PASSWORD IMMEDIATELY AFTER FIRST LOGIN**

### Step 6: Verify Database Connection

Create a test file `test-db.php` in public_html:
```php
<?php
define('LEADG_ACCESS', true);
require_once 'config/config.php';

try {
    $db = getDB();
    echo "✅ Database connected successfully!";
    echo "<br>";
    
    // Test query
    $stmt = $db->query("SELECT COUNT(*) as count FROM appointments");
    $result = $stmt->fetch();
    echo "Appointments table accessible: " . $result['count'] . " records";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>
```

Visit: https://leadgenerationg.com/test-db.php
If successful, delete this test file.

---

## 🔒 Security Checklist

### Immediate Actions After Installation:

1. **Change Admin Password**
   - Login to admin panel
   - Go to your database via phpMyAdmin
   - Run this SQL to change password:
   ```sql
   UPDATE admin_users 
   SET password = '$2y$10$YOUR_NEW_HASHED_PASSWORD' 
   WHERE email = 'toiral.dev@gmail.com';
   ```
   - Use online bcrypt generator to hash your new password

2. **Enable HTTPS**
   - Uncomment lines in `.htaccess` to force HTTPS:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

3. **Protect Config Files**
   - Verify `config/.htaccess` exists and denies access
   - Test by visiting: https://leadgenerationg.com/config/database.php
   - Should show "403 Forbidden"

4. **Delete Installation Files**
   - Delete `INSTALLATION.md` after setup
   - Delete `database.sql` after import
   - Delete any test files

---

## 📝 Configuration

### Site Settings
Edit `/config/config.php` if needed:
- Site name
- Site email
- Admin email
- Environment (keep as 'production')

### Database Settings
**DO NOT CHANGE** unless you have different credentials:
- File: `/config/database.php`
- Already configured for your Hostinger account

---

## 🔧 Troubleshooting

### Issue: Database Connection Failed
**Solution**: 
- Verify database credentials in `/config/database.php`
- Ensure database exists in Hostinger MySQL panel
- Check if database user has proper permissions

### Issue: 500 Internal Server Error
**Solution**:
- Check file permissions (644 for .php files, 755 for directories)
- Check `.htaccess` syntax
- Enable error reporting temporarily in `/config/config.php`:
  ```php
  define('ENVIRONMENT', 'development');
  ```

### Issue: Admin Login Not Working
**Solution**:
- Verify database has admin user
- Check if `admin_sessions` table exists
- Clear browser cookies and try again

### Issue: File Upload Not Working
**Solution**:
- Check `uploads/logos/` directory exists
- Verify directory permissions (755)
- Check PHP file upload settings in Hostinger

### Issue: Contact Form Not Submitting
**Solution**:
- Check browser console for JavaScript errors
- Verify API endpoint is accessible: `/api/contact.php`
- Check database for `contact_forms` table

---

## 📞 Support

If you encounter issues:
1. Check error logs in Hostinger Control Panel
2. Review browser console for JavaScript errors
3. Contact Hostinger support for server-related issues

---

## ✅ Post-Installation Checklist

- [ ] Database imported successfully
- [ ] Website loads without errors
- [ ] Admin login works
- [ ] Admin password changed
- [ ] HTTPS enabled
- [ ] Contact form tested
- [ ] Appointment booking tested
- [ ] File upload tested in admin
- [ ] All pages load correctly
- [ ] Installation files deleted

---

## 🎉 You're All Set!

Your Lead G website is now live at https://leadgenerationg.com

Admin Panel: https://leadgenerationg.com/admin/

**Remember to change the default admin password immediately!**
