import React from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { contactData } from '../data/mock';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Get In <span className="text-[#00FFD1]">Touch</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with expert lead generation? 
              Let's discuss how we can help you achieve your growth goals.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Information - Centered */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.4}>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Contact Details */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <Mail className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <a 
                        href={`mailto:${contactData.email}`}
                        className="text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <Phone className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <div className="space-y-1">
                        <a 
                          href={`tel:${contactData.phone.canada.replace(/\D/g, '')}`}
                          className="block text-white/70 hover:text-[#00FFD1] transition-colors duration-300"
                        >
                          {contactData.phone.canada}
                        </a>
                        <p className="text-white/50 text-sm">{contactData.phone.bangladesh}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                      <MapPin className="w-5 h-5 text-[#00FFD1]" />
                    </GlassBox>
                    <div>
                      <h4 className="text-white font-medium mb-1">Offices</h4>
                      <div className="space-y-2">
                        <p className="text-white/70 text-sm leading-relaxed">
                          <strong>Canada:</strong><br />
                          {contactData.address.canada}
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed">
                          <strong>Bangladesh:</strong><br />
                          {contactData.address.bangladesh}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassBox>

              {/* Business Hours */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-4">Business Hours</h3>
                <p className="text-white/70">
                  {contactData.hours}
                </p>
                <p className="text-white/50 text-sm mt-2">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </GlassBox>

              {/* Why Choose Us */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-4">Why Choose Lead G?</h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>8+ years of industry experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>500+ successful client partnerships</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>$50M+ in revenue generated</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                    <span>Dedicated account management</span>
                  </li>
                </ul>
              </GlassBox>
              
              {/* Quick Actions */}
              <GlassBox 
                className="p-8"
                blur={16}
                opacity={0.1}
              >
                <h3 className="text-xl font-bold text-white mb-6">Ready to Get Started?</h3>
                
                <div className="space-y-4">
                  <a 
                    href="/book-appointment"
                    className="flex items-center justify-center space-x-3 bg-[#00FFD1] text-black px-6 py-4 hover:bg-[#00FFD1]/90 transition-all duration-300 rounded-none text-lg font-medium"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </a>
                  
                  <a 
                    href={`mailto:${contactData.email}`}
                    className="flex items-center justify-center space-x-3 bg-white/10 text-white px-6 py-4 hover:bg-white hover:text-black transition-all duration-300 rounded-none text-lg font-medium border border-white/20"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Email</span>
                  </a>
                  
                  <a 
                    href={`tel:${contactData.phone.canada.replace(/\D/g, '')}`}
                    className="flex items-center justify-center space-x-3 bg-white/5 text-white px-6 py-4 hover:bg-white/10 transition-all duration-300 rounded-none text-lg font-medium border border-white/10"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </a>
                </div>
              </GlassBox>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;