import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaGlobe, FaCode, FaRobot, FaMobileAlt, FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AllProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Fetch projects with memoization
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`, {
          signal: controller.signal
        });
        const projectsData = Array.isArray(response.data?.data) ? response.data.data : [];
        setProjects(projectsData);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err.response?.data?.message || err.message || 'Failed to fetch projects');
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  // Scroll event listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized image handling
  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBmMTcyYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZTJlOGYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlByb2plY3QgUHJldmlldzwvdGV4dD48L3N2Zz4=';
    e.target.onerror = null;
  };

  const getOptimizedImageUrl = (project) => {
    if (!project?.image) return null;
    
    // Prefer URL from backend
    if (project.image.url) {
      return project.image.url.startsWith('http') 
        ? project.image.url 
        : `${API_URL}${project.image.url}`;
    }
    
    // Fallback to base64 if available
    if (project.image.data) {
      return `data:${project.image.contentType || 'image/jpeg'};base64,${project.image.data}`;
    }
    
    return null;
  };

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tags && project.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, activeCategory]);

  // Categories data
  const categories = useMemo(() => [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'desktop', name: 'Desktop' },
    { id: 'game', name: 'Games' }
  ], []);

  // Loading and error states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <section className="projects-container">
      <div className="projects-content">
        {/* Header Section */}
        <div className="projects-header">
          <h2>
            <span className="gradient-text">My</span>{' '}
            <span className="normal-text">Portfolio</span>
          </h2>
          <p className="subtitle">
            Browse through all my completed projects and works
          </p>
          
          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search-button"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Category Filters */}
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                getOptimizedImageUrl={getOptimizedImageUrl}
                handleImageError={handleImageError}
              />
            ))}
          </div>
        ) : (
          <NoProjectsFound 
            searchTerm={searchTerm} 
            activeCategory={activeCategory}
            onClearFilters={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}
          />
        )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <BackToTopButton />
        )}
      </div>

      {/* CSS Styles */}
      <style jsx global>{`
        :root {
          --primary-bg: #0f172a;
          --secondary-bg: #1e293b;
          --text-primary: #e2e8f0;
          --text-secondary: #94a3b8;
          --accent-orange: #f97316;
          --accent-blue: #38bdf8;
          --accent-pink: #ec4899;
          --accent-green: #4ade80;
          --border-color: rgba(255, 255, 255, 0.1);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .projects-container {
          background-color: var(--primary-bg);
          padding: 4rem 1rem;
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text-primary);
        }

        .projects-content {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          padding: 0 1rem;
        }

        .projects-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1rem;
        }

        .projects-header h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-orange), #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }

        .normal-text {
          color: var(--text-secondary);
          display: inline-block;
        }

        .subtitle {
          max-width: 700px;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .search-filter-container {
          width: 100%;
          max-width: 800px;
          margin-bottom: 2rem;
        }

        .search-input-container {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: rgba(249, 115, 22, 0.3);
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
        }

        .clear-search-button {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .category-filter {
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .category-filter.active {
          background-color: rgba(249, 115, 22, 0.2);
          color: var(--accent-orange);
          border: 1px solid rgba(249, 115, 22, 0.3);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .projects-container {
            padding: 4rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 480px) {
          .projects-container {
            padding: 3rem 0.5rem;
          }
          
          .projects-content {
            padding: 0 0.5rem;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .category-filters {
            gap: 0.3rem;
          }
          
          .category-filter {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

// Sub-components for better organization
const LoadingState = () => (
  <div className="loading-state">
    <div className="loading-text">Loading projects...</div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="error-state">
    <div className="error-text">Error: {error}</div>
  </div>
);

const ProjectCard = ({ project, getOptimizedImageUrl, handleImageError }) => {
  const categoryStyles = {
    web: { bg: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.2)', color: '#38bdf8' },
    ai: { bg: 'rgba(236, 72, 153, 0.12)', border: '1px solid rgba(236, 72, 153, 0.2)', color: '#ec4899' },
    mobile: { bg: 'rgba(74, 222, 128, 0.12)', border: '1px solid rgba(74, 222, 128, 0.2)', color: '#4ade80' },
    default: { bg: 'rgba(156, 163, 175, 0.12)', border: '1px solid rgba(156, 163, 175, 0.2)', color: '#9ca3af' }
  };

  const styles = categoryStyles[project.category] || categoryStyles.default;
  const categoryName = project.category === 'web' ? 'WEB' : 
                     project.category === 'ai' ? 'AI/ML' : 
                     project.category === 'mobile' ? 'MOBILE' : 
                     project.category?.toUpperCase() || 'PROJECT';

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(249, 115, 22, 0.1)', borderColor: 'rgba(249, 115, 22, 0.3)' }}
    >
      <div className="project-image-container">
        <img 
          src={getOptimizedImageUrl(project) || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgODAwIDYwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzBmMTcyYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZTJlOGYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlByb2plY3QgUHJldmlldzwvdGV4dD48L3N2Zz4='}
          alt={project.title}
          className="project-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="project-content">
        <div className="category-badge" style={styles}>
          {project.category === 'web' ? <FaCode /> : 
           project.category === 'ai' ? <FaRobot /> : 
           project.category === 'mobile' ? <FaMobileAlt /> : <FaCode />}
          <span>{categoryName}</span>
        </div>

        <h3>{project.title}</h3>

        <p className="project-description">{project.description}</p>

        {project.tags?.length > 0 && (
          <div className="project-tags">
            {project.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-links">
          {project.github && (
            <motion.a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="github-link"
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
            className={`live-link ${!project.live ? 'disabled' : ''}`}
            whileHover={{ scale: project.live ? 1.05 : 1 }} 
            whileTap={{ scale: project.live ? 0.95 : 1 }}
          >
            <FaGlobe size={12} /> {project.live ? 'Live' : 'N/A'}
          </motion.a>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          position: relative;
        }

        .project-image-container {
          width: 100%;
          height: 180px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border-color);
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          height: calc(100% - 180px);
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          align-self: flex-start;
        }

        .project-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .project-description {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .project-tag {
          background-color: rgba(30, 41, 59, 0.7);
          color: var(--text-primary);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-size: 0.7rem;
          border: 1px solid var(--border-color);
        }

        .project-links {
          display: flex;
          gap: 0.6rem;
          margin-top: auto;
        }

        .github-link, .live-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          flex: 1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .github-link {
          background-color: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: var(--accent-blue);
        }

        .live-link {
          background-color: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.2);
          color: var(--accent-orange);
        }

        .live-link.disabled {
          background-color: rgba(100, 116, 139, 0.1);
          border: 1px solid rgba(100, 116, 139, 0.2);
          color: var(--text-secondary);
          cursor: not-allowed;
        }
      `}</style>
    </motion.div>
  );
};

const NoProjectsFound = ({ searchTerm, activeCategory, onClearFilters }) => (
  <div className="no-projects">
    {searchTerm || activeCategory !== 'all' ? (
      <>
        <p>No projects found matching your criteria</p>
        <button 
          onClick={onClearFilters}
          className="clear-filters-button"
        >
          Clear filters
        </button>
      </>
    ) : (
      <p>No projects available yet</p>
    )}

    <style jsx>{`
      .no-projects {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
        background-color: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        border: 1px dashed var(--border-color);
      }

      .no-projects p {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }

      .clear-filters-button {
        padding: 0.5rem 1rem;
        border-radius: 6px;
        background: rgba(249, 115, 22, 0.1);
        border: 1px solid rgba(249, 115, 22, 0.2);
        color: var(--accent-orange);
        cursor: pointer;
        font-size: 0.9rem;
        margin-top: 1rem;
      }
    `}</style>
  </div>
);

const BackToTopButton = () => (
  <motion.div 
    className="back-to-top-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      ↑
    </motion.button>

    <style jsx>{`
      .back-to-top-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 100;
      }

      .back-to-top-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--accent-orange), #f59e0b);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
        transition: all 0.3s ease;
      }
    `}</style>
  </motion.div>
);

export default AllProjectsSection;