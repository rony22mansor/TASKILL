import apiClient from "./api";

export const deleteTask = async ({ taskId }) => {
  // <-- Destructure here
  console.log("taskId ==> ", taskId); // Now this will work correctly

  const { data } = await apiClient.delete(`/admin/tasks/${taskId}`);
  return data;
};
