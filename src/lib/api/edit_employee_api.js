import apiClient from "./api";

export const editEmployeeInfo = async ({ body, employeeId }) => {
  //   const requestBody = {
  //     rating: rating,
  //   };
  const { data } = await apiClient.put(`/admin/employees/${employeeId}`, body);
  return data;
};
