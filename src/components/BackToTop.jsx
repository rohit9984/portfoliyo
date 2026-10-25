/**
 * Floating "back to top" button.
 * It appears after 500px of scrolling and uses a passive listener because it
 * never calls preventDefault.
 */
import { useEffect, useState } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Throttle-free check: one cheap comparison per scroll event.
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${isVisible ? "show" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="ri-arrow-up-line" aria-hidden="true"></i>
    </button>
  );
}

export default BackToTop;
