/**
 * Printable resume route (`/resume`).
 * Content is assembled from the same data files used by the Home page, so the
 * resume cannot drift out of sync with the portfolio.
 */
import { Link } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { achievements, certifications } from "../data/credentials";
import { education } from "../data/education";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import site from "../data/site";

function ResumePage() {
  useDocumentTitle("Resume | Rohit Kumar Maurya");

  return (
    <section className="section resume-section">
      <div className="container">
        <div className="resume-toolbar">
          <Link to="/" className="back-link">
            <i className="ri-arrow-left-line" aria-hidden="true"></i> Back home
          </Link>
          <div className="resume-actions">
            {/* Browser print uses the dedicated @media print rules in App.css. */}
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => window.print()}
            >
              Print <i className="ri-printer-line" aria-hidden="true"></i>
            </button>
            <a href={site.resume} className="btn btn-primary" download>
              Download PDF
              <i className="ri-download-2-line" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <article className="resume-sheet">
          <header className="resume-head">
            <div>
              <h1>{site.name}</h1>
              <p className="resume-role">{site.role}</p>
            </div>
            <ul className="resume-contact">
              <li>
                <i className="ri-mail-line" aria-hidden="true"></i>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <i className="ri-phone-line" aria-hidden="true"></i>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <i className="ri-map-pin-line" aria-hidden="true"></i>
                {site.location}
              </li>
              <li>
                <i className="ri-github-line" aria-hidden="true"></i>
                <a href={site.github} target="_blank" rel="noreferrer">
                  github.com/rohit9984
                </a>
              </li>
              <li>
                <i className="ri-linkedin-line" aria-hidden="true"></i>
                <a href={site.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/rohit-kumar-maurya
                </a>
              </li>
            </ul>
          </header>

          <section className="resume-block">
            <h2>Summary</h2>
            <p>
              Full stack web developer and BCA final-year student with hands-on
              experience building responsive web applications. Comfortable with
              React.js, JavaScript, HTML and CSS on the frontend, with Core Java,
              C and C++ fundamentals on the backend side. Quick learner with good
              problem-solving and communication skills, looking for internships,
              freelance work and junior developer roles.
            </p>
          </section>

          <section className="resume-block">
            <h2>Skills</h2>
            {/* Skill groups are shared with the Skills section. */}
            <div className="resume-skills">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.skills.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-block">
            <h2>Projects</h2>
            {/* Every project in projects.js is listed with its stack and summary. */}
            <div className="resume-projects">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="resume-project-head">
                    <h3>{project.title}</h3>
                    <span>{project.tech.join(" · ")}</span>
                  </div>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </section>

          {certifications.length > 0 && (
            <section className="resume-block">
              <h2>Certifications</h2>
              <div className="resume-certifications">
                {certifications.map((item) => (
                  <div key={`${item.title}-${item.issuer}`}>
                    <div className="resume-project-head">
                      <h3>{item.title}</h3>
                      {item.date && <span>{item.date}</span>}
                    </div>
                    <p>
                      {item.issuer}
                      {item.credentialId ? ` — ID ${item.credentialId}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {achievements.length > 0 && (
            <section className="resume-block">
              <h2>Achievements</h2>
              <div className="resume-achievements">
                {achievements.map((item) => (
                  <div key={`${item.title}-${item.year}`}>
                    <div className="resume-project-head">
                      <h3>{item.title}</h3>
                      {item.year && <span>{item.year}</span>}
                    </div>
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="resume-block">
            <h2>Education</h2>
            {/* Newest qualification first, matching the Home timeline. */}
            <div className="resume-education">
              {education.map((item) => (
                <div key={item.degree}>
                  <div className="resume-project-head">
                    <h3>{item.degree}</h3>
                    <span>{item.year}</span>
                  </div>
                  <p>
                    {item.institute}, {item.location} — {item.score}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}

export default ResumePage;
