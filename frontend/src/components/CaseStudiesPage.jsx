import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Clock, ExternalLink, CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const CaseStudiesPage = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="bg-black py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Page Header */}
          <div className="text-center mb-20">
            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                Case <span className="text-[#00FFD1]">Studies</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-xl text-white/70 font-medium max-w-3xl mx-auto">
                Real success stories from our clients across telemarketing, government contracting, and social media services.
              </p>
            </ScrollReveal>
          </div>

          {/* Coming Soon Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <ScrollReveal delay={0.6}>
              <GlassBox className="p-12 lg:p-16 text-center mb-12">
                <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full bg-[#00FFD1]/10">
                  <Clock className="w-10 h-10 text-[#00FFD1]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                  Detailed Case Studies Coming Soon
                </h2>
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
                  <Button 
                    onClick={() => window.location.href = '/contact'}
                    className="bg-transparent border-2 border-white/20 text-white rounded-none px-8 py-4 text-lg font-medium hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all duration-400 min-h-[56px] flex items-center space-x-3"
                  >
                    <span>Discuss Your Project</span>
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </GlassBox>
            </ScrollReveal>
          </div>

          {/* Preview of What's Coming */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <ScrollReveal delay={0.8}>
              <GlassBox className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500/10">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                <p className="text-white/70 text-sm">
                  Detailed ROI analysis, conversion rates, and performance improvements achieved for our clients.
                </p>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={1.0}>
              <GlassBox className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500/10">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Client Success Stories</h3>
                <p className="text-white/70 text-sm">
                  Real testimonials and feedback from businesses that have transformed their outreach strategies.
                </p>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={1.2}>
              <GlassBox className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-yellow-500/10">
                  <DollarSign className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Revenue Impact</h3>
                <p className="text-white/70 text-sm">
                  Quantified business growth and revenue increases resulting from our service implementations.
                </p>
              </GlassBox>
            </ScrollReveal>
          </div>

          {/* What to Expect Section */}
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={1.4}>
              <GlassBox className="p-12">
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                  What Our Case Studies Will Include
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Industry-Specific Solutions</h4>
                        <p className="text-white/70 text-sm">Tailored approaches for different sectors including healthcare, technology, finance, and more.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Before & After Analysis</h4>
                        <p className="text-white/70 text-sm">Comprehensive comparison of business metrics before and after our service implementation.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Implementation Timeline</h4>
                        <p className="text-white/70 text-sm">Step-by-step breakdown of our process and key milestones achieved.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Measurable Results</h4>
                        <p className="text-white/70 text-sm">Concrete data on lead generation, conversion rates, and revenue growth.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Client Testimonials</h4>
                        <p className="text-white/70 text-sm">Direct feedback from decision-makers about their experience working with Lead G.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Lessons Learned</h4>
                        <p className="text-white/70 text-sm">Key insights and best practices that can be applied to similar business challenges.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassBox>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#00FFD1]/5 to-transparent py-20">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Create Your Own Success Story?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Don't wait for our case studies. Start building your success today with Lead G's proven strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/book-appointment'}
                  className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[48px] sm:min-h-[56px] flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </Button>
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-transparent border-2 border-white/20 text-white rounded-none px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium hover:border-[#00FFD1] hover:text-[#00FFD1] transition-all duration-400 min-h-[48px] sm:min-h-[56px] flex items-center justify-center space-x-2 sm:space-x-3 w-full sm:w-auto"
                >
                  <span>Learn More</span>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;