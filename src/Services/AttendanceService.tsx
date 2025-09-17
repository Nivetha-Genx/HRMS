import api from './ApiService';
import type  {addAttendance, attendance} from "./type";


export const getAttendance = async (): Promise<attendance> => {
  const response = await api.get<attendance>("/employees");
  return response.data;
};


export const postAttendance = async (data:addAttendance): Promise<addAttendance> =>{
    const response = await api.post<addAttendance>("/project",data);
    return response.data;
}