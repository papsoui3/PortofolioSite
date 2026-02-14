import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarProjects from "./components/ProjectsNavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
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
