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
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:7271/api" 

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token")
  console.log("API Request Interceptor:", {
    url: config.url,
    method: config.method,
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    tokenStart: token ? token.substring(0, 20) + "..." : "No token"
  })
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log("Authorization header set:", config.headers.Authorization.substring(0, 30) + "...")
  } else {
    console.warn("No token found for API request!")
  }
  return config
})

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("API Response Success:", {
      url: response.config.url,
      status: response.status,
      data: response.data
    })
    return response
  },
  (error) => {
    console.error("API Response Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      responseData: error.response?.data,
      headers: error.response?.headers
    })
    return Promise.reject(error)
  }
)

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

export const getEmployees = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/Get-All-Employees");
    
    // Handle the nested response structure: { success: true, data: { data: [...] } }
    if (response.data && response.data.success && response.data.data && response.data.data.data) {
      return response.data.data.data; // Return the actual employee array
    }
    
    // Fallback for other possible structures
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
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

// New employee POST function for user registration
export const postEmployee = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Auth/Register-User", data);
  return response.data;
}

// Employee Bio POST function
export const postEmployeeBio = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Employee/Add-Employee-bio", data);
  return response.data;
}

// Employee Education POST function
export const postEmployeeEducation = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Employee/Add-Employee-Education", data);
  return response.data;
}

// Employee Emergency Contact POST function
export const postEmployeeEmergencyContact = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Employee/Add-Employee-Emergency-Contact", data);
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

// DEPARTMENT SERVICES
export const getDepartments = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/Department/All-Departments");
  return response.data;
};

export const getDepartment = async (id: string): Promise<any> => {
  const response = await api.get<any>(`/Department/Department-Id?id=${id}`);
  return response.data;
};

export const postDepartment = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Department/Add-Department", data);
  return response.data;
};

export const putDepartment = async (id: string, data: any): Promise<any> => {
  const response = await api.put<any>(`/Department/Update-Department?id=${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await api.delete(`/Department/Delete-Department?id=${id}`);
};

// DESIGNATION SERVICES
export const getDesignations = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/Designation/Get-All-Designations");
  return response.data;
};

export const getDesignation = async (id: string): Promise<any> => {
  const response = await api.get<any>(`/Designation/Get-Designation-By-Id?id=${id}`);
  return response.data;
};

export const postDesignation = async (data: any): Promise<any> => {
  const response = await api.post<any>("/Designation", data);
  return response.data;
};

export const putDesignation = async (id: string, data: any): Promise<any> => {
  const response = await api.put<any>(`/Designation/Update-Designation?id=${id}`, data);
  return response.data;
};

export const deleteDesignation = async (id: string): Promise<void> => {
  await api.delete(`/Designation/Delete-Designation?id=${id}`);
};

// SHIFT SERVICES
export const getShifts = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/Shift/Get-All-Shifts");
  return response.data;
};

// USER PROFILE SERVICES
export const getCurrentUser = async (): Promise<any> => {
  try {
    const response = await api.get("/Employee/EmpId");
   
    return response.data;
  } catch (error) {

    throw error;
  }
};

// Export the api instance as default for use in other services
export default api;