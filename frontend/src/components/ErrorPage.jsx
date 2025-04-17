import React from "react";
import { Link } from "react-router-dom";
import "../css/ErrorPage.css";  

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">Access Denied</h1>
      <p className="error-message">
        You do not have permission to view this page. Please contact the
        administrator or <Link to="/">go back to the login page</Link>.
      </p>
      <Link to="/" className="error-button">Back to Login</Link>
    </div>
  );
};

export default ErrorPage;
