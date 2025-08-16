import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users } from "lucide-react";
import { useState, useEffect } from 'react';
import { IoLibraryOutline } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import useTokenRefresher from '../services/tokenRefreshner';
import { toast } from 'react-toastify';
import { MdTimer } from "react-icons/md";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const refresh = useTokenRefresher();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!isTokenValid(token)) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      sessionStorage.setItem("showSessionExpiredToast", "true");
      navigate('/');
    }
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const expiryTime = decoded.exp * 1000;
    const timeout = expiryTime - Date.now();

    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      toast.error("Session expired. Please login again!");
      navigate('/');
    }, timeout);

    return () => clearTimeout(timer);
  }, [refresh]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    sessionStorage.setItem("showLogoutToast", "true");
    navigate('/');
  };

  const isTokenValid = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <>
      <nav
        className={`navbar-modern h-20 fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
      >
        <div className="navbar-container px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-logo flex items-center gap-x-3 animate-fade-in-left"
            data-tour="navbar-logo"
          >
            <div className="text-3xl">
              <BookOpen size={42} className="text-[#0f766e]" />
            </div>
            <div>
              <h2 className="text-[2rem] font-bold" style={{ color: "var(--primary-700)" }}>
                Pouranik
              </h2>
              <p className="text-sm fs-3" style={{ color: "var(--text-muted)", marginTop: "-2px" }}>
                Book Discovery
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle block lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <div className="navbar-menu hidden lg:flex gap-2 lg:gap-4 items-center !text-white">
            {[
              { path: "/", label: "Home", icon: <Home size={18} /> },
              { path: "/explore", label: "Explore", icon: <Search size={18} /> },
              { path: "/genres", label: "Genres", icon: <BookMarked size={18} /> },
              { path: "/community", label: "Community", icon: <Users size={18} /> },
              ...(isLoggedIn
                ? [{ path: "/library", label: "Your Library", icon: <IoLibraryOutline size={18} /> },
                { path: "/timerpage", label: "Timer", icon: <MdTimer size={18} /> }
              ]
                : []),
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                aria-current={isActive(path) ? "page" : undefined}
                className={`navbar-link flex items-center gap-2 px-2.5 py-2 rounded-md transition-all duration-500 ease-in-out ${isActive(path)
                    ? "bg-[#0f766e] text-white"
                    : "hover:underline hover:text-[#0f766e]"
                  }`}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </Link>
            ))}

            {isLoggedIn ? (
              <button onClick={handleLogout} className="theme-toggle">Logout</button>
            ) : (
              <Link
                to="/signup"
                className={`navbar-link ${isActive("/signup")
                    ? "bg-[#0f766e] text-white"
                    : "hover:underline hover:text-[#0f766e]"
                  }`}
              >
                Get Started
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90 transition-all duration-500"
              aria-label="Toggle dark mode"
            >
              <span className="theme-icon">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span className="theme-label">{isDarkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu lg:hidden">
            <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
            <div className="mobile-menu-content">
              {[
                { path: "/", label: "Home", icon: <Home size={20} /> },
                { path: "/explore", label: "Explore", icon: <Search size={20} /> },
                { path: "/genres", label: "Genres", icon: <BookMarked size={20} /> },
                { path: "/community", label: "Community", icon: <Users size={20} /> },
                ...(isLoggedIn
                  ? [{ path: "/library", label: "Your Library", icon: <IoLibraryOutline size={20} /> }]
                  : []),
              ].map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`mobile-menu-link ${isActive(path) ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <span className="mobile-menu-icon">{icon}</span>
                  <span className="mobile-menu-label">{label}</span>
                </Link>
              ))}

              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                className="mobile-theme-toggle"
                aria-label="Toggle dark mode"
              >
                <span className="mobile-menu-icon">
                  {isDarkMode ? (
                    <Sun size={20} className="text-yellow-500" />
                  ) : (
                    <Moon size={20} className="text-blue-900" />
                  )}
                </span>
                <span className="mobile-menu-label" style={{ color: "black" }}>
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>

              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="mobile-menu-link"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div style={{ height: "5rem" }}></div>
    </>
  );
}