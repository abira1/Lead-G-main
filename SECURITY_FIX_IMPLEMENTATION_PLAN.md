# 🔒 COMPLETE SECURITY FIX IMPLEMENTATION PLAN

**Timeline:** 3-5 Days  
**Priority:** CRITICAL - Must complete before production deployment

---

## 📋 IMPLEMENTATION OVERVIEW

| Phase | Duration | Risk Level | Status |
|-------|----------|------------|--------|
| Phase 1: Critical Fixes | Day 1 | 🔴 Critical | Ready |
| Phase 2: High Priority | Day 2-3 | 🟠 High | Ready |
| Phase 3: Medium Priority | Day 4 | 🟡 Medium | Ready |
| Phase 4: Testing & Verification | Day 5 | All | Ready |

---

## 🚀 PHASE 1: CRITICAL FIXES (Day 1)

### Fix 1.1: Remove Hardcoded Credentials & Generate Secure Secrets

**What we're fixing:**
- Hardcoded JWT secret
- Default admin credentials
- Weak passwords

**Step-by-step:**

#### Step 1: Generate Secure Credentials
```bash
cd /app/backend
python security_hardening.py
```

Follow the prompts to:
- Enter admin email
- Create strong password (min 12 chars, mixed case, numbers, symbols)
- Enter production domains for CORS

This creates `/app/backend/.env.secure`

#### Step 2: Backup and Replace .env
```bash
# Backup current .env
cp /app/backend/.env /app/backend/.env.backup

# Review generated secure file
cat /app/backend/.env.secure

# Replace with secure version
mv /app/backend/.env.secure /app/backend/.env
```

#### Step 3: Update server.py to require environment variables

**File:** `/app/backend/server.py`

**Find lines 42-54 and replace with:**
```python
# Authentication configuration - REQUIRED environment variables
security = HTTPBearer()

# JWT Configuration - No defaults allowed
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not JWT_SECRET_KEY or len(JWT_SECRET_KEY) < 32:
    raise ValueError("JWT_SECRET_KEY must be set in environment and at least 32 characters long")

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "15"))  # Reduced to 15 minutes

# Authorized admin emails for Google OAuth
AUTHORIZED_ADMIN_EMAILS = [
    os.getenv("ADMIN_EMAIL"),  # Primary admin from env
    "mdrudra60@gmail.com"  # Secondary admin
]

# Remove any None values
AUTHORIZED_ADMIN_EMAILS = [email for email in AUTHORIZED_ADMIN_EMAILS if email]

if not AUTHORIZED_ADMIN_EMAILS:
    raise ValueError("At least one ADMIN_EMAIL must be set in environment")

# Admin credentials for email/password login
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

if not ADMIN_EMAIL or not ADMIN_PASSWORD_HASH:
    raise ValueError("ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be set in environment")
```

**Status:** ⏳ Ready to implement

---

### Fix 1.2: Implement Password Hashing with bcrypt

**File:** `/app/backend/server.py`

#### Step 1: Add bcrypt import at top of file
```python
# Add to imports section (around line 14)
import bcrypt
```

#### Step 2: Update login endpoint (around line 229)

**Replace the login function (lines 229-264) with:**
```python
@app.post(f"{settings.API_V1_STR}/admin/login", response_model=AdminLoginResponse)
async def admin_login(login_data: AdminLoginRequest):
    """Admin login endpoint with bcrypt password verification"""
    try:
        logger.info(f"Login attempt for email: {login_data.email}")
        
        # Verify email
        if login_data.email != ADMIN_EMAIL:
            logger.warning(f"Invalid login attempt for: {login_data.email}")
            # Use generic error to prevent email enumeration
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Verify password using bcrypt
        try:
            password_correct = bcrypt.checkpw(
                login_data.password.encode('utf-8'),
                ADMIN_PASSWORD_HASH.encode('utf-8')
            )
        except Exception as e:
            logger.error(f"Password verification error: {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        if not password_correct:
            logger.warning(f"Invalid password for: {login_data.email}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=JWT_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": login_data.email}, expires_delta=access_token_expires
        )
        
        logger.info(f"Admin login successful: {login_data.email}")
        return AdminLoginResponse(
            access_token=access_token,
            expires_in=JWT_EXPIRE_MINUTES * 60
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed. Please try again."
        )
```

