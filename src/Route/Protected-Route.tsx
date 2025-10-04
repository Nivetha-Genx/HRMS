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
    
  
    
    // Check if both token and user exist
    if (!token || !user) {
    
      return false;
    }
    
    try {
     
      
     
      return true;
    } catch (error) {
    
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