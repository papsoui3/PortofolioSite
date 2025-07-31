// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  // Your contact info:
  const phoneNumber = '+94768840107'; // in international format without spaces for links
  const displayPhone = '+94 768 840 107'; // formatted for display
  const email = 'himanthad4@gmail.com';
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`; // wa.me link

  // Helper: detect if mobile device (simple)
  const isMobile = () => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // On mobile, phone opens tel:, whatsapp opens wa.me, email mailto:
  // On desktop, same but whatsapp opens web whatsapp link.

  return (
    <>
      <style>{`
        footer {
          background-color: #0f172a;
          color: #cbd5e1;
          padding: 1.8rem 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
        }
        .footer-left, .footer-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .footer-left span, .footer-right a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .footer-left span strong {
          color: #f97316;
        }
        .footer-left a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 600;
        }
        .footer-left a:hover,
        .footer-left a:focus {
          color: #f97316;
          outline: none;
        }
        .footer-right a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background-color: rgba(249, 115, 22, 0.15);
          color: #f97316;
          font-size: 1.3rem;
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
          user-select: none;
        }
        .footer-right a:hover,
        .footer-right a:focus {
          background-color: #f97316;
          color: #fff;
          outline: none;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(249, 115, 22, 0.6);
        }
        @media (max-width: 600px) {
          .footer-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          .footer-left, .footer-right {
            justify-content: center;
          }
          .footer-left span, .footer-left a {
            display: block;
          }
        }
      `}</style>

      <footer>
        <div className="footer-container">
          <div className="footer-left">
           
            <a
              href={isMobile() ? `tel:${phoneNumber}` : `tel:${phoneNumber}`}
              aria-label="Call phone"
              title="Call phone"
            >
              📞 {displayPhone}
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Send Email"
              title="Send Email"
            >
              ✉️ {email}
            </a>
          </div>

          <div className="footer-right" aria-label="Social and Contact Links">
            <a
              href="https://github.com/himanthad4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub (Private)"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/himantha-hirushan-390122212/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/bytrmuse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page Bytrmuse"
              title="Facebook Page Bytrmuse"
            >
              <FaFacebookF />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Chat"
              title="WhatsApp Chat"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
