import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    try {
      if (window.scrollY > 0 || document.documentElement.scrollTop > 0) {
        window.scrollTo(0, 0);
      }
    } catch {
      /* jsdom and some embedded browsers do not implement scrollTo */
    }
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;
