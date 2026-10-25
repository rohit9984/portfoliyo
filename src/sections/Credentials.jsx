/**
 * Achievements and certifications section.
 *
 * Content is driven by src/data/credentials.js. In production the section is
 * hidden until at least one entry exists, so visitors never see placeholder
 * text. During local development an empty-state card explains where to add
 * entries.
 */
import {
  achievements,
  certifications,
  hasCredentials,
  showCredentials,
} from "../data/credentials";

function Credentials() {
  // Hide the whole section on the live site while both lists are empty.
  if (!showCredentials) {
    return null;
  }

  return (
    <section id="credentials" className="section credentials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">PROOF OF WORK</span>
          <h2 className="section-title">Achievements &amp; certifications</h2>
          <p className="section-lead">
            Milestones I&apos;ve reached and credentials I&apos;ve earned while
            building my skills.
          </p>
        </div>

        {!hasCredentials ? (
          // Development-only helper. This never renders in a production build.
          <div className="credentials-empty" data-reveal>
            <span className="credentials-empty-icon" aria-hidden="true">
              <i className="ri-award-line"></i>
            </span>
            <div>
              <h3>No credentials added yet</h3>
              <p>
                Add real certifications and achievements in{" "}
                <code>src/data/credentials.js</code>. This section stays hidden
                on the published site until at least one entry exists.
              </p>
            </div>
          </div>
        ) : (
          <div className="credentials-grid">
            {certifications.length > 0 && (
              <div className="credential-group" data-reveal>
                <div className="credential-group-head">
                  <span className="credential-kicker">
                    <i className="ri-verified-badge-line" aria-hidden="true"></i>
                    Certifications
                  </span>
                  <span className="credential-count">
                    {String(certifications.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="cert-list">
                  {certifications.map((item) => (
                    <article
                      className="cert-card"
                      key={`${item.title}-${item.issuer}`}
                    >
                      <div className="cert-card-top">
                        <span className="cert-icon" aria-hidden="true">
                          <i className={item.icon || "ri-award-line"}></i>
                        </span>
                        {item.date && (
                          <span className="cert-date">{item.date}</span>
                        )}
                      </div>

                      <h3>{item.title}</h3>
                      <p className="cert-issuer">{item.issuer}</p>

                      {item.skills?.length > 0 && (
                        <ul className="skill-tags" aria-label="Skills covered">
                          {item.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                          ))}
                        </ul>
                      )}

                      <div className="cert-footer">
                        {item.url ? (
                          <a
                            href={item.url}
                            className="text-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Verify credential
                            <i
                              className="ri-arrow-right-up-line"
                              aria-hidden="true"
                            ></i>
                          </a>
                        ) : (
                          <span className="cert-note">Certified</span>
                        )}

                        {item.credentialId && (
                          <span className="credential-id">
                            ID {item.credentialId}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {achievements.length > 0 && (
              <div className="credential-group" data-reveal>
                <div className="credential-group-head">
                  <span className="credential-kicker">
                    <i className="ri-trophy-line" aria-hidden="true"></i>
                    Achievements
                  </span>
                  <span className="credential-count">
                    {String(achievements.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="achievement-list">
                  {achievements.map((item) => (
                    <article
                      className="achievement-card"
                      key={`${item.title}-${item.year}`}
                    >
                      <span className="achievement-icon" aria-hidden="true">
                        <i className={item.icon || "ri-trophy-line"}></i>
                      </span>

                      <div className="achievement-body">
                        <div className="achievement-head">
                          {item.year && (
                            <span className="achievement-year">{item.year}</span>
                          )}
                          {item.link && (
                            <a
                              href={item.link}
                              className="achievement-link"
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${item.title}`}
                            >
                              <i
                                className="ri-arrow-right-up-line"
                                aria-hidden="true"
                              ></i>
                            </a>
                          )}
                        </div>
                        <h3>{item.title}</h3>
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Credentials;
