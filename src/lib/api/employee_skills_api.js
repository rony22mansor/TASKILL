import apiClient from "./api";

export const addSkillToEmployee = async ({ skill_id, rating, employeeId }) => {
  const requestBody = {
    skill_id: skill_id,
    rating: rating,
  };
  const { data } = await apiClient.post(
    `/admin/employee-skills/${employeeId}`,
    requestBody
  );
  return data;
};

export const deleteSkillFromEmployee = async ({ skillId, employeeId }) => {
  const { data } = await apiClient.delete(
    `/admin/employee-skills/${employeeId}/${skillId}`
  );
  return data;
};

export const updateSkillForEmployee = async ({
  rating,
  skillId,
  employeeId,
}) => {
  const requestBody = {
    rating: rating,
  };
  const { data } = await apiClient.put(
    `/admin/employee-skills/${employeeId}/${skillId}`,
    requestBody
  );
  return data;
};
