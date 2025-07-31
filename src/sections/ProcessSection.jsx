import React from 'react';
import { Link } from 'react-scroll';
import { FaSearch, FaSketch, FaCode, FaRocket, FaHandshake, FaPaperPlane } from 'react-icons/fa';

const ProcessSection = () => {
  const steps = [
    { 
      icon: <FaSearch />,
      title: 'Discovery',
      description: 'Understanding your requirements, goals, and target audience through detailed discussions.',
      color: '#60a5fa'
    },
    { 
      icon: <FaSketch />,
      title: 'Planning',
      description: 'Creating detailed specifications, wireframes, and architecture diagrams for your project.',
      color: '#34d399'
    },
    { 
      icon: <FaCode />,
      title: 'Development',
      description: 'Building your solution with clean, efficient code following industry best practices.',
      color: '#f59e0b'
    },
    { 
      icon: <FaRocket />,
      title: 'Testing & Launch',
      description: 'Rigorous testing across devices and environments before deployment.',
      color: '#a78bfa'
    },
    { 
      icon: <FaHandshake />,
      title: 'Maintenance',
      description: 'Ongoing support, updates, and optimization to keep your solution running smoothly.',
      color: '#f97316'
    },
  ];

  return (
    <section 
      id="process" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
        padding: '2rem 1rem 10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
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
        zIndex: 2,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '4rem',
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
              color: '#9ba7b2',
              display: 'inline-block'
            }}>
              Development
            </span>{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Process
            </span>
          </h2>
          
          <p style={{
            maxWidth: 700,
            marginBottom: '0.5rem',
            fontSize: '1rem',
            color: '#94a3b8',
            textAlign: 'center',
            userSelect: 'none',
            lineHeight: 1.5,
          }}>
            A proven methodology that ensures quality, efficiency, and client satisfaction at every stage.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          margin: '0 auto',
          maxWidth: '900px',
        }}>
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: 'calc(100% - 80px)',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            borderRadius: '2px',
            zIndex: 1,
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
          }}>
            {steps.map((step, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  marginBottom: '3rem',
                  width: '100%',
                  transition: 'all 0.3s ease',
                }}
              >
                <div 
                  className="process-content"
                  style={{
                    flex: 1,
                    textAlign: index % 2 === 0 ? 'right' : 'left',
                    padding: index % 2 === 0 ? '0 3rem 0 0' : '0 0 0 3rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: step.color,
                    marginBottom: '0.8rem',
                    transition: 'all 0.3s ease',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    transition: 'all 0.3s ease',
                  }}>
                    {step.description}
                  </p>
                </div>
                
                <div 
                  className="process-icon-container"
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 3,
                  }}
                >
                  <div 
                    className="process-icon-bg"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 0 8px ${step.color}10`,
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(5px)',
                    }}
                  ></div>
                  
                  <div 
                    className="process-icon"
                    style={{
                      color: step.color,
                      fontSize: '2rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {step.icon}
                  </div>
                  
                  <div 
                    className="process-icon-hover"
                    style={{
                      position: 'absolute',
                      width: '0',
                      height: '0',
                      borderRadius: '50%',
                      background: `${step.color}20`,
                      transition: 'all 0.3s ease',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backdropFilter: 'blur(5px)',
                    }}
                  ></div>
                </div>
                
                <div style={{ flex: 1 }}></div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
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
              Start Your Project <FaPaperPlane style={{ marginLeft: '8px' }} />
            </button>
          </Link>
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
        .process-icon-container:hover .process-icon-bg {
          transform: scale(1.05);
          box-shadow: 0 0 0 12px ${steps[0].color}10;
        }
        
        .process-icon-container:hover .process-icon-hover {
          width: 80px;
          height: 80px;
          opacity: 1;
        }
        
        .process-icon-container:hover .process-icon {
          transform: scale(1.1);
        }
        
        .process-icon-container:hover + .process-content,
        .process-content:hover {
          transform: scale(1.02);
          opacity: 1;
        }

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

        @media (max-width: 900px) {
          #process {
            padding: 8rem 1rem;
          }
          
          #process > div > div:nth-child(2) > div {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 1rem;
            margin-bottom: 4rem;
          }
          
          .process-content {
            padding: 0;
            margin-bottom: 1.5rem;
            text-align: center;
          }
          
          .process-icon-container {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          #process {
            padding: 6rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;