import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/auth";
import "../css/Login.css";
import logo from "../../public/logocloudbalance.png"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data + "\t" + err?.status);
    }
  };

  return (
    <>
    <div className="page-container">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <img src={logo} alt="CloudBalance Logo" />
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <div className="footer">
        <p>
          <span>Contact Us</span>
          <span>Terms and Conditions</span>
        </p>
      </div>
      </div>
    </>
  );
};

export default Login;
