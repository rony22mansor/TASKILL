import apiClient from "./api";

export const fetchEmployeeInfo = async ({ employeeId }) => {
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.get(`/admin/employees/${employeeId}`);
  return data;
};
export const fetchEmployeeSkills = async ({ employeeId }) => {
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.get(`/admin/employee-skills/${employeeId}`);
  return data;
};
