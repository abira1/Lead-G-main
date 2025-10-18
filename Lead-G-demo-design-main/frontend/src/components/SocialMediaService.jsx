import React from 'react';
import { Share2, TrendingUp, Users, CheckCircle, ArrowRight, Star, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const SocialMediaService = () => {
  const features = [
    "Content creation & strategy",
    "Paid advertising campaigns",
    "Community management", 
    "Analytics & reporting",
    "Lead generation funnels",
    "Brand positioning"
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Growth",
      description: "Average 250% increase in engagement and consistent lead generation across all major platforms."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "We build engaged communities around your brand that convert followers into customers."
    },
    {
      icon: Eye,
      title: "Brand Visibility",
      description: "Amplify your brand presence with strategic content that reaches your ideal audience."
    }
  ];

  const platforms = [
    { name: "LinkedIn", description: "B2B lead generation and professional networking", icon: "💼" },
    { name: "Facebook", description: "Community building and targeted advertising", icon: "📘" },
    { name: "Instagram", description: "Visual storytelling and brand awareness", icon: "📷" },
    { name: "Twitter/X", description: "Thought leadership and real-time engagement", icon: "🐦" },
    { name: "YouTube", description: "Video content and educational marketing", icon: "📺" },
    { name: "TikTok", description: "Viral content and younger demographic reach", icon: "🎵" }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Strategy Development",
      description: "We analyze your brand, audience, and competitors to create a comprehensive social media strategy."
    },
    {
      step: "02", 
      title: "Content Creation",
      description: "Our creative team produces engaging content that resonates with your target audience."
    },
    {
      step: "03",
      title: "Campaign Execution",
      description: "We launch and manage your social media campaigns across all relevant platforms."
    },
    {
      step: "04",
      title: "Optimization & Reporting",
      description: "Continuous monitoring, optimization, and detailed reporting on performance and ROI."
    }
  ];

  const contentTypes = [
    { type: "Educational Posts", description: "Establish thought leadership" },
    { type: "Behind-the-Scenes", description: "Build authentic connections" },
    { type: "User-Generated Content", description: "Leverage social proof" },
    { type: "Video Content", description: "Maximize engagement rates" },
    { type: "Interactive Content", description: "Boost community engagement" },
    { type: "Lead Magnets", description: "Convert followers to leads" }
  ];

  const testimonial = {
    quote: "Lead G transformed our social media presence. We went from 500 to 15,000 engaged followers and generate 50+ leads monthly from social media alone.",
    author: "Jennifer Martinez",
    company: "GreenTech Solutions",
    role: "Marketing Director"
  };

  const handleBookConsultation = () => {
    window.location.href = '/book-appointment';
  };

  const handleGetPricing = () => {
    window.location.href = '/pricing#social-media';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-black pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('https://customer-assets.emergentagent.com/job_google-auth-debug-1/artifacts/e9hsgdqv_Social%20Media%20Marketing.png')"
          }}
        ></div>
        
        <div className="container mx-auto px-6 lg:px-16 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Hero Content */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="flex items-center space-x-3 mb-6">
                  <GlassBox className="w-12 h-12 bg-[#00FFD1]/20 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-[#00FFD1]" />
                  </GlassBox>
                  <span className="text-[#00FFD1] font-semibold text-lg">Social Media Marketing</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Amplify Your Brand with <span className="text-[#00FFD1]">Strategic Social Media</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Transform your social media presence into a powerful lead generation engine. 
                  Our strategic approach delivers an average 250% increase in engagement.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleBookConsultation}
                    className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                  >
                    <span>Get Social Media Audit</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  <Button 
                    onClick={handleGetPricing}
                    className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-none border border-white/30 backdrop-blur-sm"
                  >
                    View Packages
                  </Button>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Hero Visual */}
            <div>
              <ScrollReveal delay={0.6}>
                <GlassBox 
                  className="p-8 lg:p-12"
                  blur={20}
                  opacity={0.1}
                  glow={true}
                  shine={true}
                >
                  <div className="text-center">
                    <div className="mb-8">
                      <Share2 className="w-20 h-20 text-[#00FFD1] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Social Success</h3>
                      <p className="text-white/70">Join brands achieving viral growth and consistent leads</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold text-[#00FFD1]">250%</div>
                        <div className="text-sm text-white/70">Avg. Engagement Boost</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[#00FFD1]">50+</div>
                        <div className="text-sm text-white/70">Leads Per Month</div>
                      </div>
                    </div>
                  </div>
                </GlassBox>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Multi-Platform <span className="text-[#00FFD1]">Expertise</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We create tailored strategies for each platform to maximize your reach and engagement
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {platforms.map((platform, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="p-6 text-center h-full"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                  glow={true}
                >
                  <div className="text-4xl mb-4">{platform.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{platform.name}</h3>
                  <p className="text-white/70 text-sm">{platform.description}</p>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Engaging <span className="text-[#00FFD1]">Content Types</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Diverse content formats to keep your audience engaged and coming back for more
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {contentTypes.map((content, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="p-6 flex items-center space-x-4"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                >
                  <Heart className="w-6 h-6 text-[#00FFD1] flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{content.type}</h3>
                    <p className="text-white/70 text-sm">{content.description}</p>
                  </div>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Complete <span className="text-[#00FFD1]">Social Media</span> Solution
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Everything you need to build a powerful social media presence that drives results
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={0.1 * (index + 1)}>
                <GlassBox 
                  className="p-6 flex items-center space-x-4"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                >
                  <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose Our <span className="text-[#00FFD1]">Social Media</span> Team
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <ScrollReveal key={index} delay={0.2 * (index + 1)}>
                  <GlassBox 
                    className="p-8 text-center h-full"
                    blur={16}
                    opacity={0.1}
                    hover={true}
                    glow={true}
                  >
                    <div className="mb-6">
                      <GlassBox className="w-16 h-16 mx-auto bg-[#00FFD1]/20 flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-[#00FFD1]" />
                      </GlassBox>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-white/70 leading-relaxed">{benefit.description}</p>
                  </GlassBox>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Strategic <span className="text-[#00FFD1]">Approach</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A data-driven process that turns social media into your best performing sales channel
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={index} delay={0.2 * (index + 1)}>
                <GlassBox 
                  className="p-6 text-center h-full"
                  blur={16}
                  opacity={0.1}
                  hover={true}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-[#00FFD1] text-black rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
                </GlassBox>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <GlassBox 
              className="p-8 lg:p-12 text-center max-w-4xl mx-auto"
              blur={20}
              opacity={0.1}
              glow={true}
              shine={true}
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#00FFD1] fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl text-white font-light mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="text-[#00FFD1] font-semibold text-lg">{testimonial.author}</div>
                <div className="text-white/70">{testimonial.role}, {testimonial.company}</div>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="bg-black py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-16">
          <ScrollReveal delay={0.2}>
            <GlassBox 
              className="p-8 lg:p-12 text-center"
              blur={20}
              opacity={0.1}
              glow={true}
              shine={true}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Go <span className="text-[#00FFD1]">Viral?</span>
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Starting at $1,999/month. Custom packages available for enterprise clients and multi-platform campaigns.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleBookConsultation}
                  className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none flex items-center space-x-2"
                >
                  <span>Get Free Social Audit</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-none border border-white/20"
                >
                  View Case Studies
                </Button>
              </div>
            </GlassBox>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaService;