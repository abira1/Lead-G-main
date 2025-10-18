import React from 'react';
import WorkedWith from './components/WorkedWith';
import Testimonials from './components/Testimonials';

const Demo = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="py-8">
        <h1 className="text-white text-4xl font-bold text-center mb-8">Mock Data Demo</h1>
        
        {/* WorkedWith Section */}
        <WorkedWith />
        
        {/* Testimonials Section */}
        <Testimonials />
      </div>
    </div>
  );
};

export default Demo;