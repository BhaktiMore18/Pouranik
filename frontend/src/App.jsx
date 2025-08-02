import { useState, useEffect, useMemo } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTopButton from "./components/_global/ScrollToTop";
import TourOverlay from "./components/TourOverlay";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';


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

    useEffect(() => {
    const CHECK_INTERVAL = 5 * 60 * 1000; // every 5 minutes

    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            console.warn("Token expired. Logging out...");
            localStorage.removeItem('token');
            window.location.href = '/signup'; // or your actual login path
          }
        } catch (err) {
          console.error("Invalid token. Logging out...");
          localStorage.removeItem('token');
          window.location.href = '/signup';
        }
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
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
      <Footer />
      <ScrollToTopButton />
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
