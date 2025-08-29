import apiClient from "./api";

export const loginUser = async (credentials) => {
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

export const loginAdmin = async (credentials) => {
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.post("/admin/auth/login", credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await apiClient.post("/auth/register", userData);
  return data;
};

// Add other auth-related API functions here (e.g., logout, forgot password)
