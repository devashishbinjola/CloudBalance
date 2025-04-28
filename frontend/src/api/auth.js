import API from "../services/axiosInstence.js"

export const loginUser = (username, password) => {
  return API.post("/auth/login", { username, password });
};
