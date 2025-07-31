import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(username, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(ellipse at top right, #1e293b, #0f172a)',
      padding: '16px',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      marginTop:'30px',
    },
    backgroundCircle: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'rgba(59,130,246,0.1)',
      opacity: 0.2
    },
    formWrapper: {
      position: 'relative',
      zIndex: 10,
      backgroundColor: 'rgba(15,23,42,0.85)',
      backdropFilter: 'blur(15px)',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.1)',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
    },
    logoCircle: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
    },
    heading: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    subheading: {
      textAlign: 'center',
      color: '#94a3b8',
      fontSize: '14px'
    },
    errorBox: {
      backgroundColor: 'rgba(239,68,68,0.15)',
      color: '#fecaca',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      margin: '16px 0'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      color: '#94a3b8',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 500
    },
    inputWrapper: {
      position: 'relative'
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    input: {
      width: '100%',
      padding: '12px 16px 12px 40px',
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 600,
      color: '#fff',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    buttonDisabled: {
      backgroundColor: 'rgba(59,130,246,0.5)',
      cursor: 'not-allowed'
    },
    footerText: {
      marginTop: '24px',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '12px'
    },
    spinner: {
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...styles.backgroundCircle,
            width: `${Math.random() * 150 + 80}px`,
            height: `${Math.random() * 150 + 80}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.formWrapper}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'mirror',
            repeatDelay: 2
          }}
          style={styles.logoCircle}
        >
          <FiLock color="#fff" size={28} />
        </motion.div>

        <h2 style={styles.heading}>Admin Portal</h2>
        <p style={styles.subheading}>Secure login to admin dashboard</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <FiUser style={styles.icon} />
              <input
                type="text"
                style={styles.input}
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <FiLock style={styles.icon} />
              <input
                type="password"
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: !isLoading ? 0.98 : 1 }}
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
          >
            {isLoading ? (
              <>
                <svg
                  style={styles.spinner}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    opacity="0.75"
                  />
                </svg>
                <span style={{ marginLeft: '8px' }}>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <FiArrowRight />
              </>
            )}
          </motion.button>
        </form>

        <div style={styles.footerText}>
          Access restricted to authorized admin users
        </div>
      </motion.div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59,130,246,0.2) !important;
          }
          button:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
