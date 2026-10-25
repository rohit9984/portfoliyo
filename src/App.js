/**
 * App shell.
 * ThemeProvider and BrowserRouter sit above every page. Shared UI (navbar,
 * footer, scroll helpers, command palette) is rendered once around the routes.
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import BackToTop from "./components/BackToTop";
import CommandPalette from "./components/CommandPalette";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFab from "./components/WhatsAppFab";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import ResumePage from "./pages/ResumePage";

function App() {
  return (
    // ThemeProvider exposes light/dark state; BrowserRouter manages URL routes.
    <ThemeProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <div className="App">
          {/* Global scroll indicators and hash/deep-link scroll handling. */}
          <ScrollProgress />
          <ScrollToTop />

          {/* Keyboard users can bypass the navigation and jump to <main>. */}
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <Navbar />

          <main id="main-content">
            {/* Every page-level view is declared here. */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Floating helpers remain available on every route. */}
          <Footer />
          <BackToTop />
          <WhatsAppFab />
          <CommandPalette />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
