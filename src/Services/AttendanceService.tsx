import api from './ApiService';
import type  {attendance} from "./type";


export const getAttendance = async (): Promise<attendance> => {
  const response = await api.get<attendance>("/employees");
  return response.data;
};
