import React from 'react';
import { Award, Users, GraduationCap, Globe, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const WhyChooseUs = () => {
  const differentiators = [
    {
      icon: Award,
      title: "Proven Experience",
      description: "With more than 7 years in Real Estate, Solar, Government Contracting, and more, we bring industry-tested strategies and a clear understanding of what works.",
      highlight: "7+ Years Experience"
    },
    {
      icon: Users,
      title: "In-House, Ready-to-Go Agents",
      description: "Every agent is hired, trained, and developed by LeadG. They're in-house, not outsourced — meaning they're fully prepared to step into your marketing operations with no delay.",
      highlight: "100% In-House Team"
    },
    {
      icon: GraduationCap,
      title: "Specialized Training",
      description: "Our agents focus on one specific industry, allowing them to build expertise and communicate with depth — not just follow a script.",
      highlight: "Industry-Focused Expertise"
    },
    {
      icon: Globe,
      title: "Global Market Reach",
      description: "From the U.S. and Canada to the U.K. and Dubai, we've successfully navigated diverse markets, giving your campaigns both local insight and global perspective.",
      highlight: "7+ Countries Served"
    }
  ];

  return (
    <section id="why-choose-us" className="py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-4 md:mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">LeadG</span>?
            </h2>
            <p className="text-base md:text-lg text-white/60 font-medium max-w-3xl mx-auto px-4">
              Get qualified outbound leads and targeted digital campaigns that convert — no fluff, just customers.
            </p>
          </div>
        </ScrollReveal>

        {/* Our Unique Advantages */}
        <ScrollReveal delay={0.3}>
          <div className="mb-16 md:mb-20 lg:mb-28 xl:mb-32">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
              Our <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Unique Advantages</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {differentiators.map((item, index) => (
                <GlassBox key={index} className="p-4 md:p-6 text-center group hover:bg-white/10 transition-all duration-300">
                  <div className="mb-3 md:mb-4">
                    <item.icon className="w-10 h-10 md:w-12 md:h-12 text-[#00FFD1] mx-auto group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-xs md:text-sm font-bold text-[#00FFD1] mb-1 md:mb-2">{item.highlight}</div>
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-white/60 leading-relaxed text-xs md:text-sm">{item.description}</p>
                </GlassBox>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Metrics - Redesigned */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-3 md:mb-4">
              Our <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
              Real results from real campaigns - the numbers that define our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-4">
            <ScrollReveal delay={0.3}>
              <GlassBox 
                className="p-4 md:p-6 lg:p-8 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    $50M+
                  </div>
                  <div className="text-sm md:text-base text-white font-semibold mb-1 md:mb-2">
                    Revenue Generated
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    For our clients
                  </div>
                </div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={0.35}>
              <GlassBox 
                className="p-4 md:p-6 lg:p-8 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    28%
                  </div>
                  <div className="text-sm md:text-base text-white font-semibold mb-1 md:mb-2">
                    Average Conversion
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Industry-leading rates
                  </div>
                </div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <GlassBox 
                className="p-4 md:p-6 lg:p-8 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    2.5x
                  </div>
                  <div className="text-sm md:text-base text-white font-semibold mb-1 md:mb-2">
                    ROI Increased
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Average client growth
                  </div>
                </div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <GlassBox 
                className="p-4 md:p-6 lg:p-8 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    7+
                  </div>
                  <div className="text-sm md:text-base text-white font-semibold mb-1 md:mb-2">
                    Global Markets
                  </div>
                  <div className="text-xs md:text-sm text-white/60">
                    Countries Served
                  </div>
                </div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <GlassBox 
                className="p-4 md:p-6 lg:p-8 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  {/* 5 Stars replacing the main number */}
                  <div className="flex items-center justify-center gap-1 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">★</span>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <div className="text-sm md:text-base text-white font-semibold mb-1 md:mb-2">
                    100% Client Satisfaction
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs md:text-sm text-white/60">
                    5-star rated service
                  </div>
                </div>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyChooseUs;