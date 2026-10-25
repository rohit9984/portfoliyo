# Project Structure

This document explains how the portfolio is organised, how data flows through
the app, and where to make common changes. For setup and deployment commands,
see [README.md](./README.md).

---

## 1. Overview

The site is a **single-page React application** built with Create React App. It
uses React Router for three page types and a shared app shell:

- A long-form home page made of independent sections
- A case-study page generated for every project
- A printable resume page
- A 404 fallback page

Personal content is stored in `src/data/`, while presentation lives in
`src/sections/`, `src/pages/` and `src/components/`. There is no backend in this
repository; the contact form posts directly to FormSubmit and the GitHub section
uses the public GitHub API.

### Main technologies

| Technology | Purpose |
| --- | --- |
| React 19 | UI and component state |
| React Router 6.30.1 | Routing, links and URL search params |
| Create React App 5 | Development server and production build |
| Plain CSS | Design tokens, layout, themes and responsive rules |
| Remix Icon | Icon font loaded from jsDelivr |
| Poppins | Self-hosted webfonts in `src/assets/fonts/` |
| FormSubmit | Contact-form delivery |
| GitHub REST API | Live repository feed |
| Vercel / Netlify | Static hosting with SPA rewrites |

---

## 2. Directory map

```text
my-portfoliyo/
├── public/
│   ├── Images/
│   │   ├── projects/          Optimised project screenshots
│   │   ├── portrait.jpg       Hero portrait
│   │   ├── og-image.jpg       1200×630 social share image
│   │   ├── favicon.png        Browser icon
│   │   ├── logo-192.png       Apple touch icon
│   │   ├── logo-512.png       PWA icon
│   │   └── Rohit_Resume.pdf   Downloadable resume
│   ├── _redirects             Netlify SPA fallback
│   ├── index.html             HTML shell, SEO, theme bootstrap, preloads
│   ├── manifest.json          PWA metadata
│   └── robots.txt             Crawler rules
│
├── src/
│   ├── assets/fonts/          Self-hosted Poppins woff2 files
│   ├── components/            Reusable app-shell components
│   ├── context/               Theme context/provider
│   ├── data/                  Editable site content (site, projects, skills, credentials, education)
│   ├── hooks/                 Small reusable React hooks
│   ├── pages/                 Route-level views
│   ├── sections/              Home-page content sections
│   ├── App.js                 Providers, router, app shell
│   ├── App.css                Tokens, components, responsive and print styles
│   ├── App.test.js            Smoke test for hero + contact
│   ├── index.css              Fonts and base document styles
│   ├── index.js               React entry point
│   ├── reportWebVitals.js     Optional CRA performance reporting
│   └── setupTests.js          Jest DOM matchers
│
├── design-assets/             Large source images (not deployed)
├── build/                     Generated production output (gitignored)
├── package.json               Dependencies and scripts
├── vercel.json                Vercel SPA rewrite
└── PROJECT_STRUCTURE.md       This file
```

---

## 3. Startup flow

```text
public/index.html
  ├── applies saved light/dark theme before paint
  ├── loads SEO metadata, icons, fonts and Remix Icon
  └── mounts <div id="root">

src/index.js
  └── creates the React root and renders <App /> inside StrictMode

src/App.js
  └── <ThemeProvider>
        └── <BrowserRouter>
              ├── ScrollProgress
              ├── ScrollToTop
              ├── Skip link
              ├── Navbar
              ├── <main> with route elements
              ├── Footer
              ├── BackToTop
              ├── WhatsAppFab
              └── CommandPalette
```

`App` is the only place where the global shell is assembled. Page components
render only their own content; they do not repeat the navbar or footer.

---

## 4. Routes

| URL | Component | Purpose |
| --- | --- | --- |
| `/` | `pages/Home.jsx` | Full portfolio with all sections |
| `/projects/:slug` | `pages/ProjectDetail.jsx` | Project case study; invalid slugs render 404 |
| `/resume` | `pages/ResumePage.jsx` | Printable resume and PDF download |
| `*` | `pages/NotFound.jsx` | Custom 404 |

The site uses `BrowserRouter`, so production hosts must rewrite unknown paths
to `/index.html`. This repository includes:

- `vercel.json` for Vercel
- `public/_redirects` for Netlify

Home-page sections are addressed with hashes, for example `/#about` or
`/#projects`. `components/ScrollToTop.jsx` scrolls to the hash target after
navigation and returns to the top for normal page changes. Search-only changes
(such as project filters) do not trigger a scroll.

---

## 5. Pages

### `pages/Home.jsx`

Composes the home experience in this order:

1. `Hero`
2. Decorative technology marquee
3. `About`
4. `Skills`
5. `Service`
6. `Projects`
7. `GitHub`
8. `Credentials`
9. `Education`
10. `Contact`

It also runs `useScrollReveal()` once and sets the home-page document title.

### `pages/ProjectDetail.jsx`

1. Reads `slug` from the URL with `useParams`.
2. Looks up the project with `getProjectBySlug`.
3. Shows `<NotFound />` if no project matches.
4. Renders the hero, screenshot or placeholder, overview, highlights, metadata,
   tech stack, live/source links and links to the other projects.

