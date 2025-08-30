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
  const [strength, setStrength] = useState("");

  const onSignup = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const message = await res.json();
    if (message.token) {
      localStorage.setItem("token", message.token);
      sessionStorage.setItem("showSignupToast", "true");
      navigate("/");
    } else {
      // console.error("Token not received: ", message);
      toast.error(message);
    }
  };

  const onSignin = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const message = await res.json();
    if (message.token) {
      localStorage.setItem("token", message.token);
      sessionStorage.setItem("showLoginToast", "true");
      navigate("/");
    } else {
      // console.error("Token not received: ", message);
      toast.error(message);
    }
  };

  const HandleShowPassword = () => {
    setVisible((prev) => !prev);
  };

  // Password strength checker
  const checkStrength = (password) => {
    if (!password) return "";
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score === 2) return "Fair";
    if (score >= 3) return "Strong";
  };

  // Map strength to colors & progress bar width
  const getStrengthBar = (strength) => {
    switch (strength) {
      case "Weak":
        return { width: "33%", color: "bg-red-500" };
      case "Fair":
        return { width: "66%", color: "bg-yellow-500" };
      case "Strong":
        return { width: "100%", color: "bg-green-500" };
      default:
        return { width: "0%", color: "bg-transparent" };
    }
  };

  const inputClasses = `w-full px-6 py-2 rounded-lg text-lg transition-all duration-300 ${
    isDarkMode
      ? "bg-gray-800 text-white border-2 border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
      : "bg-white !text-gray-900 border-2 border-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
  }`;

  const labelClasses = `text-lg mb-3 font-semibold ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  const buttonClasses = `submit-button px-10 py-4 rounded-lg text-lg font-bold shadow-lg transition-all duration-300 ${
    isDarkMode
      ? "bg-purple-700 text-white hover:bg-purple-800"
      : "!bg-teal-600 !text-white hover:bg-teal-700"
  } hover:scale-105`;

  return (
    <div className="login-container-wrapper w-full">
      {/* Heading */}
{/* <h1 className="text-4xl font-extrabold text-center mb-10 
  bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 
  bg-clip-text text-transparent 
  drop-shadow-[0_0_5px_rgba(20,184,166,0.7)] 
  tracking-wide">
  Sign-in
</h1> */}

      <div className="login-container flex items-center justify-center w-full min-h-[60vh]">
        <div
          className={`w-100  max-w-2xl mx-auto login-card rounded-2xl shadow-2xl p-8 ${
            isDarkMode
              ? "border border-gray-700 bg-gray-800/40"
              : "border border-teal-200 bg-grey/40"
          }`}
        >
          <h1
            className={`!text-xl font-bold text-center mb-5 tracking-wide ${
              isDarkMode ? "text-white shimmer" : "text-gray-800"
            }`}
          >
            {formType === "signup" ? "Sign-Up" : "Sign-In"}
          </h1>
          {formType === "signup" ? (
            <form
              className="flex flex-col space-y-8"
              onSubmit={handleSubmit(onSignup)}
            >
              <div>
                <label className={labelClasses} htmlFor="FullName">
                  Full Name
                </label>
                <input
                  className={inputClasses}
                  {...register("FullName", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 3, message: "Minlength is 3" },
                    maxLength: { value: 24, message: "Maxlength is 24" },
                  })}
                  placeholder="Enter your full name"
                  id="FullName"
                />
                {errors.FullName && (
                  <div className="text-red-600">{errors.FullName.message}</div>
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
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-700">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
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
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 7, message: "MinLength is 7" },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                      message:
                        "Must include uppercase, lowercase, number, and special character",
                    },
                    maxLength: { value: 20, message: "Maxlength is 20" },
                  })}
                  onChange={(e) => setStrength(checkStrength(e.target.value))}
                />
                <span
                  onClick={HandleShowPassword}
                  className="absolute top-11 right-3 cursor-pointer"
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <div className="text-red-700">{errors.password.message}</div>
                )}

                {/* Password strength progress bar + text below (hidden until typing) */}
                {strength && (
                  <div className="mt-5 mb-4">
                    {/* Strength text first */}
                    <p
                      className={`text-sm mb-2 text-left font-medium tracking-wide transition-colors duration-300 ${
                        strength === "Weak"
                          ? "text-red-500"
                          : strength === "Fair"
                          ? "text-yellow-500"
                          : strength === "Strong"
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      Password Strength: {strength}
                    </p>

                    {/* Progress bar below */}
                    <div className="w-full h-1 bg-gray-300 rounded overflow-hidden">
                      <div
                        className={`h-1 rounded transition-all duration-500 ease-in-out ${
                          getStrengthBar(strength).color
                        } ${
                          strength === "Weak"
                            ? "animate-pulse"
                            : strength === "Fair"
                            ? "animate-[pulse_2s_ease-in-out_infinite]"
                            : strength === "Strong"
                            ? "shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                            : ""
                        }`}
                        style={{ width: getStrengthBar(strength).width }}
                      />
                    </div>
                  </div>
                )}
                <span
                  onClick={HandleShowPassword}
                  className="absolute top-11 right-3 "
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <div className="text-red-700">{errors.password.message}</div>
                )}
              </div>
              <button
                type="submit"
                className={buttonClasses}
                style={{ color: "black" }}
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col space-y-8"
              onSubmit={handleSubmit(onSignin)}
            >
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
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-700">{errors.email.message}</div>
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
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: { value: 7, message: "MinLength is 7" },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                      message:
                        "Must include uppercase, lowercase, number, and special character",
                    },
                    maxLength: { value: 20, message: "Maxlength is 20" },
                  })}
                />
                <span
                  onClick={HandleShowPassword}
                  className="absolute top-11 right-3 "
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password && (
                  <div className="text-red-700">{errors.password.message}</div>
                )}
              </div>
              <button
                type="submit"
                className={buttonClasses}
                style={{ color: "black" }}
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
