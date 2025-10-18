import React from 'react';
import { Award, Users, GraduationCap, Globe, CheckCircle, Star, TrendingUp, Shield } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const WhyChooseUs = () => {
  const differentiators = [
    {
      icon: Award,
      title: "Proven Experience",
      description: "With more than 7 years in Real Estate, Government Contracting, Solar, and Hard Money Lending, we bring industry-tested strategies and a clear understanding of what works.",
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
      highlight: "4+ Countries Served"
    }
  ];

  const mainServices = [
    {
      icon: Shield,
      title: "Government Contracting",
      description: "Specialized in federal, state, and local contract opportunities with proven success in securing $50M+ in contracts.",
      features: ["Federal Contracting", "State & Local Opportunities", "Compliance Expertise", "Winning Proposals"]
    },
    {
      icon: Star,
      title: "Telemarketing Excellence", 
      description: "Professional outbound calling campaigns with 28% average conversion rate across multiple industries.",
      features: ["B2B Lead Generation", "Appointment Setting", "Lead Qualification", "CRM Integration"]
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,209,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">LeadG</span>?
            </h2>
            <p className="text-lg text-white/60 font-medium max-w-3xl mx-auto">
              Industry-tested expertise meets professional excellence across telemarketing and government contracting
            </p>
          </div>
        </ScrollReveal>

        {/* Main Services Highlight */}
        <ScrollReveal delay={0.2}>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {mainServices.map((service, index) => (
              <GlassBox key={index} className="p-8 lg:p-12 group hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-[#00FFD1]/20 rounded-none flex items-center justify-center mr-4 group-hover:bg-[#00FFD1]/30 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-[#00FFD1] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed text-lg mb-6">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </GlassBox>
            ))}
          </div>
        </ScrollReveal>

        {/* Key Differentiators */}
        <ScrollReveal delay={0.3}>
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Our Unique Advantages</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((item, index) => (
                <GlassBox key={index} className="p-6 text-center group hover:bg-white/10 transition-all duration-300">
                  <div className="mb-4">
                    <item.icon className="w-12 h-12 text-[#00FFD1] mx-auto group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-sm font-bold text-[#00FFD1] mb-2">{item.highlight}</div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-white/60 leading-relaxed text-sm">{item.description}</p>
                </GlassBox>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Success Metrics - Redesigned */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Impact</span>
            </h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real results from real campaigns - the numbers that define our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ScrollReveal delay={0.5}>
              <GlassBox 
                className="p-8 lg:p-10 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    $50M+
                  </div>
                  <div className="text-base lg:text-lg text-white font-semibold mb-2">
                    Government Contracts
                  </div>
                  <div className="text-sm text-white/60">
                    Secured for our clients
                  </div>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <GlassBox 
                className="p-8 lg:p-10 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    28%
                  </div>
                  <div className="text-base lg:text-lg text-white font-semibold mb-2">
                    Average Conversion
                  </div>
                  <div className="text-sm text-white/60">
                    Industry-leading rates
                  </div>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
            
            <ScrollReveal delay={0.7}>
              <GlassBox 
                className="p-8 lg:p-10 text-center group hover:scale-105 transition-all duration-300"
                blur={20}
                opacity={0.1}
                glow={true}
                shine={true}
              >
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    4+
                  </div>
                  <div className="text-base lg:text-lg text-white font-semibold mb-2">
                    Global Markets
                  </div>
                  <div className="text-sm text-white/60">
                    Countries successfully served
                  </div>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </GlassBox>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyChooseUs;