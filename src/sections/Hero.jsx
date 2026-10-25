/**
 * Hero / above-the-fold section.
 * Introduces Rohit, shows availability, primary actions, core technologies and
 * the portrait. The portrait is preloaded in public/index.html.
 */
import site from "../data/site";

// Short list shown under the hero buttons.
const techStack = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Core Java",
  "Git",
];

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left column: headline, description and primary actions. */}
        <div className="hero-content" data-reveal>
          <span className="badge-status">
            <span className="status-dot"></span>
            {site.availability}
          </span>

          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight">Rohit Maurya</span> — a Full
            Stack Web Developer building modern, responsive web applications.
          </h1>

          <p className="hero-desc">
            I build complete web experiences — responsive React interfaces on the
            front end, supported by Java fundamentals and a growing backend
            toolkit. Final-year BCA student, open to internships and freelance
            work.
          </p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              View My Work <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </a>
            <a href={site.resume} className="btn btn-outline" download>
              Download CV <i className="ri-download-2-line" aria-hidden="true"></i>
            </a>
          </div>

          <ul className="hero-stack" aria-label="Core technologies">
            {techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="hero-image-wrap" data-reveal>
          {/* Decorative blob; the portrait card sits above it. */}
          <div className="hero-blob" aria-hidden="true"></div>
          <div className="image-card">
            <img
              src="/Images/portrait.jpg"
              alt="Portrait of Rohit Kumar Maurya"
              className="profile-img"
              width="900"
              height="900"
              fetchPriority="high"
            />
          </div>
          <div className="hero-float">
            <i className="ri-map-pin-2-line" aria-hidden="true"></i>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
