// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import ServicesSection from '../sections/ServicesSection';
import ProcessSection from '../sections/ProcessSection';
import ContactSection from '../sections/ContactSection';

const Home = () => {
  return (
    <main>
      <div id="home"><HeroSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="services"><ServicesSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="process"><ProcessSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="contact"><ContactSection /></div>
    </main>
  );
};

export default Home;