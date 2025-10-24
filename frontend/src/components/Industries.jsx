import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleIndustryClick = (industryName) => {
    // Navigate to industries page with the selected industry as URL parameter
    navigate(`/industries?industry=${encodeURIComponent(industryName)}`);
  };

  return (
    <section id="industries" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Industries we <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">dominate</span>
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
                  className="group p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 h-full"
                  glow={true}
                  onClick={() => handleIndustryClick(industry.name)}
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

        {/* Metrics section removed as requested */}
      </div>
    </section>
  );
};

export default Industries;