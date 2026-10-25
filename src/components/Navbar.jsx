import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import site from "../data/site";
import useTheme from "../hooks/useTheme";

const navLinks = [
  { to: "/#about", hash: "about", label: "About" },
  { to: "/#skills", hash: "skills", label: "Skills" },
  { to: "/#services", hash: "services", label: "Services" },
  { to: "/#projects", hash: "projects", label: "Works" },
  { to: "/#contact", hash: "contact", label: "Contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const closeMenu = () => setIsMenuOpen(false);

  const openPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  /* Close the mobile menu with Escape or a click outside the header. */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  /* Prevent the page behind the mobile menu from scrolling. */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /* Close the overlay menu if the window grows into desktop layout. */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Close the mobile menu whenever the route changes. */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  /* Keep keyboard focus inside the open mobile menu. */
  useEffect(() => {
    if (!isMenuOpen || !navRef.current) return undefined;

    const node = navRef.current;
    const focusables = Array.from(
      node.querySelectorAll('a[href], button:not([disabled])')
    );

    if (focusables.length) focusables[0].focus();

    const trapFocus = (event) => {
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", trapFocus);
    return () => node.removeEventListener("keydown", trapFocus);
  }, [isMenuOpen]);

  /* Highlight the nav link for the section currently in view. */
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return undefined;
    }

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const scrollPosition = window.scrollY + 140;
      let current = "";

      navLinks.forEach(({ hash }) => {
        const section = document.getElementById(hash);
        if (section && section.offsetTop <= scrollPosition) {
          current = hash;
        }
      });

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  return (
    <header className="header" ref={headerRef}>
      <div className="container nav-container">
        <Link
          to="/"
          className="logo"
          aria-label={`${site.name} — home`}
          onClick={closeMenu}
        >
          <span className="logo-text">
            Rohit<span>.dev</span>
          </span>
        </Link>

        <nav
          id="primary-navigation"
          ref={navRef}
          className={`nav-menu ${isMenuOpen ? "open" : ""}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${
                isHome && activeSection === link.hash ? "active" : ""
              }`}
              aria-current={
                isHome && activeSection === link.hash ? "location" : undefined
              }
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/resume" className="nav-link" onClick={closeMenu}>
            Resume
          </Link>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <i
              className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}
              aria-hidden="true"
            ></i>
          </button>

          <button
            type="button"
            className="icon-btn palette-trigger"
            onClick={openPalette}
            aria-label="Open quick navigation"
            title="Quick navigation (Ctrl + K)"
          >
            <i className="ri-search-line" aria-hidden="true"></i>
            <kbd>Ctrl K</kbd>
          </button>

          <Link to="/#contact" className="btn btn-primary nav-hire">
            Hire Me <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-controls="primary-navigation"
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <i
              className={isMenuOpen ? "ri-close-line" : "ri-menu-3-line"}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
