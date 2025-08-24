import { useState } from "react"
import AuthForm from "../components/AuthForm";

const SignIn = ({ isDarkMode }) => {  // Add isDarkMode prop
  const [formType, setFormType] = useState('signin');

  const handleChangeFormType = () => {
    if(formType==='signin'){
      setFormType('signup');
    }else{
      setFormType('signin');
    }
  }

  return (
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
      </section>
    </div>
  )
}

export default SignIn