**Status:** ⏳ Ready to implement

---

### Fix 1.3: Secure CORS Configuration

**File:** `/app/backend/config.py`

**Replace lines 46-49 with:**
```python
# Security settings - Restrictive by default
ENABLE_CORS_ALL_ORIGINS = os.getenv('ENABLE_CORS_ALL_ORIGINS', 'false').lower() == 'true'
ALLOW_ALL_METHODS = os.getenv('ALLOW_ALL_METHODS', 'false').lower() == 'true'
ALLOW_ALL_HEADERS = os.getenv('ALLOW_ALL_HEADERS', 'false').lower() == 'true'
```

**File:** `/app/backend/.env`

**Update CORS settings:**
```bash
# Replace this:
CORS_ORIGINS="*"

# With this (use your actual domains):
CORS_ORIGINS="https://yourdomain.com,https://www.yourdomain.com,http://localhost:3000"
ENABLE_CORS_ALL_ORIGINS="false"
ALLOW_ALL_METHODS="false"
ALLOW_ALL_HEADERS="false"
```

**Status:** ⏳ Ready to implement

---

### Fix 1.4: Add .env to .gitignore

```bash
# Check if .env is in .gitignore
grep -q "\.env" /app/.gitignore

# If not found, add it
cat >> /app/.gitignore << 'EOF'

# Environment variables (SECURITY - NEVER COMMIT)
.env
.env.local
.env.*.local
backend/.env
frontend/.env
*.env
!.env.example
EOF
```

**Status:** ⏳ Ready to implement

---

### Testing Phase 1:

```bash
# Restart backend
sudo supervisorctl restart backend

# Wait for startup
sleep 5

# Test health endpoint
curl http://localhost:8001/

# Test login with new credentials
curl -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_EMAIL","password":"YOUR_NEW_PASSWORD"}'
```

**Expected:** Should return access_token

---

## 🛡️ PHASE 2: HIGH PRIORITY FIXES (Day 2-3)

### Fix 2.1: Secure File Upload

**File:** `/app/backend/server.py`

**Replace the upload_logo function (lines 815-853) with:**

```python
import re
import secrets
from pathlib import Path

@app.post(f"{settings.API_V1_STR}/testimonials/upload-logo")
async def upload_logo(file: UploadFile = File(...), current_user: str = Depends(verify_token)):
    """Upload a company logo with security checks (admin endpoint)"""
    try:
        # 1. Read file contents
        contents = await file.read()
        
        # 2. Validate file size (5MB max)
        max_size = 5 * 1024 * 1024  # 5MB
        if len(contents) > max_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File too large. Maximum size is {max_size / (1024*1024):.1f}MB"
            )
        
        # 3. Validate content type
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"]
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file type. Only images are allowed (JPEG, PNG, GIF, WebP, SVG)."
            )
        
        # 4. Sanitize filename and validate extension
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Filename is required"
            )
        
        # Remove any path components and dangerous characters
        safe_filename = os.path.basename(file.filename)
        safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '', safe_filename)
        
        # Get file extension
        file_extension = Path(safe_filename).suffix.lower()
        
        # Validate extension against whitelist
        allowed_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
        if file_extension not in allowed_extensions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid file extension. Allowed: {', '.join(allowed_extensions)}"
            )
        
        # 5. Generate secure random filename
        random_name = secrets.token_hex(16)
        unique_filename = f"{random_name}{file_extension}"
        
        # 6. Verify content magic bytes (basic check)
        # JPEG: FF D8 FF
        # PNG: 89 50 4E 47
        # GIF: 47 49 46
        magic_bytes = {
            b'\xFF\xD8\xFF': '.jpg',
            b'\x89\x50\x4E\x47': '.png',
            b'\x47\x49\x46': '.gif',
            b'<svg': '.svg'  # SVG is XML-based
        }
        
        content_valid = False
        for magic, ext in magic_bytes.items():
            if contents.startswith(magic) and file_extension in [ext, '.jpeg']:
                content_valid = True
                break
        
        if not content_valid and file_extension != '.webp':  # WebP harder to validate
            logger.warning(f"File content doesn't match extension: {file_extension}")
            # For now, log but don't reject (can be made stricter)
        
        # 7. Ensure upload directory exists and is secure
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        
        # 8. Construct safe file path
        file_path = UPLOAD_DIR / unique_filename
        
        # 9. Additional security: ensure file is within upload directory
        try:
            file_path = file_path.resolve()
            UPLOAD_DIR_RESOLVED = UPLOAD_DIR.resolve()
            if not str(file_path).startswith(str(UPLOAD_DIR_RESOLVED)):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid file path"
                )
        except Exception as e:
            logger.error(f"Path validation error: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid file path"
            )
        
        # 10. Save file
        with file_path.open("wb") as buffer:
            buffer.write(contents)
        
        # 11. Set secure file permissions (read-only for others)
        os.chmod(file_path, 0o644)
        
        # Return the URL path
        logo_url = f"/uploads/logos/{unique_filename}"
        
        logger.info(f"Logo uploaded successfully: {unique_filename} (original: {file.filename})")
        return {
            "success": True,
            "logo_url": logo_url,
            "filename": unique_filename
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to upload logo: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload logo. Please try again."
        )
```

