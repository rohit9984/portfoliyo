/**
 * Route-aware scroll handling.
 * On navigation, deep links with a hash scroll to that section; all other
 * route changes return to the top. Search-only changes (project filters) are
 * intentionally ignored so filtering does not jump the page.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Prefer the requested section when the URL contains a hash.
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    try {
      // Regular page changes start at the top.
      if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
        window.scrollTo(0, 0);
      }
    } catch {
      /* jsdom and some embedded browsers do not implement scrollTo */
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
