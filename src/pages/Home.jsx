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
  useScrollReveal();
  useDocumentTitle("Rohit Kumar Maurya | Full Stack Web Developer");

  return (
    <>
      <Hero />

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
