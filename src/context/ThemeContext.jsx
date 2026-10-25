/**
 * Theme state shared by the navbar toggle and every themed component.
 * The chosen theme is persisted in localStorage; on first visit the OS
 * preference is used. public/index.html applies the same value before render
 * so the page never flashes the wrong colours.
 */
import { createContext, useEffect, useState } from "react";

const STORAGE_KEY = "rohit-portfolio-theme";
// Safe default for components rendered outside the provider (e.g. tests).
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

// Read a saved preference, otherwise fall back to the operating system theme.
function getInitialTheme() {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep the DOM attribute, storage and mobile browser colour in sync.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0d1512" : "#448C74");
    }
  }, [theme]);

  // Toggling is functional so rapid clicks always use the latest value.
  const toggleTheme = () =>
    setTheme((current) => (current === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
