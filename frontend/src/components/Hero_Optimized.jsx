import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/mock';
import { Button } from './ui/button';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import LiquidEther from './LiquidEther';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';
import { ShinyCard } from './ui/shiny-card';

const Hero = () => {
  const containerRef = useRef(null);
  const [devicePerformance, setDevicePerformance] = useState('high');

  // Performance detection hook
  useEffect(() => {
    const detectPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSlowDevice = navigator.hardwareConcurrency < 4;
      const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      
      if (isMobile || isSlowDevice || isLowMemory) {
        setDevicePerformance('low');
      } else if (navigator.hardwareConcurrency < 8) {
        setDevicePerformance('medium');
      } else {
        setDevicePerformance('high');
      }
    };

    detectPerformance();
  }, []);

  // Dynamic performance parameters based on device capability
  const getOptimizedParams = () => {
    switch (devicePerformance) {
      case 'low':
        return {
          resolution: 0.25,
          iterationsPoisson: 8,
          iterationsViscous: 8,
          mouseForce: 10,
          cursorSize: 60,
          autoSpeed: 0.1,
          autoIntensity: 1.2,
        };
      case 'medium':
        return {
          resolution: 0.3,
          iterationsPoisson: 12,
          iterationsViscous: 12,
          mouseForce: 12,
          cursorSize: 70,
          autoSpeed: 0.15,
          autoIntensity: 1.5,
        };
      default: // 'high'
        return {
          resolution: 0.35, // Reduced from 0.4
          iterationsPoisson: 16, // Reduced from 32
          iterationsViscous: 16, // Reduced from 32
          mouseForce: 15,
          cursorSize: 80,
          autoSpeed: 0.2,
          autoIntensity: 1.8,
        };
    }
  };

  const params = getOptimizedParams();
  
  const handleBookCall = () => {
    // Navigate to appointment booking page
    window.location.href = '/book-appointment';
  };

  const handleBookAppointment = () => {
    window.location.href = '/book-appointment';
  };
  
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden flex items-center justify-center pt-20 lg:pt-0">
      {/* Optimized Liquid Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#00FFD1', '#FF6EB4', '#8E66FF']}
          mouseForce={params.mouseForce}
          cursorSize={params.cursorSize}
          isViscous={false} // Keep disabled for performance
          viscous={40}
          iterationsViscous={params.iterationsViscous}
          iterationsPoisson={params.iterationsPoisson}
          resolution={params.resolution}
          dt={0.016} // Slightly increased for stability
          BFECC={devicePerformance === 'high'} // Disable on lower-end devices
          isBounce={false}
          autoDemo={true}
          autoSpeed={params.autoSpeed}
          autoIntensity={params.autoIntensity}
          takeoverDuration={0.5}
          autoResumeDelay={3000}
          autoRampDuration={1.2}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Performance Indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-24 right-4 z-20 bg-black/50 text-white text-xs p-2 rounded">
          Performance: {devicePerformance} | Res: {params.resolution} | Iter: {params.iterationsPoisson}
        </div>
      )}

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center mt-8 lg:mt-0" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          
          {/* Main Headline with Performance-Optimized ScrollReveal */}
          <div className="mb-8">
            <ScrollReveal delay={0.1} duration={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2} duration={0.4}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <span className="text-[#00FFD1]">Expert outbound</span>
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline */}
          <ScrollReveal delay={0.3} duration={0.4}>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Telemarketing & digital marketing for service businesses & government contractors
            </p>
          </ScrollReveal>

          {/* CTA Buttons - Faster Animation */}
          <ScrollReveal delay={0.4} duration={0.4}>
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