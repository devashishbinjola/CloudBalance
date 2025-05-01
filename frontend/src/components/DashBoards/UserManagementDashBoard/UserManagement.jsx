import React, { useState, useEffect } from "react";
import AddUserForm from "../../AddUserForm/AddUserForm";
import EditUserForm from "../../EditUserForm/EditUserForm"; 
import { getAllUsers } from "../../../api/user.js";
import { Pagination } from "../../common/Pagination/Pagination.jsx";
import Table from "../../common/Table/Table";
import createUserTableConfig from "./userTableConfig.js";
import { useSelector } from "react-redux";
import "./UserManagement.css";

const USERS_PER_PAGE = 12;

const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null); 
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const role = useSelector((state) => state.auth.role);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setEditUser(null); 
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setShowForm(false); 
  };

  const userTableColumns = createUserTableConfig(handleEditUser, role);

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
          <Table 
            columns={userTableColumns}
            data={currentUsers}
            emptyMessage="No users found."
          />
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default UserManagement;