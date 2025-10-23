# Lead G - Codebase Index & Documentation

**Generated:** October 22, 2025  
**Application Type:** Full-Stack Lead Generation Platform  
**Tech Stack:** React 18 + FastAPI + Firebase Firestore

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Backend Structure](#backend-structure)
4. [Frontend Structure](#frontend-structure)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Authentication & Security](#authentication--security)
8. [Key Features](#key-features)
9. [Configuration](#configuration)
10. [Testing Status](#testing-status)

---

## Overview

**Lead G** is a modern lead generation platform designed for service businesses and government contractors. It provides:
- Public-facing marketing website
- Appointment booking system
- Admin panel with authentication
- Testimonials and company showcase management
- PDF/Excel export capabilities

**Current Status:** ✅ All major features implemented and tested  
**Backend:** Running on port 8001  
**Frontend:** Running on port 3000  
**Database:** Firebase Firestore (production), Mock DB (testing)

---

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React 18      │────────▶│   FastAPI       │────────▶│  Firebase       │
│   Frontend      │  HTTP   │   Backend       │  SDK    │  Firestore      │
│   Port 3000     │◀────────│   Port 8001     │◀────────│  Database       │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                            │
        │                            │
        ▼                            ▼
  Tailwind CSS            JWT Auth + Rate Limiting
  Radix UI                Security Headers
  Framer Motion           Bcrypt Passwords
```

**Communication:**
- Frontend → Backend: REST API via axios
- Backend → Database: Firebase Admin SDK
- Authentication: JWT tokens (15-minute expiration)
- Security: HTTPS, CORS, Rate limiting, Security headers

---

## Backend Structure

### Core Files

```
/app/backend/
├── server.py              # Main FastAPI application (25 endpoints)
├── models.py              # Pydantic data models
├── config.py              # Application configuration
├── database.py            # Firebase Firestore connection
├── database_realtime.py   # Firebase Realtime Database
├── mock_realtime_db.py    # Mock database for testing
├── requirements.txt       # Python dependencies (80 packages)
└── .env.example          # Environment variables template
```

### Key Dependencies

```python
# Core Framework
fastapi==0.115.6
uvicorn==0.34.0
starlette>=0.40.0

# Authentication & Security
PyJWT==2.10.1
bcrypt==4.1.3
python-jose==3.5.0
slowapi==0.1.9  # Rate limiting

# Database
firebase-admin==6.5.0
google-cloud-firestore
pymongo==4.5.0

# Data Processing
pydantic==2.12.0
pandas==2.3.3
openpyxl==3.1.5  # Excel export
reportlab==4.2.5  # PDF export

# Utilities
python-dotenv==1.0.1
python-multipart==0.0.18
requests==2.32.3
```

### Models (Pydantic)

```python
# Core Data Models
- StatusCheck / StatusCheckCreate
- ContactForm / ContactFormCreate
- Appointment / AppointmentCreate
- Testimonial / TestimonialCreate
- WorkedWithCompany / WorkedWithCompanyCreate
- AdminLoginRequest / AdminLoginResponse
- APIResponse
```

---

## Frontend Structure

### Directory Layout

```
/app/frontend/src/
├── App.js                    # Main app component + routing
├── App.css / index.css       # Global styles
├── components/               # React components (35+ files)
│   ├── Header.jsx           # Navigation with dropdowns
│   ├── Hero.jsx             # Landing page hero
│   ├── Footer.jsx           # Site footer
│   ├── Admin.jsx            # Admin dashboard
│   ├── AdminLogin.jsx       # Login form
│   ├── AppointmentBooking.jsx  # Booking form
│   ├── About.jsx            # About page
│   ├── Careers.jsx          # Careers page
│   ├── Contact.jsx          # Contact page
│   ├── IndustriesPage.jsx   # Industries showcase
│   ├── Services.jsx         # Services section
│   ├── Pricing.jsx          # Pricing section
│   ├── FAQ.jsx              # FAQ section
│   ├── Testimonials.jsx     # Testimonials display
│   ├── TestimonialManager.jsx  # Admin testimonial management
│   ├── WorkedWith.jsx       # Company logos display
│   ├── WorkedWithManager.jsx   # Admin company management
│   ├── WhyChooseUs.jsx      # Value proposition
│   ├── TelemarketingService.jsx     # Service detail pages
│   ├── GovernmentContractingService.jsx
│   ├── SocialMediaService.jsx
│   ├── PrivacyPolicy.jsx    # Legal pages
│   ├── TermsOfService.jsx
│   └── ui/                  # Radix UI components
├── contexts/
│   └── AuthContext.jsx      # Authentication state management
├── services/
│   ├── api.js               # API service layer
│   └── firebaseService.js   # Firebase client
├── data/
│   └── mock.js              # Mock data for development
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── utils/                   # Helper utilities
```

### Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "axios": "^1.8.4",
  "firebase": "^12.4.0",
  "framer-motion": "^12.23.13",
  "lucide-react": "^0.507.0",
  "tailwindcss": "^3.4.17",
  "@radix-ui/*": "Various (35+ Radix UI components)",
  "react-hook-form": "^7.56.2",
  "zod": "^3.24.4",
  "date-fns": "^4.1.0"
}
```

### Routes

```javascript
/ (Home)                  - Hero + Services + Industries + FAQ
/about                   - About Lead G
/careers                 - Career opportunities
/contact                 - Contact form
/industries              - Industries showcase page
/pricing                 - Pricing page
/book-appointment        - Appointment booking form
/admin                   - Admin dashboard (protected)
/privacy-policy          - Privacy policy
/terms-of-service        - Terms of service
/services/telemarketing  - Telemarketing service details
/services/government-contracting  - Gov contracting details
/services/social-media   - Social media service details
```

---

## API Endpoints

### Public Endpoints (No Auth Required)

```
GET  /                              - Root health check
GET  /api/health                    - Detailed health check
POST /api/appointments              - Create appointment
GET  /api/appointments/availability - Check availability
POST /api/contact                   - Submit contact form
GET  /api/testimonials              - Get testimonials
GET  /api/worked-with               - Get company logos
```

### Admin Endpoints (JWT Auth Required)

```
# Authentication
POST /api/admin/login               - Email/password login (bcrypt)
POST /api/admin/google-login        - Google OAuth login
GET  /api/admin/verify              - Verify JWT token

# Appointments Management
GET  /api/appointments              - List appointments (with filters)
PUT  /api/appointments/{id}/status  - Update appointment status

# Testimonials Management
POST /api/testimonials              - Create testimonial
PUT  /api/testimonials/{id}         - Update testimonial
DELETE /api/testimonials/{id}       - Delete testimonial
POST /api/testimonials/upload-logo  - Upload company logo

# Worked With Companies Management
POST /api/worked-with               - Add company
PUT  /api/worked-with/{id}          - Update company
DELETE /api/worked-with/{id}        - Delete company

# Data Export
GET  /api/admin/export/pdf          - Export appointments to PDF
GET  /api/admin/export/excel        - Export appointments to Excel

# Utilities
POST /api/admin/seed-data           - Seed test data
GET  /api/status                    - Get status checks
POST /api/status                    - Create status check
GET  /api/contact                   - Get contact forms
```

### Rate Limiting

```
Login endpoint: 5 attempts per minute per IP
Other endpoints: Standard FastAPI limits
```

---

## Database Schema

### Firebase Firestore Collections

#### `appointments`
```javascript
{
  id: string (UUID),
  name: string,
  email: string,
  phone: string,
  business: string,
  industry: string,
  service_interests: string,
  appointment_date: string (YYYY-MM-DD),
  appointment_time: string (HH:MM),
  message: string,
  user_timezone: string,
  appointment_datetime_utc: string (ISO 8601),
  status: enum("pending", "confirmed", "completed", "cancelled"),
  created_at: string (ISO 8601)
}
```

#### `testimonials`
```javascript
{
  id: string (UUID),
  client_name: string,
  company_name: string,
  position: string,
  testimonial_text: string,
  rating: number (1-5),
  logo_url: string (optional),
  display_order: number,
  is_featured: boolean,
  created_at: string (ISO 8601)
}
```

#### `worked_with_companies`
```javascript
{
  id: string (UUID),
  company_name: string,
  logo_url: string,
  display_location: enum("home", "telemarketing", "gov_contracting", "social_media"),
  display_order: number,
  is_active: boolean,
  created_at: string (ISO 8601)
}
```

#### `contact_forms`
```javascript
{
  id: string (UUID),
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  company: string,
  industry: string,
  service: string,
  message: string,
  status: string,
  created_at: string (ISO 8601)
}
```

#### `status_checks`
```javascript
{
  id: string (UUID),
  client_name: string,
  timestamp: string (ISO 8601),
  status: string
}
```

---

## Authentication & Security

### JWT Authentication

```python
# Configuration
JWT_SECRET_KEY: Required (min 32 chars)
JWT_ALGORITHM: HS256
JWT_EXPIRE_MINUTES: 15 minutes

# Authorized Admins
- toiral.dev@gmail.com
- mdrudra60@gmail.com
```

### Password Security

```python
# Bcrypt hashing with salt
- Cost factor: Default bcrypt settings
- Password validation: Email/password combination
- No password stored in plain text
```

### Rate Limiting

```python
# SlowAPI Implementation
Login endpoint: 5 requests/minute/IP
- Uses X-Forwarded-For header for Kubernetes/proxy
- Blocks with HTTP 429 after limit exceeded
```

### Security Headers

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### CORS Configuration

```python
Allow Origins: Configurable (default: *)
Allow Credentials: True
Allow Methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
Allow Headers: ["*"]
```

---

## Key Features

### 1. Appointment Booking System
- ✅ Multi-field appointment form
- ✅ Timezone conversion (local → UTC)
- ✅ Availability checking
- ✅ Overlap prevention
- ✅ Status management (pending, confirmed, completed, cancelled)
- ✅ Email validation

### 2. Admin Dashboard
- ✅ JWT-based authentication
- ✅ Appointment management with filtering
- ✅ Status update functionality
- ✅ Export to PDF/Excel
- ✅ Mock data generation
- ✅ Testimonials CRUD operations
- ✅ Company logos CRUD operations

### 3. Public Website
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Glass morphism UI effects
- ✅ Smooth animations (Framer Motion)
- ✅ Interactive dropdowns
- ✅ Industries page with selector
- ✅ Service detail pages
- ✅ FAQ section
- ✅ Contact forms

### 4. Security Features
- ✅ JWT authentication (15-min expiration)
- ✅ Bcrypt password hashing
- ✅ Rate limiting on login
- ✅ Security headers
- ✅ CORS protection
- ✅ Input validation (Pydantic)

### 5. Data Management
- ✅ Firebase Firestore integration
- ✅ PDF export with formatting
- ✅ Excel export with multiple worksheets
- ✅ File upload (company logos)
- ✅ Mock data generation for testing

---

## Configuration

### Environment Variables

#### Backend (`/app/backend/.env`)
```bash
# Required - Security
JWT_SECRET_KEY=<min 32 characters>
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=15

# Required - Admin Credentials
ADMIN_EMAIL=toiral.dev@gmail.com
ADMIN_PASSWORD_HASH=<bcrypt hash>

# Optional - Database
FIREBASE_PROJECT_ID=<firebase-project-id>
FIREBASE_CREDENTIALS_PATH=firebase-credentials.json

# Optional - Server
CORS_ORIGINS=*
ENVIRONMENT=production
DEBUG=False
```

#### Frontend (`/app/frontend/.env`)
```bash
REACT_APP_BACKEND_URL=https://pricing-harmony.preview.emergentagent.com
REACT_APP_ENVIRONMENT=production
```

### Supervisor Configuration

```ini
[program:backend]
command=python /app/backend/server.py
directory=/app/backend
autostart=true
autorestart=true

[program:frontend]
command=yarn start
directory=/app/frontend
autostart=true
autorestart=true

[program:mongodb]
command=mongod
autostart=true
autorestart=true
```

---

## Testing Status

### Backend Testing (100% Pass Rate)

✅ **API Endpoints:** All 25 endpoints tested successfully  
✅ **Authentication:** JWT login, token verification, Google OAuth  
✅ **Appointments:** CRUD operations, filtering, status updates  
✅ **Testimonials:** Full CRUD with logo upload  
✅ **Worked With:** Full CRUD operations  
✅ **Exports:** PDF and Excel generation  
✅ **Security:** Rate limiting, bcrypt, headers  
✅ **Database:** Firebase Firestore connectivity  

### Frontend Testing (95% Pass Rate)

✅ **Navigation:** All pages accessible  
✅ **Dropdowns:** Services dropdown working  
⚠️ **Industries Dropdown:** Not working on deployed site (known issue)  
✅ **Forms:** Contact form, appointment booking  
✅ **Admin Panel:** Login, dashboard, CRUD operations  
✅ **Responsive:** Mobile/tablet/desktop views  
✅ **Animations:** Smooth transitions, glass effects  

### Known Issues

1. **Industries Dropdown** (Priority: High, Stuck Count: 1)
   - Status: Not working on deployed site
   - Issue: Dropdown button exists but items not visible
   - Location: `/app/frontend/src/components/Header.jsx`
   - Workaround: Industries page accessible via direct link

---

## Development Workflow

### Starting Services

```bash
# Start all services
sudo supervisorctl restart all

# Check status
sudo supervisorctl status

# View logs
tail -f /var/log/supervisor/backend.*.log
tail -f /var/log/supervisor/frontend.*.log
```

### Installing Dependencies

```bash
# Backend
cd /app/backend
pip install -r requirements.txt

# Frontend (use yarn, NOT npm)
cd /app/frontend
yarn install
```

### Hot Reload

- Backend: ✅ Enabled (FastAPI auto-reload)
- Frontend: ✅ Enabled (React hot module replacement)
- Only restart after: New dependencies, .env changes

---

## Project Statistics

```
Total Files: 200+
Backend Files: 15+
Frontend Components: 35+
API Endpoints: 25
Database Collections: 5
Lines of Code: ~15,000+
Dependencies: 115+ (80 backend + 35+ frontend)
```

---

## Admin Credentials

```
Email: toiral.dev@gmail.com
Password: MGS=Q*_101_yOXlf

Secondary Admin: mdrudra60@gmail.com
```

---

## Deployment URLs

```
Production Frontend: https://pricing-harmony.preview.emergentagent.com
Backend API: /api/* (proxied through frontend URL)
API Documentation: Disabled in production
```

---

## Recent Updates

1. ✅ Removed 'Case Studies' navigation item
2. ✅ Updated 'Why Choose LeadG?' section (removed 2 sections)
3. ✅ Added careers page at `/careers`
4. ✅ Created industries dedicated page at `/industries`
5. ✅ Integrated industry-specific images
6. ✅ Enhanced admin panel design
7. ✅ Fixed appointment booking JSON errors
8. ✅ Implemented security enhancements (JWT, bcrypt, rate limiting)
9. ✅ Added PDF/Excel export functionality
10. ✅ Seed data functionality for testing

---

## Next Steps / Roadmap

1. 🔧 Fix Industries dropdown on deployed site
2. 📱 Mobile navigation improvements
3. 🔒 Additional security hardening
4. 📊 Analytics integration
5. 🚀 Performance optimizations
6. 📧 Email notifications for appointments
7. 💬 Live chat integration
8. 🎨 Additional theme customizations

---

**End of Codebase Index**  
**Last Updated:** October 22, 2025  
**Maintained By:** Development Team
