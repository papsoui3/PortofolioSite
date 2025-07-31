import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { 
  FaGithub, FaLinkedin, FaFacebook, FaChevronDown,
  FaReact, FaNodeJs, FaPython, FaJava, FaPhp,
  FaCode, FaHandshake
} from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import { SiLaravel, SiMongodb, SiMysql, SiJavascript, SiTypescript, SiDocker, SiGraphql } from 'react-icons/si';

import HeroImage from '../images/main.png';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef();
  const socialControls = useAnimation();
  const techControls = useAnimation();
  const imageControls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const animationTimeoutRef = useRef(null);

  const roles = [
    "Himantha Hirushan",
    "Full Stack Developer",
    "Software Engineer",
    "ML Specialist",
  ];

  // Tech icons configuration
  const techIcons = [
    { icon: <FaReact color="#61DAFB" />, name: "React", pos: { top: '5%', left: '10%' }, size: 42 },
    { icon: <FaNodeJs color="#68A063" />, name: "Node.js", pos: { top: '20%', right: '5%' }, size: 40 },
    { icon: <SiJavascript color="#F7DF1E" />, name: "JavaScript", pos: { bottom: '25%', left: '5%' }, size: 38 },
    { icon: <SiTypescript color="#3178C6" />, name: "TypeScript", pos: { bottom: '15%', right: '15%' }, size: 38 },
    { icon: <FaPython color="#3776AB" />, name: "Python", pos: { top: '30%', right: '3%' }, size: 42 },
    { icon: <FaJava color="#007396" />, name: "Java", pos: { top: '10%', right: '20%' }, size: 38 },
    { icon: <FaPhp color="#777BB4" />, name: "PHP", pos: { bottom: '30%', right: '5%' }, size: 36 },
    { icon: <SiLaravel color="#FF2D20" />, name: "Laravel", pos: { top: '35%', left: '5%' }, size: 40 },
    { icon: <SiMongodb color="#47A248" />, name: "MongoDB", pos: { bottom: '10%', left: '15%' }, size: 38 },
    { icon: <SiMysql color="#4479A1" />, name: "MySQL", pos: { bottom: '5%', right: '10%' }, size: 36 },
    { icon: <SiDocker color="#2496ED" />, name: "Docker", pos: { top: '40%', right: '12%' }, size: 42 },
    { icon: <SiGraphql color="#E535AB" />, name: "GraphQL", pos: { bottom: '35%', left: '20%' }, size: 38 },
  ];

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Typing effect
  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];
      
      setTypedText(isDeleting 
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
      );
      
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 80 : 150);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum]);

  // Animation sequence
  useEffect(() => {
    if (!mounted) return;

    const sequence = async () => {
      try {
        // 1. Animate text content
        await controls.start("visible");
        
        // 2. Animate image sliding in from right
        await imageControls.start({
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        });
        
        // 3. Animate tech icons one by one with delay
        for (let i = 0; i < techIcons.length; i++) {
          if (!mounted) return;
          
          techControls.start(idx => {
            if (idx === i) {
              return {
                opacity: [0, 1],
                scale: [0, 1.2, 1],
                transition: {
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "backOut"
                }
              };
            }
            return {};
          });
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        
        // 4. Start random popping after initial animation
        startRandomPopAnimation();
        
        // 5. Animate social buttons
        socialControls.start(i => ({
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            delay: 0.5 + i * 0.2,
            type: "spring",
            damping: 10,
            stiffness: 100
          }
        }));
      } catch (error) {
        console.error("Animation error:", error);
      }
    };
    
    sequence();

    return () => {
      // Clean up animations if component unmounts
      controls.stop();
      imageControls.stop();
      techControls.stop();
      socialControls.stop();
    };
  }, [mounted]);

  // Initialize image off-screen
  useEffect(() => {
    if (mounted) {
      imageControls.start({
        x: 100,
        opacity: 0
      });
    }
  }, [mounted]);

  // Random popping animation for tech icons
  const startRandomPopAnimation = () => {
    if (!mounted) return;

    const animateRandomIcons = () => {
      if (!mounted) return;

      const visibleIcons = techIcons.map((_, index) => index);
      const iconsToAnimate = [];
      const count = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < count; i++) {
        if (visibleIcons.length === 0) break;
        const randomIndex = Math.floor(Math.random() * visibleIcons.length);
        iconsToAnimate.push(visibleIcons.splice(randomIndex, 1)[0]);
      }
      
      iconsToAnimate.forEach(index => {
        techControls.start(i => {
          if (i === index) {
            return {
              scale: [1, 1.4, 1],
              transition: {
                duration: 0.6,
                ease: "backOut"
              }
            };
          }
          return {};
        });
      });
      
      const nextDelay = 1000 + Math.random() * 2000;
      animationTimeoutRef.current = setTimeout(animateRandomIcons, nextDelay);
    };
    
    animateRandomIcons();
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="hero-section"
    >
      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hero-container"
      >
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.6, -0.05, 0.01, 0.99] 
              }
            }
          }}
          className="hero-text"
        >
          <motion.h1 className="hero-title">
            Hi, I'm <span className="gradient-text"> 
            {typedText}
            <span className="blinking-cursor"></span>
          </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-subtitle"
          >
             I build high-performance web applications with clean code and intuitive experiences.
          </motion.p>
          
          <div className="hero-buttons">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="projects"
                smooth={true}
                duration={700}
                className="primary-button"
              >
                <FaCode className="button-icon" /> View My Work
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="contact"
                smooth={true}
                duration={700}
                className="hire-button"
              >
                <FaHandshake className="button-icon" /> Let's Collaborate
              </Link>
            </motion.div>
          </div>
          
          {/* Social Links - Now properly spaced */}
          <motion.div
            className="social-links-wrapper"
          >
            <motion.div
              className="social-links"
            >
              {[
                { icon: <FaGithub />, url: 'https://github.com/HimanthaD4', label: 'GitHub', initialPos: { y: 50, x: -20 } },
                { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/himantha-hirushan-390122212/', label: 'LinkedIn', initialPos: { y: 30, x: 20 } },
                { icon: <FaFacebook />, url: 'https://web.facebook.com/himantha.hirushan.71', label: 'Facebook', initialPos: { y: 40, x: -10 } },
                { icon: <FaWhatsapp />, url: 'https://wa.me/94768840107', label: 'WhatsApp', initialPos: { y: 60, x: 10 } }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, y: social.initialPos.y, x: social.initialPos.x }}
                  animate={socialControls}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ 
                    color: '#f97316',
                    backgroundColor: '#1e293b',
                    borderColor: '#1e293b',
                    y: -5,
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Image Container with Tech Icons */}
        <motion.div 
          className="hero-image-container"
        >
          <motion.div 
            className="image-wrapper"
            initial={{ x: 100, opacity: 0 }}
            animate={imageControls}
          >
            <motion.img 
              src={HeroImage} 
              alt="Himantha Hirushan" 
              className="profile-image"
            />
            
            {/* Animated Tech Icons */}
            <motion.div className="tech-icons-container">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={techControls}
                  className="tech-icon"
                  style={{
                    ...tech.pos,
                    width: `${tech.size}px`,
                    height: `${tech.size}px`,
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: '0 0 20px rgba(249, 115, 22, 0.6)',
                    zIndex: 10,
                  }}
                >
                  <div className="tech-icon-inner">
                    {tech.icon}
                  </div>
                  <motion.span className="tech-tooltip">
                    {tech.name}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            {/* Glow effect */}
            <motion.div 
              className="image-glow"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator"
      >
        <Link
          to="projects"
          smooth={true}
          duration={400}
          className="scroll-link"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FaChevronDown />
          </motion.div>
          <motion.span
            className="scroll-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            Explore My Work
          </motion.span>
        </Link>
      </motion.div>
      
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 80px 5% 120px; /* Increased bottom padding */
          background: radial-gradient(ellipse at top right, #1e293b, #0f172a);
          box-sizing: border-box;
          width: 100%;
        }
        
        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }
        
        .hero-text {
          flex: 1;
          min-width: 300px;
          max-width: 600px;
          padding: 0 20px;
        }
        
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          font-family: 'Inter', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }
        
        .blinking-cursor {
          display: inline-block;
          width: 8px;
          height: 2.8rem;
          margin-left: 4px;
          background:#f97316;
          vertical-align: text-bottom;
          animation: blink 1s infinite;
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
          color: #cbd5e1;
          max-width: 500px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }
        
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem; /* Reduced margin */
        }
        
        .primary-button {
          padding: 0.9rem 1.8rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
          text-decoration: none;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          position: relative;
          overflow: hidden;
        }
        
        .primary-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: 0.5s;
        }
        
        .primary-button:hover::before {
          left: 100%;
        }
        
        .hire-button {
          padding: 0.9rem 1.8rem;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid #f97316;
          color: #f97316;
          text-decoration: none;
          font-size: 1.1rem;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          gap: 0.8rem;
          position: relative;
        }
        
        .hire-button:hover {
          background: rgba(249, 115, 22, 0.1);
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.2);
        }
        
        .button-icon {
          transition: all 0.3s ease;
        }
        
        .primary-button:hover .button-icon {
          transform: translateX(3px);
        }
        
        .hire-button:hover .button-icon {
          transform: rotate(10deg);
        }
        
        .social-links-wrapper {
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        
        .social-icon {
          color: #94a3b8;
          transition: all 0.3s ease;
          font-size: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .hero-image-container {
          flex: 1;
          min-width: 300px;
          max-width: 380px;
          position: relative;
          height: 380px;
          margin: 0 auto;
        }
        
        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
        }
        
        .tech-icons-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        
        .tech-icon {
          position: absolute;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(249, 115, 22, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .tech-icon-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .tech-tooltip {
          position: absolute;
          font-size: 0.7rem;
          color: #fff;
          white-space: nowrap;
          opacity: 0;
          transition: all 0.3s ease;
          background: rgba(15,23,42,0.9);
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid rgba(249,115,22,0.3);
          pointer-events: none;
          bottom: -25px;
        }
        
        .tech-icon:hover .tech-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        
        .image-glow {
          position: absolute;
          width: 140%;
          height: 140%;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(249,115,22,0.2) 0%, transparent 60%);
          filter: blur(30px);
          z-index: 1;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px; /* Adjusted position */
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
          color: #f97316;
          font-size: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .scroll-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        
        .scroll-text {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          color: #94a3b8;
          font-weight: 500;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @media (max-width: 1024px) {
          .hero-section {
            padding: 80px 5% 120px;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 5% 100px;
            text-align: center;
          }
          
          .hero-container {
            flex-direction: column;
          }
          
          .hero-text {
            order: 2;
            margin-top: 2rem;
            max-width: 100%;
            padding: 0;
          }
          
          .hero-image-container {
            order: 1;
            height: 320px;
            max-width: 320px;
          }
          
          .hero-buttons {
            justify-content: center;
            margin-bottom: 1.5rem;
          }
          
          .social-links-wrapper {
            display: flex;
            justify-content: center;
            margin: 1.5rem 0;
          }
          
          .social-links {
            justify-content: center;
            gap: 0.8rem;
          }
          
          .hero-title {
            font-size: 2.3rem;
          }

          .scroll-indicator {
            bottom: 50px;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            padding: 60px 5% 80px;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-image-container {
            height: 280px;
            max-width: 280px;
          }
          
          .primary-button,
          .hire-button {
            padding: 0.8rem 1.5rem;
            font-size: 1rem;
          }

          .social-icon {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
          }

          .scroll-indicator {
            bottom: 40px;
          }
        }

        @media (max-width: 400px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 0.8rem;
          }

          .social-links {
            gap: 0.6rem;
          }

          .hero-section {
            padding-bottom: 70px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;