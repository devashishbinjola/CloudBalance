import React from 'react'
import { useSelector } from 'react-redux'

const SideBar = () => {

  const {permission} = useSelector((state)=> state.auth)
  return (
    <div className='sidebar'>
    <ul>
      {
        permission.includes("CEM") && (
          <li><Link to="">Cost Explorer</Link></li>
        )
      }
      {
        permission.includes("ASD") && (
          <li><Link to="">Amazon Service Dashboard</Link></li>
        )
      }
      {
        permission.includes("OM") && (
          <li><Link to="">Onboarding</Link></li>
        )
      }
      {
        permission.includes("UM") && (
          <li><Link to="">User Mangement</Link></li>
        )
      }
    </ul>
      
    </div>
  )
}

export default SideBar;

