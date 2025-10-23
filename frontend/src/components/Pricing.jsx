import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pricingData } from '../data/mock';
import { Button } from './ui/button';
import { CheckCircle, ArrowRight, Star, Phone, Building, Share2 } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

// Service Category Card Component
const ServiceCategoryCard = ({ category, packages, icon: IconComponent, index, navigate }) => {
  
  const handleChoosePlan = (pkg, categoryName) => {
    // Map category names to service interests values for form pre-population
    const serviceMapping = {
      'Telemarketing': 'telemarketing',
      'Government Contracting Support': 'government-contracting', 
      'Social Media Marketing': 'social-media'
    };
    
    const serviceType = serviceMapping[categoryName] || 'consultation';
    
    // Navigate to appointment booking with service context
    navigate(`/book-appointment?service=${serviceType}&plan=${pkg.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
  <ScrollReveal delay={0.2 * (index + 1)}>
    <div className="mb-16">
      {/* Category Header */}
      <div className="flex items-center justify-center mb-8">
        <GlassBox 
          className="flex items-center space-x-3 px-6 py-4"
          blur={16}
          opacity={0.15}
          noise={false}
        >
          <IconComponent className="w-6 h-6 text-[#00FFD1]" />
          <h3 className="text-2xl font-bold text-white">
            {category} Packages
          </h3>
        </GlassBox>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {packages.map((pkg, pkgIndex) => (
          <ScrollReveal key={pkg.id} delay={0.1 * (pkgIndex + 1)} className="flex">
            <GlassBox 
              className="relative p-6 md:p-8 w-full flex flex-col cursor-pointer border border-white/10"
              blur={16}
              opacity={0.15}
              noise={false}
              hover={true}
              glow={false}
              shine={true}
              hoverScale={1.02}
            >

              {/* Package Header */}
              <div className="text-center mb-4 md:mb-6">
                <h4 className="text-base md:text-lg font-bold text-white mb-2 h-6 md:h-7 flex items-center justify-center">
                  {pkg.name}
                </h4>
                <div className="h-5 mb-3 flex items-center justify-center">
                  {pkg.subtitle && (
                    <p className="text-xs text-[#00FFD1] font-medium px-2">
                      {pkg.subtitle}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {pkg.price}
                  </span>
                  <span className="text-xs md:text-sm text-white/70 ml-1">
                    /{pkg.period}
                  </span>
                </div>
                <div className="h-4">
                  {pkg.setupFee && (
                    <div className="text-xs text-white/50">
                      Setup: {pkg.setupFee}
                    </div>
                  )}
                </div>
                <div className="h-4 mt-1">
                  {pkg.contract && (
                    <div className="text-xs text-white/50">
                      {pkg.contract}
                    </div>
                  )}
                </div>
                <div className="h-4 mt-1">
                  {pkg.volumeDiscount && (
                    <div className="text-xs text-[#FF6EB4] font-medium">
                      Volume discounts available
                    </div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2 md:space-y-2.5 mb-4 md:mb-6 flex-1">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                    <span className="text-white/75 text-xs font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto pt-4 md:pt-6">
                <Button 
                  className="w-full h-10 md:h-11 flex items-center justify-center space-x-2 text-xs md:text-sm font-medium border-none rounded-none transition-all duration-500 transform hover:scale-105 hover:shadow-lg bg-white/10 text-white hover:bg-[#00FFD1] hover:text-black hover:shadow-[#00FFD1]/25"
                  onClick={() => handleChoosePlan(pkg, category)}
                >
                  <span>
                    {pkg.period === 'one-time' ? 'Get Started' : 'Choose Plan'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </GlassBox>
          </ScrollReveal>
        ))}
      </div>

      {/* Category Notes */}
      {packages[0]?.notes && (
        <ScrollReveal delay={0.4}>
          <GlassBox 
            className="mt-6 p-4"
            blur={12}
            opacity={0.1}
            noise={false}
          >
            <p className="text-xs text-white/60 leading-relaxed">
              <strong className="text-white/80">Notes:</strong> {packages[0].notes}
            </p>
          </GlassBox>
        </ScrollReveal>
      )}
    </div>
  </ScrollReveal>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  
  return (
    <section id="pricing" className="relative bg-black py-24 lg:py-32 overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <LiquidEther
          colors={['#00FFD1', '#8E66FF', '#FF6EB4']}
          mouseForce={15}
          cursorSize={80}
          isViscous={true}
          viscous={25}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.4}
          autoResumeDelay={3000}
          autoRampDuration={1.0}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              <span className="text-[#00FFD1]">{pricingData.title}</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto mb-8">
              {pricingData.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <GlassBox 
              className="p-6 max-w-4xl mx-auto"
              blur={16}
              opacity={0.1}
              noise={false}
            >
              <p className="text-sm text-white/70 leading-relaxed">
                {pricingData.introduction}
              </p>
            </GlassBox>
          </ScrollReveal>
        </div>

        {/* Service Categories */}
        <div className="space-y-24">
          <ServiceCategoryCard 
            category="Telemarketing"
            packages={pricingData.telemarketing}
            icon={Phone}
            index={0}
            navigate={navigate}
          />
          
          <ServiceCategoryCard 
            category="Government Contracting Support"
            packages={pricingData.government}
            icon={Building}
            index={1}
            navigate={navigate}
          />
          
          <ServiceCategoryCard 
            category="Social Media Marketing"
            packages={pricingData.socialMedia}
            icon={Share2}
            index={2}
            navigate={navigate}
          />
        </div>

        {/* CTA Section */}
        <ScrollReveal delay={0.8}>
          <div className="text-center mt-20">
            <GlassBox 
              className="p-8 max-w-2xl mx-auto"
              blur={20}
              opacity={0.15}
              noise={true}
              glow={true}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {pricingData.cta.title}
              </h3>
              <p className="text-white/60 mb-6">
                {pricingData.cta.description}
              </p>
              <Button 
                className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 hover:shadow-[#00FFD1]/30 px-8 py-3 text-base font-medium border-none rounded-none transition-all duration-500 transform hover:scale-105"
                onClick={() => navigate('/book-appointment')}
              >
                {pricingData.cta.buttonText}
              </Button>
            </GlassBox>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;