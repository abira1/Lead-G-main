import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pricingData } from '../data/mock';
import { Button } from './ui/button';
import { CheckCircle, ArrowRight, Phone, Building, Share2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const PricingPage = () => {
  const navigate = useNavigate();
  
  // Map URL hash to service names
  const getInitialService = () => {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    const hashToService = {
      'telemarketing': 'Telemarketing',
      'gov-contracting': 'Government Contracting',
      'social-media': 'Social Media'
    };
    return hashToService[hash] || 'Telemarketing';
  };

  const [activeService, setActiveService] = useState(getInitialService());
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const hashToService = {
        'telemarketing': 'Telemarketing',
        'gov-contracting': 'Government Contracting',
        'social-media': 'Social Media'
      };
      const newService = hashToService[hash];
      if (newService && newService !== activeService) {
        handleServiceChange(newService);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeService]);

  const serviceIcons = {
    "Telemarketing": Phone,
    "Government Contracting": Building,
    "Social Media": Share2
  };

  const serviceData = {
    "Telemarketing": {
      packages: pricingData.telemarketing,
      description: "Professional outbound calling campaigns that convert prospects into qualified leads with our proven scripts and experienced agents."
    },
    "Government Contracting": {
      packages: pricingData.government,
      description: "Navigate complex government procurement processes with our specialized team of government contracting experts."
    },
    "Social Media": {
      packages: pricingData.socialMedia,
      description: "Amplify your brand presence and generate quality leads through strategic social media campaigns and content marketing."
    }
  };

  const IconComponent = serviceIcons[activeService];
  const activeData = serviceData[activeService];

  const handleServiceChange = (service) => {
    if (service === activeService) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveService(service);
      setIsTransitioning(false);
    }, 300);
  };

  const handleChoosePlan = (pkg, serviceName) => {
    // Map service names to service interests values for form pre-population
    const serviceMapping = {
      'Telemarketing': 'telemarketing',
      'Government Contracting': 'government-contracting', 
      'Social Media': 'social-media'
    };
    
    const serviceType = serviceMapping[serviceName] || 'consultation';
    
    // Navigate to appointment booking with service context
    navigate(`/book-appointment?service=${serviceType}&plan=${pkg.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black py-24 lg:py-32 overflow-hidden">
        {/* Background Spotlight Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]">
            <div 
              className="w-full h-full rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(0, 255, 209, 0.3) 0%, rgba(0, 255, 209, 0.1) 40%, transparent 70%)',
                filter: 'blur(40px)'
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center mb-20">
            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                <span className="text-[#00FFD1]">{pricingData.title}</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {pricingData.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Selector Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Service Selector Buttons */}
          <div className="mb-16">
            <ScrollReveal delay={0.3}>
              {/* Mobile: Icon-only row layout */}
              <div className="lg:hidden">
                <div className="flex justify-center items-start gap-6 px-2">
                  {Object.keys(serviceData).map((service) => {
                    const IconComp = serviceIcons[service];
                    const isActive = activeService === service;
                    
                    // Abbreviated labels for narrow screens
                    const labelMap = {
                      "Telemarketing": "Telemarketing",
                      "Government Contracting": "Gov Contract",
                      "Social Media": "Social Media"
                    };
                    const label = labelMap[service] || service;
                    
                    return (
                      <button
                        key={service}
                        onClick={() => handleServiceChange(service)}
                        disabled={isTransitioning}
                        aria-label={service}
                        aria-pressed={isActive}
                        className={`group relative flex flex-col items-center transition-all duration-200 ${
                          isTransitioning ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {/* Icon container with 44x44px touch target */}
                        <div className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                          isActive 
                            ? 'bg-[#00FFD1]/10' 
                            : 'bg-white/5 active:bg-white/10'
                        }`}>
                          {/* Glow effect for active icon */}
                          {isActive && (
                            <div className="absolute inset-0 bg-[#00FFD1]/30 rounded-full blur-md" />
                          )}
                          
                          <IconComp className={`relative w-6 h-6 transition-colors duration-200 ${
                            isActive ? 'text-[#00FFD1]' : 'text-white/50'
                          }`} />
                        </div>
                        
                        {/* Label - always visible under all icons */}
                        <span 
                          className={`mt-1.5 text-[10px] font-medium whitespace-nowrap text-center max-w-[90px] leading-tight transition-colors duration-200 ${
                            isActive ? 'text-[#00FFD1]' : 'text-white/40'
                          }`}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Desktop: Wrapped centered layout */}
              <div className="hidden lg:flex flex-wrap justify-center gap-6">
                {Object.keys(serviceData).map((service) => {
                  const IconComp = serviceIcons[service];
                  const isActive = activeService === service;
                  
                  return (
                    <button
                      key={service}
                      onClick={() => handleServiceChange(service)}
                      disabled={isTransitioning}
                      className={`group relative px-8 py-5 rounded-none border transition-all duration-500 ${
                        isActive 
                          ? 'bg-[#00FFD1]/20 border-[#00FFD1] text-white shadow-lg shadow-[#00FFD1]/20' 
                          : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white'
                      } ${isTransitioning ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-[#00FFD1]/10 rounded-none blur-xl" />
                      )}
                      
                      <div className="relative flex items-center space-x-3">
                        <IconComp className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? 'text-[#00FFD1]' : 'text-white/50 group-hover:text-white/70'
                        }`} />
                        <span className="font-semibold text-base whitespace-nowrap">
                          {service}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Active Service Pricing Section */}
          <ScrollReveal delay={0.4}>
            <div className="max-w-7xl mx-auto">
              <div 
                key={activeService}
                className={`transition-all duration-500 ease-out ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-4' 
                    : 'opacity-100 transform translate-y-0'
                }`}
              >
                {/* Service Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <IconComponent className="w-10 h-10 text-[#00FFD1]" />
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                      {activeService} Packages
                    </h2>
                  </div>
                  <p className="text-white/70 text-lg max-w-3xl mx-auto">
                    {activeData.description}
                  </p>
                </div>

                {/* Packages Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12 items-stretch">
                  {activeData.packages.map((pkg, pkgIndex) => (
                    <div 
                      key={pkg.id}
                      className={`h-full transition-all duration-500 ease-out ${
                        isTransitioning 
                          ? 'opacity-0 transform translate-y-6' 
                          : 'opacity-100 transform translate-y-0'
                      }`}
                      style={{ transitionDelay: `${150 + pkgIndex * 100}ms` }}
                    >
                      <GlassBox 
                        className={`relative p-8 h-full flex flex-col justify-between cursor-pointer ${
                          pkg.popular ? 'border-2 border-[#00FFD1]/40' : 'border border-transparent'
                        }`}
                        blur={pkg.popular ? 20 : 16}
                        opacity={pkg.popular ? 0.2 : 0.15}
                        noise={false}
                        hover={true}
                        glow={pkg.popular}
                        shine={true}
                        hoverScale={1.02}
                      >
                        {/* Popular Badge */}
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <GlassBox 
                              className="bg-[#00FFD1] text-black px-4 py-1.5 text-xs font-bold flex items-center space-x-1" 
                              opacity={1}
                              blur={0}
                            >
                              <Star className="w-3 h-3" />
                              <span>POPULAR</span>
                            </GlassBox>
                          </div>
                        )}

                        {/* Package Content */}
                        <div className="flex flex-col flex-grow">
                          {/* Package Header */}
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-white mb-3 min-h-[28px]">
                              {pkg.name}
                            </h3>
                            <div className="min-h-[24px] mb-4">
                              {pkg.subtitle && (
                                <p className="text-sm text-[#00FFD1] font-medium">
                                  {pkg.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="mb-4">
                              <span className="text-4xl font-bold text-white">
                                {pkg.price}
                              </span>
                              <span className="text-lg text-white/70 ml-2">
                                /{pkg.period}
                              </span>
                            </div>
                            <div className="min-h-[20px]">
                              {pkg.setupFee && (
                                <div className="text-sm text-white/60">
                                  Setup: {pkg.setupFee}
                                </div>
                              )}
                            </div>
                            <div className="min-h-[20px] mt-1">
                              {pkg.contract && (
                                <div className="text-sm text-white/60">
                                  {pkg.contract}
                                </div>
                              )}
                            </div>
                            <div className="min-h-[20px] mt-1">
                              {pkg.volumeDiscount && (
                                <div className="text-sm text-[#FF6EB4] font-medium">
                                  Volume discounts available
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Features List */}
                          <div className="space-y-3 mb-6 flex-grow">
                            {pkg.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                                <span className="text-white/80 text-sm font-medium leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-auto pt-6">
                          <Button 
                            className={`w-full min-h-[48px] flex items-center justify-center space-x-3 text-base font-medium border-none rounded-none transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                              pkg.popular
                                ? 'bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 hover:shadow-[#00FFD1]/30 hover:text-black'
                                : 'bg-white/10 text-white hover:bg-[#00FFD1] hover:text-black hover:shadow-[#00FFD1]/25'
                            }`}
                            onClick={() => handleChoosePlan(pkg, activeService)}
                          >
                            <span>
                              {pkg.period === 'one-time' ? 'Get Started' : 'Choose Plan'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </GlassBox>
                    </div>
                  ))}
                </div>

                {/* Category Notes */}
                {activeData.packages[0]?.notes && (
                  <div 
                    className={`transition-all duration-500 ease-out ${
                      isTransitioning 
                        ? 'opacity-0 transform translate-y-4' 
                        : 'opacity-100 transform translate-y-0'
                    }`}
                    style={{ transitionDelay: '450ms' }}
                  >
                    <GlassBox 
                      className="p-6"
                      blur={12}
                      opacity={0.1}
                      noise={false}
                    >
                      <p className="text-sm text-white/70 leading-relaxed">
                        <strong className="text-white/90">Notes:</strong> {activeData.packages[0].notes}
                      </p>
                    </GlassBox>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Success Metrics */}
          <ScrollReveal delay={0.6}>
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Why Choose Lead G?
                </h3>
                <p className="text-white/60 text-lg">
                  Professional excellence across all services
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <GlassBox 
                  className="p-6 group cursor-pointer animate-float text-center"
                  hover={true}
                  hoverScale={1.1}
                  glow={true}
                  style={{ animationDelay: `${0 * 0.2}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">500+</div>
                  <div className="text-sm text-white/60 font-medium">Happy Clients</div>
                </GlassBox>
                
                <GlassBox 
                  className="p-6 group cursor-pointer animate-float text-center"
                  hover={true}
                  hoverScale={1.1}
                  glow={true}
                  style={{ animationDelay: `${1 * 0.2}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">28%</div>
                  <div className="text-sm text-white/60 font-medium">Avg. Conversion</div>
                </GlassBox>
                
                <GlassBox 
                  className="p-6 group cursor-pointer animate-float text-center"
                  hover={true}
                  hoverScale={1.1}
                  glow={true}
                  style={{ animationDelay: `${2 * 0.2}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">$50M+</div>
                  <div className="text-sm text-white/60 font-medium">Revenue Generated</div>
                </GlassBox>
                
                <GlassBox 
                  className="p-6 group cursor-pointer animate-float text-center"
                  hover={true}
                  hoverScale={1.1}
                  glow={true}
                  style={{ animationDelay: `${3 * 0.2}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">8+ Years</div>
                  <div className="text-sm text-white/60 font-medium">Experience</div>
                </GlassBox>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Section */}
          <ScrollReveal delay={0.8}>
            <div className="text-center mt-32">
              <GlassBox 
                className="p-10 max-w-3xl mx-auto"
                blur={20}
                opacity={0.15}
                noise={true}
                glow={true}
              >
                <h2 className="text-3xl font-bold text-white mb-6">
                  {pricingData.cta.title}
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  {pricingData.cta.description}
                </p>
                <Button 
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 hover:shadow-[#00FFD1]/30 px-10 py-4 text-lg font-medium border-none rounded-none transition-all duration-500 transform hover:scale-105"
                >
                  {pricingData.cta.buttonText}
                </Button>
              </GlassBox>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;