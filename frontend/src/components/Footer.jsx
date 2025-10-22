import React from 'react';
import { Link } from 'react-router-dom';
import { navigationData, contactData } from '../data/mock';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-16 py-20">
        
        {/* Top Section - Newsletter & CTA */}
        <ScrollReveal delay={0.2}>
          <GlassBox 
            className="text-center p-12 lg:p-16 mb-16"
            blur={20}
            opacity={0.15}
            noise={true}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to scale your business?
            </h3>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join 500+ companies that trust Lead G for their growth
            </p>
            
            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 focus:outline-none focus:border-[#00FFD1] transition-colors duration-300 rounded-none backdrop-blur-sm"
                />
                <Link to="/book-appointment">
                  <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 flex items-center space-x-2 w-full sm:w-auto">
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <Link to="/book-appointment" className="w-full sm:w-auto flex justify-center">
              <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[48px] sm:min-h-[56px] flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto max-w-full">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap text-sm sm:text-base md:text-lg">Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </Button>
            </Link>
          </GlassBox>
        </ScrollReveal>

        {/* Footer Cards Grid */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          
          {/* Company Info Card */}
          <ScrollReveal delay={0.4}>
            <GlassBox 
              className="p-6"
              blur={16}
              opacity={0.1}
              noise={true}
            >
              <div className="mb-6 flex items-center space-x-3">
                <img 
                  src="/lead-g-logo.png" 
                  alt="Lead G Logo" 
                  className="w-8 h-8"
                />
                <span className="text-2xl font-bold text-white tracking-tight">
                  Lead G
                </span>
              </div>
              <p className="text-sm text-white/60 font-medium leading-relaxed mb-6">
                Telemarketing & digital marketing for service businesses & government contractors since 2017.
              </p>
              
              {/* Success Metrics */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Since</span>
                  <span className="text-sm text-[#00FFD1] font-bold">2017</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Clients</span>
                  <span className="text-sm text-[#00FFD1] font-bold">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">Generated</span>
                  <span className="text-sm text-[#00FFD1] font-bold">$50M+</span>
                </div>
              </div>
            </GlassBox>
          </ScrollReveal>

          {/* Quick Links Card */}
          <ScrollReveal delay={0.6}>
            <GlassBox 
              className="p-6"
              blur={16}
              opacity={0.1}
              noise={true}
            >
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <nav className="space-y-3">
                {navigationData.menuItems.map((item) => (
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  )
                ))}
              </nav>
            </GlassBox>
          </ScrollReveal>

          {/* Services Card */}
          <ScrollReveal delay={0.8}>
            <GlassBox 
              className="p-6"
              blur={16}
              opacity={0.1}
              noise={true}
            >
              <h4 className="text-lg font-bold text-white mb-6">Services</h4>
              <nav className="space-y-3">
                <a href="#telemarketing" className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group">
                  <span>Telemarketing</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a href="#government" className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group">
                  <span>Government Contracting</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a href="#social-media" className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group">
                  <span>Social Media Marketing</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <a href="#consultation" className="flex items-center justify-between text-sm text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium group">
                  <span>Strategy Consultation</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </nav>
            </GlassBox>
          </ScrollReveal>

          {/* Contact Card */}
          <ScrollReveal delay={1.0}>
            <GlassBox 
              className="p-6"
              blur={16}
              opacity={0.1}
              noise={true}
            >
              <h4 className="text-lg font-bold text-white mb-6">Get in Touch</h4>
              <div className="space-y-4">
                
                <div className="flex items-start space-x-3">
                  <GlassBox className="w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                    <Mail className="w-4 h-4 text-[#00FFD1]" />
                  </GlassBox>
                  <div>
                    <p className="text-white/70 font-medium text-sm">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <GlassBox className="w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                    <Phone className="w-4 h-4 text-[#00FFD1]" />
                  </GlassBox>
                  <div>
                    <p className="text-white/70 font-medium text-sm">{contactData.phone.canada}</p>
                    <p className="text-white/50 font-medium text-xs">{contactData.phone.bangladesh}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <GlassBox className="w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                    <MapPin className="w-4 h-4 text-[#00FFD1]" />
                  </GlassBox>
                  <div>
                    <p className="text-white/70 font-medium text-sm leading-relaxed">
                      {contactData.address.canada}
                    </p>
                    <p className="text-white/50 font-medium text-xs leading-relaxed">
                      {contactData.address.bangladesh}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs text-white/50 font-medium">
                    {contactData.hours}
                  </p>
                </div>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal delay={1.2}>
          <GlassBox 
            className="flex flex-col lg:flex-row items-center justify-between p-6"
            blur={12}
            opacity={0.05}
          >
            <div className="text-white/60 font-medium text-sm mb-4 lg:mb-0">
              © {currentYear} Lead G. All rights reserved.
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/privacy-policy" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-sm">
                Contact Us
              </Link>
            </div>
          </GlassBox>
        </ScrollReveal>

        {/* Design Credit */}
        <ScrollReveal delay={1.4}>
          <div className="text-center pt-4">
            <a 
              href="https://toiral-development.web.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#00FFD1] transition-colors duration-300 font-medium text-xs flex items-center justify-center space-x-1 group"
            >
              <span>Design and Develop by Toiral Web Development</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;