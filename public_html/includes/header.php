<?php
if (!defined('LEADG_ACCESS')) {
    define('LEADG_ACCESS', true);
}
if (!file_exists(__DIR__ . '/../config/config.php')) {
    die('Configuration file not found');
}
require_once __DIR__ . '/../config/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo isset($pageTitle) ? e($pageTitle) . ' - ' . SITE_NAME : SITE_NAME . ' - Expert Lead Generation'; ?></title>
    <meta name="description" content="<?php echo isset($pageDescription) ? e($pageDescription) : 'Turn conversations into customers with expert outbound services. Global leader in telemarketing, marketing, and government contracting.'; ?>">
    <meta name="keywords" content="lead generation, telemarketing, government contracting, social media marketing, B2B leads">
    <meta name="author" content="<?php echo SITE_NAME; ?>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="<?php echo isset($pageTitle) ? e($pageTitle) : SITE_NAME; ?>">
    <meta property="og:description" content="<?php echo isset($pageDescription) ? e($pageDescription) : 'Expert lead generation services'; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo SITE_URL . $_SERVER['REQUEST_URI']; ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo ASSETS_URL; ?>/images/favicon.ico">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?php echo ASSETS_URL; ?>/css/style.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#00FFD1',
                        dark: '#0A0A0A',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-black text-white">
    <!-- Header Navigation -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div class="container mx-auto px-6">
            <nav class="flex items-center justify-between py-4">
                <!-- Logo -->
                <a href="/" class="flex items-center space-x-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center">
                        <i class="fas fa-bolt text-black text-xl"></i>
                    </div>
                    <span class="text-2xl font-bold text-white"><?php echo SITE_NAME; ?></span>
                </a>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/" class="text-white hover:text-primary transition-colors">Home</a>
                    <div class="relative group">
                        <button class="text-white hover:text-primary transition-colors flex items-center">
                            Services <i class="fas fa-chevron-down ml-1 text-xs"></i>
                        </button>
                        <div class="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <a href="/services/telemarketing.php" class="block px-4 py-3 hover:bg-gray-800 transition-colors">Telemarketing</a>
                            <a href="/services/government-contracting.php" class="block px-4 py-3 hover:bg-gray-800 transition-colors">Government Contracting</a>
                            <a href="/services/social-media.php" class="block px-4 py-3 hover:bg-gray-800 transition-colors">Social Media Marketing</a>
                        </div>
                    </div>
                    <a href="/industries.php" class="text-white hover:text-primary transition-colors">Industries</a>
                    <a href="/pricing.php" class="text-white hover:text-primary transition-colors">Pricing</a>
                    <a href="/case-studies.php" class="text-white hover:text-primary transition-colors">Case Studies</a>
                    <a href="/about.php" class="text-white hover:text-primary transition-colors">About</a>
                    <a href="/contact.php" class="text-white hover:text-primary transition-colors">Contact</a>
                    <a href="/book-appointment.php" class="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all">Book Appointment</a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden text-white text-2xl">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>
            
            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="hidden md:hidden pb-4">
                <div class="flex flex-col space-y-4">
                    <a href="/" class="text-white hover:text-primary transition-colors">Home</a>
                    <a href="/services/telemarketing.php" class="text-white hover:text-primary transition-colors pl-4">Telemarketing</a>
                    <a href="/services/government-contracting.php" class="text-white hover:text-primary transition-colors pl-4">Government Contracting</a>
                    <a href="/services/social-media.php" class="text-white hover:text-primary transition-colors pl-4">Social Media Marketing</a>
                    <a href="/industries.php" class="text-white hover:text-primary transition-colors">Industries</a>
                    <a href="/pricing.php" class="text-white hover:text-primary transition-colors">Pricing</a>
                    <a href="/case-studies.php" class="text-white hover:text-primary transition-colors">Case Studies</a>
                    <a href="/about.php" class="text-white hover:text-primary transition-colors">About</a>
                    <a href="/contact.php" class="text-white hover:text-primary transition-colors">Contact</a>
                    <a href="/book-appointment.php" class="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-block text-center">Book Appointment</a>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Main Content Wrapper -->
    <main class="pt-20">