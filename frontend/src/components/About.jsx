import React from 'react';
import { aboutData, companyInfo, statsData } from '../data/mock';
import { Target, Eye, Award, Globe, Users, Calendar, MapPin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const About = () => {
  const valueIcons = {
    "Results-Driven": Target,
    "Transparency": Eye,
    "Industry Expertise": Award,
    "Global Reach": Globe
  };

  return (
    <section id="about" className="pt-28 pb-20 md:pt-32 lg:pt-36 lg:pb-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,209,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              About <span className="bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent">Lead G</span>
            </h2>
            <p className="text-lg text-white/60 font-medium max-w-3xl mx-auto">
              Empowering businesses worldwide with expert lead generation since 2017
            </p>
          </div>
        </ScrollReveal>

        {/* Company Stats - Redesigned */}
        <ScrollReveal delay={0.2}>
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Proven <span className="text-[#00FFD1]">Results</span>
              </h3>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Numbers that speak for themselves - delivering consistent results across all our services
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {statsData.map((stat, index) => (
                <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                  <GlassBox 
                    className="p-8 text-center group hover:scale-105 transition-all duration-300"
                    blur={20}
                    opacity={0.1}
                    glow={true}
                    shine={true}
                  >
                    <div className="mb-4">
                      <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00FFD1] to-[#7B68EE] bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}{stat.suffix}
                      </div>
                    </div>
                    <div className="text-sm lg:text-base text-white/80 font-semibold leading-tight">
                      {stat.label}
                    </div>
                    
                    {/* Decorative element */}
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#00FFD1] to-transparent mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </GlassBox>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <ScrollReveal delay={0.3}>
            <GlassBox className="p-8">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-[#00FFD1] mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {aboutData.mission}
              </p>
            </GlassBox>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <GlassBox className="p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-[#00FFD1] mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {aboutData.vision}
              </p>
            </GlassBox>
          </ScrollReveal>
        </div>

        {/* Company Story */}
        <ScrollReveal delay={0.5}>
          <GlassBox className="p-8 lg:p-12 mb-20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Our Story</h3>
            <p className="text-white/70 leading-relaxed text-lg max-w-4xl mx-auto text-center">
              {aboutData.story}
            </p>
          </GlassBox>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal delay={0.6}>
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.values.map((value, index) => {
                const IconComponent = valueIcons[value.title];
                return (
                  <GlassBox key={index} className="p-6 text-center group hover:bg-white/10 transition-all duration-300">
                    <div className="mb-4">
                      <IconComponent className="w-12 h-12 text-[#00FFD1] mx-auto group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                    <p className="text-white/60 leading-relaxed">{value.description}</p>
                  </GlassBox>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Team Info */}
        <ScrollReveal delay={0.7}>
          <GlassBox className="p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Our Global Team</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Users className="w-12 h-12 text-[#00FFD1] mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">{aboutData.team.size}</div>
                <div className="text-white/60">Team Members</div>
              </div>
              <div>
                <Calendar className="w-12 h-12 text-[#00FFD1] mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">{aboutData.team.experience}</div>
                <div className="text-white/60">Average Experience</div>
              </div>
              <div>
                <MapPin className="w-12 h-12 text-[#00FFD1] mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">2</div>
                <div className="text-white/60">Global Offices</div>
              </div>
            </div>
          </GlassBox>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;