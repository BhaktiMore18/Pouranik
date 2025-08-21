import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = ({ formType, isDarkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ---------------- SIGNUP ----------------
  const onSignup = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const res = await fetch(${import.meta.env.VITE_BACKEND_URL}/signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const message = await res.json();
      if (message.token) {
        localStorage.setItem("token", message.token);
        setSuccessMessage("✅ Sign up successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Signup failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SIGNIN ----------------
  const onSignin = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const res = await fetch(${import.meta.env.VITE_BACKEND_URL}/login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const message = await res.json();
      if (message.token) {
        localStorage.setItem("token", message.token);
        setSuccessMessage("✅ Login successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setVisible((prev) => !prev);

  // ---------------- STYLING ----------------
  const inputClasses = `w-full px-6 py-2 rounded-lg text-lg transition-all duration-300 ${
    isDarkMode
      ? "bg-gray-800 text-white border-2 border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      : "bg-white text-gray-900 border-2 border-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
  }`;

  const labelClasses = `text-lg mb-2 font-semibold ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  const buttonClasses = `submit-button px-10 py-3 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 ${
    isDarkMode
      ? "bg-purple-700 text-white hover:bg-purple-800"
      : "bg-teal-600 text-white hover:bg-teal-700"
  } hover:scale-105`;

  // ---------------- RENDER ----------------
  return (
    <div className="login-container flex items-center justify-center w-full min-h-[60vh]">
      <div
        className={`w-full max-w-2xl mx-auto login-card rounded-2xl shadow-2xl p-8 ${
          isDarkMode
            ? "border border-gray-700 bg-gray-800/40"
            : "border border-gray-200 bg-white/40"
        }`}
      >
        <h1
          className={`text-2xl font-bold text-center mb-6 tracking-wide ${
            isDarkMode ? "text-white shimmer" : "text-gray-800"
          }`}
        >
          {formType === "signup" ? "Create an Account" : "Welcome Back"}
        </h1>

        {/* SIGNUP FORM */}
        {formType === "signup" ? (
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSignup)}>
            <div>
              <label className={labelClasses} htmlFor="FullName">
                Full Name
              </label>
              <input
                className={inputClasses}
                {...register("FullName", {
                  required: "Full name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                  maxLength: { value: 24, message: "Maximum 24 characters" },
                })}
                placeholder="Enter your full name"
                id="FullName"
              />
              {errors.FullName && (
                <p className="text-red-600 mt-1">{errors.FullName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inputClasses}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <label className={labelClasses} htmlFor="password">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                id="password"
                className={inputClasses}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 7, message: "Minimum 7 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" },
                  pattern: {
                    value: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^A-Za-z0-9]).+$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
              />
              <span onClick={togglePassword} className="absolute top-11 right-3 cursor-pointer">
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className={buttonClasses} disabled={loading}>
              {loading ? "⏳ Loading..." : "Sign Up"}
            </button>
          </form>
        ) : (
          // LOGIN FORM
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit(onSignin)}>
            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inputClasses}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <label className={labelClasses} htmlFor="password">
                Password
              </label>
              <input
                type={visible ? "text" : "password"}
                id="password"
                className={inputClasses}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 7, message: "Minimum 7 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" },
                  pattern: {
                    value: /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^A-Za-z0-9]).+$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
              />
              <span onClick={togglePassword} className="absolute top-11 right-3 cursor-pointer">
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className={buttonClasses} disabled={loading}>
              {loading ? "⏳ Loading..." : "Login"}
            </button>
          </form>
        )}

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;