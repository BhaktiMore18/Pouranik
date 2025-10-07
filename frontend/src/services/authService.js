// frontend/src/services/authService.js
import axios from "axios";

// API base URL (vite env)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Request password reset (send email)
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error.response?.data || error.message);
    throw error;
  }
};

// Reset password using token
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error.response?.data || error.message);
    throw error;
  }
};
