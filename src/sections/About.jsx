import site from "../data/site";

const facts = [
  {
    icon: "ri-user-3-line",
    label: "Name",
    value: site.name,
  },
  {
    icon: "ri-map-pin-2-line",
    label: "Location",
    value: site.location,
  },
  {
    icon: "ri-briefcase-4-line",
    label: "Role",
    value: "Full Stack Web Developer",
  },
  {
    icon: "ri-graduation-cap-line",
    label: "Education",
    value: "BCA — St. Andrews Institute of Technology & Management",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Availability",
    value: "Open to internships & freelance work",
    highlight: true,
  },
];

const currentFocus = [
  {
    icon: "ri-code-box-line",
    label: "Building",
    value: "Full-stack projects with React on the front end",
  },
  {
    icon: "ri-book-open-line",
    label: "Learning",
    value: "Core Java, APIs and backend fundamentals",
  },
  {
    icon: "ri-briefcase-line",
    label: "Open to",
    value: "Internships, freelance and junior developer roles",
  },
];

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <span className="section-subtitle">ABOUT ME</span>
            <h2 className="section-title">Full stack developer, learner, problem solver.</h2>

            <p>
              I&apos;m Rohit Kumar Maurya, a BCA final-year student and full stack
              web developer based in Gurugram, Haryana. I enjoy taking an idea from
              design to deployment — building clean, responsive interfaces with
              React.js and connecting them to the logic and data behind them.
            </p>
            <p>
              I have hands-on experience building web projects end to end, and
              I&apos;m strengthening my backend fundamentals with Core Java, C and
              C++. I care about readable code, learning from feedback, and
              shipping work that is genuinely useful.
            </p>

            <div className="about-actions">
              <a href="#contact" className="btn btn-primary">
                Let&apos;s work together
                <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
              </a>
              <a
                href={site.github}
                className="btn btn-outline"
                target="_blank"
                rel="noreferrer"
              >
                <i className="ri-github-fill" aria-hidden="true"></i> GitHub
              </a>
            </div>
          </div>

          <aside className="about-card" aria-label="Quick facts" data-reveal>
            <h3>Quick facts</h3>
            <ul className="facts-list">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span className="fact-icon" aria-hidden="true">
                    <i className={fact.icon}></i>
                  </span>
                  <div>
                    <span className="fact-label">{fact.label}</span>
                    <span
                      className={`fact-value ${
                        fact.highlight ? "available" : ""
                      }`}
                    >
                      {fact.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="now-strip" data-reveal>
          {currentFocus.map((item) => (
            <div className="now-item" key={item.label}>
              <span className="fact-icon" aria-hidden="true">
                <i className={item.icon}></i>
              </span>
              <div>
                <span className="fact-label">{item.label}</span>
                <span className="fact-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
