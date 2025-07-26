// import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ formType }) => {
    const { register, handleSubmit, formState: { errors} } = useForm();
    const navigate = useNavigate();

    const onSignup = async (data) => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const message = await res.json();
        if (message.token) {
            localStorage.setItem("token", message.token);
            sessionStorage.setItem("showSignupToast", 'true');
            navigate('/');
        } else {
            console.error("Token not recieved: ", message);
            toast.error("Something went wrong !");
        }
    }

    const onSignin = async (data) => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const message = await res.json();
        if (message.token) {
            localStorage.setItem("token", message.token);
            sessionStorage.setItem("showLoginToast", "true");
            navigate('/');
        } else {
            console.error("Token not recieved: ", message);
            toast.error("User not signed up !")
        }
    }
    return (
        <div className=''>
            {formType === 'signup' ? (
                <form className='flex flex-col space-y-4 justify-center items-center' action="" onSubmit={handleSubmit(onSignup)}>
                    <input className='w-96' {...register("FullName", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Minlength is 3" }, maxLength: { value: 24, message: "Maxlength is 24" } })} placeholder='Full Name' />
                    {errors.FullName && <div className='text-red-700'>{errors.FullName.message}</div>}

                    <input className='w-96'
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <div className='text-red-700'>{errors.email.message}</div>}

                    <input className='w-96' {...register("password", {
                        required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                            message: "Must include uppercase, lowercase, number, and special character"
                        },
                        maxLength: { value: 20, message: "Maxlength is 20" }
                    })} type='password' placeholder='Password'
                    />
                    {errors.password && <div className='text-red-700'>{errors.password.message}</div>}

                    <button type='submit' className="bg-white w-full">Submit</button>
                </form>
            ) : (
                <form className='flex flex-col space-y-4 justify-center' action="" onSubmit={handleSubmit(onSignin)} >
                    <input
                        className='w-96'
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <div className='text-red-700'>{errors.email.message}</div>}

                    <input className='w-96' {...register("password", {
                        required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                            message: "Must include uppercase, lowercase, number, and special character"
                        },
                        maxLength: { value: 20, message: "Maxlength is 20" }
                    })} type='password' placeholder='Password'
                    />
                    {errors.password && <div className='text-red-700'>{errors.password.message}</div>}

                    <button type='submit' className="bg-white w-full">Submit</button>
                </form>
            )}

            <p>

            </p>
        </div>
    )
}

export default AuthForm;