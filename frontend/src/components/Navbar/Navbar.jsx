import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import logo from "../../assets/logocloudbalance.png"
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.clear();
      dispatch(logout());
      navigate("/");
      toast.success("Logout successful");
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="CloudBalance Logo" className="navbar-logo"></img>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <div className="user-name">
            <span className="first-name">Hello, {firstName}</span>
            <span className="last-name">{lastName}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
