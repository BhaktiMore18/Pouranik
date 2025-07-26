import { useState } from "react"
import AuthForm from "../components/AuthForm";

const SignIn = () => {
  const [formType, setFormType] = useState('signin');  //signin ot signup

  const handleChangeFormType = () => {
    if(formType==='signin'){
      setFormType('signup');
    }else{
      setFormType('signin');
    }
  }

  return (
    <div>
      <section className='flex justify-center items-center !w-full !h-screen lg:flex'>
        <div>
          {formType==='signin'
          ? (
            <section className='flex flex-col !space-y-7 border-2  border-amber-500 rounded-2xl !p-10 justify-center items-center'>
              <p className="text-xl">Sign-In</p>
              <AuthForm formType={formType} />
              <p>Don't have an account ? 
                <button className='cursor-pointer bg-white !py-1 !mx-2' onClick=  {handleChangeFormType} >Sign-Up</button>
              </p>
            </section>
          )
          : (
            <section className='flex flex-col !space-y-7 border-2 border-amber-500 rounded-2xl !p-10 justify-center items-center'>
              <p className="text-xl">Sign-Up</p>
              <AuthForm formType={formType} />
              <p>Already have an account ?
              <button className='cursor-pointer bg-white !py-1 !mx-2' onClick={handleChangeFormType}>Sign-In</button>
            </p>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

export default SignIn
