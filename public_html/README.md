# Lead G - Lead Generation Platform

## 📋 Overview

Lead G is a complete lead generation and marketing platform built with PHP and MySQL. This is a production-ready deployment package for Hostinger shared hosting.

## 🛠️ Technology Stack

- **Backend**: PHP 7.4+ (PDO for database)
- **Database**: MySQL 5.7+
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Icons**: Font Awesome 6
- **Server**: Apache with .htaccess

## 📁 Directory Structure

```
public_html/
├── config/                 # Configuration files
│   ├── database.php        # Database connection
│   ├── config.php          # App configuration
│   └── .htaccess           # Protect config directory
│
├── includes/               # Reusable PHP includes
│   ├── header.php          # Site header
│   ├── footer.php          # Site footer
│   ├── functions.php       # Helper functions
│   └── session.php         # Session management
│
├── api/                    # REST API endpoints
│   ├── contact.php         # Contact form API
│   ├── appointments.php    # Appointments API
│   ├── testimonials.php    # Testimonials API
│   ├── worked-with.php     # Companies API
│   ├── upload.php          # File upload API
│   └── admin/              # Admin APIs
│       ├── login.php       # Admin authentication
│       ├── logout.php      # Logout handler
│       └── verify.php      # Session verification
│
├── admin/                  # Admin panel
│   ├── index.php           # Dashboard
│   ├── login.php           # Login page
│   ├── appointments.php    # Manage appointments
│   ├── testimonials.php    # Manage testimonials
│   └── worked-with.php     # Manage companies
│
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css       # Custom styles
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   └── images/             # Images
│
├── uploads/                # User uploads
│   └── logos/              # Company logos
│
├── services/               # Service pages
│   ├── telemarketing.php
│   ├── government-contracting.php
│   └── social-media.php
│
├── index.php               # Homepage
├── about.php               # About page
├── contact.php             # Contact page
├── pricing.php             # Pricing page
├── book-appointment.php    # Appointment booking
├── .htaccess              # URL rewriting & security
├── database.sql           # Database schema
├── INSTALLATION.md        # Installation guide
└── README.md              # This file
```

## 🔑 Key Features

### Public Features
- 🏠 Modern homepage with services showcase
- 📞 Contact form with database storage
- 📅 Appointment booking system
- 💼 Companies "Worked With" section
- ⭐ Customer testimonials
- 📱 Fully responsive design
- 🔒 SEO-friendly URLs

### Admin Features
- 🔐 Secure authentication system
- 📊 Dashboard with statistics
- 📅 Appointment management
- ⭐ Testimonials management
- 💼 Companies management
- 📤 File upload system
- 🔒 Session-based security

## 🔧 Configuration

### Database Configuration
**File**: `config/database.php`
```php
DB_HOST: localhost
DB_NAME: u530488780_toiraldbhub
DB_USER: u530488780_leadgdb
DB_PASS: 2oiraldb#passLeadG123
```

### Site Configuration
**File**: `config/config.php`
- Site name, URL, emails
- Security settings
- File upload limits
- Session configuration

## 🔒 Security Features

1. **SQL Injection Protection**: PDO prepared statements
2. **XSS Protection**: Input sanitization and output escaping
3. **CSRF Protection**: Token-based form validation
4. **Session Security**: Fingerprinting and hijacking prevention
5. **File Upload Security**: Type validation and size limits
6. **Password Security**: Bcrypt hashing
7. **SQL Injection Prevention**: Parameterized queries
8. **Directory Protection**: .htaccess restrictions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Performance

- **Page Load**: <2 seconds (optimized)
- **Database**: Indexed queries
- **Caching**: Browser caching enabled
- **Compression**: Gzip enabled via .htaccess
- **CDN**: Tailwind CSS and Font Awesome from CDN

## 📞 API Endpoints

### Public Endpoints
- `POST /api/contact.php` - Submit contact form
- `POST /api/appointments.php` - Book appointment
- `GET /api/testimonials.php` - Get testimonials
- `GET /api/worked-with.php` - Get companies

### Admin Endpoints (Authenticated)
- `POST /api/admin/login.php` - Admin login
- `GET /api/admin/logout.php` - Admin logout
- `GET /api/admin/verify.php` - Verify session
- `POST /api/upload.php` - Upload file
- `PUT/DELETE /api/testimonials.php` - Manage testimonials
- `PUT/DELETE /api/worked-with.php` - Manage companies

## 🔐 Default Admin Credentials

**⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN**

```
Email: toiral.dev@gmail.com
Password: Admin@LeadG2024
```

## 📝 Database Tables

1. **appointments** - Appointment bookings
2. **contact_forms** - Contact form submissions
3. **testimonials** - Client testimonials
4. **worked_with_companies** - Partner companies
5. **admin_users** - Admin accounts
6. **admin_sessions** - Admin session management

## 🐛 Troubleshooting

See `INSTALLATION.md` for detailed troubleshooting steps.

## 📄 License

Proprietary - All rights reserved.

## 👥 Credits

Developed for Lead G by Toiral Development Team.

---

**For installation instructions, see INSTALLATION.md**
