import api from './ApiService';
import type  {leave} from "./type";

export const getLeave = async (): Promise<leave> => {
  const response = await api.get<leave>("/employees");
  return response.data;
};
