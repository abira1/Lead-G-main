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
  const liquidEtherRef = useRef(null);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // Enhanced pre-warming with more aggressive motion patterns
  useEffect(() => {
    const preWarmAnimation = () => {
      console.log('🚀 Starting INSTANT MOTION LiquidEther pre-warming...');
      
      let frameCount = 0;
      const totalFrames = 150; // Longer pre-warm for more motion buildup
      let mousePositions = [];
      
      // Generate a series of complex movement patterns
      for (let i = 0; i < totalFrames; i++) {
        const time = i * 0.05;
        
        // Create multiple movement patterns that overlap
        const pattern1 = {
          x: Math.sin(time * 1.5) * 0.4,
          y: Math.cos(time * 1.2) * 0.3
        };
        
        const pattern2 = {
          x: Math.sin(time * 2.8 + Math.PI/3) * 0.25,
          y: Math.cos(time * 2.3 + Math.PI/4) * 0.35
        };
        
        const pattern3 = {
          x: Math.sin(time * 4.1 + Math.PI/2) * 0.15,
          y: Math.cos(time * 3.7 + Math.PI/6) * 0.2
        };
        
        // Spiral motion for more complex fluid patterns
        const spiral = {
          x: Math.sin(time * 0.8) * (0.3 + Math.sin(time * 0.3) * 0.1),
          y: Math.cos(time * 0.8) * (0.3 + Math.sin(time * 0.3) * 0.1)
        };
        
        mousePositions.push({
          x: pattern1.x + pattern2.x + pattern3.x + spiral.x,
          y: pattern1.y + pattern2.y + pattern3.y + spiral.y
        });
      }
      
      const preWarmLoop = () => {
        if (frameCount < totalFrames && liquidEtherRef.current) {
          const rect = liquidEtherRef.current.getBoundingClientRect();
          const pos = mousePositions[frameCount];
          
          const centerX = rect.width * 0.5;
          const centerY = rect.height * 0.5;
          
          // Create synthetic mouse movement with more intensity
          const mouseEvent = new MouseEvent('mousemove', {
            clientX: rect.left + centerX + (pos.x * rect.width * 0.35),
            clientY: rect.top + centerY + (pos.y * rect.height * 0.35),
            bubbles: true
          });
          
          liquidEtherRef.current.dispatchEvent(mouseEvent);
          
          // Also simulate some "mouse down" events for more force injection
          if (frameCount % 20 === 0) {
            const mouseDownEvent = new MouseEvent('mousedown', {
              clientX: rect.left + centerX + (pos.x * rect.width * 0.35),
              clientY: rect.top + centerY + (pos.y * rect.height * 0.35),
              bubbles: true
            });
            liquidEtherRef.current.dispatchEvent(mouseDownEvent);
            
            setTimeout(() => {
              const mouseUpEvent = new MouseEvent('mouseup', {
                bubbles: true
              });
              liquidEtherRef.current.dispatchEvent(mouseUpEvent);
            }, 50);
          }
          
          frameCount++;
          requestAnimationFrame(preWarmLoop);
        } else {
          console.log('✅ INSTANT MOTION pre-warming complete - maximum fluid dynamics ready!');
          setIsAnimationReady(true);
        }
      };
      
      // Start pre-warming immediately
      setTimeout(() => {
        requestAnimationFrame(preWarmLoop);
      }, 50);
    };

    preWarmAnimation();
  }, []);
  
  const handleBookCall = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/contact';
    }
  };

  const handleBookAppointment = () => {
    window.location.href = '/book-appointment';
  };
  
  return (
    <section id="home" className="relative h-screen bg-black overflow-hidden flex items-center justify-center pt-20 lg:pt-0">
      {/* Maximum Dynamic Liquid Background */}
      <div className="absolute inset-0 z-0" ref={liquidEtherRef}>
        <LiquidEther
          colors={['#00FFD1', '#FF6EB4', '#8E66FF']}
          mouseForce={20} // Increased for more dramatic effect
          cursorSize={100} // Larger cursor for more influence
          isViscous={false}
          viscous={40}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3} // Faster auto animation
          autoIntensity={2.5} // Maximum intensity for constant motion
          takeoverDuration={0.3} // Very fast transitions
          autoResumeDelay={1500} // Quick resume for continuous motion
          autoRampDuration={0.5} // Immediate ramp-up
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center mt-8 lg:mt-0" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          
          {/* Main Headline */}
          <div className="mb-8">
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight mt-2">
                <span className="text-[#00FFD1]">Telemarketing & digital marketing</span>
                <span className="text-white"> for service businesses & government contractors</span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Tagline */}
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
              Get qualified outbound leads and targeted digital campaigns that convert — no fluff, just customers.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
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

      {/* Enhanced Development indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-20 bg-black/80 text-white text-xs p-3 rounded border border-[#00FFD1]/30">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAnimationReady ? 'bg-[#00FFD1]' : 'bg-orange-500 animate-pulse'}`}></div>
            <span>Motion: {isAnimationReady ? '🚀 INSTANT READY' : '⚡ Pre-warming...'}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;