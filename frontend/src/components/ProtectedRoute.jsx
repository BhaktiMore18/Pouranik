import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
