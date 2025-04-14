import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import UserManagement from "./components/UserManagement";
import CostExplorer from "./components/CostExplorer";
import Onboarding from "./components/Onboarding";
import AmazonServiceDashboard from "./components/AmazonServiceDashboard";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} >
          <Route path="user-management" element={<UserManagement />} />
          <Route path="cost-explorer" element={<CostExplorer />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="amazon-service-dashboard" element={<AmazonServiceDashboard />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
