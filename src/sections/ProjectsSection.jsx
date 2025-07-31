import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaLayerGroup, FaCode, FaRobot, FaMobileAlt, FaDesktop, FaGamepad, FaMicrochip, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        const projectsData = Array.isArray(response.data.data) ? response.data.data : [];
        
        const processedProjects = projectsData.map(project => ({
          ...project,
          image: project.image ? {
            url: project.image.url || `/api/projects/${project._id}/image`,
            contentType: project.image.contentType,
            size: project.image.size,
            data: project.image.data 
          } : null
        }));
        
        setProjects(processedProjects);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchProjects();

    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
    e.target.onerror = null;
  };

  const getImageUrl = (project) => {
    if (!project.image) {
      return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
    }
    
    if (project.image.url) {
      if (project.image.url.startsWith('http') || project.image.url.startsWith('data:')) {
        return project.image.url;
      }
      return `${API_URL}${project.image.url}`;
    }
    
    if (project.image.data) {
      return `data:${project.image.contentType || 'image/jpeg'};base64,${project.image.data}`;
    }
    
    return 'https://via.placeholder.com/800x600/0f172a/e2e8f0?text=Project+Preview';
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'web': return <FaCode />;
      case 'ai': return <FaRobot />;
      case 'mobile': return <FaMobileAlt />;
      case 'desktop': return <FaDesktop />;
      case 'game': return <FaGamepad />;
      case 'embedded': return <FaMicrochip />;
      default: return <FaCode />;
    }
  };

  const scrollProjects = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return (
    <div style={{
      padding: '6rem 1rem',
      textAlign: 'center',
      backgroundColor: '#1e293b',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#e2e8f0',
      fontSize: '1.1rem'
    }}>
      Loading projects...
    </div>
  );

  if (error) return (
    <div style={{
      padding: '6rem 1rem',
      textAlign: 'center',
      backgroundColor: '#1e293b',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#f87171',
      fontSize: '1.1rem'
    }}>
      Error: {error}
    </div>
  );

  return (
    <section 
      id="projects" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        padding: '4rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#cbd5e1',
        userSelect: 'none',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Background overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        zIndex: -2,
      }}></div>

      {/* Decorative elements */}
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
          padding: '0 1rem',
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
                My
              </span>{' '}
              <span style={{ 
                color: '#9ba7b2',
                display: 'inline-block'
              }}>
                Work
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
            Professional work showcasing my expertise
          </p>
        </div>
        
        {/* Projects Container with Scroll Controls */}
        <div style={{
          position: 'relative',
          width: '100%',
          marginBottom: '3rem',
        }}>
          {/* Left Scroll Button */}
          <button 
            onClick={() => scrollProjects('left')}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(249, 115, 22, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%)';
            }}
          >
            <FaChevronLeft />
          </button>
          
          {/* Projects Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              padding: '1rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome/Safari
              },
            }}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <motion.div
                  key={project._id}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    width: '320px',
                    minWidth: '320px',
                    flexShrink: 0,
                    position: 'relative',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                    height: '520px', // Fixed height for all cards
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  whileHover={{ 
                    y: -5, 
                    borderColor: getCategoryColor(project.category, 0.3),
                    boxShadow: `0 15px 30px ${getCategoryColor(project.category, 0.1)}`
                  }}
                >
                  {/* Project Image */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <img 
                      src={getImageUrl(project)} 
                      alt={project.title} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                      onError={handleImageError}
                      loading="lazy"
                    />
                  </div>

                  {/* Project Content */}
                  <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}>
                    {/* Category Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.7rem',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      alignSelf: 'flex-start',
                      background: getCategoryBackground(project.category),
                      border: `1px solid ${getCategoryBorder(project.category)}`,
                      color: getCategoryText(project.category),
                    }}>
                      {getCategoryIcon(project.category)}
                      <span style={{ marginLeft: '0.3rem' }}>
                        {formatCategoryName(project.category)}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#f8fafc',
                    }}>
                      {project.title}
                    </h3>

                    {/* Project Description with fade effect */}
                    <div style={{
                      position: 'relative',
                      flex: 1,
                      overflow: 'hidden',
                      marginBottom: '1rem',
                    }}>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        lineHeight: 1.5,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {project.description}
                      </p>
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30px',
                        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0), rgba(15, 23, 42, 0.9))',
                      }}></div>
                    </div>

                    {/* Project Tags */}
                    {project.tags?.length > 0 && (
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1.25rem',
                      }}>
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} style={{
                            backgroundColor: 'rgba(30, 41, 59, 0.7)',
                            color: '#e2e8f0',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.65rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Project Links */}
                    <div style={{
                      display: 'flex',
                      gap: '0.6rem',
                      marginTop: 'auto',
                    }}>
                      {project.github && (
                        <motion.a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            padding: '0.5rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            flex: 1,
                            textDecoration: 'none',
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            color: '#38bdf8',
                          }}
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaCode size={12} /> Code
                        </motion.a>
                      )}
                      <motion.a 
                        href={project.live || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          padding: '0.5rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          flex: 1,
                          textDecoration: 'none',
                          backgroundColor: project.live ? 'rgba(249, 115, 22, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                          border: project.live ? '1px solid rgba(249, 115, 22, 0.2)' : '1px solid rgba(100, 116, 139, 0.2)',
                          color: project.live ? '#f97316' : '#64748b',
                          cursor: project.live ? 'pointer' : 'not-allowed',
                        }}
                        whileHover={{ scale: project.live ? 1.05 : 1 }} 
                        whileTap={{ scale: project.live ? 0.95 : 1 }}
                      >
                        <FaGlobe size={12} /> {project.live ? 'Live' : 'N/A'}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div style={{
                width: '100%',
                textAlign: 'center',
                padding: '2rem',
                color: '#94a3b8',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
              }}>
                No projects available
              </div>
            )}
          </div>

          {/* Right Scroll Button */}
          <button 
            onClick={() => scrollProjects('right')}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(249, 115, 22, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
              e.currentTarget.style.transform = 'translateY(-50%)';
            }}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* CTA Button */}
        <motion.div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
            width: '100%',
          }}
          initial={{ opacity: 0 }} 
          animate={isVisible ? { opacity: 1 } : {}} 
          transition={{ duration: 0.6, delay: 0.4 }} 
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
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
              display: 'inline-flex',
              alignItems: 'center',
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
              View Full Portfolio <FaLayerGroup style={{ marginLeft: '8px' }} />
            </button>
          </Link>
        </motion.div>
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

        @media (max-width: 768px) {
          #projects {
            padding: 4rem 1rem;
          }
          
          #projects button[style*="left: 1rem"] {
            left: 0.5rem;
          }
          
          #projects button[style*="right: 1rem"] {
            right: 0.5rem;
          }
        }
      `}</style>
    </section>
  );

  // Helper functions
  function getCategoryColor(category, opacity = 1) {
    switch(category) {
      case 'web': return `rgba(56, 189, 248, ${opacity})`;
      case 'ai': return `rgba(236, 72, 153, ${opacity})`;
      case 'mobile': return `rgba(74, 222, 128, ${opacity})`;
      case 'desktop': return `rgba(139, 92, 246, ${opacity})`;
      case 'game': return `rgba(236, 72, 153, ${opacity})`;
      case 'embedded': return `rgba(20, 184, 166, ${opacity})`;
      default: return `rgba(156, 163, 175, ${opacity})`;
    }
  }

  function getCategoryBackground(category) {
    switch(category) {
      case 'web': return 'rgba(56, 189, 248, 0.12)';
      case 'ai': return 'rgba(236, 72, 153, 0.12)';
      case 'mobile': return 'rgba(74, 222, 128, 0.12)';
      case 'desktop': return 'rgba(139, 92, 246, 0.12)';
      case 'game': return 'rgba(236, 72, 153, 0.12)';
      case 'embedded': return 'rgba(20, 184, 166, 0.12)';
      default: return 'rgba(156, 163, 175, 0.12)';
    }
  }

  function getCategoryBorder(category) {
    switch(category) {
      case 'web': return 'rgba(56, 189, 248, 0.2)';
      case 'ai': return 'rgba(236, 72, 153, 0.2)';
      case 'mobile': return 'rgba(74, 222, 128, 0.2)';
      case 'desktop': return 'rgba(139, 92, 246, 0.2)';
      case 'game': return 'rgba(236, 72, 153, 0.2)';
      case 'embedded': return 'rgba(20, 184, 166, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }

  function getCategoryText(category) {
    switch(category) {
      case 'web': return '#38bdf8';
      case 'ai': return '#ec4899';
      case 'mobile': return '#4ade80';
      case 'desktop': return '#8b5cf6';
      case 'game': return '#ec4899';
      case 'embedded': return '#14b8a6';
      default: return '#9ca3af';
    }
  }

  function formatCategoryName(category) {
    switch(category) {
      case 'web': return 'WEB';
      case 'ai': return 'AI/ML';
      case 'mobile': return 'MOBILE';
      case 'desktop': return 'DESKTOP';
      case 'game': return 'GAME';
      case 'embedded': return 'EMBEDDED';
      default: return 'PROJECT';
    }
  }
};

export default ProjectsSection;