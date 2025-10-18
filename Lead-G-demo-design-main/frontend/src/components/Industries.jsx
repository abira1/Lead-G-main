import React from 'react';
import { industriesData } from '../data/mock';
import { TrendingUp, Home, Zap, Building2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const industryIcons = {
  "Real Estate": Home,
  "Hard Money Lending": TrendingUp,
  "Solar Energy": Zap,
  "Government Contracting": Building2
};

const Industries = () => {
  return (
    <section id="industries" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Industries we <span className="text-[#00FFD1]">dominate</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {industriesData.map((industry, index) => {
            const IconComponent = industryIcons[industry.name];
            
            return (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="group p-6 cursor-pointer"
                  hover={true}
                  hoverScale={1.08}
                  glow={true}
                >
                  
                  {/* Industry Icon */}
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-[#00FFD1]/20 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-[#00FFD1]/30 transition-all duration-400">
                      <IconComponent className="w-6 h-6 text-[#00FFD1]" />
                    </div>
                  </div>

                  {/* Industry Content */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {industry.name}
                  </h3>
                  
                  <div className="text-sm text-[#00FFD1] font-bold">
                    {industry.metrics}
                  </div>
                </GlassBox>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Success Metrics */}
        <ScrollReveal delay={0.6}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <GlassBox 
              className="p-6 group cursor-pointer animate-float"
              hover={true}
              hoverScale={1.1}
              glow={true}
              style={{ animationDelay: `${0 * 0.2}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">250%</div>
              <div className="text-sm text-white/60 font-medium">Avg. Growth</div>
            </GlassBox>
            <GlassBox 
              className="p-6 group cursor-pointer animate-float"
              hover={true}
              hoverScale={1.1}
              glow={true}
              style={{ animationDelay: `${1 * 0.2}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">500+</div>
              <div className="text-sm text-white/60 font-medium">Active Clients</div>
            </GlassBox>
            <GlassBox 
              className="p-6 group cursor-pointer animate-float"
              hover={true}
              hoverScale={1.1}
              glow={true}
              style={{ animationDelay: `${2 * 0.2}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">28%</div>
              <div className="text-sm text-white/60 font-medium">Conversion</div>
            </GlassBox>
            <GlassBox 
              className="p-6 group cursor-pointer animate-float"
              hover={true}
              hoverScale={1.1}
              glow={true}
              style={{ animationDelay: `${3 * 0.2}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-[#00FFD1] mb-2">$50M+</div>
              <div className="text-sm text-white/60 font-medium">Generated</div>
            </GlassBox>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Industries;