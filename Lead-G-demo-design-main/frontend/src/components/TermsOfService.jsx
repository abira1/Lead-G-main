import React from 'react';
import { contactData } from '../data/mock';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const TermsOfService = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,209,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Terms of <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-white/60 font-medium">
              Effective Date: December 15, 2024
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlassBox className="p-8 lg:p-12 max-w-5xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
                <div className="text-white/70 space-y-4">
                  <p>By accessing and using Lead G's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">2. Services Description</h2>
                <div className="text-white/70 space-y-4">
                  <p>Lead G provides lead generation services including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Telemarketing and outbound calling services</li>
                    <li>Government contracting support and consulting</li>
                    <li>Social media marketing and content creation</li>
                    <li>Lead qualification and appointment setting</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">3. Client Responsibilities</h2>
                <div className="text-white/70 space-y-4">
                  <p>Clients agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Make payments according to agreed terms</li>
                    <li>Provide necessary access and materials for service delivery</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">4. Payment Terms</h2>
                <div className="text-white/70 space-y-4">
                  <p>Payment terms are specified in individual service agreements. Generally:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Services are billed monthly in advance</li>
                    <li>Payment is due within 30 days of invoice date</li>
                    <li>Late payments may incur additional fees</li>
                    <li>Refunds are subject to our refund policy</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">5. Confidentiality</h2>
                <div className="text-white/70 space-y-4">
                  <p>We maintain strict confidentiality of all client information and data. We will not disclose client information to third parties without explicit consent, except as required by law.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">6. Performance Standards</h2>
                <div className="text-white/70 space-y-4">
                  <p>While we strive to deliver high-quality results, lead generation outcomes may vary based on market conditions, industry factors, and client-specific variables. Performance metrics and expectations are defined in individual service agreements.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">7. Limitation of Liability</h2>
                <div className="text-white/70 space-y-4">
                  <p>Lead G's liability is limited to the amount paid for services. We are not liable for indirect, consequential, or punitive damages arising from the use of our services.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">8. Termination</h2>
                <div className="text-white/70 space-y-4">
                  <p>Either party may terminate services with 30 days written notice. Termination does not relieve parties of obligations incurred prior to termination.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">9. Governing Law</h2>
                <div className="text-white/70 space-y-4">
                  <p>These terms are governed by the laws of Ontario, Canada. Any disputes will be resolved through binding arbitration in Ontario, Canada.</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">10. Contact Information</h2>
                <div className="text-white/70 space-y-4">
                  <p>For questions about these Terms of Service, contact us:</p>
                  <div className="bg-white/10 p-6 rounded-lg mt-4">
                    <p><strong>Email:</strong> {contactData.email}</p>
                    <p><strong>Address:</strong> {contactData.address.canada}</p>
                    <p><strong>Phone:</strong> {contactData.phone.canada}</p>
                  </div>
                </div>
              </section>
            </div>
          </GlassBox>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TermsOfService;