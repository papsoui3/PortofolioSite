import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FaBars, FaTimes, FaFileDownload } from "react-icons/fa";

const SmartNavLink = ({
  to,
  children,
  activeLink,
  setActiveLink,
  linkRefs,
  scrollSettings,
  handleMouseEnter,
  handleMouseLeave,
  ...props
}) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <ScrollLink
        to={to}
        spy={true}
        smooth={true}
        offset={scrollSettings.offset}
        duration={scrollSettings.duration}
        innerRef={(el) => (linkRefs.current[to] = el)}
        onSetActive={() => setActiveLink(to)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </ScrollLink>
    );
  }

  return (
    <RouterLink
      to={`/#${to}`}
      onClick={() => {
        setActiveLink(to);
        setTimeout(() => {
          const element = document.getElementById(to);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 10);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

const ProjectNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const updateUnderline = React.useCallback(
    (linkName) => {
      if (isMobile) return;

      const linkElement = linkRefs.current[linkName];
      if (!linkElement || !navRef.current) return;

      const linkRect = linkElement.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      setUnderlineStyle({
        width: linkRect.width,
        left: linkRect.left - navRect.left,
        opacity: 1,
        transition: "all 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)",
      });
    },
    [isMobile],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
      updateUnderline(activeLink);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeLink, updateUnderline]);

  const navItems = React.useMemo(
    () => [
      {
        name: "Back",
        target: "home",
        scrollSettings: {
          duration: 600,
          offset: -80,
        },
      },
    ],
    [],
  );

  useEffect(() => {
    if (navItems.length > 0 && !isMobile) {
      updateUnderline(activeLink);
    }
  }, [
    activeLink,
    location.pathname,
    isMobile,
    updateUnderline,
    navItems.length,
  ]);

  const handleMouseEnter = (linkName) => {
    if (linkName !== activeLink && !isMobile) {
      updateUnderline(linkName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      updateUnderline(activeLink);
    }
  };

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);

      const cvFilename = "himantha_cv.pdf";
      const publicPath = process.env.PUBLIC_URL || "";
      const cvUrl = `${publicPath}/documents/${cvFilename}`;

      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = `Himantha_Hirushan_CV_${new Date().getFullYear()}.pdf`;
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(cvUrl);
      }, 100);
    } catch (error) {
      console.error("Download error:", error);
      alert("CV download failed. Please contact me directly at your@email.com");
    } finally {
      setIsDownloading(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        if (isOpen && isMobile) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        backgroundColor: scrolled
          ? "rgba(15, 23, 42, 0.98)"
          : "rgba(15, 23, 42, 0.95)",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: "0.5rem 0",
        height: "60px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        ref={navRef}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Logo */}
        <SmartNavLink
          to="home"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          linkRefs={linkRefs}
          scrollSettings={{ duration: 600, offset: -80 }}
          handleMouseEnter={() => handleMouseEnter("home")}
          handleMouseLeave={handleMouseLeave}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
            zIndex: 1001,
          }}
          onClick={() => isMobile && setIsOpen(false)}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "white",
                letterSpacing: "-0.5px",
                position: "relative",
              }}
            >
              Byte
              <span
                style={{
                  color: "#f97316",
                  fontWeight: 800,
                }}
              >
                Muse
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                right: 0,
                height: "2px",
                width: "100%",
                background: "linear-gradient(90deg, #f97316, #f59e0b)",
                borderRadius: "1px",
              }}
            ></div>
          </div>
        </SmartNavLink>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: "1.2rem",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1.8rem",
                marginRight: "1.8rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  height: "2px",
                  background: "linear-gradient(90deg, #f97316, #f59e0b)",
                  borderRadius: "1px",
                  ...underlineStyle,
                }}
              ></div>

              {navItems.map((item) => (
                <SmartNavLink
                  key={item.name}
                  to={item.target}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                  linkRefs={linkRefs}
                  scrollSettings={item.scrollSettings}
                  handleMouseEnter={() => handleMouseEnter(item.target)}
                  handleMouseLeave={handleMouseLeave}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    color: activeLink === item.target ? "#f97316" : "#cbd5e1",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    padding: "0.3rem 0",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </SmartNavLink>
              ))}
            </div>

            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              style={{
                background: "rgba(249, 115, 22, 0.15)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
                color: "#f97316",
                padding: "0.5rem 1.2rem",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                fontSize: "0.9rem",
                fontWeight: "500",
                letterSpacing: "0.3px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Inter', sans-serif",
                opacity: isDownloading ? 0.7 : 1,
                pointerEvents: isDownloading ? "none" : "auto",
              }}
              onMouseEnter={(e) => {
                if (!isDownloading) {
                  e.target.style.background = "rgba(249, 115, 22, 0.25)";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(249, 115, 22, 0.15)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <FaFileDownload style={{ fontSize: "0.9rem" }} />
              <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            style={{
              background: "none",
              border: "none",
              color: isOpen ? "#f97316" : "#cbd5e1",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "5px",
              zIndex: 1001,
              transition: "all 0.3s ease",
            }}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          ref={mobileMenuRef}
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            backgroundColor: "rgba(15, 23, 42, 0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 999,
            padding: "1rem",
            display: isOpen ? "flex" : "none",
            flexDirection: "column",
            gap: "0.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            transform: isOpen ? "translateY(0)" : "translateY(-100%)",
            opacity: isOpen ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {navItems.map((item) => (
            <SmartNavLink
              key={item.name}
              to={item.target}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
              linkRefs={linkRefs}
              scrollSettings={item.scrollSettings}
              style={{
                padding: "1rem 1.5rem",
                color: activeLink === item.target ? "#f97316" : "#cbd5e1",
                fontSize: "1.1rem",
                fontWeight: 500,
                textDecoration: "none",
                borderRadius: "6px",
                background:
                  activeLink === item.target
                    ? "rgba(249, 115, 22, 0.1)"
                    : "transparent",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={() => {
                setIsOpen(false);
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(249, 115, 22, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  activeLink === item.target
                    ? "rgba(249, 115, 22, 0.1)"
                    : "transparent")
              }
            >
              {item.name}
            </SmartNavLink>
          ))}

          <button
            onClick={() => {
              handleDownloadCV();
              setIsOpen(false);
            }}
            disabled={isDownloading}
            style={{
              padding: "1rem 1.5rem",
              background: "rgba(249, 115, 22, 0.15)",
              border: "1px solid rgba(249, 115, 22, 0.2)",
              color: "#f97316",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1.1rem",
              fontWeight: "500",
              marginTop: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
              fontFamily: "'Inter', sans-serif",
              opacity: isDownloading ? 0.7 : 1,
              pointerEvents: isDownloading ? "none" : "auto",
            }}
          >
            <FaFileDownload style={{ fontSize: "1rem" }} />
            <span>{isDownloading ? "Downloading..." : "Download CV"}</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default ProjectNavBar;
