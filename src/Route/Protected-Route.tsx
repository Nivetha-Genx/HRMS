import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log("Protected Route - Checking authentication:");
    console.log("Token:", token);
    console.log("User:", user);
    
    // Check if both token and user exist
    if (!token || !user) {
      console.log("Missing token or user data");
      return false;
    }
    
    try {
      // Validate that user data is valid JSON
      const parsedUser = JSON.parse(user);
      console.log("Parsed user:", parsedUser);
      
      // Optional: Add token expiration check here if your API provides expiry
      // You can decode JWT token and check exp claim
      
      console.log("Authentication successful");
      return true;
    } catch (error) {
      // If user data is corrupted, clear storage and redirect
      console.log("Error parsing user data:", error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  };

  // If not authenticated, redirect to login with the attempted location
  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;