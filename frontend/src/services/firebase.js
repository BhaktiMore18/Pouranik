// frontend/src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Load Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyA3b6vvc6cwDc_OUwI_pgta_Mc9b8IED8E",
  authDomain: "prepbuddy-d9e0d.firebaseapp.com",
  projectId: "prepbuddy-d9e0d",
  storageBucket: "prepbuddy-d9e0d.firebasestorage.app",
  messagingSenderId: "723887425143",
  appId: "1:723887425143:web:88dd95604660c8b28c2872",
  measurementId: "G-N80R8E4W84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export only the auth service, which is what your app uses
export const auth = getAuth(app);
