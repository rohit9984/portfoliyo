/**
 * Education timeline.
 * Entries come from data/education.js and render in the order provided.
 */
import { education } from "../data/education";

function Education() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">EDUCATION</span>
          <h2 className="section-title">Academic background</h2>
        </div>

        <div className="timeline">
          {/* Each entry includes an icon, year, qualification and score. */}
          {education.map((item) => (
            <article className="timeline-item" key={item.degree} data-reveal>
              <div className="timeline-icon" aria-hidden="true">
                <i className={item.icon}></i>
              </div>
              <div className="timeline-body">
                <div className="timeline-head">
                  <div>
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.degree}</h3>
                    <p className="timeline-meta">
                      {item.institute} · {item.location}
                    </p>
                    {item.board && (
                      <p className="timeline-meta">{item.board}</p>
                    )}
                  </div>
                  <span className="score-pill">{item.score}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
