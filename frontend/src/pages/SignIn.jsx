import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import SocialAuthButtons from "../components/SocialAuthButtons";

const SignIn = ({ isDarkMode }) => {
  const [formType, setFormType] = useState("signin");
  const navigate = useNavigate();

  const handleChangeFormType = () => {
    setFormType(formType === "signin" ? "signup" : "signin");
  };

  const handleSocialSignIn = (provider) => {
    console.log(`Signing in with ${provider}`);
    // Add OAuth logic here if needed
  };

  const handleFormSubmit = (data) => {
    console.log("User Data:", data);
    // Simulate login logic here, then redirect
    navigate("/home");
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className={`flex flex-col space-y-6 rounded-2xl p-10 shadow-xl min-w-[320px] max-w-[400px] w-full items-center mt-6 ${isDarkMode ? 'bg-gray-800 text-white border-white' : 'bg-gray-200 border-green-900 text-black'}`}>
        <p className="text-2xl font-semibold">
          {formType === "signin" ? "Sign In" : "Sign Up"}
        </p>

        {/* Auth Form */}
        <AuthForm formType={formType} onSubmit={handleFormSubmit} isDarkMode={isDarkMode} />

        {/* Forgot Password (only for Sign In) */}
        {formType === "signin" && (
          <div className="w-full text-right">
            <a
              href="/forgot-password"
              className={`text-sm hover:underline ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}
            >
              Forgot Password?
            </a>
          </div>
        )}

        {/* Social Auth */}
        <div className="flex items-center w-full">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <SocialAuthButtons onSocialClick={handleSocialSignIn} />

        {/* Switch Prompt */}
        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          {formType === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={handleChangeFormType}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={handleChangeFormType}
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignIn;