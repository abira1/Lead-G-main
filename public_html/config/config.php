<?php
/**
 * Application Configuration
 * Lead G - Main Configuration File
 */

// Prevent direct access
define('LEADG_ACCESS', true);

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Environment Configuration
define('ENVIRONMENT', 'production'); // 'development' or 'production'

// Site Configuration
define('SITE_NAME', 'Lead G');
define('SITE_URL', 'https://leadgenerationg.com');
define('SITE_EMAIL', 'info@leadgenerationg.com');
define('ADMIN_EMAIL', 'toiral.dev@gmail.com');

// Path Configuration
define('BASE_PATH', dirname(__DIR__));
define('UPLOAD_PATH', BASE_PATH . '/uploads');
define('LOGO_PATH', UPLOAD_PATH . '/logos');

// URL Configuration
define('BASE_URL', SITE_URL);
define('ASSETS_URL', BASE_URL . '/assets');
define('UPLOAD_URL', BASE_URL . '/uploads');
define('LOGO_URL', UPLOAD_URL . '/logos');

// Security Configuration
define('SESSION_LIFETIME', 1440); // 24 hours in minutes
define('CSRF_TOKEN_NAME', 'leadg_csrf_token');
define('ADMIN_SESSION_NAME', 'leadg_admin_session');

// File Upload Configuration
define('MAX_FILE_SIZE', 5242880); // 5MB in bytes
define('ALLOWED_IMAGE_TYPES', ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']);
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);

// Pagination
define('ITEMS_PER_PAGE', 20);

// Error Reporting
if (ENVIRONMENT === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', BASE_PATH . '/logs/error.log');
}

// Timezone
date_default_timezone_set('America/New_York');

// Include required files
require_once __DIR__ . '/database.php';
require_once BASE_PATH . '/includes/functions.php';
require_once BASE_PATH . '/includes/session.php';

// Set security headers
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

if (ENVIRONMENT === 'production') {
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}
?>