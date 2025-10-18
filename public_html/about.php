<?php
$pageTitle = 'About Us';
$pageDescription = 'Learn about Lead G - Your partner in lead generation and business growth.';
include 'includes/header.php';
?>

<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">About <span class="text-primary">Lead G</span></h1>
                <p class="text-xl text-gray-400">Your trusted partner in lead generation and business growth</p>
            </div>
            
            <div class="prose prose-invert max-w-none">
                <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-8">
                    <h2 class="text-3xl font-bold mb-4">Who We Are</h2>
                    <p class="text-gray-300 text-lg leading-relaxed">
                        Lead G is a global leader in outbound lead generation services. We specialize in telemarketing, 
                        government contracting support, and social media marketing. Our mission is to help businesses of 
                        all sizes turn conversations into customers through expert, scalable outbound services.
                    </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                        <div class="text-4xl font-bold text-primary mb-2">10+</div>
                        <p class="text-gray-400">Years Experience</p>
                    </div>
                    <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                        <div class="text-4xl font-bold text-primary mb-2">500+</div>
                        <p class="text-gray-400">Happy Clients</p>
                    </div>
                    <div class="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                        <div class="text-4xl font-bold text-primary mb-2">95%</div>
                        <p class="text-gray-400">Success Rate</p>
                    </div>
                </div>
                
                <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 mb-8">
                    <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
                    <p class="text-gray-300 text-lg leading-relaxed">
                        To empower businesses with cutting-edge lead generation strategies and services that drive 
                        measurable results. We believe in building long-term partnerships based on trust, transparency, 
                        and exceptional results.
                    </p>
                </div>
                
                <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                    <h2 class="text-3xl font-bold mb-4">Why Choose Us?</h2>
                    <ul class="space-y-4 text-gray-300 text-lg">
                        <li class="flex items-start">
                            <i class="fas fa-check text-primary mr-3 mt-1"></i>
                            <span>Proven track record with Fortune 500 companies and startups alike</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-primary mr-3 mt-1"></i>
                            <span>Cutting-edge technology and data-driven strategies</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-primary mr-3 mt-1"></i>
                            <span>Dedicated team of industry experts</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-primary mr-3 mt-1"></i>
                            <span>Transparent reporting and measurable ROI</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check text-primary mr-3 mt-1"></i>
                            <span>Flexible, scalable solutions that grow with your business</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-gray-400 mb-8">Let's discuss how we can help grow your business</p>
        <a href="/book-appointment" class="bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all inline-block">
            Schedule a Consultation
        </a>
    </div>
</section>

<?php include 'includes/footer.php'; ?>