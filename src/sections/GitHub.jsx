import { useEffect, useState } from "react";

import site from "../data/site";

const CACHE_KEY = "rohit-portfolio-github-repos";
const CACHE_TTL = 10 * 60 * 1000;

function readCache() {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached.time || Date.now() - cached.time > CACHE_TTL) return null;
    return cached.repos;
  } catch {
    return null;
  }
}

function GitHub() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setRepos(cached);
      setStatus("ready");
      return undefined;
    }

    if (typeof fetch !== "function") {
      setStatus("error");
      return undefined;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    fetch(
      "https://api.github.com/users/rohit9984/repos?sort=updated&per_page=6",
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        window.clearTimeout(timeout);
        const list = data
          .filter((repo) => !repo.fork)
          .slice(0, 4)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count,
            updated: repo.updated_at,
          }));
        setRepos(list);
        setStatus("ready");
        try {
          window.sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ time: Date.now(), repos: list })
          );
        } catch {
          /* storage may be unavailable */
        }
      })
      .catch(() => {
        window.clearTimeout(timeout);
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const formatDate = (value) =>
    new Intl.DateTimeFormat("en-GB", {
      month: "short",
      year: "numeric",
    }).format(new Date(value));

  return (
    <section id="github" className="section github-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">OPEN SOURCE</span>
          <h2 className="section-title">Latest on GitHub</h2>
          <p className="section-lead">
            Live from my GitHub profile — recent repositories, straight from the
            API.
          </p>
        </div>

        {status === "loading" && (
          <div className="github-grid" aria-live="polite">
            {[0, 1, 2].map((index) => (
              <div className="repo-card skeleton" key={index}>
                <span className="skeleton-line wide"></span>
                <span className="skeleton-line"></span>
                <span className="skeleton-line short"></span>
              </div>
            ))}
          </div>
        )}

        {status === "ready" && repos.length > 0 && (
          <div className="github-grid">
            {repos.map((repo) => (
              <a
                className="repo-card"
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="repo-top">
                  <i className="ri-git-repository-line" aria-hidden="true"></i>
                  <span className="repo-name">{repo.name}</span>
                  <i
                    className="ri-arrow-right-up-line repo-arrow"
                    aria-hidden="true"
                  ></i>
                </div>
                <p className="repo-desc">
                  {repo.description || "No description added yet."}
                </p>
                <div className="repo-meta">
                  {repo.language && (
                    <span className="repo-language">
                      <span className="language-dot" aria-hidden="true"></span>
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-stat">
                    <i className="ri-star-line" aria-hidden="true"></i>
                    {repo.stars}
                  </span>
                  <span className="repo-stat">
                    Updated {formatDate(repo.updated)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="github-fallback">
            GitHub is taking a moment to respond. You can still browse all my
            repositories on{" "}
            <a href={site.github} target="_blank" rel="noreferrer">
              github.com/rohit9984
            </a>
            .
          </p>
        )}

        <div className="projects-more">
          <a
            href={site.github}
            className="btn btn-outline"
            target="_blank"
            rel="noreferrer"
          >
            <i className="ri-github-fill" aria-hidden="true"></i> Visit GitHub
            profile
          </a>
        </div>
      </div>
    </section>
  );
}

export default GitHub;
