/**
 * Site footer.
 * Shows the current year automatically and reuses shared contact/social data.
 */
import site from "../data/site";

function Footer() {
  // Computed on render, so the copyright stays correct without manual edits.
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div>
              <p className="footer-name">{site.name}</p>
              <p className="footer-tagline">{site.tagline}</p>
            </div>
          </div>

          {/* Primary in-page navigation. It works from any route because the
              browser returns to the home page before jumping to the hash. */}
          <nav className="footer-nav" aria-label="Footer">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Works</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* External profiles and a direct email shortcut. */}
          <div className="social-links">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <i className="ri-github-fill" aria-hidden="true"></i>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <i className="ri-linkedin-fill" aria-hidden="true"></i>
            </a>
            <a href={`mailto:${site.email}`} aria-label="Send an email">
              <i className="ri-mail-send-line" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built with React.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
