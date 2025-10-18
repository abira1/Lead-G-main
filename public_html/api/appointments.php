<?php
/**
 * Appointments API
 * Handle appointment bookings and management
 */

define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

try {
    $db = getDB();
    
    // GET - Retrieve appointments (admin only)
    if ($method === 'GET') {
        requireAdmin();
        
        $status = $_GET['status'] ?? null;
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 100;
        
        $sql = "SELECT * FROM appointments";
        $params = [];
        
        if ($status) {
            $sql .= " WHERE status = :status";
            $params['status'] = $status;
        }
        
        $sql .= " ORDER BY created_at DESC LIMIT :limit";
        $params['limit'] = $limit;
        
        $stmt = $db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }
        $stmt->execute();
        
        $appointments = $stmt->fetchAll();
        jsonResponse(true, 'Appointments retrieved', $appointments);
    }
    
    // POST - Create appointment
    elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['name', 'email', 'phone', 'appointment_date', 'appointment_time'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                jsonResponse(false, "Field '$field' is required", null, 400);
            }
        }
        
        // Check for overlapping appointments
        $checkStmt = $db->prepare("
            SELECT COUNT(*) FROM appointments 
            WHERE appointment_date = :date 
            AND appointment_time = :time 
            AND status IN ('pending', 'confirmed')
        ");
        $checkStmt->execute([
            'date' => $input['appointment_date'],
            'time' => $input['appointment_time']
        ]);
        
        if ($checkStmt->fetchColumn() > 0) {
            jsonResponse(false, 'This time slot is already booked', null, 409);
        }
        
        // Sanitize and prepare data
        $data = [
            'id' => generateUUID(),
            'name' => sanitize($input['name']),
            'email' => sanitize($input['email']),
            'phone' => sanitize($input['phone']),
            'business' => isset($input['business']) ? sanitize($input['business']) : null,
            'industry' => isset($input['industry']) ? sanitize($input['industry']) : null,
            'service_interests' => isset($input['service_interests']) ? sanitize($input['service_interests']) : null,
            'appointment_date' => $input['appointment_date'],
            'appointment_time' => $input['appointment_time'],
            'message' => isset($input['message']) ? sanitize($input['message']) : null
        ];
        
        // Validate email
        if (!validateEmail($data['email'])) {
            jsonResponse(false, 'Invalid email address', null, 400);
        }
        
        // Insert appointment
        $stmt = $db->prepare("
            INSERT INTO appointments (id, name, email, phone, business, industry, service_interests, appointment_date, appointment_time, message)
            VALUES (:id, :name, :email, :phone, :business, :industry, :service_interests, :appointment_date, :appointment_time, :message)
        ");
        
        if ($stmt->execute($data)) {
            jsonResponse(true, 'Appointment booked successfully', ['id' => $data['id']], 201);
        } else {
            jsonResponse(false, 'Failed to book appointment', null, 500);
        }
    }
    
    // PUT - Update appointment status (admin only)
    elseif ($method === 'PUT') {
        requireAdmin();
        
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            jsonResponse(false, 'Appointment ID required', null, 400);
        }
        
        if (empty($input['status'])) {
            jsonResponse(false, 'Status is required', null, 400);
        }
        
        $allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!in_array($input['status'], $allowedStatuses)) {
            jsonResponse(false, 'Invalid status', null, 400);
        }
        
        $stmt = $db->prepare("UPDATE appointments SET status = :status WHERE id = :id");
        if ($stmt->execute(['status' => $input['status'], 'id' => $id])) {
            jsonResponse(true, 'Appointment updated successfully');
        } else {
            jsonResponse(false, 'Failed to update appointment', null, 500);
        }
    }
    
    else {
        jsonResponse(false, 'Method not allowed', null, 405);
    }
    
} catch (Exception $e) {
    error_log('Appointments API Error: ' . $e->getMessage());
    jsonResponse(false, 'An error occurred', null, 500);
}
?>