**Status:** ⏳ Ready to implement

---

### Fix 2.2: Add Rate Limiting

#### Step 1: Install slowapi
```bash
cd /app/backend
pip install slowapi
pip freeze > requirements.txt
```

#### Step 2: Update server.py

**Add imports (around line 10):**
```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
```

**Add after app initialization (around line 132):**
```python
# Rate limiter configuration
limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
```

**Update critical endpoints with rate limits:**

```python
# Login endpoint - limit brute force
@app.post(f"{settings.API_V1_STR}/admin/login", response_model=AdminLoginResponse)
@limiter.limit("5/minute")  # Max 5 login attempts per minute
async def admin_login(request: Request, login_data: AdminLoginRequest):
    # ... existing code ...

# Contact form - prevent spam
@app.post(f"{settings.API_V1_STR}/contact", response_model=ContactForm)
@limiter.limit("10/hour")  # Max 10 submissions per hour
async def submit_contact_form(request: Request, contact_data: ContactFormCreate):
    # ... existing code ...

# Appointments - prevent spam
@app.post(f"{settings.API_V1_STR}/appointments", response_model=Appointment)
@limiter.limit("5/hour")  # Max 5 appointments per hour
async def create_appointment(request: Request, appointment_data: AppointmentCreate):
    # ... existing code ...

# File upload - prevent abuse
@app.post(f"{settings.API_V1_STR}/testimonials/upload-logo")
@limiter.limit("20/hour")  # Max 20 uploads per hour
async def upload_logo(request: Request, file: UploadFile = File(...), current_user: str = Depends(verify_token)):
    # ... existing code ...
```

**Status:** ⏳ Ready to implement

---

### Fix 2.3: Add Security Headers

**Add after CORS middleware (around line 142):**

```python
# Security headers middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """Add security headers to all responses"""
    response = await call_next(request)
    
    # Prevent MIME type sniffing
    response.headers["X-Content-Type-Options"] = "nosniff"
    
    # Prevent clickjacking
    response.headers["X-Frame-Options"] = "DENY"
    
    # XSS Protection (legacy but still useful)
    response.headers["X-XSS-Protection"] = "1; mode=block"
    
    # HSTS - Force HTTPS (only in production)
    if settings.ENVIRONMENT == "production":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    # Content Security Policy
    response.headers["Content-Security-Policy"] = "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    
    # Referrer Policy
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    # Permissions Policy
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    
    return response
```

**Status:** ⏳ Ready to implement

---

### Testing Phase 2:

```bash
# Restart backend
sudo supervisorctl restart backend

# Test rate limiting (should fail after 5 attempts)
for i in {1..6}; do
  echo "Attempt $i:"
  curl -X POST http://localhost:8001/api/admin/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' \
    -w "\nStatus: %{http_code}\n\n"
done

# Test file upload security
curl -X POST http://localhost:8001/api/testimonials/upload-logo \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/etc/passwd" \
  -w "\nStatus: %{http_code}\n"

# Should reject with 400 Bad Request
```

**Expected:** 
- First 5 login attempts return 401
- 6th attempt returns 429 (Too Many Requests)
- File upload rejects invalid files

---

## ⚡ PHASE 3: MEDIUM PRIORITY FIXES (Day 4)

