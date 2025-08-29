import apiClient from "./api";

export const sendTaskDescription = async (description) => {
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.post("/admin/tasks", description);
  return data;
};

export const sendAnswers = async ({ answers, prefilled_details, taskId }) => {
  const requestBody = {
    answers: answers,
    prefilled_details: prefilled_details, // Note the snake_case key for the JSON
  };
  // <-- Destructure here
  console.log("taskId ==> ", taskId); // Now this will work correctly

  const { data } = await apiClient.post(
    `/admin/tasks/${taskId}/process-answers`,
    requestBody
  );
  return data;
};

export const sendFeedback = async ({ assignmentId, rating }) => {
  const requestBody = {
    rating: rating,
  };
  // The 'data' property of the response object will be returned
  const { data } = await apiClient.post(
    `/admin/assignments/${assignmentId}/feedback`,
    requestBody
  );
  return data;
};
