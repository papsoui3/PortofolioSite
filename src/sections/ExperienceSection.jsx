// src/sections/ExperienceSection.jsx
import React from 'react';

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20" style={{ backgroundColor: '#0f172a' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work <span className="text-orange-500">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            My professional journey and accomplishments.
          </p>
        </div>
        <div className="text-center text-white">
          <p className="text-lg">Experience section content coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;