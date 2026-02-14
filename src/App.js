import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarProjects from "./components/ProjectsNavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { Helmet } from "react-helmet";
import AllProjects from "./pages/AllProjects";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isProjectsRoute = location.pathname === "/projects";

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        scrollBehavior: "smooth",
        minHeight: "100vh",
      }}
    >
      <ScrollToTop />

      <Helmet>
        <title>Alex Portfolio | React Developer</title>
        <meta
          name="description"
          content="Explore Alex's portfolio, showcasing React projects, web development skills, and creative solutions."
        />
        <meta
          name="keywords"
          content="React, Portfolio, Developer, Alex, Web Development"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="cINDlTWBfETnc7Dmi5utrfpaGmyzX1quWqweIZXPam8"
        />
        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://alex-portofolio-site.vercel.app${location.pathname}`}
        />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Alex Portfolio | React Developer" />
        <meta
          property="og:description"
          content="Explore Alex's portfolio, showcasing React projects, web development skills, and creative solutions."
        />
        <meta
          property="og:image"
          content="https://alex-portofolio-site.vercel.app/og-image.png"
        />
        <meta
          property="og:url"
          content={`https://alex-portofolio-site.vercel.app${location.pathname}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Conditional Navbar Rendering */}
      {isProjectsRoute ? <NavbarProjects /> : <Navbar />}

      {/* Main Content Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />

        {/* Optional: 404 Page */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Footer (not shown on admin routes) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
