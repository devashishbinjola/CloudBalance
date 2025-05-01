import API from "../services/axiosInstence.js";

export const getAccounts = () => {
  return API.get("/accounts");
};

export const getEC2 = (accountNo) => {
  return API.get("/aws/ec2", { params: { id: accountNo } });
};

export const getASG = (accountNo) => {
  return API.get("/aws/asg", { params: { id: accountNo } });
};

export const getRDS = (accountNo) => {
  return API.get("/aws/rds", { params: { id: accountNo } });
};