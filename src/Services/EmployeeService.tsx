import api from './ApiService';
import type { addEmpReq, empData } from './type';



export const getEmployees = async (): Promise<empData[]> => {
  const response = await api.get<empData[]>("/employees");
  return response.data;
}
/* get single employee by ID */
export const getEmployee = async (id: string): Promise<addEmpReq> => {
  const response = await api.get<addEmpReq>(`/employees/${id}`);
  return response.data;
};

export const postEmployees = async (data: addEmpReq): Promise<addEmpReq> => {
  const response = await api.put<addEmpReq>("/employees", data);
  return response.data;
}

export const putEmployee = async (id: string, data: Partial<addEmpReq>): Promise<addEmpReq> => {
  const response = await api.put<addEmpReq>(`/employees/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

