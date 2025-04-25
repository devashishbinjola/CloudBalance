import React, { useState, useEffect } from "react";
import AddUserForm from "../../AddUserForm/AddUserForm";
import EditUserForm from "../../EditUserForm/EditUserForm"; 
import axios from "axios";
import "./UserManagement.css";
import { FaEdit } from "react-icons/fa";

const USERS_PER_PAGE = 15;

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null); 
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const role = localStorage.getItem("role");

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setEditUser(null); 
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
    setShowForm(false);
    setEditUser(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowForm(false); 
  };

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h2>User Management Dashboard</h2>
        {role === "ADMIN" && !editUser && (
          <button className="add-user-btn" onClick={toggleForm}>
            {showForm ? "Close Form" : "Add User"}
          </button>
        )}
      </div>

      {showForm ? (
        <AddUserForm onClose={handleFormCloseOrSubmit} />
      ) : editUser ? (
        <EditUserForm userData={editUser} onClose={handleFormCloseOrSubmit} />
      ) : (
        <>
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Last Login</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}</td>
                      <td>
                        <FaEdit
                          className="edit-icon"
                          onClick={() => handleEditUser(user)}
                          style={{ cursor: "pointer", color: "#007bff" }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
