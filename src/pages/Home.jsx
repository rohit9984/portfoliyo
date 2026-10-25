/**
 * Home page.
 * Renders the single-page portfolio as an ordered set of sections and enables
 * the shared reveal animation + page title for this route.
 */
import useDocumentTitle from "../hooks/useDocumentTitle";
import useScrollReveal from "../hooks/useScrollReveal";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import GitHub from "../sections/GitHub";
import Hero from "../sections/Hero";
import Project from "../sections/Projects";
import Service from "../sections/Service";
import Skills from "../sections/Skill";

function Home() {
  // Attach the IntersectionObserver once for every [data-reveal] element.
  useScrollReveal();
  useDocumentTitle("Rohit Kumar Maurya | Full Stack Web Developer");

  return (
    <>
      <Hero />

      {/* Decorative ticker. aria-hidden keeps the repeated text out of screen readers. */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          <span>
            FRONTEND DEVELOPMENT • BACKEND DEVELOPMENT • REACT.JS • JAVASCRIPT •
            JAVA • RESPONSIVE WEB DESIGN •&nbsp;
          </span>
          <span>
            FRONTEND DEVELOPMENT • BACKEND DEVELOPMENT • REACT.JS • JAVASCRIPT •
            JAVA • RESPONSIVE WEB DESIGN •&nbsp;
          </span>
        </div>
      </div>

      {/* Content sections are kept separate so each can be edited independently. */}
      <About />
      <Skills />
      <Service />
      <Project />
      <GitHub />
      <Education />
      <Contact />
    </>
  );
}

export default Home;
