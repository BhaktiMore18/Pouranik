
// data-tour attributes added for custom tour guide
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen } from 'lucide-react';


export default function Navbar({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/explore", label: "Explore", icon: "🔍" },
    { path: "/genres", label: "Genres", icon: "📑" },
  ];

  return (
    <nav className="navbar-modern bg-white dark:bg-gray-900 shadow-sm">
      <div className="navbar-container flex items-center justify-between py-3 px-4">
        {/* Logo */}

        <Link
          to="/"
          className="navbar-logo flex items-center gap-2 transition-transform duration-200 cursor-pointer"
        >
          <div className="text-2xl">📚</div>
          <div className="group">
            <h1 className="text-xl font-medium text-teal-700 dark:text-teal-700 transition-all">
              Pouranik
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
              Book Discovery
            </p>

       
          </div>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-1 w-10 h-10 space-y-1 focus:outline-none bg-white dark:bg-gray-800 rounded-xl border border-teal-500"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-900  transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-900  transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-900  transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Navigation Links */}
        <div
          className={`flex-col md:flex-row md:flex gap-4 absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-900 z-20 shadow-md md:shadow-none transition-all duration-300 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          {navLinks.map(({ path, label, icon }) => (
            <Link
              key={path}

              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 md:px-2 md:py-1 rounded-md transition-colors hover:bg-teal-100 dark:hover:bg-teal-50 ${
                isActive(path)
                  ? "text-teal-800 dark:text-teal-200 font-semibold"
                  : "text-teal-700 dark:text-teal-300"
              }`}

            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 border rounded-md bg-white dark:bg-gray-800 text-teal-700 dark:text-teal-200 hover:bg-teal-100 dark:hover:bg-teal-700 transition-colors"
            aria-label="Toggle dark mode"
            data-tour="navbar-theme-toggle"
          >
            <span className="text-lg">{isDarkMode ? "☀️" : "🌙"}</span>
            <span>{isDarkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
