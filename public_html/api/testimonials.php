<?php
/**
 * Testimonials API
 * Handle testimonials CRUD operations
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDB();
    
    // GET - Retrieve testimonials (public)
    if ($method === 'GET') {
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
        
        $stmt = $db->prepare("SELECT * FROM testimonials ORDER BY created_at DESC LIMIT :limit");
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $testimonials = $stmt->fetchAll();
        jsonResponse(true, 'Testimonials retrieved', $testimonials);
    }
    
    // POST - Create testimonial (admin only)
    elseif ($method === 'POST') {
        requireAdmin();
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['company_name', 'logo_url', 'testimonial', 'author'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                jsonResponse(false, "Field '$field' is required", null, 400);
            }
        }
        
        $data = [
            'id' => generateUUID(),
            'company_name' => sanitize($input['company_name']),
            'logo_url' => sanitize($input['logo_url']),
            'testimonial' => sanitize($input['testimonial']),
            'author' => sanitize($input['author'])
        ];
        
        $stmt = $db->prepare("
            INSERT INTO testimonials (id, company_name, logo_url, testimonial, author)
            VALUES (:id, :company_name, :logo_url, :testimonial, :author)
        ");
        
        if ($stmt->execute($data)) {
            jsonResponse(true, 'Testimonial created', ['id' => $data['id']], 201);
        } else {
            jsonResponse(false, 'Failed to create testimonial', null, 500);
        }
    }
    
    // PUT - Update testimonial (admin only)
    elseif ($method === 'PUT') {
        requireAdmin();
        
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            jsonResponse(false, 'Testimonial ID required', null, 400);
        }
        
        $data = [
            'id' => $id,
            'company_name' => sanitize($input['company_name']),
            'logo_url' => sanitize($input['logo_url']),
            'testimonial' => sanitize($input['testimonial']),
            'author' => sanitize($input['author'])
        ];
        
        $stmt = $db->prepare("
            UPDATE testimonials 
            SET company_name = :company_name, logo_url = :logo_url, testimonial = :testimonial, author = :author
            WHERE id = :id
        ");
        
        if ($stmt->execute($data)) {
            jsonResponse(true, 'Testimonial updated');
        } else {
            jsonResponse(false, 'Failed to update testimonial', null, 500);
        }
    }
    
    // DELETE - Delete testimonial (admin only)
    elseif ($method === 'DELETE') {
        requireAdmin();
        
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            jsonResponse(false, 'Testimonial ID required', null, 400);
        }
        
        $stmt = $db->prepare("DELETE FROM testimonials WHERE id = :id");
        if ($stmt->execute(['id' => $id])) {
            jsonResponse(true, 'Testimonial deleted');
        } else {
            jsonResponse(false, 'Failed to delete testimonial', null, 500);
        }
    }
    
    else {
        jsonResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    error_log('Testimonials API Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>