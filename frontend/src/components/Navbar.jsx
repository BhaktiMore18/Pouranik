import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users } from "lucide-react";
import { useState, useEffect } from 'react';
import { IoLibraryOutline } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';
import useTokenRefresher from '../services/tokenRefreshner';

import { toast } from 'react-toastify';
import { MdTimer } from "react-icons/md";

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const refresh = useTokenRefresher();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);


    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    const handleAuthChange = () => setIsLoggedIn(!!auth.currentUser);
    window.addEventListener('authChange', handleAuthChange);

  //if user's token has expired , and they visit another page , they will get logged out

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


    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('authChange', handleAuthChange);
      unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully.");
      navigate('/');
    } catch (error) {
      toast.error("Failed to sign out.");
    }
  };


  const navClasses = `navbar-modern ${scrolled ? 'scrolled' : ''}`;

  return (
    <>
      <nav className={navClasses}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" data-tour="navbar-logo">
            <div className="text-3xl"><BookOpen size={42} className="text-[#0f766e]" /></div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--primary-700)" }}>Pouranik</h1>
              <p className="text-sm" style={{ color: "var(--text-muted)", marginTop: "-2px" }}>Book Discovery</p>
            </div>
          </Link>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="navbar-menu">
            <Link to="/" className={`navbar-link ${isActive("/") ? 'active' : ''}`}>Home</Link>
            <Link to="/explore" className={`navbar-link ${isActive("/explore") ? 'active' : ''}`}>Explore</Link>
            {isLoggedIn && <Link to="/library" className={`navbar-link ${isActive("/library") ? 'active' : ''}`}>Library</Link>}
            
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

=======
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

              <div className="flex items-center gap-4">
                <Link to="/profile" className="profile-button">
                  <img
                    src={auth.currentUser?.photoURL || `https://ui-avatars.com/api/?name=${auth.currentUser?.displayName || auth.currentUser?.email}&background=random&color=fff`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <button onClick={handleLogout} className="theme-toggle">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (

              <Link to="/auth" className="navbar-link signin-button">Sign In</Link>

              <Link to="/signup" className={`navbar-link
                ${isActive("/signup")
                  ? "bg-[#0f766e] text-white"
                  : "hover:underline hover:text-[#0f766e]"
                }
                `}>Get Started</Link>

            )}

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

        {isMobileMenuOpen && (

          <div className="mobile-menu">
            <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
            <div className="mobile-menu-content">
              {/* Mobile menu links would go here */}

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

      <div className="navbar-spacer"></div>
    </>
  );
}
=======
      {/* Spacer for fixed navbar */}
      <div style={{ height: "5rem" }}></div>
    </>
  );

}
}

