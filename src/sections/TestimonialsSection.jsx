// src/sections/TestimonialsSection.jsx
import React from 'react';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: '#0f172a' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Client <span className="text-orange-500">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            What my clients and colleagues say about working with me.
          </p>
        </div>
        <div className="text-center text-white">
          <p className="text-lg">Testimonials section content coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;