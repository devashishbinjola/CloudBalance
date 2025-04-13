import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Route, Router, Routes } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      
      <ToastContainer position="top-right" autoClose={3000} />
      <Login/>
      {/* <Router>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
