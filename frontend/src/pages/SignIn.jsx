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
          <section className='flex flex-col w-full rounded-2xl justify-center items-center '>
            <AuthForm 
              formType={formType} 
              isDarkMode={isDarkMode}
              handleChangeFormType={handleChangeFormType}
            />
          </section>
        </div>
      </section>
    </div>
  )
}

export default SignIn
