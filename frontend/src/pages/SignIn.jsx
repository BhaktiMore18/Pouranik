import { useState } from "react"
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";  // 💡 Added for navigation to Forgot Password page

const SignIn = ({ isDarkMode }) => {  // Add isDarkMode prop
  const [formType, setFormType] = useState('signin');
    const navigate = useNavigate(); // 💡 Hook to redirect user

  const handleChangeFormType = () => {
    if(formType==='signin'){
      setFormType('signup');
    }else{
      setFormType('signin');
    }
  }

   const handleForgotPassword = () => { // 💡 New handler for Forgot Password link
    navigate('/forgot-password');
  }

  return (
    <div>
      <section className={`flex justify-center items-center !w-full lg:flex  ${
        formType === "signup"? "!mt-10" :"!mt-15" }`}>
        <div className="w-full" >
          {formType === 'signin' ? (
            <section className='flex flex-col w-full rounded-2xl justify-center items-center '>
              <AuthForm formType={formType} isDarkMode={isDarkMode} />

               {/* 💡 Added "Forgot Password" link below the Sign-In form */}
              <p
                onClick={handleForgotPassword}
                className={`mt-3 text-sm cursor-pointer underline ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                Forgot Password?
              </p>
              
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
      </section>
    </div>
  )
}

export default SignIn
