import React from 'react';
import { faqData } from '../data/mock';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import ScrollReveal from './ScrollReveal';
import GlassBox from './GlassBox';

const FAQ = () => {
  return (
    <section id="faq" className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-20">
          <ScrollReveal delay={0.2}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              <span className="text-[#00FFD1]">FAQ</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg text-white/60 font-medium max-w-2xl mx-auto">
              Everything you need to know about our services
            </p>
          </ScrollReveal>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={0.6}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.slice(0, 4).map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={`item-${faq.id}`}
                  className="border-none"
                >
                  <GlassBox className="overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 text-left text-lg font-bold text-white hover:text-[#00FFD1] transition-colors duration-300 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-base text-white/70 font-medium leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </GlassBox>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>

        {/* Contact CTA */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 text-center">
            <GlassBox className="p-8 lg:p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-base text-white/70 mb-6">
                Schedule a free consultation to get personalized answers
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <a
                  href="tel:+1-555-123-4567"
                  className="btn-primary bg-[#00FFD1] text-black border-none rounded-none px-6 py-3 text-base font-medium hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] transition-all duration-400 min-h-[48px] flex items-center space-x-2 text-decoration-none"
                >
                  <span>Call Now</span>
                </a>
                <a
                  href="mailto:hello@leadg.com"
                  className="btn-secondary bg-white/10 text-white border-none rounded-none px-6 py-3 text-base font-medium hover:bg-white hover:text-black transition-all duration-400 min-h-[48px] flex items-center space-x-2 text-decoration-none"
                >
                  <span>Email Us</span>
                </a>
              </div>
            </GlassBox>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;