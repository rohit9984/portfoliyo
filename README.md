# Rohit Kumar Maurya — Portfolio

A responsive personal portfolio for a full stack web developer, built with
React. The site uses a small custom design system, data-driven content, project
case-study pages, dark mode and a keyboard-driven quick navigation palette.

**Live sections:** Hero · About · Skills · Services · Projects · GitHub ·
Education · Contact

**Extra pages:** Project case studies (`/projects/:slug`), Resume (`/resume`)

## Features

- Responsive layout tested from 380px to 1440px
- Light and dark themes (saved in `localStorage`, respects the OS preference)
- Project case-study pages with React Router
- Resume page with print styles and a PDF download
- Command palette (`Ctrl`/`Cmd` + `K`) for jumping to sections, projects and links
- Live GitHub repositories feed (public GitHub API, cached for 10 minutes)
- Project filters synced to the URL (`/?filter=web`)
- Contact form with sending, success and error states
- Copy-email button, WhatsApp shortcut, scroll progress and back-to-top
- Custom 404 page
- Self-hosted Poppins fonts, optimized project screenshots and a social share image
- Reduced-motion support, visible focus states and mobile focus trapping

## Tech stack

- React 19 (Create React App)
- React Router 6
- Plain CSS with custom properties (no UI framework)
- Remix Icon webfont (CDN)
- Poppins, self-hosted in `src/assets/fonts`

## Getting started

```bash
npm install
npm start      # http://localhost:3000
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Start the development server         |
| `npm test`      | Run the test suite                   |
| `npm run build` | Create an optimized production build |

## Project structure

```
src/
  assets/fonts/   Self-hosted Poppins woff2 files
  components/     Navbar, Footer, CommandPalette, ScrollToTop, WhatsAppFab, ...
  context/        ThemeProvider
  data/           site details, skills, projects, education
  hooks/          useScrollReveal, useTheme, useDocumentTitle
  pages/          Home, ProjectDetail, ResumePage, NotFound
  sections/       Hero, About, Skills, Service, Projects, GitHub, Education, Contact
  App.js          Router + app shell
  App.css         Global styles and responsive breakpoints
public/
  Images/         Portrait, logo, project screenshots, OG image, resume PDF
```

Original design assets and full-size source screenshots are kept in
`design-assets/` outside the deployed `public/` folder.

## Making it yours

All personal details live in `src/data/site.js` — name, email, phone, location,
social links and the resume path. Update that file first when anything changes.

Other content:

- `src/data/skills.js` — skill groups shown in the Skills section and resume
- `src/data/projects.js` — project cards, filters and case-study content
- `src/data/education.js` — education timeline entries

To add a project case study, add an entry to `projects` with a unique `slug`;
the route `/projects/<slug>` is generated automatically and the project also
appears in the command palette.

## Contact form

The contact form posts to [FormSubmit](https://formsubmit.co/) using the email in
`src/data/site.js`. Submissions are sent with `fetch` to the AJAX endpoint so the
form can show loading, success and error states without leaving the page.

The first submission sends a confirmation link to that address; after
confirming, messages are delivered to the inbox. If you change providers
(Formspree, Netlify Forms, etc.), update the `fetch` URL and form fields in
`src/sections/Contact.jsx`.

## Deployment

The project builds to static files, so it can be hosted on Vercel, Netlify, or
any static host with SPA rewrites:

```bash
npm run build
```

Deploy the `build/` folder. This repo includes:

- `vercel.json` — SPA rewrite for Vercel
- `public/_redirects` — SPA rewrite for Netlify

Without a rewrite, opening a deep link such as `/resume` directly will 404 on a
static host.

For GitHub Pages under a sub-path, set the `homepage` field in `package.json`
and adjust the router basename. `BrowserRouter` assumes the site is served from
the domain root.
