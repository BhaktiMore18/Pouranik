import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Book, Heart, Repeat, Bookmark } from "lucide-react";
import AuthForm from "../components/AuthForm";

const SignIn = ({ isDarkMode }) => {
  const [formType, setFormType] = useState('signin');

  const handleChangeFormType = () => {
    setFormType(prev => (prev === 'signin' ? 'signup' : 'signin'));
  };

  const features = [
    {
      icon: Book,
      text: "Explore thousands of books",
    },
    {
      icon: Heart,
      text: "Favorite & save your reads",
    },
    {
      icon: Repeat,
      text: "Exchange books with community",
    },
    {
      icon: BookOpen,
      text: "Explore different genres of books",
    },
  ];

  return (
    <div className={`flex`}>

      {/* Left side - Logo & Features */}
      <div className="md:flex w-1/2 flex-col items-center justify-center text-center space-y-6 rounded-r-4xl min-h-screen" style={{
        background: isDarkMode
          ? "var(--neutral-50)"
          : "var(--primary-100)",
      }}>
        {/* Logo */}
        <div className="flex flex-col items-center gap-4 justify-center">
          <BookOpen size={120} className="text-[#0f766e]" />
          <h2 className="text-4xl font-bold text-[#0f766e]">Pouranik</h2>
          <p className="text-sm bg-[#0f766e] text-white -mt-1 rounded-2xl p-2" style={{background: isDarkMode ? "text-white" : "text-black"}}>Book Discovery & Exchange</p>
        </div>

        {/* Feature lines with icons */}
        <div className="space-y-3 mt-6 text-left">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon size={24} className="text-[#0f766e]" />
                <p className="text-sm" style={{background: isDarkMode ? "text-white" : "text-black"}}>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl transition-colors duration-500 shadow-md flex flex-col`} 
          style={{
        background: isDarkMode
          ? "var(--neutral-50)"
          : "var(--primary-100)",
      }}
        >
          <div className="text-center mb-6">
            <h2 className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-primary-400' : 'text-[#0f766e]'}`}>
              {formType === 'signin' ? 'Sign In' : 'Sign Up'}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {formType === 'signin'
                ? 'Welcome back! Please login to your account.'
                : 'Create a new account to get started.'}
            </p>
          </div>

          <AuthForm formType={formType} isDarkMode={isDarkMode} />

          <div className="mt-6 text-center text-sm">
            {formType === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={handleChangeFormType}
              className="font-semibold underline underline-offset-4"
              style={{color : isDarkMode ? "#0f766e" : "white",
                backgroundColor: isDarkMode ? "#0f766e" : "#0d9488"
              }}
            >
              {formType === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
    <div>
      <section className={`flex justify-center items-center !w-full lg:flex  ${
        formType === "signup"? "!mt-10" :"!mt-15" }`}>
        <div className="w-full" >
          {formType === 'signin' ? (
            <section className='flex flex-col w-full rounded-2xl justify-center items-center '>
              <AuthForm formType={formType} isDarkMode={isDarkMode} />
              <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                Don't have an account ? 
                <button className='cursor-pointer bg-white !text-black !py-1 !mx-2' onClick={handleChangeFormType}>
                  Sign-Up
                </button>
              </p>
            </section>
          ) : (
            <section className='flex flex-col !space-y-8 rounded-2xl justify-center items-center'>
              <AuthForm formType={formType} isDarkMode={isDarkMode} />
              <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                Already have an account ?
                <button className='cursor-pointer bg-white !text-black !py-1 !mx-2' onClick={handleChangeFormType}>
                  Sign-In
                </button>
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