### `pages/ResumePage.jsx`

Builds a printable resume from the same data used by the home page. The print
button calls `window.print()`, and the PDF button downloads
`public/Images/Rohit_Resume.pdf`. Print-specific CSS hides the app chrome.

### `pages/NotFound.jsx`

Shared 404 view with links back home and to the projects section.

---

## 6. Home-page sections

| File | Responsibility |
| --- | --- |
| `sections/Hero.jsx` | Headline, availability, actions, tech list, portrait |
| `sections/About.jsx` | Introduction, quick facts and current focus |
| `sections/Skill.jsx` | Skill groups from `data/skills.js` |
| `sections/Service.jsx` | Service cards (copy local to the component) |
| `sections/Projects.jsx` | Filterable project grid and case-study links |
| `sections/GitHub.jsx` | Live GitHub repositories with cache/fallback |
| `sections/Credentials.jsx` | Achievements and certifications from `data/credentials.js` |
| `sections/Education.jsx` | Education timeline from `data/education.js` |
| `sections/Contact.jsx` | Contact details, copy email, WhatsApp, FormSubmit form |

Every section owns its own markup and reads shared content from `data/` where
appropriate. This keeps the home page easy to reorder in `Home.jsx`.

---

## 7. App-shell components

| File | Responsibility |
| --- | --- |
| `components/Navbar.jsx` | Desktop/mobile navigation, theme toggle, scroll spy, focus trap |
| `components/Footer.jsx` | Copyright, footer navigation and social links |
| `components/ScrollToTop.jsx` | Hash scrolling and top reset after navigation |
| `components/ScrollProgress.jsx` | Top reading-progress bar driven by `requestAnimationFrame` |
| `components/BackToTop.jsx` | Floating button after 500px of scrolling |
| `components/WhatsAppFab.jsx` | Prefilled WhatsApp chat shortcut |
| `components/CommandPalette.jsx` | Ctrl/Cmd + K quick navigation with search and keyboard support |

### Command palette flow

1. The navbar dispatches `open-command-palette`, or the user presses Ctrl/Cmd + K.
2. The palette builds actions from home sections, static pages, projects and
   external profiles.
3. Typing filters by label/group.
4. Arrow keys move the active item; Enter navigates; Escape closes.
5. Internal links use React Router; external links use a normal browser jump.

---

## 8. Data layer

All editable content is in `src/data/`:

### `site.js`

One object with name, role, tagline, email, phone, location, availability,
resume path and social URLs. Change this first when personal details change.

### `skills.js`

Exports `skillGroups`, an array of `{ title, icon, skills[] }`. Used by the
Skills section and the resume.

### `education.js`

Exports `education`, an array of:

```js
{
  degree, institute, location, year, score,
  board?, // optional
  icon
}
```

### `credentials.js`

Exports `certifications`, `achievements`, `hasCredentials` and
`showCredentials`. The Credentials section and the resume read these arrays.
While both are empty, the section is hidden in production; in development it
shows a helper card explaining where to add entries, and the navbar link is
kept visible for local testing.

Certification shape:

```js
{
  title, issuer, date,
  credentialId?, // optional verification id
  url?,          // optional verification link
  skills: [],
  icon?          // optional Remix Icon class
}
```

Achievement shape:

```js
{
  title, year, description,
  link?, // optional proof/demo link
  icon?  // optional Remix Icon class
}
```

### `projects.js`

Exports:

- `projects` — the complete project catalogue
- `projectFilters` — filters shown above the grid
- `getProjectBySlug(slug)` — lookup used by the case-study route

Project fields:

```js
{
  id,            // unique internal id
  slug,          // URL segment: /projects/<slug>
  title,
  tagline,
  description,   // card + resume summary
  overview,      // case-study body copy
  year,
  role,
  category,      // must match a projectFilters id
  categoryLabel, // human-readable label
  tech: [],
  highlights: [],
  image,         // public path, or null for a placeholder
  icon,          // optional Remix icon for the placeholder
  link,          // live project URL
  repo           // optional source-code URL
}
```

Adding an object to `projects` automatically adds it to:

- the project grid
- the filter results
- the generated case-study route
- the command palette
- the resume project list

---

## 9. Hooks and context

### `context/ThemeContext.jsx`

- Reads the saved theme from `localStorage` (`rohit-portfolio-theme`).
- Falls back to the OS `prefers-color-scheme` preference.
- Writes `<html data-theme="light|dark">`.
- Updates the browser `theme-color` meta tag.

### `hooks/useTheme.js`

Small wrapper around `useContext(ThemeContext)`.

### `hooks/useDocumentTitle.js`

Sets the browser tab title for the current route.

### `hooks/useScrollReveal.js`

Observes `[data-reveal]` elements and adds `.is-visible` when they enter the
viewport. Elements are shown immediately when IntersectionObserver is missing
or the user prefers reduced motion.

---

## 10. Styling architecture

`src/App.css` is organised in this order:

1. **Design tokens** — colours, radii, shadows, transitions and header height.
2. **Dark theme** — overrides applied through `[data-theme="dark"]`.
3. **Base/reset** — box sizing, typography, focus, skip link and container.
4. **Section/component styles** — navbar, hero, cards, forms, palette, pages.
5. **Responsive breakpoints**
   - `1024px`: mobile navigation
   - `900px`: two-column grids become one column
   - `640px`: compact spacing and full-width actions
   - `420px`: small-phone type and filter sizing
6. **Reduced motion** and **print** rules.

### Theme rules

Use CSS variables instead of hard-coded colours:

```css
color: var(--text-main);
background: var(--surface);
border-color: var(--border-light);
```

When adding a new themed surface, define its variables in both `:root` and
`[data-theme="dark"]`.

### Scroll reveal

Add `data-reveal` to an element to opt into the fade-up animation. The hook adds
the `.reveal` class at runtime; reduced-motion users see content immediately.

### Printing

The resume uses `@media print` to hide navigation, floating controls and the
resume toolbar, remove the card shadow and force readable black-on-white text.

---

## 11. Contact form

1. `Contact.jsx` prevents the normal form submit.
2. Form fields are converted to JSON with `FormData`.
3. The payload is posted to `https://formsubmit.co/ajax/<site.email>`.
4. The UI moves through `idle → sending → success | error`.
5. A hidden `_subject`, disabled captcha and honeypot field are submitted.
6. If FormSubmit fails, the user is shown the direct email address.

The first real submission requires confirming FormSubmit's activation email.
To switch providers, update the form action, fetch URL and hidden fields.

---

## 12. GitHub feed

`GitHub.jsx`:

- requests up to six public repositories sorted by update time
- filters out forks
- keeps the first four
- caches results in `sessionStorage` for 10 minutes
- aborts the request after 8 seconds
- shows skeleton cards while loading
- shows a link to the GitHub profile if the API fails

The API call is unauthenticated, so caching is important for rate limits.

---

## 13. Common tasks

### Change personal details

Edit `src/data/site.js`.

### Add a project

Add an object to `projects` in `src/data/projects.js`, put an optimised image in
`public/Images/projects/`, set a unique `slug`, and optionally add `repo`.

### Change skills or education

Edit `src/data/skills.js` or `src/data/education.js`.

### Add an achievement or certification

Edit `src/data/credentials.js`. Add a certification object to `certifications`
or an achievement object to `achievements`. As soon as either array has an
entry:

- the Credentials section appears on the home page
- a Credentials link is added to the navbar and command palette
- the item is included on the resume page

Only publish real credentials, and include a verification URL where available.

### Change colours or spacing

Edit the tokens at the top of `src/App.css`. Update both light and dark themes.

### Add a home section

1. Create `src/sections/MySection.jsx`.
2. Give the section an `id` if it needs hash navigation.
3. Import and place it in `src/pages/Home.jsx`.
4. Add the link to `Navbar.jsx` and, if useful, `CommandPalette.jsx`.

### Change the resume PDF

Replace `public/Images/Rohit_Resume.pdf` and keep the same filename, or update
`site.resume` in `src/data/site.js`.

---

## 14. Build, test and deployment

```bash
npm start              # development server on http://localhost:3000
npm test -- --watchAll=false
npm run build          # production output in build/
```

Deployment notes:

- Vercel: import the repository; CRA is detected automatically. `vercel.json`
  rewrites all paths to the SPA.
- Netlify: publish `build/`; `_redirects` provides the same fallback.
- Direct deep links such as `/resume` need the rewrite. Without it, static hosts
  return 404.
- `BrowserRouter` assumes the site is served from the domain root. For a
  sub-path deployment, configure a router basename.

---

## 15. Placeholder and unused files

The following zero-byte files are leftovers from an earlier component plan and
are **not imported anywhere**:

```text
src/components/Button.jsx
src/components/Menu.jsx
src/components/ProjectCard.jsx
src/components/SectionTitle.jsx
src/components/SkillCard.jsx
src/components/SocialLinks.jsx
src/data/experience.js
src/sections/Certifications.jsx
src/sections/Experience.jsx
```

The active credentials implementation is `src/sections/Credentials.jsx` with
data in `src/data/credentials.js`; the old zero-byte `Certifications.jsx` is
not used.

They can be deleted safely. They are left in place only to avoid unrelated
cleanup while the portfolio is being published. The active implementation is
the files referenced by `App.js`, `Home.jsx` and the sections listed above.

`src/logo.svg` is also unused and can be removed if not needed for branding.

---

## 16. Commenting convention used in the codebase

- Each JavaScript/JSX module starts with a short block comment explaining its
  responsibility.
- Non-obvious logic (effects, URL handling, caching, form submission, focus
  traps, theme persistence) has an inline explanation.
- JSX sections use comments to mark major layout regions.
- CSS uses numbered section headers and comments for theme tokens, responsive
  breakpoints, reduced motion and print behaviour.
- JSON files (`package.json`, `vercel.json`) cannot contain comments; their
  purpose is documented here instead.
