import React from 'react';
import { 
  Briefcase, 
  Users, 
  Phone, 
  TrendingUp, 
  Palette, 
  Code, 
  Mail, 
  MapPin, 
  Clock, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Globe,
  Target
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const Careers = () => {
  const careerHero = {
    title: "Careers at Lead G",
    subtitle: "Join our fast-growing digital marketing agency focused on innovation, growth, and impact"
  };

  const openPositions = [
    {
      title: "Appointment Setter / Cold Caller",
      department: "Sales",
      type: "Remote",
      icon: Phone,
      description: "Responsible for reaching out to prospects, qualifying leads, and setting appointments for the sales team.",
      requirements: [
        "Strong communication skills",
        "Prior cold-calling experience", 
        "CRM familiarity",
        "Results-oriented mindset"
      ]
    },
    {
      title: "Sales Manager",
      department: "Sales",
      type: "Remote", 
      icon: TrendingUp,
      description: "Leads the sales process, builds and mentors the sales team, develops lead generation strategies, and maintains client relationships.",
      requirements: [
        "Proven sales management experience",
        "Strong leadership skills",
        "Strategic thinking ability",
        "Team building expertise"
      ]
    },
    {
      title: "Meta & Google Ads Expert",
      department: "Marketing",
      type: "Remote",
      icon: Target,
      description: "Plans and optimizes paid ad campaigns across Meta (Facebook/Instagram) and Google platforms, focusing on conversion and performance metrics.",
      requirements: [
        "Google Ads certification preferred",
        "Meta Blueprint certification preferred", 
        "Campaign optimization experience",
        "Analytics and reporting skills"
      ]
    },
    {
      title: "Graphic Designer",
      department: "Creative",
      type: "Remote",
      icon: Palette,
      description: "Creates visually compelling designs for digital and print media while maintaining brand consistency.",
      requirements: [
        "Proficiency in Adobe Creative Suite",
        "Strong portfolio required",
        "Brand design experience",
        "Creative problem-solving skills"
      ]
    },
    {
      title: "Web Developer", 
      department: "Technology",
      type: "Remote",
      icon: Code,
      description: "Builds and maintains responsive websites using modern frameworks (React, Angular, etc.) and CMS platforms. Responsible for performance optimization and troubleshooting.",
      requirements: [
        "Modern framework experience (React, Angular)",
        "CMS platform knowledge",
        "Performance optimization skills",
        "Problem-solving abilities"
      ]
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Remote Work Flexibility",
      description: "Work from anywhere with our fully remote-first culture and flexible scheduling."
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Competitive pay with performance-based bonuses to reward your contributions."
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Continuous skill development and career advancement opportunities."
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with a team of innovators and problem-solvers who want to make an impact."
    }
  ];

  const applicationProcess = [
    {
      step: "1",
      title: "Submit Application",
      description: "Send your resume (and portfolio, if applicable) to careers@leadgenerationg.com with the role mentioned in the subject line."
    },
    {
      step: "2", 
      title: "Initial Review",
      description: "Our hiring team reviews your application and qualifications for the position."
    },
    {
      step: "3",
      title: "Interview Process",
      description: "Selected candidates will go through our interview process including technical and cultural fit assessments."
    },
    {
      step: "4",
      title: "Welcome Aboard",
      description: "Join our dynamic team and start making an impact in the digital marketing space."
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-16 md:pt-32 lg:pt-36 relative overflow-hidden">
      {/* Background Elements - Fixed to cover entire viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0A0B1E] via-[#1A1B3E] to-[#0A0B1E] -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none -z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,255,209,0.1),transparent_50%)] pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Hero Section */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {careerHero.title.split(' at ')[0]} <span className="text-[#00FFD1]">at {careerHero.title.split(' at ')[1]}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed mb-8">
              {careerHero.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Company Culture */}
        <ScrollReveal delay={0.3}>
          <GlassBox className="p-8 lg:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Join Lead G?</h2>
            <p className="text-white/70 leading-relaxed text-lg max-w-4xl mx-auto text-center mb-12">
              Lead G is actively hiring for several remote roles to expand its dynamic team. 
              We position ourselves as a hub for innovators and problem-solvers who want to make an impact in the digital marketing space.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <GlassBox key={index} className="p-6 text-center group hover:bg-white/10 transition-all duration-300">
                  <div className="mb-4">
                    <benefit.icon className="w-12 h-12 text-[#00FFD1] mx-auto group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed">{benefit.description}</p>
                </GlassBox>
              ))}
            </div>
          </GlassBox>
        </ScrollReveal>

        {/* Open Positions */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
            <div className="grid gap-8">
              {openPositions.map((position, index) => (
                <GlassBox key={index} className="p-8 group hover:bg-white/5 transition-all duration-300">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-start space-x-4 mb-4">
                        <GlassBox className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0" opacity={0.2}>
                          <position.icon className="w-6 h-6 text-[#00FFD1]" />
                        </GlassBox>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{position.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                            <span className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{position.department}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{position.type}</span>
                            </span>
                          </div>
                          <p className="text-white/70 leading-relaxed mb-6">{position.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Requirements</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center space-x-2 text-white/70">
                            <CheckCircle className="w-4 h-4 text-[#00FFD1] flex-shrink-0" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassBox>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Application Process */}
        <ScrollReveal delay={0.5}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Application Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationProcess.map((step, index) => (
                <GlassBox key={index} className="p-6 text-center relative">
                  <div className="w-12 h-12 bg-[#00FFD1] text-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  {index < applicationProcess.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#00FFD1]" />
                  )}
                </GlassBox>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Application CTA */}
        <ScrollReveal delay={0.6}>
          <GlassBox className="p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Team?</h2>
            <p className="text-white/70 leading-relaxed text-lg max-w-3xl mx-auto mb-8">
              Applications are submitted by sending a resume (and portfolio, if applicable) to{" "}
              <a href="mailto:careers@leadgenerationg.com" className="text-[#00FFD1] hover:text-[#00FFD1]/80 transition-colors">
                careers@leadgenerationg.com
              </a>{" "}
              with the role mentioned in the subject line.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:careers@leadgenerationg.com?subject=Application%20-%20[Position%20Title]"
                className="flex items-center space-x-3 bg-[#00FFD1] text-black px-8 py-4 hover:bg-[#00FFD1]/90 transition-all duration-300 rounded-none text-lg font-medium"
              >
                <Mail className="w-5 h-5" />
                <span>Apply Now</span>
              </a>
              
              <a 
                href="/contact"
                className="flex items-center space-x-3 bg-white/10 text-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 rounded-none text-lg font-medium border border-white/20"
              >
                <Users className="w-5 h-5" />
                <span>Learn More</span>
              </a>
            </div>
          </GlassBox>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Careers;