### Fix 3.1: JWT Token Improvements

#### Step 1: Reduce token expiration

Already done in Phase 1 (changed to 15 minutes)

#### Step 2: Add token refresh endpoint

**Add to server.py:**

```python
# Token blacklist for logout
token_blacklist = set()

@app.post(f"{settings.API_V1_STR}/admin/refresh")
async def refresh_token(refresh_request: dict):
    """Refresh access token using refresh token"""
    try:
        refresh_token = refresh_request.get('refresh_token')
        if not refresh_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Refresh token required"
            )
        
        # Verify refresh token
        try:
            payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            email = payload.get("sub")
            token_type = payload.get("type")
            
            if token_type != "refresh" or email not in AUTHORIZED_ADMIN_EMAILS:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid refresh token"
                )
            
            # Issue new access token
            access_token_expires = timedelta(minutes=JWT_EXPIRE_MINUTES)
            new_access_token = create_access_token(
                data={"sub": email}, 
                expires_delta=access_token_expires
            )
            
            return {
                "access_token": new_access_token,
                "token_type": "bearer",
                "expires_in": JWT_EXPIRE_MINUTES * 60
            }
            
        except jwt.PyJWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Token refresh failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )

@app.post(f"{settings.API_V1_STR}/admin/logout")
async def logout(current_user: str = Depends(verify_token), credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Logout and invalidate token"""
    token = credentials.credentials
    token_blacklist.add(token)
    logger.info(f"Admin logout: {current_user}")
    return {"success": True, "message": "Logged out successfully"}
```

#### Step 3: Update create_access_token to support refresh tokens

**Replace create_access_token function:**

```python
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None, token_type: str = "access"):
    """Create JWT access or refresh token"""
    to_encode = data.copy()
    to_encode["type"] = token_type
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        if token_type == "refresh":
            expire = datetime.utcnow() + timedelta(days=7)  # 7 days for refresh
        else:
            expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt
```

#### Step 4: Update login to issue refresh token

**In admin_login function, change the return statement:**

```python
# Create access token
access_token_expires = timedelta(minutes=JWT_EXPIRE_MINUTES)
access_token = create_access_token(
    data={"sub": login_data.email}, 
    expires_delta=access_token_expires,
    token_type="access"
)

# Create refresh token
refresh_token_expires = timedelta(days=7)
refresh_token = create_access_token(
    data={"sub": login_data.email}, 
    expires_delta=refresh_token_expires,
    token_type="refresh"
)

logger.info(f"Admin login successful: {login_data.email}")
return {
    "access_token": access_token,
    "refresh_token": refresh_token,
    "token_type": "bearer",
    "expires_in": JWT_EXPIRE_MINUTES * 60
}
```

#### Step 5: Update verify_token to check blacklist

**Replace verify_token function:**

```python
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token for admin authentication"""
    token = credentials.credentials
    
    # Check if token is blacklisted
    if token in token_blacklist:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has been revoked",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type", "access")
        
        # Only access tokens allowed for API endpoints
        if token_type != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        if email is None or email not in AUTHORIZED_ADMIN_EMAILS:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
```

**Status:** ⏳ Ready to implement

---

### Fix 3.2: Frontend Token Storage (Optional but Recommended)

**File:** `/app/frontend/src/contexts/AuthContext.jsx`

**Option 1: Keep localStorage but add auto-refresh**

Add this after the login function:

