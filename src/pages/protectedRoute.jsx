
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();


  if (!user || !user.token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
