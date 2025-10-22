import React, { useState, useEffect } from 'react';
import LogoLoop from './LogoLoop';
import ScrollReveal from './ScrollReveal';
import { getWorkedWithCompanies } from '../services/firebaseService';

const WorkedWith = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      console.log('🏢 Fetching worked with companies from Firebase...');
      const result = await getWorkedWithCompanies();
      
      if (result.success) {
        setCompanies(result.data);
        console.log(`✅ Loaded ${result.data.length} companies from Firebase`);
      } else {
        throw new Error(result.error || 'Failed to fetch companies');
      }
    } catch (error) {
      console.error('❌ Error fetching companies:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70">Loading companies...</p>
        </div>
      </section>
    );
  }

  // Show demo data if no companies from API (for design purposes)
  const demoCompanies = [
    {
      id: "demo-1",
      company_name: "Microsoft",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      website_url: "https://www.microsoft.com"
    },
    {
      id: "demo-2", 
      company_name: "Apple",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      website_url: "https://www.apple.com"
    },
    {
      id: "demo-3",
      company_name: "Google",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", 
      website_url: "https://www.google.com"
    },
    {
      id: "demo-4",
      company_name: "Amazon",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      website_url: "https://www.amazon.com"
    },
    {
      id: "demo-5",
      company_name: "Tesla",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
      website_url: "https://www.tesla.com"
    },
    {
      id: "demo-6",
      company_name: "Netflix",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      website_url: "https://www.netflix.com"
    },
    {
      id: "demo-7",
      company_name: "Meta",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      website_url: "https://www.meta.com"
    },
    {
      id: "demo-8",
      company_name: "Salesforce",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      website_url: "https://www.salesforce.com"
    },
    {
      id: "demo-9",
      company_name: "Adobe",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg",
      website_url: "https://www.adobe.com"
    },
    {
      id: "demo-10",
      company_name: "IBM",
      logo_url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      website_url: "https://www.ibm.com"
    }
  ];

  // Use demo data if no companies (regardless of error)
  const displayCompanies = companies.length > 0 ? companies : demoCompanies;

  // Always show demo data if no real companies available
  if (displayCompanies.length === 0) {
    return null;
  }

  // Convert companies data to LogoLoop format
  const logoData = displayCompanies.map(company => {
    // Use logo_url directly from Firebase Storage or external URL
    const logoUrl = company.logo_url || '';

    return {
      src: logoUrl,
      alt: company.company_name,
      title: company.company_name,
      href: company.website_url || undefined
    };
  });

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Section Header - Keep current heading and description */}
        <ScrollReveal>
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Companies We've <span className="text-[#00FFD1]">Worked With</span>
            </h2>
            <p className="text-lg lg:text-xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
              Trusted partnerships with industry-leading brands and innovative companies across diverse sectors
            </p>
          </div>
        </ScrollReveal>

        {/* Simplified Container for Logo Loop */}
        <ScrollReveal delay={0.2}>
          <div className="relative">
            {/* Simple container without background */}
            <div className="relative overflow-hidden py-8 lg:py-12">
              {/* Logo Loop with fade effects and rounded logos */}
              <div className="relative z-10">
                <LogoLoop
                  logos={logoData.map(logo => ({
                    ...logo,
                    className: "rounded-lg" // Add rounded corners to logos
                  }))}
                  speed={80}
                  direction="left"
                  logoHeight={100}
                  gap={64}
                  pauseOnHover={true}
                  scaleOnHover={true}
                  fadeOut={true}
                  fadeOutColor="#000000"
                  ariaLabel="Companies we have worked with"
                  className="worked-with-logos-simple"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WorkedWith;