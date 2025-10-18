<?php
/**
 * Worked With Companies API
 * Handle companies showcase CRUD operations
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDB();
    
    // GET - Retrieve companies (public)
    if ($method === 'GET') {
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
        
        $stmt = $db->prepare("SELECT * FROM worked_with_companies ORDER BY display_order ASC, created_at DESC LIMIT :limit");
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $companies = $stmt->fetchAll();
        jsonResponse(true, 'Companies retrieved', $companies);
    }
    
    // POST - Create company (admin only)
    elseif ($method === 'POST') {
        requireAdmin();
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['company_name', 'logo_url'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                jsonResponse(false, "Field '$field' is required", null, 400);
            }
        }
        
        $data = [
            'id' => generateUUID(),
            'company_name' => sanitize($input['company_name']),
            'logo_url' => sanitize($input['logo_url']),
            'website_url' => isset($input['website_url']) ? sanitize($input['website_url']) : null,
            'display_order' => isset($input['display_order']) ? intval($input['display_order']) : 0
        ];
        
        $stmt = $db->prepare("
            INSERT INTO worked_with_companies (id, company_name, logo_url, website_url, display_order)
            VALUES (:id, :company_name, :logo_url, :website_url, :display_order)
        ");
        
        if ($stmt->execute($data)) {
            jsonResponse(true, 'Company created', ['id' => $data['id']], 201);
        } else {
            jsonResponse(false, 'Failed to create company', null, 500);
        }
    }
    
    // PUT - Update company (admin only)
    elseif ($method === 'PUT') {
        requireAdmin();
        
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            jsonResponse(false, 'Company ID required', null, 400);
        }
        
        $data = [
            'id' => $id,
            'company_name' => sanitize($input['company_name']),
            'logo_url' => sanitize($input['logo_url']),
            'website_url' => isset($input['website_url']) ? sanitize($input['website_url']) : null,
            'display_order' => isset($input['display_order']) ? intval($input['display_order']) : 0
        ];
        
        $stmt = $db->prepare("
            UPDATE worked_with_companies 
            SET company_name = :company_name, logo_url = :logo_url, website_url = :website_url, display_order = :display_order
            WHERE id = :id
        ");
        
        if ($stmt->execute($data)) {
            jsonResponse(true, 'Company updated');
        } else {
            jsonResponse(false, 'Failed to update company', null, 500);
        }
    }
    
    // DELETE - Delete company (admin only)
    elseif ($method === 'DELETE') {
        requireAdmin();
        
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            jsonResponse(false, 'Company ID required', null, 400);
        }
        
        $stmt = $db->prepare("DELETE FROM worked_with_companies WHERE id = :id");
        if ($stmt->execute(['id' => $id])) {
            jsonResponse(true, 'Company deleted');
        } else {
            jsonResponse(false, 'Failed to delete company', null, 500);
        }
    }
    
    else {
        jsonResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    error_log('Worked With API Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>