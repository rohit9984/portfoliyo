export const projects = [
  {
    id: "chatgpt-clone",
    slug: "chatgpt-clone",
    title: "ChatGPT Clone",
    tagline: "A full stack AI assistant, built end to end.",
    description:
      "A ChatGPT-style chat app with server-side AI routing between Gemini and OpenRouter, conversation context and per-IP rate limiting.",
    overview:
      "ChatGPT Clone is a full stack AI chat application with a custom ChatGPT-style interface. The React frontend talks only to a Node API, keeping provider keys on the server. Prompts are scored by difficulty and routed across multiple Gemini and OpenRouter keys, with automatic fallback when a key hits its quota, fails or times out. The app also keeps follow-up conversation context and rate-limits requests per IP.",
    year: "2026",
    role: "Full Stack Developer",
    category: "web",
    categoryLabel: "AI Chat App",
    tech: ["React", "Vite", "Node.js", "Gemini API", "OpenRouter"],
    highlights: [
      "ChatGPT-style interface with conversation history and follow-up context",
      "Server-side model routing across Gemini and OpenRouter with automatic key fallback",
      "Server-only API keys, per-IP rate limiting and readable quota errors",
    ],
    image: "/Images/projects/chatgpt-clone.jpg",
    link: "https://chatgpt-clone-awlx.onrender.com",
    repo: "https://github.com/rohit9984/chatgpt-clone",
  },
  {
    id: "mipro-rehub",
    slug: "mipro-rehub",
    title: "MiPro_ReHub",
    tagline: "Individual voices. Collective strength.",
    description:
      "A platform for collecting and sharing user opinions, with organised responses and simple insight into engagement trends.",
    overview:
      "MiPro_ReHub is a collective voice platform where people can share real problems and opinions in one place. The project focuses on a clear submission flow, organised user-generated content and an easy way to see what people are talking about.",
    year: "2025",
    role: "Designer & Developer",
    category: "web",
    categoryLabel: "Web App",
    tech: ["HTML", "CSS", "JavaScript", "Google Forms"],
    highlights: [
      "Simple, mobile-friendly submission flow for sharing opinions",
      "Organised user-generated responses and feedback",
      "Clean landing page that explains the platform in one screen",
    ],
    image: "/Images/projects/mipro-rehub.jpg",
    link: "https://mi-pro-re-hub.vercel.app/",
  },
  {
    id: "folio",
    slug: "folio",
    title: "Folio Resume Maker",
    tagline: "A fast, distraction-free resume builder.",
    description:
      "A web application that helps users build a clean, professional resume with a live preview and export-ready output.",
    overview:
      "Folio is a resume builder built around speed and simplicity. Instead of a complicated editor, it gives users a structured form, a live preview and a resume that is ready to download — all in the browser.",
    year: "2025",
    role: "Frontend Developer",
    category: "web",
    categoryLabel: "Web App",
    tech: ["React", "JavaScript", "CSS"],
    highlights: [
      "Live resume preview while editing",
      "Clean, print-ready resume layout",
      "Responsive experience across desktop and mobile",
    ],
    image: "/Images/projects/folio.jpg",
    link: "https://folio-resume-builder-bh4b.bolt.host/",
  },
  {
    id: "portfolio",
    slug: "portfolio",
    title: "Developer Portfolio",
    tagline: "This site — built from scratch.",
    description:
      "A responsive personal portfolio built with React, featuring reusable sections, scroll animations, dark mode and a mobile-first navigation.",
    overview:
      "This portfolio is a full rebuild of my personal site. It uses React and a small custom design system, with data-driven sections, a case-study route for each project, dark mode, keyboard navigation and a live GitHub feed.",
    year: "2026",
    role: "Design & Development",
    category: "frontend",
    categoryLabel: "Frontend",
    tech: ["React", "React Router", "CSS", "GitHub API"],
    highlights: [
      "Responsive layout tested from 380px to 1440px",
      "Dark mode, command palette and scroll progress",
      "Data-driven content and project case-study pages",
    ],
    image: null,
    icon: "ri-braces-line",
    link: "https://github.com/rohit9984/college-web-projects",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "frontend", label: "Frontend" },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
