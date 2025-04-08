import React from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Login />
    </>
  );
}

export default App;
