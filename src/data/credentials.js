/**
 * Achievements and certifications shown in the Credentials section and on the
 * resume page.
 *
 * Add only real items. The section is hidden in production while both arrays
 * are empty, so the portfolio never shows an unfinished block.
 *
 * Certification shape:
 * {
 *   title: "Responsive Web Design",
 *   issuer: "freeCodeCamp",
 *   date: "2025",
 *   credentialId: "optional-id",
 *   url: "https://optional-verification-link",
 *   skills: ["HTML", "CSS"],
 *   icon: "ri-award-line", // optional Remix Icon
 * }
 *
 * Achievement shape:
 * {
 *   title: "Built and shipped a full-stack AI chat app",
 *   year: "2026",
 *   description: "One or two sentences explaining the achievement.",
 *   link: "https://optional-link",
 *   icon: "ri-trophy-line", // optional Remix Icon
 * }
 */

export const certifications = [
  // Add certification objects here.
];

export const achievements = [
  // Add achievement objects here.
];

// Used by the navbar, command palette and section to avoid empty links.
export const hasCredentials =
  certifications.length > 0 || achievements.length > 0;

// During local development the empty section is visible with a helper card.
// Production builds hide it until real data is added.
export const showCredentials =
  hasCredentials || process.env.NODE_ENV === "development";
