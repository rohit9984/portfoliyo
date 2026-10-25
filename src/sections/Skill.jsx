/**
 * Skills section.
 * Groups are shared with the resume route via data/skills.js.
 */
import { skillGroups } from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">SKILLS</span>
          <h2 className="section-title">Tools I build with</h2>
          <p className="section-lead">
            The languages, libraries and tools I use day to day — plus a few
            I&apos;m actively getting better at.
          </p>
        </div>

        <div className="skills-grid">
          {/* One card per group, rendered from the shared skill data. */}
          {skillGroups.map((group) => (
            <div className="skill-card" key={group.title} data-reveal>
              <div className="skill-icon" aria-hidden="true">
                <i className={group.icon}></i>
              </div>
              <h3>{group.title}</h3>
              <ul className="skill-tags">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="skills-note">
          <i className="ri-lightbulb-flash-line" aria-hidden="true"></i>
          Currently levelling up: <strong>Core Java</strong>, APIs and backend
          fundamentals.
        </p>
      </div>
    </section>
  );
}

export default Skills;
