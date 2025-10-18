<?php
/**
 * Admin Login API
 * Handle admin authentication
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../../config/config.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', null, 405);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($input['email']) || empty($input['password'])) {
        jsonResponse(false, 'Email and password are required', null, 400);
    }
    
    $email = sanitize($input['email']);
    $password = $input['password'];
    
    // Validate email format
    if (!validateEmail($email)) {
        jsonResponse(false, 'Invalid email format', null, 400);
    }
    
    // Get admin user
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM admin_users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $admin = $stmt->fetch();
    
    if (!$admin) {
        // Don't reveal if user exists
        jsonResponse(false, 'Invalid credentials', null, 401);
    }
    
    // Verify password
    if (!password_verify($password, $admin['password'])) {
        jsonResponse(false, 'Invalid credentials', null, 401);
    }
    
    // Generate session token
    $sessionToken = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + (SESSION_LIFETIME * 60));
    
    // Store session in database
    $sessionStmt = $db->prepare("
        INSERT INTO admin_sessions (admin_id, session_token, ip_address, user_agent, expires_at)
        VALUES (:admin_id, :session_token, :ip_address, :user_agent, :expires_at)
    ");
    
    $sessionStmt->execute([
        'admin_id' => $admin['id'],
        'session_token' => $sessionToken,
        'ip_address' => getClientIP(),
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'expires_at' => $expiresAt
    ]);
    
    // Update last login
    $updateStmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $admin['id']]);
    
    // Set session
    $_SESSION[ADMIN_SESSION_NAME] = [
        'id' => $admin['id'],
        'email' => $admin['email'],
        'full_name' => $admin['full_name'],
        'token' => $sessionToken
    ];
    
    jsonResponse(true, 'Login successful', [
        'admin' => [
            'id' => $admin['id'],
            'email' => $admin['email'],
            'full_name' => $admin['full_name']
        ],
        'token' => $sessionToken,
        'expires_in' => SESSION_LIFETIME * 60
    ]);
    
} catch (Exception $e) {
    error_log('Admin Login Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>