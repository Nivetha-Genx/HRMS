import api from './ApiService';
import type {cardemp, addEmpReq} from './type';


export const getcardemp = async (): Promise<cardemp> => {
  const response = await api.get<cardemp>("/employee");
  return response.data;
};

export const getEmployees = async (): Promise<addEmpReq[]> => {
  const response = await api.get<addEmpReq[]>("/employees");
  return response.data;
}

export const getEmployee = async (id: string): Promise<addEmpReq> => {
  const response = await api.get<addEmpReq>(`/employees/${id}`);
  return response.data;
};

export const postEmployees = async (data: addEmpReq): Promise<addEmpReq> => {
  const response = await api.post<addEmpReq>("/employees", data);
  return response.data;
}

export const putEmployee = async (id: string, data: Partial<addEmpReq>): Promise<addEmpReq> => {
  const response = await api.put<addEmpReq>(`/employees/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

