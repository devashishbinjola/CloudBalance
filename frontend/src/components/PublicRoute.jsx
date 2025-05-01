import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
