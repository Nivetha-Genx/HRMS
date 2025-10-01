import axios from "axios";
import type {
  addAttendance,
  attendance,
  dashboard,
  ChartResponse,
  cardemp,
  addEmpReq,
  leave,
  addleave,
  payroll,
  Payslip,
  project
} from "./type";

// API Configuration
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7106/api" 

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ATTENDANCE SERVICES
export const getAttendance = async (): Promise<attendance> => {
  const response = await api.get<attendance>("/employees");
  return response.data;
};

export const postAttendance = async (data: addAttendance): Promise<addAttendance> => {
  const response = await api.post<addAttendance>("/project", data);
  return response.data;
}

// DASHBOARD SERVICES
export const getDashboard = async (): Promise<dashboard> => {
  const response = await api.get<dashboard>("/dashboard");
  return response.data;
};

export const getChartData = async (): Promise<ChartResponse> => {
  const response = await api.get<ChartResponse>("/chart");
  return response.data;
};

export const getEmployees = async (): Promise<addEmpReq[]> => {
  const response = await api.get<addEmpReq[]>("/employees");
  return response.data;
}

// EMPLOYEE SERVICES
export const getcardemp = async (): Promise<cardemp> => {
  const response = await api.get<cardemp>("/employee");
  return response.data;
};

export const getEmployeesList = async (): Promise<addEmpReq[]> => {
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

// LEAVE SERVICES
export const getCardLeave = async (): Promise<leave> => {
  const response = await api.get<leave>('/leave');
  return response.data;
}

export const getLeaves = async (): Promise<addleave[]> => {
  const response = await api.get<addleave[]>("/leave");
  return response.data;
};

export const getLeave = async (employeeId: string): Promise<addleave> => {
  const response = await api.get<addleave>(`/leave/${employeeId}`);
  return response.data;
};

export const postLeave = async (data: addleave): Promise<addleave> => {
  const response = await api.post<addleave>("/leave", data);
  return response.data;
}

export const putLeave = async (employeeId: string, data: Partial<addleave>): Promise<addleave> => {
  const response = await api.put<addleave>(`/leave/${employeeId}`, data);
  return response.data;
};

export const deleteLeave = async (id: string): Promise<void> => {
  await api.delete(`/leave/${id}`);
};

// PAYROLL SERVICES
export const getpayroll = async (): Promise<payroll[]> => {
  const response = await api.get<payroll[]>("/payroll");
  return response.data;
}

export const getpayslip = async (employeeId: string): Promise<payroll> => {
  const response = await api.get<payroll>(`/payslip ${employeeId}`);
  return response.data;
}

export const setPayrollPeriod = async (year: number, month: number): Promise<void> => {
  await api.post("/payroll/set-period", { year, month });
};

export const getPayslip = async (employeeId: string, year: number, month: number): Promise<Payslip> => {
  const response = await api.get<Payslip>(`/payslip/${employeeId}?year=${year}&month=${month}`);
  return response.data;
};

// PROJECT SERVICES
export const getProjects = async (): Promise<project[]> => {
  const response = await api.get<project[]>("/project");
  return response.data;
};

export const getProject = async (projectId: string): Promise<project> => {
  const response = await api.get<project>(`/project/${projectId}`);
  return response.data;
};

export const postProject = async (data: project): Promise<project> => {
  const response = await api.post<project>("/project", data);
  return response.data;
}

export const putProject = async (projectId: string, data: Partial<project>): Promise<project> => {
  const response = await api.put<project>(`/project/${projectId}`, data);
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await api.delete(`/project/${projectId}`);
};

// Export the api instance as default for use in other services
export default api;
