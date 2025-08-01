import { useForm } from "react-hook-form";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const AuthForm = ({ formType }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    // Simulate login delay (or replace with real API call)
    setTimeout(() => {
      console.log(`${formType === "signin" ? "Logging in" : "Signing up"} with`, data);
      setLoading(false);
      navigate("/home"); // redirect to home page
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-6">
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 "
      />

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        className="w-full px-4 py-2  border border-gray-300 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded !bg-blue-500 text-white font-semibold ${
          loading ? "opacity-50 cursor-not-allowed" : "!hover:bg-blue-600"
        }`}
      >
        {loading ? "Logging in..." : formType === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
