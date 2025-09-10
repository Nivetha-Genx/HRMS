import api from './ApiService';
import type { project } from './type';

export const getProjects = async (): Promise<project[]> => {
  const response = await api.get<project[]>("/project");
  return response.data;
};

export const getProject = async (projectId: string): Promise<project> => {
  const response = await api.get<project>(`/project/${projectId}`);
  return response.data;
};

export const postProject = async (data:project): Promise<project> =>{
    const response = await api.post<project>("/project",data);
    return response.data;
}

export const putProject = async (projectId: string, data: Partial<project>): Promise<project> => {
  const response = await api.put<project>(`/project/${projectId}`, data);
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/project/${projectId}`);
};
