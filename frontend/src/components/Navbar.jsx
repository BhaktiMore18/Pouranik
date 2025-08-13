import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users } from "lucide-react";
import { useState, useEffect } from 'react';
import { IoLibraryOutline } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import './clerk.css';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className={`navbar-modern fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="navbar-container px-4 py-2 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className="navbar-logo flex items-center gap-x-3 animate-fade-in-left"
          >
            <div className="text-3xl">
              <BookOpen size={42} className="text-[#0f766e]" />
            </div>
            <div>
              <h2
                className="text-[2.5rem] font-bold"
                style={{ color: "var(--primary-700)" }}
              >
                Pouranik
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)", marginTop: "-2px" }}
              >
                Book Discovery
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle block lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <div className="navbar-menu hidden lg:flex gap-2 lg:gap-4 items-center">
            {[
              { path: "/", label: "Home", icon: <Home size={18} /> },
              { path: "/explore", label: "Explore", icon: <Search size={18} /> },
              { path: "/genres", label: "Genres", icon: <BookMarked size={18} /> },
              { path: "/community", label: "Community", icon: <Users size={18} /> },
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`navbar-link flex items-center gap-2 px-2.5 py-2 rounded-md transition-all duration-500 ease-in-out ${
                  isActive(path)
                    ? "bg-[#0f766e] text-black"
                    : "hover:underline hover:text-[#0f766e]"
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}

            {/* Links only for signed-in users */}
            <SignedIn>
              <Link
                to="/library"
                className={`navbar-link flex items-center gap-2 px-2.5 py-2 rounded-md ${
                  isActive("/library")
                    ? "bg-[#0f766e] text-black"
                    : "hover:underline hover:text-[#0f766e]"
                }`}
              >
                <IoLibraryOutline size={18} /> <span>Your Library</span>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Auth buttons for signed-out users */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu lg:hidden">
            <div
              className="mobile-menu-overlay"
              onClick={closeMobileMenu}
            ></div>
            <div className="mobile-menu-content">
              {[
                { path: "/", label: "Home", icon: <Home size={20} /> },
                { path: "/explore", label: "Explore", icon: <Search size={20} /> },
                { path: "/genres", label: "Genres", icon: <BookMarked size={20} /> },
                { path: "/community", label: "Community", icon: <Users size={20} /> },
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

              {/* Show Library + UserButton if signed-in */}
              <SignedIn>
                <Link
                  to="/library"
                  className={`mobile-menu-link ${isActive("/library") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <IoLibraryOutline size={20} />
                  <span>Your Library</span>
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              {/* Show Sign In / Sign Up if signed-out */}
              <SignedOut>
                <div className="px-3 py-2">
                  <SignInButton mode="modal">
                    <button className="w-full px-3 py-2 rounded-md bg-[#0f766e] text-black hover:opacity-90">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
                <div className="px-3 py-2">
                  <SignUpButton mode="modal">
                    <button className="w-full px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              {/* Dark mode toggle in mobile menu */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                className="mobile-theme-toggle"
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
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div style={{ height: "5rem" }}></div>
    </>
  );
}
