import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/SideBar/SideBar";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar />
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
