import API from "../services/axiosInstence.js"

export const getAllUsers = () => {
  return API.get("/admin/users");
};

