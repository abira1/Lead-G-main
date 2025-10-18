<?php
/**
 * Admin Logout API
 * Handle admin logout
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../../config/config.php';

header('Content-Type: application/json');

try {
    if (isAdminLoggedIn()) {
        $admin = getCurrentAdmin();
        
        // Delete session from database
        if (isset($admin['token'])) {
            $db = getDB();
            $stmt = $db->prepare("DELETE FROM admin_sessions WHERE session_token = :token");
            $stmt->execute(['token' => $admin['token']]);
        }
        
        // Clear session
        unset($_SESSION[ADMIN_SESSION_NAME]);
    }
    
    jsonResponse(true, 'Logout successful');
    
} catch (Exception $e) {
    error_log('Admin Logout Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>