    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-900 border-t border-gray-800 mt-20">
        <div class="container mx-auto px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- Company Info -->
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center">
                            <i class="fas fa-bolt text-black text-xl"></i>
                        </div>
                        <span class="text-2xl font-bold text-white"><?php echo SITE_NAME; ?></span>
                    </div>
                    <p class="text-gray-400 mb-4">Expert outbound services that scale. Turn conversations into customers.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-primary transition-colors"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-gray-400 hover:text-primary transition-colors"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-primary transition-colors"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="text-gray-400 hover:text-primary transition-colors"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                
                <!-- Services -->
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Services</h3>
                    <ul class="space-y-2">
                        <li><a href="/services/telemarketing.php" class="text-gray-400 hover:text-primary transition-colors">Telemarketing</a></li>
                        <li><a href="/services/government-contracting.php" class="text-gray-400 hover:text-primary transition-colors">Government Contracting</a></li>
                        <li><a href="/services/social-media.php" class="text-gray-400 hover:text-primary transition-colors">Social Media Marketing</a></li>
                    </ul>
                </div>
                
                <!-- Company -->
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Company</h3>
                    <ul class="space-y-2">
                        <li><a href="/about.php" class="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="/careers.php" class="text-gray-400 hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="/case-studies.php" class="text-gray-400 hover:text-primary transition-colors">Case Studies</a></li>
                        <li><a href="/contact.php" class="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                </div>
                
                <!-- Contact -->
                <div>
                    <h3 class="text-white font-semibold text-lg mb-4">Contact Us</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li><i class="fas fa-envelope mr-2 text-primary"></i><?php echo SITE_EMAIL; ?></li>
                        <li><i class="fas fa-phone mr-2 text-primary"></i>+1 (555) 123-4567</li>
                        <li><i class="fas fa-map-marker-alt mr-2 text-primary"></i>New York, NY</li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">&copy; <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All rights reserved.</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="/privacy-policy.php" class="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
                    <a href="/terms-of-service.php" class="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Scripts -->
    <script src="<?php echo ASSETS_URL; ?>/js/main.js"></script>
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn')?.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
    </script>
</body>
</html>