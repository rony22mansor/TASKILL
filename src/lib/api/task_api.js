import apiClient from "./api";

export const deleteTask = async ({ taskId }) => {
  // <-- Destructure here
  console.log("taskId ==> ", taskId); // Now this will work correctly

  const { data } = await apiClient.delete(`/admin/tasks/${taskId}`);
  return data;
};

export const deleteSubtask = async ({ subtaskId }) => {
  // <-- Destructure here
  console.log("taskId ==> ", subtaskId); // Now this will work correctly

  const { data } = await apiClient.delete(`/admin/subTasks/${subtaskId}`);
  return data;
};

export const assignSubtask = async ({ subtaskId, employeeId }) => {
  const requestBody = {
    subtask_id: subtaskId,
    employee_id: employeeId, // Note the snake_case key for the JSON
  };
  // <-- Destructure here
  console.log("taskId ==> ", subtaskId); // Now this will work correctly

  const { data } = await apiClient.post(`/admin/subTasks`, requestBody);
  return data;
};

export const reAssignSubtask = async ({ assignmentId, employeeId }) => {
  const requestBody = {
    employee_id: employeeId, // Note the snake_case key for the JSON
  };
  // <-- Destructure here
  console.log("taskId ==> ", assignmentId); // Now this will work correctly

  const { data } = await apiClient.put(
    `/admin/subTasks/${assignmentId}`,
    requestBody
  );
  return data;
};
