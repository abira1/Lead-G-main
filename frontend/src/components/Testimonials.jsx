import React, { useState, useEffect } from 'react';
import { TestimonialCard } from './ui/testimonial-cards';
import ScrollReveal from './ScrollReveal';
import { getTestimonials } from '../services/firebaseService';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [positions, setPositions] = useState(["front", "middle", "back"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      console.log('💬 Fetching testimonials from Firebase...');
      const result = await getTestimonials();
      
      if (result.success) {
        setTestimonials(result.data);
        console.log(`✅ Loaded ${result.data.length} testimonials from Firebase`);
      } else {
        throw new Error(result.error || 'Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('❌ Error fetching testimonials:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop());
    setPositions(newPositions);
    
    // Move to next testimonial in the loop
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayData.length);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  // Show demo data if no testimonials from API (for design purposes)
  const demoTestimonials = [
    {
      id: "demo-1",
      client_name: "Sarah Johnson",
      company_name: "TechStart Inc.",
      position: "CEO & Founder",
      testimonial_text: "LeadG transformed our lead generation completely. Within 3 months, we saw a 250% increase in qualified leads. Their telemarketing team is professional and truly understands our industry.",
      rating: 5,
      logo_url: "https://logo.clearbit.com/techstars.com",
      featured: true
    },
    {
      id: "demo-2",
      client_name: "Michael Rodriguez",
      company_name: "GreenEnergy Solutions",
      position: "VP of Sales",
      testimonial_text: "The government contracting expertise LeadG provided was exceptional. They helped us secure $2.5M in federal contracts. Their team knows the ins and outs of the procurement process.",
      rating: 5,
      logo_url: "https://logo.clearbit.com/greenenergysolutions.com",
      featured: true
    },
    {
      id: "demo-3",
      client_name: "Emily Chen",
      company_name: "PropertyMax Realty",
      position: "Director of Marketing",
      testimonial_text: "Our real estate leads increased by 180% after partnering with LeadG. Their social media marketing and targeted telemarketing campaigns generated high-quality prospects consistently.",
      rating: 5,
      logo_url: "https://logo.clearbit.com/remax.com",
      featured: true
    },
    {
      id: "demo-4",
      client_name: "David Thompson",
      company_name: "FinanceFirst Capital",
      position: "Managing Partner",
      testimonial_text: "LeadG's hard money lending lead generation service is outstanding. They understand our target market and consistently deliver qualified borrowers. ROI has been phenomenal.",
      rating: 5,
      logo_url: "https://logo.clearbit.com/capitalfirst.com",
      featured: true
    },
    {
      id: "demo-5",
      client_name: "Lisa Martinez",
      company_name: "SolarTech Innovations",
      position: "Business Development Manager",
      testimonial_text: "Working with LeadG has been a game-changer for our solar installation business. Their appointment setting service book 40+ qualified meetings monthly. Highly recommended!",
      rating: 5,
      logo_url: "https://logo.clearbit.com/solarcity.com",
      featured: true
    }
  ];

  // Use demo data if no testimonials (regardless of error)
  const displayData = testimonials.length > 0 ? testimonials : demoTestimonials;

  // Always show demo data if no real testimonials available
  if (displayData.length === 0) {
    return null;
  }

  // Get 3 testimonials starting from currentIndex, loop around if needed
  const getDisplayTestimonials = () => {
    if (displayData.length < 3) {
      return displayData;
    }
    
    const displayTestimonials = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % displayData.length;
      displayTestimonials.push(displayData[index]);
    }
    return displayTestimonials;
  };
  
  const displayTestimonials = getDisplayTestimonials();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001a1a] to-black opacity-50" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Client <span className="text-[#00FFD1]">Testimonials</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
              Hear what our satisfied clients have to say about our exceptional results
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial Cards */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center items-center min-h-[400px] sm:min-h-[500px]">
            {displayTestimonials.length >= 3 ? (
              <div className="relative w-[280px] h-[380px] -ml-[60px] sm:w-[320px] sm:h-[420px] sm:-ml-[80px] md:w-[350px] md:h-[450px] md:-ml-[100px] lg:-ml-[175px]">
                {displayTestimonials.map((testimonial, index) => {
                  // Check if logo_url is already a full URL or relative path
                  const logoUrl = testimonial.logo_url.startsWith('http') 
                    ? testimonial.logo_url 
                    : `${process.env.REACT_APP_BACKEND_URL}${testimonial.logo_url}`;
                  
                  return (
                    <TestimonialCard
                      key={testimonial.id}
                      id={testimonial.id}
                      testimonial={testimonial.testimonial}
                      author={testimonial.author}
                      companyName={testimonial.company_name}
                      companyLogo={logoUrl}
                      handleShuffle={handleShuffle}
                      position={positions[index]}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-white/70">
                <p>Not enough testimonials to display the card shuffle animation.</p>
                <p className="text-sm mt-2">Add at least 3 testimonials from the admin panel.</p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Instruction text */}
        {displayTestimonials.length >= 3 && (
          <ScrollReveal delay={0.4}>
            <div className="text-center mt-8">
              <p className="text-white/50 text-sm">
                <span className="hidden sm:inline">Drag the front card to see more testimonials</span>
                <span className="sm:hidden">Swipe or tap the front card to see more testimonials</span>
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
