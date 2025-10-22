import React from 'react';
import { servicesData } from '../data/mock';
import { Phone, Building, Share2, ArrowRight, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const iconMap = {
  Phone: Phone,
  Building: Building,
  Share2: Share2
};

const Services = () => {
  const handleLearnMore = (serviceName) => {
    // Navigate to dedicated service pages
    switch(serviceName) {
      case 'Telemarketing Excellence':
        window.location.href = '/services/telemarketing';
        break;
      case 'Government Contracting':
        window.location.href = '/services/government-contracting';
        break;
      case 'Social Media Marketing':
        window.location.href = '/services/social-media';
        break;
      default:
        // Fallback to contact section
        const contactSection = document.getElementById('contact') || document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.location.href = '/contact';
        }
    }
  };

  const handleViewPricing = (serviceName) => {
    // Navigate to pricing page with appropriate anchor
    switch(serviceName) {
      case 'Telemarketing Excellence':
        window.location.href = '/pricing#telemarketing';
        break;
      case 'Government Contracting':
        window.location.href = '/pricing#gov-contracting';
        break;
      case 'Social Media Marketing':
        window.location.href = '/pricing#social-media';
        break;
      default:
        window.location.href = '/pricing';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')"
          }}
        ></div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-20">
          <div className="text-center max-w-5xl mx-auto">
            <ScrollReveal delay={0.2}>
              <h1 className="text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight mb-8">
                Expert Services That <span className="text-[#00FFD1]">Deliver Results</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <p className="text-2xl text-white/80 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                Comprehensive lead generation solutions across telemarketing, government contracting, and social media marketing
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  onClick={() => {
                    const servicesSection = document.getElementById('services-grid');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-10 py-4 text-lg font-semibold rounded-none flex items-center space-x-3 transform hover:scale-105 transition-all duration-300"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/10 text-white hover:bg-white/20 px-10 py-4 text-lg font-semibold rounded-none border border-white/30 backdrop-blur-sm"
                >
                  Get Custom Quote
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-grid" className="bg-black py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <ScrollReveal delay={0.2}>
              <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                What we <span className="text-[#00FFD1]">deliver</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
                Comprehensive solutions for modern business growth
              </p>
            </ScrollReveal>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {servicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              
              // Map service images
              const serviceImages = {
                1: "https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/g3g9yiop_Telemarketing%20Excellence.png", // Telemarketing
                2: "https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/hkp4baq4_Government%20Contracting%20.png", // Government Contracting
                3: "https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/e9hsgdqv_Social%20Media%20Marketing.png" // Social Media
              };
              
              return (
                <ScrollReveal key={service.id} delay={0.2 * (index + 1)}>
                  <GlassBox 
                    className="group p-0 h-full flex flex-col cursor-pointer overflow-hidden"
                    blur={16}
                    opacity={0.1}
                    noise={false}
                    hover={true}
                    glow={true}
                    shine={true}
                    hoverScale={1.05}
                  >
                    
                    {/* Service Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={serviceImages[service.id]} 
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Service Icon Overlay */}
                      <div className="absolute top-6 left-6">
                        <GlassBox 
                          className="w-16 h-16 bg-[#00FFD1]/20 backdrop-blur-sm rounded-none flex items-center justify-center transition-all duration-500 group-hover:bg-[#00FFD1]/60 group-hover:scale-110" 
                          hover={true}
                          glow={true}
                        >
                          <IconComponent className="w-8 h-8 text-[#00FFD1] transition-all duration-300 group-hover:scale-110 group-hover:text-black" />
                        </GlassBox>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-8 lg:p-10 flex flex-col flex-grow">
                      {/* Content that grows */}
                      <div className="flex-grow">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight transition-all duration-300 group-hover:text-[#00FFD1]">
                          {service.title}
                        </h3>
                        
                        <p className="text-base text-white/80 font-medium leading-relaxed mb-8 transition-all duration-300 group-hover:text-white/95">
                          {service.description}
                        </p>

                        {/* Key Results */}
                        <div className="mb-6">
                          <div className="inline-flex items-center bg-[#00FFD1]/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-[#00FFD1] text-sm font-semibold">{service.results}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - Anchored to bottom */}
                      <div className="space-y-3 mt-6">
                        <Button 
                          onClick={() => handleLearnMore(service.title)}
                          className="bg-white/10 text-white border-none rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-3 group w-full justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/25 cursor-pointer"
                        >
                          <span className="transition-all duration-300">Learn More</span>
                          <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        </Button>
                        
                        <Button 
                          onClick={() => handleViewPricing(service.title)}
                          className="bg-[#00FFD1]/20 text-[#00FFD1] border border-[#00FFD1]/30 rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1] hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-3 group w-full justify-center transform hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/25 cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                          <span className="transition-all duration-300">View Pricing</span>
                        </Button>
                      </div>
                    </div>
                  </GlassBox>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;