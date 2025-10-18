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
  const preWarmTimeRef = useRef(null);

  // Pre-warm the animation by simulating mouse movement
  useEffect(() => {
    const preWarmAnimation = () => {
      // Wait for the component to mount and LiquidEther to initialize
      setTimeout(() => {
        console.log('🔥 Starting LiquidEther pre-warming...');
        
        // Create artificial mouse movement for 2 seconds to build up fluid motion
        let frameCount = 0;
        const totalFrames = 120; // ~2 seconds at 60fps
        
        const preWarmLoop = () => {
          if (frameCount < totalFrames) {
            // Simulate complex mouse movement patterns
            const time = frameCount * 0.05;
            const x = Math.sin(time * 2) * 0.4 + Math.sin(time * 3.7) * 0.2;
            const y = Math.cos(time * 1.8) * 0.3 + Math.cos(time * 2.9) * 0.25;
            
            // Create synthetic mouse events to trigger fluid motion
            const syntheticEvent = {
              clientX: (window.innerWidth * 0.5) + (x * window.innerWidth * 0.3),
              clientY: (window.innerHeight * 0.5) + (y * window.innerHeight * 0.3)
            };
            
            // Dispatch the event to trigger fluid animation
            if (liquidEtherRef.current) {
              const rect = liquidEtherRef.current.getBoundingClientRect();
              const mouseEvent = new MouseEvent('mousemove', {
                clientX: syntheticEvent.clientX,
                clientY: syntheticEvent.clientY,
                bubbles: true
              });
              liquidEtherRef.current.dispatchEvent(mouseEvent);
            }
            
            frameCount++;
            requestAnimationFrame(preWarmLoop);
          } else {
            console.log('✅ LiquidEther pre-warming complete!');
            setIsAnimationReady(true);
          }
        };
        
        requestAnimationFrame(preWarmLoop);
      }, 100); // Small delay to ensure LiquidEther is mounted
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
      {/* Pre-Warmed Liquid Background */}
      <div className="absolute inset-0 z-0" ref={liquidEtherRef}>
        <div 
          className={`transition-opacity duration-1000 ${isAnimationReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: '100%' }}
        >
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
            autoSpeed={0.3} // Slightly faster for more dynamic start
            autoIntensity={2.2} // Higher intensity for more motion
            takeoverDuration={0.5}
            autoResumeDelay={2000} // Shorter delay before auto-resume
            autoRampDuration={0.8} // Faster ramp-up
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Fallback gradient while pre-warming */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${isAnimationReady ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'radial-gradient(circle at 30% 60%, rgba(0, 255, 209, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 110, 180, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(142, 102, 255, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Loading indicator during pre-warming */}
      {!isAnimationReady && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
          <div className="flex items-center space-x-2 text-white/60">
            <div className="w-2 h-2 bg-[#00FFD1] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#FF6EB4] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#8E66FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

      {/* Centered Content Container */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-6 lg:px-16 text-center mt-8 lg:mt-0" style={{ position: 'relative' }}>
        <div className="max-w-4xl mx-auto">
          
          {/* Main Headline - Only show after pre-warming */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnimationReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight text-white">
                Turn conversations into customers
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[0.9] tracking-tight mt-2">
                <span className="text-[#00FFD1]">Expert outbound</span>
                <span className="text-white"> that scales</span>
              </h1>
            </ScrollReveal>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnimationReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ScrollReveal delay={0.3}>
              <p className="text-lg text-white/75 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                Global partner in telemarketing, marketing, and government contracting
              </p>
            </ScrollReveal>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnimationReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ScrollReveal delay={0.4}>
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
          </motion.div>
        </div>
      </div>

      {/* Development indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 z-20 bg-black/70 text-white text-xs p-2 rounded">
          Animation: {isAnimationReady ? '✅ Ready' : '🔄 Pre-warming...'}
        </div>
      )}
    </section>
  );
};

export default Hero;