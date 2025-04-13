import React from 'react'
import "../css/Navbar.css";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout} from '../../src/redux/actions/authActions'
import logo from '../../public/logocloudbalance.png'

const Navbar = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const firstName = localStorage.getItem("fristName");

    const handleLogout = () =>{
      dispatch(logout());
      navigate("/")
    }
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt='CloudBalance Logo' className='navbar-logo'></img>
      </div>
      <div className="navbar-right">
      <span className='username'>{firstName}</span>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
      <button></button>
      </div>

    </nav>
  )
}

export default Navbar;
