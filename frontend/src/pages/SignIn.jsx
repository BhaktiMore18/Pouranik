import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import './signin.css';

const SignIn = ({ isDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formType, setFormType] = useState(
    location.pathname === '/signup' ? 'signup' : 'signin'
  );

  useEffect(() => {
    setFormType(location.pathname === '/signup' ? 'signup' : 'signin');
  }, [location.pathname]);

  const handleChangeFormType = () => {
    if (formType === 'signin') {
      navigate('/signup');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="login-container">
      <div className="w-full max-w-md">
        <AuthForm formType={formType} isDarkMode={isDarkMode} />
        <p className={`mt-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {formType === 'signin' ? "Don't have an account?" : "Already have an account?"}
          <button
            className="ml-2 cursor-pointer bg-transparent text-blue-500 hover:underline"
            onClick={handleChangeFormType}
          >
            {formType === 'signin' ? 'Sign-Up' : 'Sign-In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
