import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import SearchAutocomplete from "./SearchAutocomplete";
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, Users, LogOut } from "lucide-react";
import { IoLibraryOutline } from "react-icons/io5";

const Navbar = ({ isDarkMode, toggleTheme }) => { // Corrected prop name to toggleTheme
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("You have been logged out successfully.");
      closeMobileMenu();
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { path: "/", label: "Home", icon: <Home size={18} />, public: true },
    { path: "/explore", label: "Explore", icon: <Search size={18} />, public: true },
    { path: "/genres", label: "Genres", icon: <BookMarked size={18} />, public: true },
    { path: "/community", label: "Community", icon: <Users size={18} />, public: false },
    { path: "/library", label: "Your Library", icon: <IoLibraryOutline size={18} />, public: false },
  ];

  const getFilteredNavLinks = () => {
    if (currentUser) {
        return navLinks;
    }
    return navLinks.filter(link => link.public);
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled || isMobileMenuOpen
            ? isDarkMode ? "bg-gray-800 shadow-lg" : "bg-white shadow-lg"
            : "bg-transparent"
        } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-x-3" onClick={closeMobileMenu}>
              <BookOpen size={42} className={isDarkMode ? "text-purple-400" : "text-teal-600"} />
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Pouranik
                </h1>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} style={{ marginTop: "-2px" }}>
                  Book Discovery
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {getFilteredNavLinks().map(({ path, label, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      isActive
                        ? (isDarkMode ? "bg-purple-600 text-white" : "bg-teal-500 text-white")
                        : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

            {/* Right side icons and buttons */}
            <div className="flex items-center gap-4">
              <SearchAutocomplete isDarkMode={isDarkMode} />
              <button
                onClick={toggleTheme} // Corrected prop name
                className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {currentUser ? (
                 <div className="hidden md:flex items-center gap-2">
                    <button onClick={handleLogout}  className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                    <img src={currentUser.photoURL || `https://i.pravatar.cc/150?u=${currentUser.uid}`} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-purple-400"/>
                 </div>
              ) : (
                <Link to="/auth" className={`hidden md:block px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full pb-4 px-4 sm:px-6 lg:px-8" style={{ background: isDarkMode ? 'rgb(31 41 55)' : 'rgb(255 255 255)' }}>
            <div className="flex flex-col gap-y-2 pt-2">
              {getFilteredNavLinks().map(({ path, label, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-md text-lg font-medium transition-all duration-300 ${
                      isActive
                        ? (isDarkMode ? "bg-purple-600 text-white" : "bg-teal-500 text-white")
                        : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100")
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              ))}
              <hr className={`my-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`} />
              {currentUser ? (
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-md text-lg font-medium">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
              ) : (
                <Link to="/auth" onClick={closeMobileMenu} className={`block w-full text-center px-4 py-3 rounded-md font-semibold ${isDarkMode ? 'bg-purple-600 text-white' : 'bg-teal-500 text-white'}`}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar; 
