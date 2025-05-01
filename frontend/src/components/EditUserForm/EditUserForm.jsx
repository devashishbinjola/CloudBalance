import React, { useState, useEffect } from "react";
import "./EditUserForm.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authActions.js"; // Adjust the import path based on your project structure
import CustomerAccountSelector from "../CustomerAccountSelector/CustomerAccountSelector";

const EditUserForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Fetch user's assigned accounts when component mounts
  useEffect(() => {
    const fetchUserAccounts = async () => {
      // Only fetch accounts if user is CUSTOMER
      if (userData.role === "CUSTOMER") {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/api/admin/users/${userData.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          
          // Extract account IDs from the response
          const accountIds = response.data.map(account => account.id);
          setSelectedAccountIds(accountIds);
        } catch (error) {
          console.error("Error fetching user accounts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchUserAccounts();
  }, [userData.id, userData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.role) {
      alert("All required fields must be filled.");
      return;
    }
    
    // Validate account selection for customer role
    if (formData.role === "CUSTOMER" && selectedAccountIds.length === 0) {
      alert("Select at least one account for customer role.");
      return;
    }
    
    // Check if the current user is editing their own role
    const isEditingSelf = currentUser && currentUser.id === formData.id;
    const isRoleChanged = isEditingSelf && currentUser.role !== formData.role;
    
    try {
      await axios.put(
        `http://localhost:8080/api/admin/users/${formData.id}`,
        {
          ...formData,
          accountIds: formData.role === "CUSTOMER" ? selectedAccountIds : [],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      // If user changed their own role, log them out
      if (isRoleChanged) {
        alert("Your role has been changed. You will be logged out.");
        dispatch(logout());
        navigate("/login");
        return;
      }
      
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="user-form">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input 
            id="firstName"
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input 
            id="lastName"
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            id="email"
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
            readOnly // Email shouldn't be editable
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role *</label>
          <select 
            id="role"
            name="role" 
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="READ_ONLY">READ_ONLY</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
          
          {currentUser && currentUser.id === formData.id && currentUser.role !== formData.role && (
            <div className="warning-message">
              Warning: Changing your own role will log you out immediately.
            </div>
          )}
        </div>
        
        {formData.role === "CUSTOMER" && (
          <div className="form-group">
          
            {isLoading ? (
              <div className="loading-accounts">Loading accounts...</div>
            ) : (
              <CustomerAccountSelector 
                selectedAccountIds={selectedAccountIds} 
                setSelectedAccountIds={setSelectedAccountIds} 
                isDisabled={isLoading}
              />
            )}
          </div>
        )}
        
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update"}
          </button>
          <button type="button" className="btn-secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;