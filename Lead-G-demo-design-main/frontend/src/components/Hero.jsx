import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { ShinyCard } from './ui/shiny-card';
// import VariableProximity from './VariableProximity'; // Removed for compatibility

const Hero = () => {
  const containerRef = useRef(null);
  
  const handleBookCall = () => {
    // Navigate to contact page or scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/contact';
    }
  };

  const handleBookAppointment = () => {
    // Navigate to appointment booking page
    window.location.href = '/book-appointment';
  };
  
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden flex items-center justify-center pt-20 lg:pt-0">
      {/* Liquid Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#00FFD1', '#FF6EB4', '#8E66FF']}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={40}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.8}
          takeoverDuration={0.5}
          autoResumeDelay={3000}
          autoRampDuration={1.2}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center mt-8 lg:mt-0" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          


          {/* Main Headline with Variable Proximity Effect */}
          <div className="mb-8">
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <span className="text-[#00FFD1]">Expert outbound</span>
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline */}
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Global partner in telemarketing, marketing, and government contracting
            </p>
          </ScrollReveal>

          {/* CTA Buttons - Immediate load */}
          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <Button 
                onClick={handleBookAppointment}
                className="bg-[#00FFD1] text-black border-none rounded-none px-8 py-4 text-lg font-medium hover:bg-[#00FFD1]/90 hover:scale-105 transition-all duration-300 min-h-[56px] flex items-center space-x-3 group cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                onClick={handleBookCall}
                className="bg-white/10 text-white border border-white/20 rounded-none px-8 py-4 text-lg font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 min-h-[56px] flex items-center space-x-3 cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                <span>Book Free Call</span>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;