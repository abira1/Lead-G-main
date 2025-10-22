import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, TrendingUp, Zap, Building2, CheckCircle, ArrowRight, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { industriesData } from '../data/mock';

const IndustriesPage = () => {
  const location = useLocation();
  const [activeIndustry, setActiveIndustry] = useState('Real Estate');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLabel, setShowLabel] = useState(true); // Show label on initial load
  const [labelTimeout, setLabelTimeout] = useState(null);

  // Check URL parameters on component mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const industryParam = searchParams.get('industry');
    
    if (industryParam) {
      // Check if the industry from URL parameter exists in our data
      const industryExists = industriesData.some(industry => industry.name === industryParam);
      if (industryExists) {
        setActiveIndustry(industryParam);
      }
    }
  }, [location]);

  const industryIcons = {
    "Real Estate": Home,
    "Hard Money Lending": TrendingUp,
    "Solar Energy": Zap,
    "Government Contracting": Building2
  };

  const industryImages = {
    "Real Estate": "/industry-images/real_estate.webp",
    "Hard Money Lending": "/industry-images/hard_money.webp", 
    "Solar Energy": "/industry-images/solar.webp",
    "Government Contracting": "/industry-images/government.webp"
  };

  const industryBenefits = {
    "Real Estate": [
      "Qualified lead generation for agents and brokers",
      "Investor prospecting and relationship building", 
      "Property listing campaign management",
      "Buyer qualification and appointment setting"
    ],
    "Hard Money Lending": [
      "Direct borrower outreach and qualification",
      "Investor network expansion and deal flow",
      "Compliance-focused lead generation",
      "Partnership facilitation and business development"
    ],
    "Solar Energy": [
      "Residential solar lead generation",
      "Commercial solar prospect identification", 
      "Energy consultation and education",
      "Government incentive program guidance"
    ],
    "Government Contracting": [
      "Contract opportunity identification and tracking",
      "Proposal development and submission support",
      "Compliance consulting and guidance", 
      "Past performance documentation and strategy"
    ]
  };

  const activeIndustryData = industriesData.find(industry => industry.name === activeIndustry);
  const IconComponent = industryIcons[activeIndustry];

  const handleBookCall = () => {
    window.location.href = '/book-appointment';
  };

  const handleIndustryChange = (industry) => {
    if (industry === activeIndustry || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Short delay to allow fade out, then change industry and fade in
    setTimeout(() => {
      setActiveIndustry(industry);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50); // Brief delay for content change before fade in
    }, 200); // Half of transition duration for fade out
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
                Industries We <span className="text-[#00FFD1]">Serve</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Specialized lead generation expertise across key industries with professional excellence and deep market knowledge.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Industry Selector Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Industry Selector Buttons */}
          <div className="mb-16">
            <ScrollReveal delay={0.3}>
              {/* Mobile: Horizontal scrollable layout */}
              <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-6 px-6">
                <div className="flex gap-3 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                  {industriesData.map((industry) => {
                    const IconComp = industryIcons[industry.name];
                    const isActive = activeIndustry === industry.name;
                    
                    return (
                      <button
                        key={industry.name}
                        onClick={() => handleIndustryChange(industry.name)}
                        disabled={isTransitioning}
                        style={{ scrollSnapAlign: 'start' }}
                        className={`group relative flex-shrink-0 px-5 py-3 rounded-none border transition-all duration-500 min-h-[44px] ${
                          isActive 
                            ? 'bg-[#00FFD1]/20 border-[#00FFD1] text-white shadow-lg shadow-[#00FFD1]/20' 
                            : 'bg-white/5 border-white/20 text-white/70 active:bg-white/10 active:border-white/30 active:text-white'
                        } ${isTransitioning ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {/* Background glow effect for active button */}
                        {isActive && (
                          <div className="absolute inset-0 bg-[#00FFD1]/10 rounded-none blur-xl" />
                        )}
                        
                        <div className="relative flex items-center space-x-2.5">
                          <IconComp className={`w-4 h-4 transition-colors duration-300 flex-shrink-0 ${
                            isActive ? 'text-[#00FFD1]' : 'text-white/50'
                          }`} />
                          <span className="font-semibold text-sm whitespace-nowrap">
                            {industry.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Desktop: Wrapped centered layout */}
              <div className="hidden lg:flex flex-wrap justify-center gap-6">
                {industriesData.map((industry) => {
                  const IconComp = industryIcons[industry.name];
                  const isActive = activeIndustry === industry.name;
                  
                  return (
                    <button
                      key={industry.name}
                      onClick={() => handleIndustryChange(industry.name)}
                      disabled={isTransitioning}
                      className={`group relative px-8 py-5 rounded-none border transition-all duration-500 ${
                        isActive 
                          ? 'bg-[#00FFD1]/20 border-[#00FFD1] text-white shadow-lg shadow-[#00FFD1]/20' 
                          : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white'
                      } ${isTransitioning ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {/* Background glow effect for active button */}
                      {isActive && (
                        <div className="absolute inset-0 bg-[#00FFD1]/10 rounded-none blur-xl" />
                      )}
                      
                      <div className="relative flex items-center space-x-3">
                        <IconComp className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? 'text-[#00FFD1]' : 'text-white/50 group-hover:text-white/70'
                        }`} />
                        <span className="font-semibold text-base whitespace-nowrap">
                          {industry.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Active Industry Detail Section */}
          <ScrollReveal delay={0.4}>
            <div className="max-w-6xl mx-auto">
              <GlassBox 
                className="p-8 lg:p-12 industry-transition-container"
                blur={16}
                opacity={0.1}
                border={true}
                glow={true}
                shine={true}
              >
                <div 
                  key={activeIndustry}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center industry-content-transition ${
                    isTransitioning 
                      ? 'opacity-0 transform translate-y-4' 
                      : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  {/* Industry Image */}
                  <div className={`relative group industry-image-transition ${
                    isTransitioning ? 'opacity-0 transform translate-x-8' : 'opacity-100 transform translate-x-0'
                  }`}>
                    <div className="relative overflow-hidden rounded-none shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                      <img 
                        src={industryImages[activeIndustry]}
                        alt={`${activeIndustry} industry`}
                        className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                        loading="lazy"
                      />
                      {/* Dark overlay with hover effect */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                      
                      {/* Icon overlay with glow effect */}
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-[#00FFD1]/20 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-[#00FFD1]/30 transition-colors duration-500 shadow-lg shadow-[#00FFD1]/10">
                          <IconComponent className="w-8 h-8 text-[#00FFD1] group-hover:text-[#00FFD1] transition-colors duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industry Content */}
                  <div className={`space-y-8 transition-all duration-500 ease-out delay-100 ${
                    isTransitioning ? 'opacity-0 transform translate-y-6' : 'opacity-100 transform translate-y-0'
                  }`}>
                    {/* Title & Tagline */}
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                        {activeIndustry} Lead Generation
                      </h2>
                      <div className="flex items-center space-x-2 mb-4">
                        <Star className="w-5 h-5 text-[#00FFD1]" />
                        <span className="text-[#00FFD1] font-bold text-lg">
                          {activeIndustryData?.metrics}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-lg leading-relaxed">
                      {activeIndustryData?.description}
                    </p>

                    {/* Key Benefits */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Key Benefits:</h3>
                      <div className="grid gap-3">
                        {industryBenefits[activeIndustry]?.map((benefit, index) => (
                          <div 
                            key={index} 
                            className={`flex items-start space-x-3 industry-benefit-stagger ${
                              isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
                            }`}
                            style={{ transitionDelay: `${150 + index * 50}ms` }}
                          >
                            <CheckCircle className="w-5 h-5 text-[#00FFD1] mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleBookCall}
                        className="group bg-[#00FFD1] text-black font-bold py-4 px-8 rounded-none hover:bg-[#00FFD1]/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#00FFD1]/20 flex items-center"
                      >
                        Book a Call
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassBox>
            </div>
          </ScrollReveal>

          {/* Metrics section removed as requested */}
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;