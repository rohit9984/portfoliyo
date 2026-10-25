import { useState } from "react";
import site from "../data/site";

const whatsappNumber = site.phoneHref.replace(/[^0-9]/g, "");

const contactItems = [
  {
    icon: "ri-mail-line",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    copy: true,
  },
  {
    icon: "ri-phone-line",
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
  },
  {
    icon: "ri-whatsapp-line",
    label: "WhatsApp",
    value: "Chat with me on WhatsApp",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi Rohit! I found your portfolio and would like to talk."
    )}`,
    external: true,
  },
  {
    icon: "ri-map-pin-line",
    label: "Location",
    value: site.location,
  },
];

function Contact() {
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(site.email);
      } else {
        const field = document.createElement("input");
        field.value = site.email;
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json().catch(() => ({}));
      if (result.success === "false" || result.success === false) {
        throw new Error("Submission rejected");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h2 className="section-title">Let&apos;s build something great</h2>
          <p className="section-lead">
            Have a project, an internship or a question? I usually reply within a
            day.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            {contactItems.map((item) => (
              <div className="info-item" key={item.label}>
                <i className={item.icon} aria-hidden="true"></i>
                <div className="info-body">
                  <h3>{item.label}</h3>
                  {item.href ? (
                    <a
                      className="info-link"
                      href={item.href}
                      {...(item.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
                {item.copy && (
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                  >
                    <i
                      className={copied ? "ri-check-line" : "ri-file-copy-line"}
                      aria-hidden="true"
                    ></i>
                  </button>
                )}
              </div>
            ))}

            <div className="contact-socials">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <i className="ri-github-fill" aria-hidden="true"></i>
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <i className="ri-linkedin-fill" aria-hidden="true"></i>
              </a>
              <a href={site.resume} download aria-label="Download resume">
                <i className="ri-file-download-line" aria-hidden="true"></i>
              </a>
            </div>

            <p className="copy-status" role="status" aria-live="polite">
              {copied ? "Email copied to clipboard!" : ""}
            </p>
          </div>

          <form
            className="contact-form"
            action={`https://formsubmit.co/${site.email}`}
            method="POST"
            onSubmit={handleSubmit}
            data-reveal
          >
            <input
              type="hidden"
              name="_subject"
              value="New message from your portfolio"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="text"
              name="_honey"
              className="hidden-field"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Rohit's next collaborator"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Project, internship or question"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">Project details</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me a little about what you have in mind..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  Sending...{" "}
                  <i className="ri-loader-4-line spin" aria-hidden="true"></i>
                </>
              ) : (
                <>
                  Send Message{" "}
                  <i className="ri-send-plane-fill" aria-hidden="true"></i>
                </>
              )}
            </button>

            <p
              className={`form-status ${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "success" &&
                "Thanks! Your message is on its way — I'll reply soon."}
              {status === "error" && (
                <>
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>.
                </>
              )}
              {status === "idle" && (
                <>
                  Prefer email? Write to{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>.
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