```javascript
// Auto-refresh token before expiration
useEffect(() => {
  if (!isAuthenticated || !token) return;
  
  // Refresh token every 14 minutes (1 minute before 15-minute expiration)
  const refreshInterval = setInterval(async () => {
    try {
      const backendUrl = getBackendUrl();
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        console.log('No refresh token, logging out');
        logout();
        return;
      }
      
      const response = await fetch(`${backendUrl}/api/admin/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        localStorage.setItem('admin_token', data.access_token);
        console.log('Token refreshed successfully');
      } else {
        console.log('Token refresh failed, logging out');
        logout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
    }
  }, 14 * 60 * 1000); // 14 minutes
  
  return () => clearInterval(refreshInterval);
}, [isAuthenticated, token]);
```

**Update login function to store refresh token:**

```javascript
if (response.ok) {
  console.log('Login successful! Setting token...');
  setToken(data.access_token);
  setIsAuthenticated(true);
  localStorage.setItem('admin_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);  // Add this line
  console.log('Token set, authentication complete');
  return { success: true };
}
```

**Update logout function:**

```javascript
const logout = async () => {
  try {
    const backendUrl = getBackendUrl();
    await fetch(`${backendUrl}/api/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  setToken(null);
  setIsAuthenticated(false);
  localStorage.removeItem('admin_token');
  localStorage.removeItem('refresh_token');  // Add this line
};
```

**Status:** ⏳ Ready to implement

---

## 🧪 PHASE 4: TESTING & VERIFICATION (Day 5)

### Test Suite 1: Authentication Security

```bash
#!/bin/bash
# Save as /app/backend/test_security.sh

echo "=== SECURITY TEST SUITE ==="
echo ""

# Test 1: Login with wrong password
echo "Test 1: Wrong password (should fail)"
curl -s -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"wrongpassword"}' | jq

# Test 2: Login with correct credentials
echo ""
echo "Test 2: Correct credentials (should succeed)"
RESPONSE=$(curl -s -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_ADMIN_EMAIL","password":"YOUR_ADMIN_PASSWORD"}')

TOKEN=$(echo $RESPONSE | jq -r '.access_token')
REFRESH=$(echo $RESPONSE | jq -r '.refresh_token')

echo "Access Token: ${TOKEN:0:20}..."
echo "Refresh Token: ${REFRESH:0:20}..."

# Test 3: Access protected endpoint
echo ""
echo "Test 3: Access protected endpoint"
curl -s http://localhost:8001/api/admin/verify \
  -H "Authorization: Bearer $TOKEN" | jq

# Test 4: Rate limiting
echo ""
echo "Test 4: Rate limiting (attempt 6 logins)"
for i in {1..6}; do
  echo "Attempt $i:"
  curl -s -o /dev/null -w "Status: %{http_code}\n" \
    -X POST http://localhost:8001/api/admin/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
  sleep 1
done

# Test 5: Token refresh
echo ""
echo "Test 5: Token refresh"
curl -s -X POST http://localhost:8001/api/admin/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH\"}" | jq

# Test 6: Logout
echo ""
echo "Test 6: Logout"
curl -s -X POST http://localhost:8001/api/admin/logout \
  -H "Authorization: Bearer $TOKEN" | jq

# Test 7: Use blacklisted token (should fail)
echo ""
echo "Test 7: Use token after logout (should fail)"
curl -s http://localhost:8001/api/admin/verify \
  -H "Authorization: Bearer $TOKEN" | jq

echo ""
echo "=== TEST SUITE COMPLETE ==="
```

Make executable and run:
```bash
chmod +x /app/backend/test_security.sh
bash /app/backend/test_security.sh
```

---

### Test Suite 2: File Upload Security

```bash
#!/bin/bash
# Save as /app/backend/test_file_upload.sh

echo "=== FILE UPLOAD SECURITY TESTS ==="
echo ""

# Get token first
TOKEN=$(curl -s -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"YOUR_ADMIN_EMAIL","password":"YOUR_ADMIN_PASSWORD"}' | jq -r '.access_token')

# Test 1: Upload valid image
echo "Test 1: Valid image upload"
curl -s -X POST http://localhost:8001/api/testimonials/upload-logo \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/test-image.jpg" | jq

# Test 2: Upload file that's too large
echo ""
echo "Test 2: Large file (should fail)"
dd if=/dev/zero of=/tmp/large.jpg bs=1M count=6
curl -s -X POST http://localhost:8001/api/testimonials/upload-logo \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/tmp/large.jpg" | jq
rm /tmp/large.jpg

# Test 3: Upload invalid file type
echo ""
echo "Test 3: Invalid file type (should fail)"
echo "malicious content" > /tmp/test.exe
curl -s -X POST http://localhost:8001/api/testimonials/upload-logo \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/tmp/test.exe" | jq
rm /tmp/test.exe

# Test 4: Path traversal attempt
echo ""
echo "Test 4: Path traversal (should fail)"
echo "test" > /tmp/test.jpg
curl -s -X POST http://localhost:8001/api/testimonials/upload-logo \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/tmp/test.jpg;filename=../../etc/passwd" | jq
rm /tmp/test.jpg

echo ""
echo "=== FILE UPLOAD TESTS COMPLETE ==="
```

---

### Test Suite 3: CORS Security

```bash
#!/bin/bash
# Save as /app/backend/test_cors.sh

echo "=== CORS SECURITY TESTS ==="
echo ""

# Test 1: Request from allowed origin
echo "Test 1: Allowed origin"
curl -s -H "Origin: https://yourdomain.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS http://localhost:8001/api/contact -I | grep -i "access-control"

echo ""
echo "Test 2: Request from disallowed origin (should not have CORS headers)"
curl -s -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS http://localhost:8001/api/contact -I | grep -i "access-control"

echo ""
echo "=== CORS TESTS COMPLETE ==="
```

---

### Test Suite 4: Security Headers

```bash
#!/bin/bash
# Save as /app/backend/test_headers.sh

echo "=== SECURITY HEADERS TEST ==="
echo ""

curl -s -I http://localhost:8001/ | grep -E "(X-Content-Type-Options|X-Frame-Options|X-XSS-Protection|Strict-Transport-Security|Content-Security-Policy|Referrer-Policy)"

echo ""
echo "=== HEADERS TEST COMPLETE ==="
```

---

## 📊 VERIFICATION CHECKLIST

After completing all phases, verify each fix:

### Phase 1 Verification:
- [ ] No hardcoded credentials in server.py
- [ ] Strong JWT secret in .env (32+ characters)
- [ ] Strong admin password set
- [ ] Passwords hashed with bcrypt
- [ ] CORS configured with specific origins
- [ ] .env added to .gitignore
- [ ] Login works with new credentials
- [ ] Old default password doesn't work

### Phase 2 Verification:
- [ ] File uploads reject large files (>5MB)
- [ ] File uploads reject invalid file types
- [ ] File uploads reject path traversal attempts
- [ ] Filenames are randomized
- [ ] Rate limiting blocks after threshold
- [ ] Rate limiting allows requests after timeout
- [ ] Security headers present in responses

### Phase 3 Verification:
- [ ] Token expires after 15 minutes
- [ ] Refresh token works correctly
- [ ] Logout invalidates token
- [ ] Blacklisted token rejected
- [ ] Auto-refresh works in frontend

### Security Headers Verification:
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Content-Security-Policy present
- [ ] Referrer-Policy present

---

## 🚨 ROLLBACK PLAN

If anything goes wrong:

```bash
# Restore original .env
cp /app/backend/.env.backup /app/backend/.env

# Restart services
sudo supervisorctl restart all

# Check logs
tail -f /var/log/supervisor/backend.err.log
```

---

## 📝 POST-IMPLEMENTATION CHECKLIST

- [ ] All test suites pass
- [ ] Admin can login with new credentials
- [ ] No errors in backend logs
- [ ] Frontend still works correctly
- [ ] File uploads work (with security checks)
- [ ] Rate limiting is active
- [ ] CORS properly configured
- [ ] Security headers present
- [ ] .env backed up securely
- [ ] Team trained on new security practices
- [ ] Documentation updated
- [ ] Monitoring configured

---

## 🎯 SUCCESS CRITERIA

Your application is secure when:

1. ✅ No default/hardcoded credentials exist
2. ✅ All passwords are hashed
3. ✅ CORS only allows specific domains
4. ✅ Rate limiting prevents brute force
5. ✅ File uploads are validated and sanitized
6. ✅ JWT tokens expire quickly and can be refreshed
7. ✅ Security headers are present
8. ✅ All tests pass
9. ✅ No sensitive data in logs
10. ✅ .env file never committed to git

---

## 📞 NEED HELP?

If you encounter issues during implementation:

1. Check logs: `tail -f /var/log/supervisor/backend.err.log`
2. Test individual components
3. Review error messages carefully
4. Ensure all environment variables are set
5. Verify services are running: `sudo supervisorctl status`

---

**Timeline Summary:**
- Day 1: Critical fixes (credentials, CORS, password hashing)
- Day 2-3: High priority (file upload, rate limiting, headers)
- Day 4: Medium priority (JWT improvements, refresh tokens)
- Day 5: Testing and verification

**Estimated Total Time:** 3-5 days (depending on team size and experience)
