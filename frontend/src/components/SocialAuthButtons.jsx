import { FaGoogle, FaFacebookF } from "react-icons/fa";

<img
  src="https://developers.google.com/identity/images/g-logo.png"
  alt="Google logo"
  className="w-5 h-5"
/>

const SocialAuthButtons = ({ onSocialClick }) => {
  return (
    <div className="flex flex-col w-full space-y-3">
      {/* Google Button - Black */}
 <button
  onClick={() => onSocialClick("Google")}
  className="flex items-center justify-center gap-3 w-full bg-white text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-200"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google logo"
    className="w-5 h-5"
  />
  Continue with Google
</button>

      {/* Facebook Button - Blue */}
      <button
        onClick={() => onSocialClick("Facebook")}
        className="flex items-center justify-center !bg-blue-600 text-black py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 hover:scale-105 transition-all duration-200"
      >
        <FaFacebookF className="mr-3 text-white text-lg" />
        Continue with Facebook
      </button>
    </div>
  );
};

export default SocialAuthButtons;
