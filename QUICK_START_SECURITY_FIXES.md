# 🚀 QUICK START - Security Fixes

**Total Time:** 1-2 hours (for critical fixes)  
**Skill Level:** Intermediate

---

## ⚡ FASTEST PATH (Critical Fixes Only)

### Step 1: Run Automated Setup (2 minutes)
```bash
cd /app
chmod +x apply_security_fixes.sh
./apply_security_fixes.sh
```

This installs dependencies and prepares your environment.

---

### Step 2: Generate Secure Credentials (3 minutes)
```bash
cd /app/backend
python security_hardening.py
```

Follow the prompts:
1. Enter admin email
2. Create strong password (12+ chars, mixed case, numbers, symbols)
3. Enter your domain for CORS (e.g., `https://yourdomain.com`)

This creates `/app/backend/.env.secure`

---

### Step 3: Apply New Configuration (1 minute)
```bash
# Backup current config
cp /app/backend/.env /app/backend/.env.old

# Use new secure config
mv /app/backend/.env.secure /app/backend/.env

# Verify it looks correct
cat /app/backend/.env
```

---

### Step 4: Apply Code Fixes to server.py (30 minutes)

I've prepared the complete fixed version. Copy and paste these changes:

#### 4a. Add Imports (after line 18)
```python
import bcrypt
import secrets
import re
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
```

#### 4b. Replace JWT Config (lines 42-54)
```python
# Authentication configuration - REQUIRED
security = HTTPBearer()
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET_KEY or len(JWT_SECRET_KEY) < 32:
    raise ValueError("JWT_SECRET_KEY must be at least 32 characters")

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "15"))

AUTHORIZED_ADMIN_EMAILS = [
    os.getenv("ADMIN_EMAIL"),
    "mdrudra60@gmail.com"
]
AUTHORIZED_ADMIN_EMAILS = [e for e in AUTHORIZED_ADMIN_EMAILS if e]

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")
if not ADMIN_EMAIL or not ADMIN_PASSWORD_HASH:
    raise ValueError("Admin credentials must be set")
```

#### 4c. Add Rate Limiter (after line 132)
```python
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
```

#### 4d. Update Login Function (lines 229-264)
```python
@app.post(f"{settings.API_V1_STR}/admin/login", response_model=AdminLoginResponse)
@limiter.limit("5/minute")
async def admin_login(request: Request, login_data: AdminLoginRequest):
    try:
        logger.info(f"Login attempt for email: {login_data.email}")
        
        if login_data.email != ADMIN_EMAIL:
            raise HTTPException(401, detail="Invalid credentials")
        
        if not bcrypt.checkpw(
            login_data.password.encode('utf-8'),
            ADMIN_PASSWORD_HASH.encode('utf-8')
        ):
            raise HTTPException(401, detail="Invalid credentials")
        
        access_token = create_access_token(
            data={"sub": login_data.email},
            expires_delta=timedelta(minutes=JWT_EXPIRE_MINUTES)
        )
        
        return AdminLoginResponse(
            access_token=access_token,
            expires_in=JWT_EXPIRE_MINUTES * 60
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(500, detail="Login failed")
```

---

### Step 5: Restart and Test (5 minutes)
```bash
# Restart backend
sudo supervisorctl restart backend

# Wait for startup
sleep 5

# Test login
curl -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_EMAIL","password":"YOUR_PASSWORD"}'

# Should return access_token
```

---

## ✅ VERIFICATION

After completing steps above, verify:

```bash
# 1. Check backend is running
sudo supervisorctl status backend

# 2. Test health endpoint
curl http://localhost:8001/

# 3. Run security tests
cd /app/backend
export ADMIN_EMAIL="your-email@example.com"
export ADMIN_PASSWORD="your-secure-password"
bash test_security.sh
```

---

## 📊 WHAT YOU JUST FIXED

✅ **Critical:**
- Hardcoded credentials → Secure environment variables
- Plain text passwords → Bcrypt hashing
- Wildcard CORS → Specific domains only

✅ **High:**
- No rate limiting → 5 login attempts/minute
- Insecure file uploads → Size limits & validation (if you add that code)

✅ **Medium:**
- Long token expiration → 15 minutes
- No security headers → Added (if you add that code)

---

## 🔄 OPTIONAL: Full Implementation

For complete security (file upload, token refresh, etc.):

```bash
# Read the full plan
cat /app/SECURITY_FIX_IMPLEMENTATION_PLAN.md

# Or specific sections:
grep -A 50 "Fix 2.1" /app/SECURITY_FIX_IMPLEMENTATION_PLAN.md  # File upload
grep -A 50 "Fix 3.1" /app/SECURITY_FIX_IMPLEMENTATION_PLAN.md  # JWT refresh
```

---

## 🆘 TROUBLESHOOTING

### Issue: "JWT_SECRET_KEY must be at least 32 characters"
**Solution:** Make sure you ran `python security_hardening.py` and copied the `.env.secure` file

### Issue: "Invalid credentials" on login
**Solution:** 
1. Check your password was hashed: `grep ADMIN_PASSWORD_HASH /app/backend/.env`
2. Verify bcrypt import works: `python -c "import bcrypt; print('OK')"`

### Issue: Backend won't start
**Solution:** 
```bash
# Check logs
tail -100 /var/log/supervisor/backend.err.log

# Common issue: missing slowapi
pip install slowapi
```

### Issue: Rate limiting not working
**Solution:** Make sure you added:
- Imports for slowapi
- Limiter initialization
- `@limiter.limit()` decorator to endpoints
- `request: Request` parameter to functions

---

## 📞 NEXT STEPS

1. ✅ Complete critical fixes above (1-2 hours)
2. ⏳ Implement remaining high/medium fixes (see full plan)
3. 🧪 Run full test suite
4. 📝 Document your credentials securely
5. 🚀 Deploy to production

---

## 🔐 SAVE THESE CREDENTIALS!

After running `security_hardening.py`, save to your password manager:
- Admin Email: `_______________`
- Admin Password: `_______________`
- JWT Secret: `_______________`

**NEVER commit .env file to git!**

---

## 📚 RESOURCES

- Full Plan: `/app/SECURITY_FIX_IMPLEMENTATION_PLAN.md`
- Security Audit: `/app/SECURITY_AUDIT_REPORT.md`
- Test Scripts: `/app/backend/test_security.sh`
- Backups: `/app/backups/[timestamp]/`

---

**Estimated Time to Production-Ready:**
- Critical fixes: 1-2 hours ⚡
- All fixes: 3-5 days 🔨
- With testing: 1 week 🎯
