import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../services/firebase"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// A presentational component for the side illustration
const AuthIllustration = () => (
  <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-gradient-to-br from-purple-600 to-teal-500 p-12 text-white">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Pouranik</h1>
      <p className="text-xl">Discover and share the world of books.</p>
    </div>
  </div>
);

const Auth = ({ isDarkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handles both email/password sign-in and sign-up
  const handleAuthentication = async (data) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(userCredential.user, { displayName: data.fullName });
        toast.success("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast.success("Welcome back!");
      }
      window.dispatchEvent(new Event('authChange'));
      navigate("/profile"); // Navigate to profile on success
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    } finally {
      setIsLoading(false);
    }
  };

  // Handles Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google successfully!");
      window.dispatchEvent(new Event('authChange'));
      navigate("/profile"); // Navigate to profile on success
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormMode = () => {
    setIsSignUp(!isSignUp);
    reset();
  };

  // Dynamic classes for styling
  const formContainerClasses = `w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`;
  const inputClasses = `w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-600 focus:ring-purple-500 placeholder-gray-400" : "bg-white border-gray-300 focus:ring-teal-500 placeholder-gray-500"}`;
  const buttonClasses = `w-full py-3 text-lg font-bold text-white rounded-lg transition-transform duration-200 ${isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-teal-500 hover:bg-teal-600"} hover:scale-105 shadow-lg disabled:opacity-50`;
  const googleButtonClasses = `w-full flex items-center justify-center gap-3 py-3 text-lg font-semibold rounded-lg shadow-sm transition-all duration-200 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50 border"} disabled:opacity-50`;

  return (
    <div className="flex w-full min-h-screen">
      <AuthIllustration />
      <div className={formContainerClasses}>
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{isSignUp ? "Create Account" : "Sign In"}</h1>
            <p className={`mt-2 text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {isSignUp ? "Get started with your new account." : "Welcome back! Please enter your details."}
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

          <form onSubmit={handleSubmit(handleAuthentication)} className="space-y-4">
            {isSignUp && (
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inputClasses}
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-4 flex items-center">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <button type="submit" className={buttonClasses} disabled={isLoading}>
              {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
          </form>

          <p className="text-center text-lg">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={toggleFormMode} className={`font-semibold hover:underline ${isDarkMode ? "text-purple-400" : "text-teal-600"}`}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
