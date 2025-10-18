<?php
/**
 * File Upload API
 * Handle logo and image uploads
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed', null, 405);
}

// Require admin authentication
requireAdmin();

try {
    // Check if file was uploaded
    if (!isset($_FILES['file'])) {
        jsonResponse(false, 'No file uploaded', null, 400);
    }
    
    $file = $_FILES['file'];
    
    // Upload file
    $result = uploadFile($file, LOGO_PATH);
    
    if ($result['success']) {
        jsonResponse(true, $result['message'], [
            'url' => $result['url'],
            'filename' => $result['filename']
        ]);
    } else {
        jsonResponse(false, $result['message'], null, 400);
    }
    
} catch (Exception $e) {
    error_log('Upload Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>