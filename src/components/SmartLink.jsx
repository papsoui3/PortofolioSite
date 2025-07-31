// components/SmartLink.jsx
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const SmartLink = ({ to, children, ...props }) => {
  const location = useLocation();
  
  // If we're on Home page, use react-scroll
  if (location.pathname === '/') {
    return (
      <ScrollLink 
        to={to}
        smooth={true}
        duration={500}
        offset={-80}
        {...props}
      >
        {children}
      </ScrollLink>
    );
  }
  
  // Otherwise navigate to Home with hash
  return (
    <RouterLink 
      to={`/#${to}`} 
      onClick={() => {
        // Smooth scroll after navigation completes
        setTimeout(() => {
          const element = document.getElementById(to);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default SmartLink;