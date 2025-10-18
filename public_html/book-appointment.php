<?php
$pageTitle = 'Book Appointment';
$pageDescription = 'Schedule a consultation with our team. Let us help you grow your business.';
include 'includes/header.php';
?>

<section class="py-20">
    <div class="container mx-auto px-6">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">Book a <span class="text-primary">Consultation</span></h1>
                <p class="text-xl text-gray-400">Schedule a meeting with our experts</p>
            </div>
            
            <div class="bg-gray-900 p-8 rounded-xl border border-gray-800">
                <form id="appointment-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">Full Name *</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email *</label>
                            <input type="email" name="email" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Phone *</label>
                            <input type="tel" name="phone" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Business Name</label>
                            <input type="text" name="business" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
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
                        <label class="block text-sm font-medium mb-2">Service Interests</label>
                        <select name="service_interests" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                            <option value="">Select Service</option>
                            <option value="telemarketing">Telemarketing</option>
                            <option value="government_contracting">Government Contracting</option>
                            <option value="social_media">Social Media Marketing</option>
                            <option value="all">All Services</option>
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Preferred Date *</label>
                            <input type="date" name="appointment_date" required min="<?php echo date('Y-m-d'); ?>" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">Preferred Time *</label>
                            <select name="appointment_time" required class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white">
                                <option value="">Select Time</option>
                                <option value="09:00">9:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="12:00">12:00 PM</option>
                                <option value="13:00">1:00 PM</option>
                                <option value="14:00">2:00 PM</option>
                                <option value="15:00">3:00 PM</option>
                                <option value="16:00">4:00 PM</option>
                                <option value="17:00">5:00 PM</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Additional Notes</label>
                        <textarea name="message" rows="4" class="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:border-primary focus:outline-none text-white" placeholder="Tell us about your business and goals..."></textarea>
                    </div>
                    
                    <div id="form-message" class="hidden"></div>
                    
                    <button type="submit" class="w-full bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all">
                        <span id="submit-text">Book Appointment</span>
                        <span id="submit-loading" class="hidden">Booking...</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
document.getElementById('appointment-form').addEventListener('submit', async function(e) {
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
        const response = await fetch('/api/appointments.php', {
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