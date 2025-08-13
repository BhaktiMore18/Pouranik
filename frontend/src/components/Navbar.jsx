import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    const handleAuthChange = () => setIsLoggedIn(!!auth.currentUser);
    window.addEventListener('authChange', handleAuthChange);

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
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
            <div className="mobile-menu-content">
              {/* Mobile menu links would go here */}
            </div>
          </div>
        )}
      </nav>
      <div className="navbar-spacer"></div>
    </>
  );
}
