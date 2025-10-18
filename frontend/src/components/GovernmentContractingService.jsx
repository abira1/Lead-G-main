import React from 'react';
import { Building, FileText, Shield, CheckCircle, ArrowRight, Star, Award, DollarSign, Users, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import WorkedWith from './WorkedWith';

const GovernmentContractingService = () => {
  const features = [
    "Proposal writing & review",
    "Compliance assistance", 
    "Bid management",
    "Contract negotiation",
    "NAICS code optimization",
    "Past performance documentation"
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Compliance Expertise",
      description: "Navigate complex federal regulations with our team of certified government contracting specialists."
    },
    {
      icon: FileText,
      title: "Winning Proposals",
      description: "Our proposal writers have a proven track record of crafting compelling submissions that win contracts."
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Recognized by GSA and SBA for excellence in helping small businesses secure government contracts."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Opportunity Assessment",
      description: "We identify relevant contract opportunities that match your capabilities and business goals."
    },
    {
      step: "02", 
      title: "Proposal Development",
      description: "Our team crafts compelling proposals that highlight your strengths and meet all requirements."
    },
    {
      step: "03",
      title: "Submission & Follow-up",
      description: "We ensure timely submission and manage all follow-up communications with contracting officers."
    },
    {
      step: "04",
      title: "Contract Management",
      description: "Post-award support including contract administration, modifications, and performance tracking."
    }
  ];

  const contractTypes = [
    { type: "Federal Contracts", description: "GSA Schedules, SEWP, CIO-SP3" },
    { type: "State & Local", description: "State-wide contracts, municipal agreements" },
    { type: "Prime Contracts", description: "Direct government relationships" },
    { type: "Subcontracting", description: "Partner with established primes" }
  ];

  const testimonial = {
    quote: "Lead G helped us secure our first $5M federal contract. Their expertise in government contracting is unmatched in the industry.",
    author: "Michael Chen",
    company: "TechConsult Solutions",
    role: "CEO"
  };

  const handleBookConsultation = () => {
    window.location.href = '/book-appointment';
  };

  const handleGetPricing = () => {
    window.location.href = '/pricing#gov-contracting';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/hkp4baq4_Government%20Contracting%20.png')"
          }}
        ></div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Content */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="flex items-center space-x-3 mb-6">
                  <GlassBox className="w-12 h-12 bg-[#00FFD1]/20 flex items-center justify-center">
                    <Building className="w-6 h-6 text-[#00FFD1]" />
                  </GlassBox>
                  <span className="text-[#00FFD1] font-semibold text-lg">Government Contracting</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Secure <span className="text-[#00FFD1]">Government Contracts</span> with Confidence
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Navigate complex government procurement processes with our specialized team. 
                  We've helped businesses secure over $50M in federal and state contracts.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleBookConsultation}
                    className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                  >
                    <span>Book Strategy Session</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={handleGetPricing}
                    className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-none border border-white/30 backdrop-blur-sm"
                  >
                    View Services
                  </Button>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Hero Visual */}
            <div>
              <ScrollReveal delay={0.6}>
                <GlassBox 
                  className="p-8 lg:p-12"
                  blur={20}
                  opacity={0.1}
                  glow={true}
                  shine={true}
                >
                  <div className="text-center">
                    <div className="mb-8">
                      <Building className="w-20 h-20 text-[#00FFD1] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Proven Track Record</h3>
                      <p className="text-white/70">Helping businesses win government contracts since 2017</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-[#00FFD1]">$50M+</div>
                        <div className="text-sm text-white/70">Contracts Secured</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[#00FFD1]">85%</div>
                        <div className="text-sm text-white/70">Win Rate</div>
                      </div>
                    </div>
                  </div>
                </GlassBox>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Types Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Contract <span className="text-[#00FFD1]">Opportunities</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We help you access various types of government contracting opportunities
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contractTypes.map((contract, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="p-6 text-center h-full"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                  glow={true}
                >
                  <DollarSign className="w-8 h-8 text-[#00FFD1] mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">{contract.type}</h3>
                  <p className="text-white/70 text-sm">{contract.description}</p>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Comprehensive <span className="text-[#00FFD1]">Services</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                End-to-end government contracting support from opportunity identification to contract award
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="p-6 flex items-center space-x-4"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                >
                  <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Partner with <span className="text-[#00FFD1]">Our Experts</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <ScrollReveal key={index} delay={0.2 * (index + 1)}>
                  <GlassBox 
                    className="p-8 text-center h-full"
                    blur={16}
                    opacity={0.1}
                    hover={true}
                    glow={true}
                  >
                    <div className="mb-6">
                      <GlassBox className="w-16 h-16 mx-auto bg-[#00FFD1]/20 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-[#00FFD1]" />
                      </GlassBox>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </GlassBox>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Proven <span className="text-[#00FFD1]">Process</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A systematic approach to winning government contracts
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={0.2 * (index + 1)}>
                <GlassBox 
                  className="p-6 text-center h-full"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-[#00FFD1] text-black rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <GlassBox 
              className="p-8 lg:p-12 text-center max-w-4xl mx-auto"
              blur={20}
              opacity={0.1}
              glow={true}
              shine={true}
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#00FFD1] fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl text-white font-light mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="text-[#00FFD1] font-semibold text-lg">{testimonial.author}</div>
                <div className="text-white/70">{testimonial.role}, {testimonial.company}</div>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose LeadG for Government Contracting */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-[#00FFD1]">LeadG</span> for Government Contracting?
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                7+ years of specialized expertise with proven track record of securing $50M+ in government contracts
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={0.3}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">7+ Years Experience</div>
                <h3 className="text-lg font-bold text-white mb-3">Proven Experience</h3>
                <p className="text-white/60 text-sm">Deep expertise in Government Contracting with industry-tested strategies and clear understanding of federal processes.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">100% In-House</div>
                <h3 className="text-lg font-bold text-white mb-3">Specialized Team</h3>
                <p className="text-white/60 text-sm">Dedicated in-house experts trained specifically in government contracting compliance, proposal writing, and federal regulations.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">$50M+ Secured</div>
                <h3 className="text-lg font-bold text-white mb-3">Specialized Training</h3>
                <p className="text-white/60 text-sm">Our team focuses exclusively on government contracting, building deep expertise in federal, state, and local opportunities.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">Multi-Level Reach</div>
                <h3 className="text-lg font-bold text-white mb-3">Comprehensive Coverage</h3>
                <p className="text-white/60 text-sm">Federal, state, and local contract opportunities with global perspective for international government projects.</p>
              </GlassBox>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Companies We've Worked With Section */}
      <WorkedWith />

      {/* Case Studies Button */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-6 text-center">
          <Button 
            onClick={() => alert('Case Studies feature coming soon! PDF download functionality will be added.')}
            className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none"
          >
            View Case Studies
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <GlassBox 
              className="p-8 lg:p-12 text-center"
              blur={20}
              opacity={0.1}
              glow={true}
              shine={true}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Win <span className="text-[#00FFD1]">Government Contracts?</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Custom consulting rates based on project scope. Free initial consultation to assess your opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookConsultation}
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-none border border-white/20"
                >
                  Discuss Your Project
                </Button>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default GovernmentContractingService;