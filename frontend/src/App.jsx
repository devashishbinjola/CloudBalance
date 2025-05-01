import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard"; 
import UserManagement from "./components/DashBoards/UserManagementDashBoard/UserManagement";
import CostExplorer from "./components/DashBoards/CostExplorerDashBoard/CostExplorer";
import Onboarding from "./components/Onboarding/Onboarding";
import AmazonServiceDashboard from "./components/DashBoards/AmazonServiceDashBoard/AmazonServiceDashboard";
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ErrorPage from './components/ErrorPages/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            
            <Route path="cost-explorer" element={
              <PrivateRoute>
                <CostExplorer />
              </PrivateRoute>
            } />
            
            <Route path="amazon-service-dashboard" element={
              <PrivateRoute>
                <AmazonServiceDashboard />
              </PrivateRoute>
            } />

            <Route path="user-management" element={
              <ProtectedRoute allowedRoles={['ADMIN', 'READ_ONLY']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="onboarding" element={
              <ProtectedRoute allowedRoles={['ADMIN']}> 
                <Onboarding />
              </ProtectedRoute>
              } />
            
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
