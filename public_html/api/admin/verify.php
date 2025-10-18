<?php
/**
 * Admin Token Verification API
 * Verify admin session token
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../../config/config.php';

header('Content-Type: application/json');

try {
    if (!isAdminLoggedIn()) {
        jsonResponse(false, 'Not authenticated', null, 401);
    }
    
    $admin = getCurrentAdmin();
    
    // Verify session token in database
    if (isset($admin['token'])) {
        $db = getDB();
        $stmt = $db->prepare("
            SELECT * FROM admin_sessions 
            WHERE session_token = :token 
            AND expires_at > NOW()
        ");
        $stmt->execute(['token' => $admin['token']]);
        $session = $stmt->fetch();
        
        if (!$session) {
            // Session expired or invalid
            unset($_SESSION[ADMIN_SESSION_NAME]);
            jsonResponse(false, 'Session expired', null, 401);
        }
    }
    
    jsonResponse(true, 'Token is valid', [
        'admin' => [
            'id' => $admin['id'],
            'email' => $admin['email'],
            'full_name' => $admin['full_name']
        ]
    ]);
    
} catch (Exception $e) {
    error_log('Admin Verify Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>