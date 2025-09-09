import { useState, useEffect, useMemo } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTopButton from "./components/_global/ScrollToTop";
import TourOverlay from "./components/TourOverlay";
import PouraniKChatbot from "./components/PouraniKChatbot"; // Add this import
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // --- Custom Tour Guide State ---
  const tourSteps = useMemo(() => [
    {
      selector: "navbar-logo",
      title: "Logo/Home",
      content: "Click to return home anytime.",
    },
    {
      selector: "navbar-link-home",
      title: "Home Tab",
      content: "Go to the homepage.",
    },
    {
      selector: "navbar-link-explore",
      title: "Explore Tab",
      content: "Browse all books.",
    },
    {
      selector: "navbar-link-genres",
      title: "Genres Tab",
      content: "Browse by genre.",
    },
    {
      selector: "navbar-theme-toggle",
      title: "Theme Toggle",
      content: "Switch light/dark mode.",
    },
    {
      selector: "start-exploring-section",
      title: "Start Exploring",
      content: "Start your book journey.",
    },
    {
      selector: "browse-genre-section",
      title: "Browse Genres",
      content: "See books by genre.",
    },
  ], []);

  const [tourStep, setTourStep] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);

  // Scroll to the highlighted element on step change
  useEffect(() => {
    const selector = tourSteps[tourStep]?.selector;
    if (selector) {
      setTimeout(() => {
        const el = document.querySelector(`[data-tour="${selector}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100); // 100ms delay to ensure DOM is ready
    }
  }, [tourStep, tourOpen, tourSteps]);

  useEffect(() => {

    // Show tour only once for each user.
    if (!localStorage.getItem("isOldUser")) {
      setTimeout(() => setTourOpen(true), 800); // slight delay for UI mount
    }
  }, []);

  const handleTourNext = () => setTourStep((s) => Math.min(s + 1, tourSteps.length - 1));
  const handleTourPrev = () => setTourStep((s) => Math.max(s - 1, 0));
  const handleTourClose = () => {
    setTourOpen(false);
    // set the localstorage variable that tour is done
    localStorage.setItem("isOldUser", "true")
  }

return (
  <div className={`app-gradient ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="main-content">
        <div className="page-wrapper">
          <AppRoutes isDarkMode={isDarkMode} />
        </div>
      </main>
      <Footer isDarkMode={isDarkMode} />
      <ScrollToTopButton />
      <PouraniKChatbot isDarkMode={isDarkMode} />
      <ToastContainer position="top-right" autoClose={3000} />
      <TourOverlay
        step={{ ...tourSteps[tourStep], index: tourStep }}
        totalSteps={tourSteps.length}
        onNext={handleTourNext}
        onPrev={handleTourPrev}
        onClose={handleTourClose}
        visible={tourOpen}
      />

    </div>
  );
}

export default App;