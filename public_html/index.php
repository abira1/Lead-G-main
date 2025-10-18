<?php
$pageTitle = 'Home';
$pageDescription = 'Turn conversations into customers with expert outbound services. Global leader in telemarketing, marketing, and government contracting.';
include 'includes/header.php';
?>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    
    <div class="container mx-auto px-6 relative z-10">
        <div class="text-center max-w-5xl mx-auto">
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Turn conversations into <span class="text-white">customers</span><br>
                <span class="text-primary">Expert outbound</span> that scales
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 mb-8">
                Global partner in telemarketing, marketing, and government contracting
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/book-appointment" class="bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all inline-flex items-center justify-center">
                    <i class="fas fa-calendar-check mr-2"></i>
                    Book Appointment
                </a>
                <a href="tel:+15551234567" class="bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-black transition-all inline-flex items-center justify-center">
                    <i class="fas fa-phone mr-2"></i>
                    Book Free Call
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Why Choose Us Section -->
<section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">Why Choose <span class="text-primary">Lead G</span>?</h2>
            <p class="text-xl text-gray-400">The proven path to scalable growth</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-black/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 hover:border-primary transition-all">
                <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-users text-primary text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">Expert Team</h3>
                <p class="text-gray-400">Seasoned professionals with years of experience in lead generation and customer acquisition.</p>
            </div>
            
            <div class="bg-black/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 hover:border-primary transition-all">
                <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-chart-line text-primary text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">Proven Results</h3>
                <p class="text-gray-400">Track record of delivering measurable ROI and sustainable growth for our clients.</p>
            </div>
            
            <div class="bg-black/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 hover:border-primary transition-all">
                <div class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <i class="fas fa-rocket text-primary text-3xl"></i>
                </div>
                <h3 class="text-2xl font-bold mb-4">Scalable Solutions</h3>
                <p class="text-gray-400">Flexible services that grow with your business, from startup to enterprise.</p>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">What we <span class="text-primary">deliver</span></h2>
            <p class="text-xl text-gray-400">Comprehensive lead generation services</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="group">
                <a href="/services/telemarketing" class="block bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                    <div class="aspect-video bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center">
                        <i class="fas fa-phone-volume text-primary text-6xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2">Telemarketing</h3>
                        <p class="text-gray-400">Professional B2B and B2C telemarketing services that convert prospects into customers.</p>
                    </div>
                </a>
            </div>
            
            <div class="group">
                <a href="/services/government-contracting" class="block bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                    <div class="aspect-video bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <i class="fas fa-landmark text-primary text-6xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2">Government Contracting</h3>
                        <p class="text-gray-400">Navigate the complex world of government contracts with expert guidance.</p>
                    </div>
                </a>
            </div>
            
            <div class="group">
                <a href="/services/social-media" class="block bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform">
                    <div class="aspect-video bg-gradient-to-br from-primary/20 to-pink-500/20 flex items-center justify-center">
                        <i class="fas fa-hashtag text-primary text-6xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2">Social Media Marketing</h3>
                        <p class="text-gray-400">Amplify your brand and generate leads through strategic social media campaigns.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Companies We've Worked With -->
<section class="py-20 bg-gray-900">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">Companies We've <span class="text-primary">Worked With</span></h2>
            <p class="text-xl text-gray-400">Trusted by leading brands worldwide</p>
        </div>
        
        <div id="companies-container" class="flex items-center justify-center gap-12 flex-wrap grayscale hover:grayscale-0 transition-all">
            <!-- Companies will be loaded here dynamically -->
            <div class="text-center text-gray-400 py-8">Loading companies...</div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">What our clients <span class="text-primary">say</span></h2>
            <p class="text-xl text-gray-400">Real results from real businesses</p>
        </div>
        
        <div id="testimonials-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Testimonials will be loaded here dynamically -->
            <div class="text-center text-gray-400 py-8 col-span-full">Loading testimonials...</div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-20 bg-gradient-to-r from-primary/10 to-blue-500/10">
    <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to grow your business?</h2>
        <p class="text-xl text-gray-400 mb-8">Let's discuss how we can help you achieve your goals</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book-appointment" class="bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all inline-flex items-center justify-center">
                Schedule a Consultation
            </a>
            <a href="/contact" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-all inline-flex items-center justify-center">
                Contact Us
            </a>
        </div>
    </div>
</section>

<script>
// Load companies
fetch('/api/worked-with.php')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('companies-container');
        if (data.success && data.data.length > 0) {
            container.innerHTML = data.data.map(company => `
                <div class="flex items-center justify-center">
                    <img src="${company.logo_url}" alt="${company.company_name}" class="h-12 object-contain">
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="text-center text-gray-400 py-8">No companies to display</div>';
        }
    })
    .catch(error => {
        console.error('Error loading companies:', error);
    });

// Load testimonials
fetch('/api/testimonials.php?limit=6')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('testimonials-container');
        if (data.success && data.data.length > 0) {
            container.innerHTML = data.data.map(testimonial => `
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div class="flex items-center mb-4">
                        <img src="${testimonial.logo_url}" alt="${testimonial.company_name}" class="h-10 object-contain">
                    </div>
                    <p class="text-gray-300 mb-4 italic">"${testimonial.testimonial}"</p>
                    <div class="flex items-center">
                        <div>
                            <p class="font-semibold">${testimonial.author}</p>
                            <p class="text-sm text-gray-400">${testimonial.company_name}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<div class="text-center text-gray-400 py-8 col-span-full">No testimonials to display</div>';
        }
    })
    .catch(error => {
        console.error('Error loading testimonials:', error);
    });
</script>

<?php include 'includes/footer.php'; ?>