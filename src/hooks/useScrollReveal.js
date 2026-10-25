/**
 * Reveal-on-scroll behaviour used by the Home page.
 * Adds a class only after the element enters the viewport, and respects
 * reduced-motion and browsers without IntersectionObserver.
 */
import { useEffect } from "react";

/**
 * Adds a light "fade up" animation to every element marked with `data-reveal`.
 * Elements stay visible when JavaScript or IntersectionObserver is unavailable,
 * and motion is skipped for users who prefer reduced motion.
 */
function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fall back to showing everything immediately when animation is unwanted
    // or the API is unavailable.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal once, then stop observing to keep scrolling cheap.
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}

export default useScrollReveal;
