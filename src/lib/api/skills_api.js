import apiClient from "./api";

export const addSkill = async (name) => {
  const requestBody = {
    name: name,
  };
  const { data } = await apiClient.post(`/admin/skills`, requestBody);
  return data;
};

export const deleteSkill = async ({ skillId }) => {
  const { data } = await apiClient.delete(`/admin/skills/${skillId}`);
  return data;
};

export const updateSkill = async ({ name, skillId }) => {
  const requestBody = {
    name: name,
  };
  const { data } = await apiClient.put(`/admin/skills/${skillId}`, requestBody);
  return data;
};
