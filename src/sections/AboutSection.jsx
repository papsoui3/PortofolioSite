import React from 'react';
import { FaReact, FaPython, FaLightbulb, FaCogs, FaBrain } from 'react-icons/fa';

const skills = [
  { icon: <FaReact />, label: 'Frontend', color: '#60a5fa' },
  { icon: <FaPython />, label: 'Backend', color: '#34d399' },
  { icon: <FaBrain />, label: 'AI/ML', color: '#f59e0b' },
  { icon: <FaLightbulb />, label: 'Creative', color: '#a78bfa' },
  { icon: <FaCogs />, label: 'Tools', color: '#f97316' },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        zIndex: -2,
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, rgba(96, 165, 250, 0) 70%)',
        filter: 'blur(15px)',
        zIndex: -1,
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0) 70%)',
        filter: 'blur(20px)',
        zIndex: -1,
      }}></div>

      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '6.5rem',
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1.2rem',
            borderRadius: '999px',
            background: 'rgba(249, 115, 22, 0.12)',
            border: '1px solid rgba(249, 115, 22, 0.2)',
            color: '#f97316',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '-1.5rem',
            backdropFilter: 'blur(5px)',
          }}>
            WHO I AM
          </div>

         
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {skills.map((skill, index) => (
            <div
              key={index}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '20px',
                background: 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${skill.color}50`,
                color: skill.color,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 6px 20px ${skill.color}20`,
                backdropFilter: 'blur(5px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 15px 30px ${skill.color}40`;
                e.currentTarget.style.borderColor = `${skill.color}80`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${skill.color}20`;
                e.currentTarget.style.borderColor = `${skill.color}50`;
              }}
            >
              {skill.icon}
              <span style={{
                fontSize: '0.85rem',
                marginTop: '0.6rem',
                color: '#e2e8f0',
                fontWeight: 500,
              }}>
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
      }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            borderRadius: '50%',
            background: '#f97316',
            opacity: Math.random() * 0.5 + 0.1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200px) translateX(0);
            opacity: 0.1;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;