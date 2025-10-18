<?php
/**
 * Contact Form API
 * Handle contact form submissions
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', null, 405);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['first_name', 'last_name', 'email', 'message'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            jsonResponse(false, "Field '$field' is required", null, 400);
        }
    }
    
    // Sanitize inputs
    $data = [
        'id' => generateUUID(),
        'first_name' => sanitize($input['first_name']),
        'last_name' => sanitize($input['last_name']),
        'email' => sanitize($input['email']),
        'phone' => isset($input['phone']) ? sanitize($input['phone']) : null,
        'company' => isset($input['company']) ? sanitize($input['company']) : null,
        'industry' => isset($input['industry']) ? sanitize($input['industry']) : null,
        'service' => isset($input['service']) ? sanitize($input['service']) : null,
        'message' => sanitize($input['message'])
    ];
    
    // Validate email
    if (!validateEmail($data['email'])) {
        jsonResponse(false, 'Invalid email address', null, 400);
    }
    
    // Insert into database
    $db = getDB();
    $stmt = $db->prepare("
        INSERT INTO contact_forms (id, first_name, last_name, email, phone, company, industry, service, message)
        VALUES (:id, :first_name, :last_name, :email, :phone, :company, :industry, :service, :message)
    ");
    
    if ($stmt->execute($data)) {
        // Send email notification (optional)
        // mail(ADMIN_EMAIL, 'New Contact Form Submission', ...);
        
        jsonResponse(true, 'Contact form submitted successfully', ['id' => $data['id']], 201);
    } else {
        jsonResponse(false, 'Failed to submit contact form', null, 500);
    }
    
} catch (Exception $e) {
    error_log('Contact Form Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>