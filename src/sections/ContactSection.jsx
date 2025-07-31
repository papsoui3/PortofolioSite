import React, { useState } from 'react';
import { FaPaperPlane, FaLightbulb, FaRocket, FaMagic, FaExclamationCircle, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  {
    icon: <FaLightbulb />,
    title: 'Share Idea',
    description: 'No limits',
    color: '#f59e0b',
    backContent: 'Got an idea? Let us help bring it to life!'
  },
  {
    icon: <FaRocket />,
    title: 'Quick Chat',
    description: 'Make it happen',
    color: '#60a5fa',
    backContent: 'Need fast answers? We\'re here for you!'
  },
  {
    icon: <FaMagic />,
    title: 'Brainstorm',
    description: 'Creative ideas',
    color: '#a78bfa',
    backContent: 'Let\'s collaborate on something amazing!'
  }
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email';
    }
    if (name === 'phone' && value && !/^[\d\s+\-()]{10,20}$/.test(value)) {
      error = 'Invalid phone';
    }
    if (name === 'message' && value.length < 10) {
      error = 'Min 10 characters';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const errors = {
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };
    setFormErrors(errors);
    return !formData.email || !formData.message || errors.email || errors.phone || errors.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(response.data.message || 'Failed to send');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        #contact {
          min-height: 90vh;
          background: linear-gradient(to top, #0f172a, #1e293b);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 1rem;
          position: relative;
          overflow: hidden;
           margin-top: -1rem;
        }

        .contact-container {
          max-width: 1000px;
          width: 100%;
          padding: -2rem;
          position: relative;
          z-index: 2;
          margin-Top:'100rem',
        }

        .header-wrapper {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .section-header {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .section-header span:first-child {
          background: linear-gradient(135deg, #f97316, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header span:last-child {
          color: #9ba7b2;
        }

        .section-subheader {
          color: #94a3b8;
          font-size: 0.95rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .floating-cards {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 2rem 0;
          position: relative;
          z-index: 3;
          flex-wrap: wrap;
        }

        .card-container {
          perspective: 1000px;
          width: 100px;
          height: 100px;
        }

        .card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
          cursor: pointer;
          border-radius: 12px;
        }

        .card:hover {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.8rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
        }

        .card-front {
          transform: rotateY(0deg);
        }

        .card-back {
          transform: rotateY(180deg);
          background: rgba(30, 41, 59, 0.9);
          border-color: rgba(255,255,255,0.15);
        }

        .card-icon {
          font-size: 1.5rem;
          margin-bottom: 0.4rem;
          transition: all 0.3s ease;
        }

        .card-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 0.2rem;
        }

        .card-desc {
          font-size: 0.65rem;
          color: #94a3b8;
        }

        .card-back-content {
          font-size: 0.7rem;
          color: #e2e8f0;
          line-height: 1.4;
        }

        .form-container {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          position: relative;
          z-index: 2;
        }

        .form-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, #f97316, #f59e0b);
          border-radius: 16px 16px 0 0;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          position: relative;
        }

        input, textarea {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(30, 41, 59, 0.5);
          color: #e2e8f0;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.1);
        }

        textarea {
          min-height: 120px;
          resize: vertical;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .success-message {
          color: #22c55e;
          font-size: 0.75rem;
          margin-top: 0.3rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .submit-btn {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(135deg, #f97316, #f59e0b);
          border: none;
          border-radius: 8px;
          color: #0f172a;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(249,115,22,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .submit-btn:hover::after {
          opacity: 1;
        }

        .loading-spinner {
          display: inline-block;
          width: 0.9rem;
          height: 0.9rem;
          border: 2px solid rgba(15,23,42,0.3);
          border-radius: 50%;
          border-top-color: #0f172a;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          animation: float 15s linear infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          #contact {
            min-height: auto;
            padding: 1.5rem 1rem;
          }
          
          .floating-cards {
            gap: 1rem;
          }
          
          .card-container {
            width: 90px;
            height: 90px;
          }
          
          .card-back-content {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .header-wrapper {
            margin-bottom: 1.5rem;
          }
          
          .floating-cards {
            gap: 0.8rem;
          }
          
          .card-container {
            width: 80px;
            height: 80px;
          }
          
          .card-icon {
            font-size: 1.2rem;
          }
          
          .card-title {
            font-size: 0.7rem;
          }
          
          .card-desc {
            font-size: 0.6rem;
          }
          
          .form-container {
            padding: 1.2rem;
          }
          
          input, textarea {
            padding: 0.7rem;
            font-size: 0.85rem;
          }
          
          textarea {
            min-height: 100px;
          }
        }
      `}</style>

      <section id="contact">
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`
              }}
            />
          ))}
        </div>

        <div className="contact-container">
          <div className="header-wrapper">
            <h2 className="section-header">
              <span>Let's</span>{' '}
              <span>Connect</span>
            </h2>
            <p className="section-subheader">
              Share your ideas and let's create something amazing together
            </p>
          </div>

          <div className="floating-cards">
            {cards.map((card, index) => (
              <div key={index} className="card-container">
                <div className="card">
                  <div className="card-face card-front" style={{ borderColor: card.color }}>
                    <div className="card-icon" style={{ color: card.color }}>
                      {card.icon}
                    </div>
                    
                  </div>
                  <div className="card-face card-back" style={{ borderColor: card.color }}>
                    <div className="card-back-content">{card.backContent}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.div
                      className="error-message"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaExclamationCircle size={12} /> {formErrors.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <AnimatePresence>
                  {formErrors.phone && (
                    <motion.div
                      className="error-message"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaExclamationCircle size={12} /> {formErrors.phone}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your project or idea..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <AnimatePresence>
                  {formErrors.message ? (
                    <motion.div
                      className="error-message"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaExclamationCircle size={12} /> {formErrors.message}
                    </motion.div>
                  ) : formData.message.length > 10 && (
                    <motion.div
                      className="success-message"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <FaCheck size={12} /> Looks great!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={loading || Object.values(formErrors).some(err => err)}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span> Sending...
                  </>
                ) : submitted ? (
                  <>
                    Message Sent! <FaPaperPlane />
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;