import React from 'react';
import { contactData } from '../data/mock';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const PrivacyPolicy = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Privacy <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Policy</span>
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
                <h2 className="text-3xl font-bold text-white mb-6">1. Information We Collect</h2>
                <div className="text-white/70 space-y-4">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fill out our contact forms or request information</li>
                    <li>Subscribe to our newsletter or marketing communications</li>
                    <li>Participate in surveys or feedback requests</li>
                    <li>Contact us for customer support</li>
                  </ul>
                  <p>This information may include your name, email address, phone number, company information, and any other details you choose to provide.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">2. How We Use Your Information</h2>
                <div className="text-white/70 space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you marketing communications (with your consent)</li>
                    <li>Analyze usage patterns and improve our website</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">3. Information Sharing</h2>
                <div className="text-white/70 space-y-4">
                  <p>We do not sell, rent, or share your personal information with third parties except:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist in our operations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">4. Data Security</h2>
                <div className="text-white/70 space-y-4">
                  <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">5. Your Rights</h2>
                <div className="text-white/70 space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Object to processing of your personal information</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">6. Cookies and Tracking</h2>
                <div className="text-white/70 space-y-4">
                  <p>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. You can control cookie preferences through your browser settings.</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6">7. Contact Information</h2>
                <div className="text-white/70 space-y-4">
                  <p>If you have questions about this Privacy Policy, please contact us:</p>
                  <div className="bg-white/10 p-6 rounded-lg mt-4">
                    <p><strong>Email:</strong> {contactData.email}</p>
                    <p><strong>Address:</strong> {contactData.address.canada}</p>
                    <p><strong>Phone:</strong> {contactData.phone.canada}</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-white mb-6">8. Changes to This Policy</h2>
                <div className="text-white/70 space-y-4">
                  <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
                </div>
              </section>
            </div>
          </GlassBox>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PrivacyPolicy;