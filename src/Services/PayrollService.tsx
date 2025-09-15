import api from './ApiService'
import type{payroll} from './type';
import type { Payslip } from './type';

export const getpayroll= async (): Promise<payroll[]> => {
    const response = await api.get<payroll[]>("/payroll");
    return response.data;
}

export const getpayslip = async (employeeId:string): Promise<payroll> => {
    const response= await api.get<payroll>(`/payslip ${employeeId}`);
    return response.data;
}

export const setPayrollPeriod = async (year: number, month: number): Promise<void> => {
  await api.post("/payroll/set-period", { year, month });
};


export const getPayslip = async (employeeId: string,year: number,month: number): Promise<Payslip> => {
  const response = await api.get<Payslip>(`/payslip/${employeeId}?year=${year}&month=${month}`);
  return response.data;
};