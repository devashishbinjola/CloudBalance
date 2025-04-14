import React, { useState, useEffect } from "react";
import AddUserForm from "./AddUserForm";
import axios from "axios";
import "../css/UserManagement.css";

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

 
  const handleFormCloseOrSubmit = () => {
    setShowForm(true);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h2>User Management Dashboard</h2>
        <button className="add-user-btn" onClick={toggleForm}>
          {showForm ? "Close Form" : "Add User"}
        </button>
      </div>

      {showForm ? (
        <AddUserForm onClose={handleFormCloseOrSubmit} />
      ) : (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
