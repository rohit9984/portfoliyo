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

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
