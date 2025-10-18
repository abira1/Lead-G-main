<?php
$pageTitle = 'Pricing';
$pageDescription = 'Flexible pricing plans for businesses of all sizes. Choose the perfect plan for your needs.';
include 'includes/header.php';
?>

<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Simple, Transparent <span class="text-primary">Pricing</span></h1>
            <p class="text-xl text-gray-400">Choose the perfect plan for your business</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Starter Plan -->
            <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary transition-all">
                <h3 class="text-2xl font-bold mb-2">Starter</h3>
                <p class="text-gray-400 mb-6">Perfect for small businesses</p>
                <div class="mb-6">
                    <span class="text-5xl font-bold">$999</span>
                    <span class="text-gray-400">/month</span>
                </div>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Up to 500 leads/month</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Basic CRM integration</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Email support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Monthly reports</span>
                    </li>
                </ul>
                <a href="/book-appointment" class="block w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-700 transition-all">
                    Get Started
                </a>
            </div>
            
            <!-- Professional Plan -->
            <div class="bg-gray-900 p-8 rounded-xl border-2 border-primary relative">
                <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                </div>
                <h3 class="text-2xl font-bold mb-2">Professional</h3>
                <p class="text-gray-400 mb-6">For growing businesses</p>
                <div class="mb-6">
                    <span class="text-5xl font-bold">$2,499</span>
                    <span class="text-gray-400">/month</span>
                </div>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Up to 2,000 leads/month</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Advanced CRM integration</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Priority support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Weekly reports</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Dedicated account manager</span>
                    </li>
                </ul>
                <a href="/book-appointment" class="block w-full bg-primary text-black px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary/90 transition-all">
                    Get Started
                </a>
            </div>
            
            <!-- Enterprise Plan -->
            <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary transition-all">
                <h3 class="text-2xl font-bold mb-2">Enterprise</h3>
                <p class="text-gray-400 mb-6">For large organizations</p>
                <div class="mb-6">
                    <span class="text-5xl font-bold">Custom</span>
                </div>
                <ul class="space-y-4 mb-8">
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Unlimited leads</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Custom integrations</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>24/7 premium support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Real-time reporting</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>Dedicated team</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-check text-primary mr-3"></i>
                        <span>SLA guarantee</span>
                    </li>
                </ul>
                <a href="/contact" class="block w-full bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-700 transition-all">
                    Contact Sales
                </a>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>