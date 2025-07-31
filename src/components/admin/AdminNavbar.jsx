import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut, FiHome, FiBriefcase, FiUsers, FiMenu, FiX } from 'react-icons/fi';

const AdminNavbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/pr');
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false); // Close mobile menu on desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={{
      backgroundColor: '#111827',
      color: 'white',
      height: '64px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/admin/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '20px',
          fontWeight: '600',
          textDecoration: 'none',
          color: 'white'
        }}>
          <span style={{
            background: 'linear-gradient(90deg, #f59e0b, #f97316)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            ByteMuse
          </span>
          <span style={{ color: '#6B7280' }}>Admin</span>
        </Link>

        {isAuthenticated && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            {isMobile ? (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '24px'
                }}
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            ) : (
              <>
                <Link to="/admin/dashboard" style={linkStyle(isActive('/admin/dashboard'))}>
                  <FiHome size={16} /> Dashboard
                </Link>
                <Link to="/admin/projects" style={linkStyle(isActive('/admin/projects'))}>
                  <FiBriefcase size={16} /> Projects
                </Link>
                <Link to="/admin/contacts" style={linkStyle(isActive('/admin/contacts'))}>
                  <FiUsers size={16} /> Messages
                </Link>
                <button onClick={handleLogout} style={logoutButtonStyle}>
                  <FiLogOut size={16} /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && isAuthenticated && (
        <div style={{
          position: 'absolute',
          top: '64px',
          right: 0,
          backgroundColor: '#1f2937',
          width: '100%',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link to="/admin/dashboard" style={mobileLinkStyle(isActive('/admin/dashboard'))} onClick={() => setMenuOpen(false)}>
            <FiHome size={16} /> Dashboard
          </Link>
          <Link to="/admin/projects" style={mobileLinkStyle(isActive('/admin/projects'))} onClick={() => setMenuOpen(false)}>
            <FiBriefcase size={16} /> Projects
          </Link>
          <Link to="/admin/contacts" style={mobileLinkStyle(isActive('/admin/contacts'))} onClick={() => setMenuOpen(false)}>
            <FiUsers size={16} /> Messages
          </Link>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={logoutButtonStyle}>
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const linkStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: active ? 'white' : '#9CA3AF',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  padding: '8px 12px',
  borderRadius: '6px',
  transition: 'all 0.2s ease',
  backgroundColor: active ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
});

const mobileLinkStyle = (active) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: active ? 'white' : '#9CA3AF',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '500',
  padding: '8px 12px',
  borderRadius: '6px',
  backgroundColor: active ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
});

const logoutButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'rgba(31, 41, 55, 0.6)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '6px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer'
};

export default AdminNavbar;
