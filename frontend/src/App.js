import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Industries from "./components/Industries";
import IndustriesPage from "./components/IndustriesPage";
import Pricing from "./components/Pricing";
import PricingPage from "./components/PricingPage";
import CaseStudies from "./components/CaseStudies";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import AppointmentBooking from "./components/AppointmentBooking";
import Admin from "./components/Admin";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import TelemarketingService from "./components/TelemarketingService";
import GovernmentContractingService from "./components/GovernmentContractingService";
import SocialMediaService from "./components/SocialMediaService";
import Careers from "./components/Careers";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import WorkedWith from "./components/WorkedWith";
import { AuthProvider } from "./contexts/AuthContext";
import Demo from "./Demo";
import ScrollToTop from "./components/ScrollToTop";

// Home Page Component (removed Pricing and Case Studies sections)
const HomePage = () => (
  <>
    <Hero />
    <Industries />
    <WhyChooseUs />
    <Services />
    <WorkedWith />
    <section className="py-8 bg-black">
      <div className="container mx-auto px-6 text-center">
        <Button 
          onClick={() => alert('Case Studies feature coming soon! PDF download functionality will be added.')}
          className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 px-8 py-4 text-lg font-semibold rounded-none"
        >
          View Case Studies
        </Button>
      </div>
    </section>
    <Testimonials />
    <FAQ />
  </>
);

// Layout wrapper component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  if (isAdminRoute) {
    // Admin route: no header/footer, just the content
    return <>{children}</>;
  }

  // Regular routes: include header and footer
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/book-appointment" element={<AppointmentBooking />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/services/telemarketing" element={<TelemarketingService />} />
              <Route path="/services/government-contracting" element={<GovernmentContractingService />} />
              <Route path="/services/social-media" element={<SocialMediaService />} />
              <Route path="/demo" element={<Demo />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;