import React, { useState, useEffect } from 'react';
import { Phone, Target, Users, CheckCircle, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import LogoLoop from './LogoLoop';
import { getWorkedWithCompanies } from '../services/firebaseService';

const TelemarketingService = () => {
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const result = await getWorkedWithCompanies();
      if (result.success) {
        setCompanies(result.data);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // Demo companies fallback
  const demoCompanies = [
    { id: "demo-1", company_name: "Microsoft", logo_url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", website_url: "https://www.microsoft.com" },
    { id: "demo-2", company_name: "Apple", logo_url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", website_url: "https://www.apple.com" },
    { id: "demo-3", company_name: "Google", logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", website_url: "https://www.google.com" },
    { id: "demo-4", company_name: "Amazon", logo_url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", website_url: "https://www.amazon.com" },
    { id: "demo-5", company_name: "Tesla", logo_url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", website_url: "https://www.tesla.com" },
    { id: "demo-6", company_name: "Netflix", logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", website_url: "https://www.netflix.com" },
    { id: "demo-7", company_name: "Meta", logo_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", website_url: "https://www.meta.com" },
    { id: "demo-8", company_name: "Salesforce", logo_url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", website_url: "https://www.salesforce.com" },
    { id: "demo-9", company_name: "Adobe", logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg", website_url: "https://www.adobe.com" },
    { id: "demo-10", company_name: "IBM", logo_url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", website_url: "https://www.ibm.com" }
  ];

  const displayCompanies = companies.length > 0 ? companies : demoCompanies;
  const logoData = displayCompanies.map(company => ({
    src: company.logo_url || '',
    alt: company.company_name,
    title: company.company_name,
    href: company.website_url || undefined,
    className: "rounded-lg"
  }));

  const features = [
    "Cold calling campaigns",
    "Lead qualification",
    "Appointment setting", 
    "CRM integration",
    "Call scripting & optimization",
    "Real-time reporting & analytics"
  ];

  const benefits = [
    {
      icon: Target,
      title: "Targeted Outreach",
      description: "We identify and reach out to your ideal prospects using advanced targeting techniques and verified contact databases."
    },
    {
      icon: Users,
      title: "Expert Agents",
      description: "Our experienced telemarketing professionals are trained in consultative selling and relationship building."
    },
    {
      icon: TrendingUp,
      title: "Superior Performance",
      description: "Average 28% conversion rate with consistent pipeline generation and qualified lead delivery."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Strategy Development",
      description: "We analyze your target market and develop customized calling scripts and qualification criteria."
    },
    {
      step: "02", 
      title: "Campaign Launch",
      description: "Our trained agents begin outreach using proven scripts and techniques tailored to your industry."
    },
    {
      step: "03",
      title: "Lead Qualification",
      description: "We qualify prospects based on your criteria and schedule appointments with decision-makers."
    },
    {
      step: "04",
      title: "Continuous Optimization",
      description: "We track results, optimize scripts, and refine targeting to maximize conversion rates."
    }
  ];

  const testimonial = {
    quote: "Lead G's telemarketing team generated 150+ qualified leads in our first quarter. Their approach is professional and results-driven.",
    author: "Sarah Johnson",
    company: "TechSolutions Inc",
    role: "VP of Sales"
  };

  const handleBookConsultation = () => {
    window.location.href = '/book-appointment';
  };

  const handleGetPricing = () => {
    window.location.href = '/pricing#telemarketing';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/g3g9yiop_Telemarketing%20Excellence.png')"
          }}
        ></div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-20">
          <div className="max-w-4xl">
            {/* Hero Content */}
            <ScrollReveal delay={0.2}>
              <div className="flex items-center space-x-3 mb-6">
                <GlassBox className="w-12 h-12 bg-[#00FFD1]/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#00FFD1]" />
                </GlassBox>
                <span className="text-[#00FFD1] font-semibold text-lg">Telemarketing Excellence</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Professional <span className="text-[#00FFD1]">Outbound Calling</span> That Converts
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Transform cold prospects into warm leads with our proven telemarketing campaigns. 
                Our experienced agents deliver consistent results with a 28% average conversion rate.
              </p>
            </ScrollReveal>

            {/* 100% Client Satisfaction */}
            <ScrollReveal delay={0.5}>
              <div className="flex items-center space-x-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                ))}
                <span className="text-white/90 text-lg font-medium ml-2">100% client satisfaction</span>
              </div>
            </ScrollReveal>
            
            {/* CTA Buttons */}
            <ScrollReveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={handleBookConsultation}
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-none flex items-center justify-center space-x-2 w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </Button>
                
                <Button 
                  onClick={handleGetPricing}
                  className="bg-white/10 text-white hover:bg-white/20 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-none border border-white/30 backdrop-blur-sm w-full sm:w-auto"
                >
                  View Pricing
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Logo Slider - Full Width */}
        {!loadingCompanies && logoData.length > 0 && (
          <div className="w-full py-8 relative z-20 animate-[fadeIn_0.6s_ease-in-out]">
            <div className="overflow-hidden">
              <LogoLoop
                logos={logoData}
                speed={60}
                direction="left"
                logoHeight={60}
                gap={40}
                pauseOnHover={true}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="#000000"
                ariaLabel="Companies we have worked with"
              />
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                What's <span className="text-[#00FFD1]">Included</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our comprehensive telemarketing service covers every aspect of outbound lead generation
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
                Why Choose Our <span className="text-[#00FFD1]">Telemarketing</span>
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
                Our <span className="text-[#00FFD1]">Process</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A proven 4-step approach to telemarketing success
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

      {/* Why Choose LeadG for Telemarketing */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-[#00FFD1]">LeadG</span> for Telemarketing?
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                7+ years of proven expertise with in-house, specialized agents delivering results across global markets
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={0.3}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">7+ Years Experience</div>
                <h3 className="text-lg font-bold text-white mb-3">Proven Experience</h3>
                <p className="text-white/60 text-sm">Industry-tested strategies in Real Estate, Solar, and Hard Money Lending with clear understanding of what works.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">100% In-House</div>
                <h3 className="text-lg font-bold text-white mb-3">Ready-to-Go Agents</h3>
                <p className="text-white/60 text-sm">Every agent is hired, trained, and developed by LeadG. No outsourcing - fully prepared to step into your operations.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">Industry-Focused</div>
                <h3 className="text-lg font-bold text-white mb-3">Specialized Training</h3>
                <p className="text-white/60 text-sm">Our agents focus on one specific industry, building deep expertise to communicate with depth, not just follow scripts.</p>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <GlassBox className="p-6 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-sm font-bold text-[#00FFD1] mb-2">7+ Countries Served</div>
                <h3 className="text-lg font-bold text-white mb-3">Global Market Reach</h3>
                <p className="text-white/60 text-sm">From U.S. and Canada to U.K. and Dubai, we navigate diverse markets with local insight and global perspective.</p>
              </GlassBox>
            </ScrollReveal>
          </div>
        </div>
      </section>

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
                Ready to <span className="text-[#00FFD1]">Get Started?</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Starting at $2,999/month. Custom packages available based on your needs and volume.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookConsultation}
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                >
                  <span>Book Free Strategy Call</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={handleGetPricing}
                  className="bg-[#FF6EB4] text-white hover:bg-[#FF6EB4]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                >
                  <span>View Pricing</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-none border border-white/20"
                >
                  Get Custom Quote
                </Button>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default TelemarketingService;