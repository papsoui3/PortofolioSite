import React from 'react';
import { 
  FaReact, FaNodeJs, FaDatabase, FaJava, 
  FaAndroid, FaPhp, FaPython, FaMobile, FaPaperPlane
} from 'react-icons/fa';
import { SiMongodb, SiLaravel, SiJavascript, SiTensorflow, SiFlutter } from 'react-icons/si';
import { Link } from 'react-scroll';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Full Stack Development",
      icon: <FaReact />,
      skills: [
        { name: "MERN Stack", icon: <FaReact /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "PHP/Laravel", icon: <SiLaravel /> },
        { name: "Python", icon: <FaPython /> }
      ],
      accentColor: "#60a5fa" // Blue
    },
    {
      title: "Database & Backend",
      icon: <FaDatabase />,
      skills: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "SQL Databases", icon: <FaDatabase /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "API Development", icon: <FaDatabase /> }
      ],
      accentColor: "#34d399" // Green
    },
    {
      title: "Mobile Development",
      icon: <FaMobile />,
      skills: [
        { name: "Android Development", icon: <FaAndroid /> },
        { name: "Flutter", icon: <SiFlutter /> },
        { name: "Cross-Platform", icon: <FaMobile /> },
        { name: "Java/Kotlin", icon: <FaJava /> }
      ],
      accentColor: "#a78bfa" // Purple
    },
    {
      title: "Specialized Skills",
      icon: <SiTensorflow />,
      skills: [
        { name: "Machine Learning", icon: <SiTensorflow /> },
        { name: "System Architecture", icon: <FaDatabase /> },
        { name: "DevOps Practices", icon: <FaNodeJs /> }
      ],
      accentColor: "#f59e0b" // Amber
    }
  ];

  return (
    <section 
      id="skills" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        
      }}
    >
      {/* Background overlay for consistent color */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        zIndex: -2,
      }}></div>

      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-100px',
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
        right: '-100px',
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
        zIndex: 2,
      }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3.5rem',
        }}>
          <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              textAlign: 'center',
              userSelect: 'none',
              letterSpacing: '1px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f97316, #f59e0b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                Technical
              </span>{' '}
              <span style={{ 
                color: '#9ba7b2',
                display: 'inline-block'
              }}>
                Skills
              </span>
            </h2>
          
          <p style={{
            maxWidth: 550,
            marginBottom: '-1.5rem',
            fontSize: '1rem',
            color: '#94a3b8',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
          }}>
            A versatile toolkit for building robust digital solutions across platforms.
          </p>
        </div>
        
        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
          marginBottom: '3rem',
        }}>
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = `${category.accentColor}50`;
                e.currentTarget.style.boxShadow = `0 15px 30px ${category.accentColor}20`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
              }}
            >
              {/* Decorative corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '0',
                height: '0',
                borderTop: `50px solid ${category.accentColor}20`,
                borderLeft: '50px solid transparent',
                transition: 'all 0.3s ease',
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: `${category.accentColor}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: category.accentColor,
                  fontSize: '1.5rem',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${category.accentColor}30`,
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: category.accentColor,
                  margin: 0,
                }}>
                  {category.title}
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}>
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      padding: '0.8rem',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${category.accentColor}15`;
                      e.currentTarget.querySelector('.skill-icon').style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.querySelector('.skill-icon').style.transform = 'scale(1)';
                    }}
                  >
                    <div className="skill-icon" style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: `${category.accentColor}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: category.accentColor,
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      border: `1px solid ${category.accentColor}20`,
                    }}>
                      {skill.icon}
                    </div>
                    <span style={{
                      fontSize: '0.95rem',
                      color: '#e2e8f0',
                      fontWeight: 500,
                    }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button - Centered */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          width: '100%',
        }}>
          <Link
            to="contact"
            smooth={true}
            duration={700}
            style={{
              display: 'inline-block',
            }}
          >
            <button style={{
              padding: '0.9rem 2.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
              color: 'white',
              boxShadow: '0 6px 20px rgba(249, 115, 22, 0.35)',
              border: 'none',
              fontSize: '1.05rem',
              backdropFilter: 'blur(5px)',
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.5)';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.35)';
            }}
            >
              Let's Work Together <FaPaperPlane style={{ marginLeft: '8px' }} />
            </button>
          </Link>
        </div>
      </div>

      {/* Floating particles */}
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

      {/* Animation styles */}
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

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          #skills {
            padding: 6rem 1rem;
          }
          
          #skills > div > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          #skills {
            padding: 5rem 1rem;
          }
          
          #skills > div > div:nth-child(2) {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;