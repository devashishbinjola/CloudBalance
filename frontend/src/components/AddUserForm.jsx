import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomerAccountSelector from "./CustomerAccountSelector"; 
import "../css/AddUserForm.css";

const AddUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const [selectedAccountIds, setSelectedAccountIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.password || !formData.role) {
      toast.error("All fields are required");
      return;
    }

    if (formData.role === "CUSTOMER" && selectedAccountIds.length === 0) {
      toast.error("Please select at least one account for the customer.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        accountIds: formData.role === "CUSTOMER" ? selectedAccountIds : [],
      };

      // try{
        await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      
    // }
    // catch(err){
    //   // console.log(err);
    //   throw err;
    // }

      toast.success("User added successfully!");
      setFormData({ firstName: "", lastName: "", email: "", password: "", role: "" });
      setSelectedAccountIds([]);
      onClose();
    } catch (error) {
      const errorMsg = error.response?.data;
      console.log("error is ",error);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-form-container">
      <h2>Add New User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Temporary Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="" disabled>
            Select Role
          </option>
          <option value="ADMIN">Admin</option>
          <option value="CUSTOMER">Customer</option>
          <option value="READ_ONLY">Read Only</option>
        </select>

        {formData.role === "CUSTOMER" && (
          <CustomerAccountSelector
            selectedAccountIds={selectedAccountIds}
            setSelectedAccountIds={setSelectedAccountIds}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
