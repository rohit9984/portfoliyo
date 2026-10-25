/**
 * 404 fallback for unknown routes.
 * Also rendered by ProjectDetail when a project slug does not exist.
 */
import { Link } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";

function NotFound() {
  useDocumentTitle("Page not found | Rohit Kumar Maurya");

  return (
    <section className="section not-found">
      <div className="container not-found-inner">
        <span className="not-found-code">404</span>
        <h1 className="section-title">This page wandered off.</h1>
        <p className="section-lead">
          The link may be broken, or the page may have moved. Let&apos;s get you
          back to the good stuff.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Back home <i className="ri-home-4-line" aria-hidden="true"></i>
          </Link>
          <Link to="/#projects" className="btn btn-outline">
            See projects
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
