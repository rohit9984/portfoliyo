/**
 * Projects section.
 * Reads project content from data/projects.js, supports URL-synced category
 * filters and links each card to its generated case-study route.
 */
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { projectFilters, projects } from "../data/projects";
import site from "../data/site";

function Project() {
  // `filter` is read from the query string so filtered views are shareable.
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedFilter = searchParams.get("filter");
  // Ignore unknown filter values and fall back to "all".
  const activeFilter = projectFilters.some(
    (filter) => filter.id === requestedFilter
  )
    ? requestedFilter
    : "all";

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Update only the query string while preserving the current path and hash.
  // This prevents filter clicks from scrolling back to the top of the page.
  const selectFilter = (id) => {
    const params = new URLSearchParams();
    if (id !== "all") {
      params.set("filter", id);
    }
    const search = params.toString();

    navigate(
      {
        pathname: location.pathname,
        search: search ? `?${search}` : "",
        hash: location.hash,
      },
      { replace: true }
    );
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">PORTFOLIO</span>
          <h2 className="section-title">Recent work & projects</h2>
          <p className="section-lead">
            A few things I&apos;ve designed, built and shipped — each with a
            short case study.
          </p>
        </div>

        <div
          className="filter-tabs"
          role="group"
          aria-label="Filter projects by category"
        >
          {/* aria-pressed communicates the active filter to assistive tech. */}
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => selectFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {/* Cards fall back to an icon placeholder when no screenshot exists. */}
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.id} data-reveal>
              <Link
                className="project-media"
                to={`/projects/${project.slug}`}
                aria-label={`Read the ${project.title} case study`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    width="900"
                    height="563"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="project-placeholder">
                    <i className={project.icon} aria-hidden="true"></i>
                    <span>{project.title}</span>
                  </span>
                )}
                <span className="project-media-overlay" aria-hidden="true">
                  <i className="ri-article-line"></i> Read case study
                </span>
              </Link>

              <div className="project-info">
                <span className="category-tag">{project.categoryLabel}</span>
                <h3>{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
                <p className="project-desc">{project.description}</p>

                <ul className="tech-tags" aria-label="Technologies used">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {/* Internal case study + external live demo. */}
                  <Link to={`/projects/${project.slug}`} className="text-link">
                    Case study
                    <i className="ri-arrow-right-line" aria-hidden="true"></i>
                  </Link>
                  <a
                    href={project.link}
                    className="text-link muted"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live site
                    <i
                      className="ri-arrow-right-up-line"
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-more">
          <a
            href={site.github}
            className="btn btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <i className="ri-github-line" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Project;
