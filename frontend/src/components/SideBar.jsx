import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../css/SideBar.css"

const SideBar = () => {

  const {permission} = useSelector((state)=> state.auth)
  return (
    <div className='sidebar'>
    <ul>
        {permission.includes("UM") && (
          <li><Link to="/dashboard/user-management">User Management</Link></li>
        )}
        {permission.includes("CEM") && (
          <li><Link to="/dashboard/cost-explorer">Cost Explorer</Link></li>
        )}
        {permission.includes("OM") && (
          <li><Link to="/dashboard/onboarding">Onboarding</Link></li>
        )}
        {permission.includes("ASD") && (
          <li><Link to="/dashboard/amazon-service-dashboard">Amazon Dashboard</Link></li>
        )}
      </ul>
      
    </div>
  )
}

export default SideBar;

