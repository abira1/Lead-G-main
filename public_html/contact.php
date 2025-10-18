<?php
$pageTitle = 'Contact Us';
$pageDescription = 'Get in touch with our team. We're here to help grow your business.';
include 'includes/header.php';
?>

<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">Get in <span class="text-primary">Touch</span></h1>
                <p class="text-xl text-gray-400">Let's discuss how we can help grow your business</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                    <i class="fas fa-envelope text-primary text-3xl mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Email Us</h3>
                    <a href="mailto:<?php echo SITE_EMAIL; ?>" class="text-primary hover:underline"><?php echo SITE_EMAIL; ?></a>
                </div>
                
                <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                    <i class="fas fa-phone text-primary text-3xl mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">Call Us</h3>
                    <a href="tel:+15551234567" class="text-primary hover:underline">+1 (555) 123-4567</a>
                </div>
            </div>
            
            <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                <h2 class="text-2xl font-bold mb-6">Send us a message</h2>
                
                <form id="contact-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">First Name *</label>
                            <input type="text" name="first_name" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Last Name *</label>
                            <input type="text" name="last_name" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Phone</label>
                            <input type="tel" name="phone" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Company</label>
                            <input type="text" name="company" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Industry</label>
                            <select name="industry" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                                <option value="">Select Industry</option>
                                <option value="technology">Technology</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Finance</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Service of Interest</label>
                        <select name="service" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                            <option value="">Select Service</option>
                            <option value="telemarketing">Telemarketing</option>
                            <option value="government_contracting">Government Contracting</option>
                            <option value="social_media">Social Media Marketing</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Message *</label>
                        <textarea name="message" required rows="6" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white"></textarea>
                    </div>
                    
                    <div id="form-message" class="hidden"></div>
                    
                    <button type="submit" class="w-full bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all">
                        <span id="submit-text">Send Message</span>
                        <span id="submit-loading" class="hidden">Sending...</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    const messageDiv = document.getElementById('form-message');
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    submitLoading.classList.remove('hidden');
    messageDiv.classList.add('hidden');
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/api/contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        messageDiv.classList.remove('hidden');
        if (result.success) {
            messageDiv.className = 'p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500';
            messageDiv.textContent = result.message;
            this.reset();
        } else {
            messageDiv.className = 'p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500';
            messageDiv.textContent = result.message;
        }
    } catch (error) {
        messageDiv.classList.remove('hidden');
        messageDiv.className = 'p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500';
        messageDiv.textContent = 'An error occurred. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitText.classList.remove('hidden');
        submitLoading.classList.add('hidden');
    }
});
</script>

<?php include 'includes/footer.php'; ?>