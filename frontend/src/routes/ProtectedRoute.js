import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children,alloweduser}) => {
  const{token,role}= useSelector((state)=>state.auth);
  if(!token){
    return <Navigate to="/" replace/>
  }
  if(!alloweduser.includes(role)){
    return <Navigate to="/unauthorized" replace />
  }
  return children;
}

export default ProtectedRoute;
