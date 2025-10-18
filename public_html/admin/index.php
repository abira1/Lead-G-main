<?php
define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';
requireAdmin();

$admin = getCurrentAdmin();

// Get statistics
try {
    $db = getDB();
    
    $totalAppointments = $db->query("SELECT COUNT(*) FROM appointments")->fetchColumn();
    $pendingAppointments = $db->query("SELECT COUNT(*) FROM appointments WHERE status = 'pending'")->fetchColumn();
    $totalContacts = $db->query("SELECT COUNT(*) FROM contact_forms")->fetchColumn();
    $totalTestimonials = $db->query("SELECT COUNT(*) FROM testimonials")->fetchColumn();
    
} catch (Exception $e) {
    error_log('Dashboard Error: ' . $e->getMessage());
    $totalAppointments = $pendingAppointments = $totalContacts = $totalTestimonials = 0;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - <?php echo SITE_NAME; ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#00FFD1',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-black text-white">
    <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 min-h-screen bg-gray-900 border-r border-gray-800">
            <div class="p-6">
                <div class="flex items-center space-x-2 mb-8">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-bolt text-black text-xl"></i>
                    </div>
                    <span class="text-2xl font-bold"><?php echo SITE_NAME; ?></span>
                </div>
                
                <nav class="space-y-2">
                    <a href="/admin/index.php" class="flex items-center space-x-3 px-4 py-3 bg-primary/10 text-primary rounded-lg">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admin/appointments.php" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <i class="fas fa-calendar"></i>
                        <span>Appointments</span>
                    </a>
                    <a href="/admin/testimonials.php" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <i class="fas fa-quote-left"></i>
                        <span>Testimonials</span>
                    </a>
                    <a href="/admin/worked-with.php" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <i class="fas fa-briefcase"></i>
                        <span>Companies</span>
                    </a>
                    <hr class="my-4 border-gray-800">
                    <a href="/" target="_blank" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Website</span>
                    </a>
                    <a href="#" onclick="logout()" class="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </nav>
            </div>
        </aside>
        
        <!-- Main Content -->
        <main class="flex-1 p-8">
            <div class="mb-8">
                <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
                <p class="text-gray-400">Welcome back, <?php echo e($admin['full_name'] ?? $admin['email']); ?>!</p>
            </div>
            
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i class="fas fa-calendar text-primary text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold"><?php echo $totalAppointments; ?></span>
                    </div>
                    <h3 class="text-gray-400 text-sm">Total Appointments</h3>
                </div>
                
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                            <i class="fas fa-clock text-yellow-500 text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold"><?php echo $pendingAppointments; ?></span>
                    </div>
                    <h3 class="text-gray-400 text-sm">Pending Appointments</h3>
                </div>
                
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <i class="fas fa-envelope text-blue-500 text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold"><?php echo $totalContacts; ?></span>
                    </div>
                    <h3 class="text-gray-400 text-sm">Contact Forms</h3>
                </div>
                
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <i class="fas fa-quote-left text-purple-500 text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold"><?php echo $totalTestimonials; ?></span>
                    </div>
                    <h3 class="text-gray-400 text-sm">Testimonials</h3>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h2 class="text-xl font-bold mb-6">Quick Actions</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/admin/appointments.php" class="p-4 bg-black hover:bg-gray-800 rounded-lg border border-gray-800 transition-colors">
                        <i class="fas fa-calendar text-primary mb-2"></i>
                        <h3 class="font-semibold">Manage Appointments</h3>
                        <p class="text-sm text-gray-400">View and manage bookings</p>
                    </a>
                    <a href="/admin/testimonials.php" class="p-4 bg-black hover:bg-gray-800 rounded-lg border border-gray-800 transition-colors">
                        <i class="fas fa-plus text-primary mb-2"></i>
                        <h3 class="font-semibold">Add Testimonial</h3>
                        <p class="text-sm text-gray-400">Create new testimonial</p>
                    </a>
                    <a href="/admin/worked-with.php" class="p-4 bg-black hover:bg-gray-800 rounded-lg border border-gray-800 transition-colors">
                        <i class="fas fa-briefcase text-primary mb-2"></i>
                        <h3 class="font-semibold">Add Company</h3>
                        <p class="text-sm text-gray-400">Add new company logo</p>
                    </a>
                </div>
            </div>
        </main>
    </div>
    
    <script>
    async function logout() {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await fetch('/api/admin/logout.php');
                window.location.href = '/admin/login.php';
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    }
    </script>
</body>
</html>