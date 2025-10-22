import React, { useRef, useState, useEffect } from 'react';
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
  const liquidEtherRef = useRef(null);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // Instant animation start with background pre-warming
  useEffect(() => {
    // Show animation immediately
    setIsAnimationReady(true);
    
    const instantPreWarm = () => {
      console.log('⚡ Starting INSTANT LiquidEther animation with background pre-warming...');
      
      let frameCount = 0;
      const totalFrames = 45; // Shorter pre-warm for faster start
      
      const preWarmLoop = () => {
        if (frameCount < totalFrames && liquidEtherRef.current) {
          // Visible movement patterns for immediate fluid activation
          const time = frameCount * 0.12; // Slightly faster progression for visibility
          
          // Extended overlapping patterns for larger visual coverage
          const pattern1 = {
            x: Math.sin(time * 1.5) * 0.6,
            y: Math.cos(time * 1.3) * 0.55
          };
          const pattern2 = {
            x: Math.sin(time * 2.2 + Math.PI/3) * 0.45,
            y: Math.cos(time * 2.0 + Math.PI/4) * 0.5
          };
          const pattern3 = {
            x: Math.sin(time * 2.8 + Math.PI/2) * 0.35,
            y: Math.cos(time * 2.5 + Math.PI/6) * 0.4
          };
          
          const rect = liquidEtherRef.current.getBoundingClientRect();
          const centerX = rect.width * 0.5;
          const centerY = rect.height * 0.5;
          
          // More events across larger screen area for extended visual impact
          for (let i = 0; i < 5; i++) {
            const spiral = i * 0.3;
            const finalX = (pattern1.x + pattern2.x + pattern3.x + spiral) * rect.width * 0.6;
            const finalY = (pattern1.y + pattern2.y + pattern3.y + spiral) * rect.height * 0.6;
            
            // Create multiple event types for more force
            const mouseMove = new MouseEvent('mousemove', {
              clientX: rect.left + centerX + finalX,
              clientY: rect.top + centerY + finalY,
              bubbles: true
            });
            liquidEtherRef.current.dispatchEvent(mouseMove);
            
            // Synthetic touch events removed to prevent TouchEvent construction errors
            // The mousemove events above are sufficient for animation pre-warming
          }
          
          frameCount++;
          requestAnimationFrame(preWarmLoop);
        } else {
          console.log('✨ Visible fluid animation activated - ready for client interaction!');
        }
      };
      
      // Start IMMEDIATELY with no delays whatsoever!
      requestAnimationFrame(preWarmLoop);
    };

    // Execute immediately when component mounts
    instantPreWarm();
  }, []);
  
  const handleBookCall = () => {
    // Navigate to appointment booking page
    window.location.href = '/book-appointment';
  };

  const handleBookAppointment = () => {
    // Navigate to appointment booking page
    window.location.href = '/book-appointment';
  };
  
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden flex items-center justify-center pt-20 lg:pt-0">
      {/* Instant Motion Liquid Background */}
      <div className="absolute inset-0 z-0" ref={liquidEtherRef}>
        <LiquidEther
          colors={['#00FFD1', '#FF6EB4', '#8E66FF']}
          mouseForce={22} // Larger force for bigger visual impact
          cursorSize={150} // Much larger cursor size for extended effects
          isViscous={false}
          viscous={40}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.12} // Slower but still clearly visible
          autoIntensity={2.5} // Higher intensity for extended visual size
          takeoverDuration={0.3} // Faster initial response
          autoResumeDelay={800} // Shorter delay so animation is more continuous
          autoRampDuration={0.5} // Quicker start for immediate visibility
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center mt-8 lg:mt-0" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          


          {/* Main Headline - Instant Display */}
          <div className="mb-8">
            <ScrollReveal delay={0.0}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <span className="text-[#00FFD1]">Expert outbound</span>
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline - Instant Display */}
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Telemarketing & digital marketing for service businesses & government contractors
            </p>
          </ScrollReveal>

          {/* CTA Buttons - Instant Display */}
          <ScrollReveal delay={0.2}>
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