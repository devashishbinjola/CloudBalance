const createUserTableConfig = (onEditUser, role) => {
  const columns = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "firstName",
      header: "First Name",
    },
    {
      key: "lastName",
      header: "Last Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "role",
      header: "Role",
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (user) =>
        user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A",
    },
  ];

  // Only add the Action column if the role is ADMIN
  if (role === "ADMIN") {
    columns.push({
      key: "actions",
      header: "Action",
      render: (user) => ({
        type: "edit",
        onClick: () => onEditUser(user),
      }),
    });
  }

  return columns;
};

export default createUserTableConfig;
