/**
 * Keyboard quick-navigation palette (Ctrl/Cmd + K).
 * Actions are generated from data, so new projects appear automatically.
 * Supports search, arrow-key navigation, Enter to open and Escape to close.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { projects } from "../data/projects";
import site from "../data/site";

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // The navbar can open the palette through a custom browser event.
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const handleKey = (event) => {
      // Ctrl/Cmd + K toggles the palette from anywhere on the site.
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      }
      if (event.key === "Escape") close();
    };

    window.addEventListener("open-command-palette", open);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("open-command-palette", open);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    // Reset search and selection every time the palette closes.
    if (!isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Each item either navigates inside the SPA (`to`) or leaves the site (`href`).
  const actions = [
    { group: "Sections", label: "Home", to: "/" },
    { group: "Sections", label: "About", to: "/#about" },
    { group: "Sections", label: "Skills", to: "/#skills" },
    { group: "Sections", label: "Services", to: "/#services" },
    { group: "Sections", label: "Projects", to: "/#projects" },
    { group: "Sections", label: "GitHub", to: "/#github" },
    { group: "Sections", label: "Education", to: "/#education" },
    { group: "Sections", label: "Contact", to: "/#contact" },
    { group: "Pages", label: "Resume", to: "/resume" },
    ...projects.map((project) => ({
      group: "Projects",
      label: project.title,
      to: `/projects/${project.slug}`,
    })),
    { group: "Elsewhere", label: "GitHub profile", href: site.github },
    { group: "Elsewhere", label: "LinkedIn profile", href: site.linkedin },
    { group: "Elsewhere", label: "Send an email", href: `mailto:${site.email}` },
  ];

  // Case-insensitive search across both the label and its group.
  const filtered = query
    ? actions.filter((action) =>
        `${action.label} ${action.group}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : actions;

  const runAction = (action) => {
    if (!action) return;
    setIsOpen(false);
    // External links use a normal browser navigation; internal routes use React Router.
    if (action.href) {
      window.location.href = action.href;
      return;
    }
    navigate(action.to);
  };

  const handleInputKeyDown = (event) => {
    // Arrow keys wrap around the filtered list; Enter runs the highlighted item.
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + filtered.length) % filtered.length
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      runAction(filtered[activeIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="palette-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div className="palette">
        <div className="palette-search">
          <i className="ri-search-line" aria-hidden="true"></i>
          <input
            type="text"
            autoFocus
            placeholder="Search sections, projects, links..."
            aria-label="Search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="palette-list">
          {filtered.length === 0 && (
            <li className="palette-empty">No results for “{query}”.</li>
          )}
          {filtered.map((action, index) => {
            const showGroup =
              index === 0 || filtered[index - 1].group !== action.group;

            return (
              <li key={`${action.group}-${action.label}`}>
                {showGroup && (
                  <span className="palette-group" aria-hidden="true">
                    {action.group}
                  </span>
                )}
                <button
                  type="button"
                  className={`palette-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runAction(action)}
                >
                  <span>{action.label}</span>
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="palette-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>Ctrl</kbd> <kbd>K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
