import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Clock, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const CaseStudies = () => {
  return (
    <section id="case-studies" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Case <span className="text-[#00FFD1]">Studies</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Clock className="w-6 h-6 text-[#00FFD1]" />
              <p className="text-xl text-[#00FFD1] font-semibold">
                Coming Soon
              </p>
            </div>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
              We're preparing detailed case studies showcasing our success stories. 
              In the meantime, explore our services and learn how we can help your business grow.
            </p>
          </ScrollReveal>
        </div>

        {/* Coming Soon Content */}
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.6}>
            <GlassBox className="p-12 lg:p-16 text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-[#00FFD1]/10">
                <Clock className="w-10 h-10 text-[#00FFD1]" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Exciting Case Studies Coming Soon
              </h3>
              <p className="text-base text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                We're compiling comprehensive case studies that showcase real results from our telemarketing, 
                government contracting, and social media services. These detailed success stories will 
                demonstrate our proven track record across different industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[56px] flex items-center space-x-3">
                  <span>Get Notified When Ready</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>

        {/* Quick Links to Other Sections */}
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <h4 className="text-xl font-bold text-white mb-8">
              Explore Our Services While You Wait
            </h4>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <GlassBox className="p-6 hover:scale-105 transition-all duration-300">
                <a href="/#services" className="block text-center group">
                  <h5 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00FFD1] transition-colors duration-300">
                    Our Services
                  </h5>
                  <p className="text-sm text-white/60 mb-4">
                    Discover our telemarketing, government contracting, and social media services
                  </p>
                  <div className="flex items-center justify-center text-[#00FFD1] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium mr-2">Learn More</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </GlassBox>

              <GlassBox className="p-6 hover:scale-105 transition-all duration-300">
                <a href="/#industries" className="block text-center group">
                  <h5 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00FFD1] transition-colors duration-300">
                    Industries We Serve
                  </h5>
                  <p className="text-sm text-white/60 mb-4">
                    Explore the industries we specialize in and our expertise areas
                  </p>
                  <div className="flex items-center justify-center text-[#00FFD1] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium mr-2">Explore</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </GlassBox>

              <GlassBox className="p-6 hover:scale-105 transition-all duration-300">
                <a href="/contact" className="block text-center group">
                  <h5 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00FFD1] transition-colors duration-300">
                    Contact Us
                  </h5>
                  <p className="text-sm text-white/60 mb-4">
                    Ready to get started? Reach out to discuss your business needs
                  </p>
                  <div className="flex items-center justify-center text-[#00FFD1] group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium mr-2">Get In Touch</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </GlassBox>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudies;