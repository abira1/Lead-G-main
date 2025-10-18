<?php
define('LEADG_ACCESS', true);
require_once __DIR__ . '/../config/config.php';

// If already logged in, redirect to dashboard
if (isAdminLoggedIn()) {
    redirect('/admin/index.php');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - <?php echo SITE_NAME; ?></title>
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
    <div class="min-h-screen flex items-center justify-center px-6">
        <div class="w-full max-w-md">
            <div class="text-center mb-8">
                <div class="inline-flex items-center space-x-2 mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-bolt text-black text-2xl"></i>
                    </div>
                    <span class="text-3xl font-bold"><?php echo SITE_NAME; ?></span>
                </div>
                <h1 class="text-2xl font-bold mb-2">Admin Login</h1>
                <p class="text-gray-400">Sign in to your admin account</p>
            </div>
            
            <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                <form id="login-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">Email Address</label>
                        <input type="email" name="email" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Password</label>
                        <input type="password" name="password" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none">
                    </div>
                    
                    <div id="error-message" class="hidden p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm"></div>
                    
                    <button type="submit" class="w-full bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all">
                        <span id="submit-text">Sign In</span>
                        <span id="submit-loading" class="hidden">Signing in...</span>
                    </button>
                </form>
                
                <div class="mt-6 text-center text-sm text-gray-400">
                    <a href="/" class="hover:text-primary transition-colors">← Back to website</a>
                </div>
            </div>
        </div>
    </div>
    
    <script>
    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submit-text');
        const submitLoading = document.getElementById('submit-loading');
        const errorDiv = document.getElementById('error-message');
        
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        submitLoading.classList.remove('hidden');
        errorDiv.classList.add('hidden');
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('/api/admin/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                window.location.href = '/admin/index.php';
            } else {
                errorDiv.classList.remove('hidden');
                errorDiv.textContent = result.message;
            }
        } catch (error) {
            errorDiv.classList.remove('hidden');
            errorDiv.textContent = 'An error occurred. Please try again.';
        } finally {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            submitLoading.classList.add('hidden');
        }
    });
    </script>
</body>
</html>