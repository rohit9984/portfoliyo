const services = [
  {
    icon: "ri-stack-line",
    title: "Full Stack Development",
    description:
      "Complete web applications — from the React interface to the backend logic and data that complete the experience.",
  },
  {
    icon: "ri-code-s-slash-line",
    title: "Frontend Development",
    description:
      "Responsive interfaces built with HTML, CSS, JavaScript and React.js — from the first layout to the final interaction.",
  },
  {
    icon: "ri-smartphone-line",
    title: "Responsive Web Design",
    description:
      "Mobile-first layouts that stay readable, fast and comfortable to use on every screen size.",
  },
  {
    icon: "ri-braces-line",
    title: "React Applications",
    description:
      "Reusable components, routing with React Router and a clean structure that is easy to extend later.",
  },
];

function Service() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">SERVICES</span>
          <h2 className="section-title">How I can help</h2>
          <p className="section-lead">
            End-to-end web development with a focus on clean interfaces and a
            smooth experience on every device.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title} data-reveal>
              <div className="service-icon" aria-hidden="true">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;
