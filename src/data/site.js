/**
 * Single source of truth for personal/contact information.
 * Components import this object instead of hard-coding details, so changing a
 * phone number, email, social URL or resume path updates the whole site.
 */
const site = {
  name: "Rohit Kumar Maurya",
  firstName: "Rohit",
  role: "Full Stack Web Developer",
  tagline:
    "Building modern, responsive web applications from frontend to backend.",
  email: "mauryarohitkumar36@gmail.com",
  phone: "+91 95180 82062",
  phoneHref: "+919518082062",
  location: "Gurugram, Haryana, India",
  availability: "Available for internships & freelance work",
  // Public PDF served from public/Images; used by Hero, Resume and Contact.
  resume: "/Images/Rohit_Resume.pdf",
  github: "https://github.com/rohit9984",
  linkedin:
    "https://www.linkedin.com/in/rohit-kumar-maurya-1402b62a8/",
};

export default site;
