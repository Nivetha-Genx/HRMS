import api from './ApiService';
import type  {leave,addleave} from "./type";

export const getLeaves = async (): Promise<addleave[]> => {
  const response = await api.get<addleave[]>("/leave");
  return response.data;
};

export const getLeave = async (employeeId: string): Promise<addleave> => {
  const response = await api.get<addleave>(`/leave/${employeeId}`);
  return response.data;
};

export const postLeave = async (data:addleave): Promise<addleave> =>{
    const response = await api.post<addleave>("/leave",data);
    return response.data;
}

export const putLeave = async (employeeId: string, data: Partial<addleave>): Promise<addleave> => {
  const response = await api.put<addleave>(`/leave/${employeeId}`, data);
  return response.data;
};

export const deleteLeave = async (id: string): Promise<void> => {
  await api.delete(`/leave/${id}`);
};
