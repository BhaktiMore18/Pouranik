import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ register, name, rules }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
        {...(register && register(name, rules))}
      />
      <span
        onClick={togglePassword}
        className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;
