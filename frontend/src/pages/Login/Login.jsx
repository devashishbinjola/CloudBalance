import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { loginConfig } from "./loginConfig";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
      dispatch(loginSuccess(res.data));

      toast.success(loginConfig.messages.success, loginConfig.toast);

      const userRole = res.data.role.toLowerCase();
      const redirectPath = userRole === "admin" 
        ? loginConfig.navigation.admin.path 
        : loginConfig.navigation.default.path;
      
      navigate(redirectPath);
      
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data || loginConfig.messages.error, loginConfig.toast);
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <img 
            src={loginConfig.form.logo.src} 
            alt={loginConfig.form.logo.alt} 
          />
          {loginConfig.form.inputs.map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={input.name === "username" ? username : password}
              onChange={(e) => 
                input.name === "username" 
                  ? setUsername(e.target.value) 
                  : setPassword(e.target.value)
              }
              required={input.required}
            />
          ))}
          <button type="submit">
            {loginConfig.form.submitButton.text}
          </button>
        </form>
      </div>
      <div className="footer">
        <p>
          {loginConfig.footer.links.map((link, index) => (
            <span key={index}>{link.text}</span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Login;