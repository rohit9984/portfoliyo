/**
 * Project case-study page.
 * The slug comes from the URL, is looked up in the central project data, and
 * falls back to the 404 page when no match exists.
 */
import { Link, useParams } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { getProjectBySlug, projects } from "../data/projects";
import NotFound from "./NotFound";

function ProjectDetail() {
  const { slug } = useParams();
  // `project` is undefined for an invalid or removed slug.
  const project = getProjectBySlug(slug);

  // Set a page-specific browser title before deciding whether to show 404.
  useDocumentTitle(
    project
      ? `${project.title} | Rohit Kumar Maurya`
      : "Project not found | Rohit Kumar Maurya"
  );

  if (!project) {
    return <NotFound />;
  }

  // Every other project is offered as a "next" link at the bottom.
  const otherProjects = projects.filter((item) => item.id !== project.id);

  return (
    <section className="section case-section">
      <div className="container case-container">
        {/* Always provide a way back to the filtered project list. */}
        <Link to="/#projects" className="back-link">
          <i className="ri-arrow-left-line" aria-hidden="true"></i> Back to
          projects
        </Link>

        <header className="case-header" data-reveal>
          <span className="category-tag">{project.categoryLabel}</span>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-tagline">{project.tagline}</p>
          <p className="case-intro">{project.description}</p>

          <div className="case-actions">
            <a
              href={project.link}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              View live project
              <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
            </a>
            <Link to="/#contact" className="btn btn-outline">
              Discuss a project
              <i className="ri-mail-send-line" aria-hidden="true"></i>
            </Link>
          </div>
        </header>

        <div className="case-media" data-reveal>
          {/* Projects without a screenshot use the shared placeholder design. */}
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              width="900"
              height="563"
            />
          ) : (
            <div className="project-placeholder case-placeholder">
              <i className={project.icon} aria-hidden="true"></i>
              <span>{project.title}</span>
            </div>
          )}
        </div>

        <div className="case-grid">
          <div className="case-body" data-reveal>
            <h2>Overview</h2>
            <p>{project.overview}</p>

            <h2>What I built</h2>
            <ul className="case-highlights">
              {project.highlights.map((item) => (
                <li key={item}>
                  <i className="ri-check-line" aria-hidden="true"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="case-sidebar" data-reveal>
            {/* Quick facts are all optional data fields from projects.js. */}
            <div className="case-meta">
              <div>
                <span className="fact-label">Year</span>
                <span className="fact-value">{project.year}</span>
              </div>
              <div>
                <span className="fact-label">Role</span>
                <span className="fact-value">{project.role}</span>
              </div>
              <div>
                <span className="fact-label">Category</span>
                <span className="fact-value">{project.categoryLabel}</span>
              </div>
            </div>

            <div className="case-stack">
              <span className="fact-label">Tech stack</span>
              <ul className="skill-tags">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>

            <a
              href={project.link}
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              Open live site
              <i className="ri-arrow-right-up-line" aria-hidden="true"></i>
            </a>

            {project.repo && (
              // The source link is only rendered when a repo URL exists.
              <a
                href={project.repo}
                className="text-link muted"
                target="_blank"
                rel="noreferrer"
              >
                Source code
                <i className="ri-github-line" aria-hidden="true"></i>
              </a>
            )}
          </aside>
        </div>

        <div className="case-next">
          {/* Cross-links keep visitors exploring instead of leaving the site. */}
          <span className="fact-label">More projects</span>
          <div className="case-next-links">
            {otherProjects.map((item) => (
              <Link
                to={`/projects/${item.slug}`}
                className="case-next-card"
                key={item.id}
              >
                <span>{item.title}</span>
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
