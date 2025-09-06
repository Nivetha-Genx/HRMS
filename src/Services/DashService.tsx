import api from './ApiService';
import type { dashboard } from './type';
import type { ChartResponse } from './type';
import type { empData } from './type';


export const getDashboard = async (): Promise<dashboard> => {
  const response = await api.get<dashboard>("/dashboard");
  return response.data;
};

export const getChartData = async (): Promise<ChartResponse> => {
  const response = await api.get<ChartResponse>("/chart");
  return response.data;
};

export const getEmployees = async (): Promise<empData[]> => {
  const response = await api.get<empData[]>("/employees");
  return response.data;
}