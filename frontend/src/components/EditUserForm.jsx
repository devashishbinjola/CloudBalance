import React, { useState, useEffect } from "react";
import "../css/EditUserForm.css";
import axios from "axios";
import CustomerAccountSelector from "./CustomerAccountSelector";

const EditUserForm = ({ userData, onClose }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [selectedAccountIds, setSelectedAccountIds] = useState(userData.accountIds || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.role) {
      alert("All required fields must be filled.");
      return;
    }

    if (formData.role === "CUSTOMER" && selectedAccountIds.length === 0) {
      alert("Select at least one account for customer role.");
      return;
    }

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
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="user-form">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="ADMIN">ADMIN</option>
          <option value="READ_ONLY">READ_ONLY</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>

        {formData.role === "CUSTOMER" && (
          <CustomerAccountSelector
            selectedAccountIds={selectedAccountIds}
            setSelectedAccountIds={setSelectedAccountIds}
          />
        )}

        <div className="form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
