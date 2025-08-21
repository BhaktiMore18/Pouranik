// frontend/src/components/AuthForm.jsx

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthForm = ({ formType, isDarkMode }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSignup = async (data) => {

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, { displayName: data.fullName });
            toast.success("Account created successfully!");
            window.dispatchEvent(new Event('authChange'));
            navigate("/profile");
        } catch (error) {
            // FIX: Use the 'error' variable to provide a specific message.
            toast.error(error.message.replace("Firebase:", ""));
        } finally {
            setIsLoading(false);
=======
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const message = await res.json();
        if (message.token) {
            localStorage.setItem("token", message.token);
            sessionStorage.setItem("showSignupToast", 'true');
            navigate('/');
        } else {
            // console.error("Token not received: ", message);
            toast.error(message);

        }
    };

    const onSignin = async (data) => {

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Welcome back!");
            window.dispatchEvent(new Event('authChange'));
            navigate("/profile");
        } catch (error) {
            // FIX: Use the 'error' variable here as well.
            toast.error(error.message.replace("Firebase:", ""));
        } finally {
            setIsLoading(false);
=======
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const message = await res.json();
        if (message.token) {
            localStorage.setItem("token", message.token);
            sessionStorage.setItem("showLoginToast", "true");
            navigate('/');
        } else {
            // console.error("Token not received: ", message);
            toast.error(message);

        }
    };
    
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        setIsLoading(true);
        try {
          await signInWithPopup(auth, provider);
          toast.success("Signed in with Google successfully!");
          window.dispatchEvent(new Event('authChange'));
          navigate("/profile");
        } catch (error) {
          // FIX: Use the 'error' variable for Google Sign-In too.
          toast.error(error.message.replace("Firebase:", ""));
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowPassword = () => {
        setVisible((prev) => !prev);
    };


    // --- The rest of the component remains the same ---
    // (UI classes and JSX structure)
    const inputClasses = `w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-600 focus:ring-purple-500 placeholder-gray-400" : "bg-white border-gray-300 focus:ring-teal-500 placeholder-gray-500"}`;
    const buttonClasses = `w-full py-3 text-lg font-bold text-white rounded-lg transition-transform duration-200 ${isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-teal-500 hover:bg-teal-600"} hover:scale-105 shadow-lg disabled:opacity-50`;
    const googleButtonClasses = `w-full flex items-center justify-center gap-3 py-3 text-lg font-semibold rounded-lg shadow-sm transition-all duration-200 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50 border"} disabled:opacity-50`;
=======
    const inputClasses = `w-full px-6 py-2 rounded-lg text-lg transition-all duration-300 ${
        isDarkMode 
        ? 'bg-gray-800 text-white border-2 border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
        : 'bg-white !text-gray-900 border-2 border-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
    }`;


    return (
        <div className={`w-full max-w-md space-y-6`}>
          <div>
            <h1 className="text-4xl font-bold">{formType === 'signup' ? "Create Account" : "Sign In"}</h1>
            <p className={`mt-2 text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {formType === 'signup' ? "Get started with your new account." : "Welcome back! Please enter your details."}
            </p>
          </div>


          <button onClick={handleGoogleSignIn} className={googleButtonClasses} disabled={isLoading}>
            <FaGoogle /> Continue with Google
          </button>

          <div className="flex items-center">
            <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
            <span className={`mx-4 font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
            <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
          </div>

          <form onSubmit={handleSubmit(formType === 'signup' ? onSignup : onSignin)} className="space-y-4">
            {formType === 'signup' && (
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={inputClasses}
                  {...register("fullName", { required: "Full name is required" })}
                />
                {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className={inputClasses}
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                className={inputClasses}
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              <button type="button" onClick={() => setVisible(!visible)} className="absolute inset-y-0 right-4 flex items-center">
                {visible ? <FaEyeSlash /> : <FaEye />}
              </button>
=======
    const buttonClasses = `submit-button px-10 py-4 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 ${
        isDarkMode
        ? 'bg-purple-700 text-white hover:bg-purple-800'
        : '!bg-teal-600 !text-white hover:bg-teal-700'
    } hover:scale-105`;

    return (
        <div className='login-container flex items-center justify-center w-full min-h-[60vh]'>
            <div className={`w-100  max-w-2xl mx-auto login-card rounded-2xl shadow-2xl p-8 ${
                isDarkMode 
                ? 'border border-gray-700 bg-gray-800/40'
                : 'border border-gray-200 bg-grey/40'
            }`}>
                <h1 className={`!text-xl font-bold text-center mb-5 tracking-wide ${
                    isDarkMode ? 'text-white shimmer' : 'text-gray-800'
                }`}>
                    {formType === "signup" ? "Sign-Up" : "Sign-In"}
                </h1>
                {formType === 'signup' ? (
                    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSignup)}>
                        <div>
                            <label className={labelClasses} htmlFor="FullName">Full Name</label>
                            <input
                                className={inputClasses}
                                {...register("FullName", {
                                    required: { value: true, message: "This field is required" },
                                    minLength: { value: 3, message: "Minlength is 3" },
                                    maxLength: { value: 24, message: "Maxlength is 24" }
                                })}
                                placeholder='Enter your full name'
                                id="FullName"
                            />
                            {errors.FullName && <div className='text-red-600'>{errors.FullName.message}</div>}
                        </div>
                        <div>
                            <label className={labelClasses}  htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={inputClasses}
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: { value: true, message: "Email is required" },
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address" }
                                })}
                            />
                            {errors.email && <div className='text-red-700'>{errors.email.message}</div>}
                        </div>
                        <div className="relative">
                            <label className={labelClasses} htmlFor="password">Password</label>
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                className={inputClasses}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, message: "Must include uppercase, lowercase, number, and special character" },
                                    maxLength: { value: 20, message: "Maxlength is 20" }
                                })}

                            />
                            <span onClick={HandleShowPassword} className='absolute top-11 right-3 '>
                                {visible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
                        </div>
                        <button
                            type="submit"
                            className={buttonClasses} style={{color:"black"}}>
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form className='flex flex-col space-y-8' onSubmit={handleSubmit(onSignin)}>
                        <div>
                            <label className={labelClasses} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={inputClasses}
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: { value: true, message: "Email is required" },
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email address" }
                                })}
                            />
                            {errors.email && <div className='text-red-700'>{errors.email.message}</div>}
                        </div>
                        <div className="relative">
                            <label className={labelClasses} htmlFor="password">Password</label>
                            <input
                                type={visible ? "text" : "password"}
                                id="password"
                                className={inputClasses}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, message: "Must include uppercase, lowercase, number, and special character" },
                                    maxLength: { value: 20, message: "Maxlength is 20" }
                                })}
                            />
                            <span onClick={HandleShowPassword} className='absolute top-11 right-3 '>
                                {visible ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
                        </div>
                        <button
                            type="submit"
                            className={buttonClasses} style={{color:"black"}}>
                            Login
                        </button>
                    </form>
                )}

            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <button type="submit" className={buttonClasses} disabled={isLoading}>
              {isLoading ? "Processing..." : (formType === 'signup' ? "Sign Up" : "Sign In")}
            </button>
          </form>
        </div>
    );
};

// frontend/src/components/Navbar.jsx

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon, LogOut } from "lucide-react"; // FIX: Removed unused icons
import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  // FIX: 'location' is now used in the dependency array of a useEffect hook
  // to ensure the mobile menu closes on navigation.
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

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location]);

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
