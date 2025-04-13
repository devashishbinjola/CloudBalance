export const loginSuccess = (data) => {
    const { token, role, permission,firstName,lastName } = data;
  
    const parsedPermission = Array.isArray(permission)
      ? permission
      : permission?.split(",") || [];
      console.log("Login Payload:", { token, role, permission,firstName,lastName }); 
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("permission", JSON.stringify(parsedPermission));
    localStorage.setItem("firstName",firstName);
    localStorage.setItem("lastName",lastName);
  
    return {
      type: "LOGIN_SUCCESS",
      payload: { token, role, permission: parsedPermission,firstName,lastName },
    };
  };
  
  export const logout = () => {
    localStorage.clear();
  
    return {
      type: "LOGOUT",
    };
  };
  