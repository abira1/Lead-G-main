<?php
/**
 * Session Management
 * Lead G - Session Handler
 */

if (!defined('LEADG_ACCESS')) {
    die('Direct access not permitted');
}

// Configure session
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', ENVIRONMENT === 'production' ? 1 : 0);
ini_set('session.cookie_samesite', 'Lax');

// Regenerate session ID periodically
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    session_regenerate_id(true);
    $_SESSION['LAST_ACTIVITY'] = time();
}

if (!isset($_SESSION['LAST_ACTIVITY'])) {
    $_SESSION['LAST_ACTIVITY'] = time();
}

// Set session fingerprint
if (!isset($_SESSION['FINGERPRINT'])) {
    $_SESSION['FINGERPRINT'] = hash('sha256', $_SERVER['HTTP_USER_AGENT'] . getClientIP());
} else {
    // Verify fingerprint
    $currentFingerprint = hash('sha256', $_SERVER['HTTP_USER_AGENT'] . getClientIP());
    if ($_SESSION['FINGERPRINT'] !== $currentFingerprint) {
        // Possible session hijacking
        session_destroy();
        session_start();
    }
}
?>