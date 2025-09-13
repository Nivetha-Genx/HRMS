import api from './ApiService'
import type{payroll} from './type';

export const getpayroll= async (): Promise<payroll[]> => {
    const response = await api.get<payroll[]>("/payroll");
    return response.data;
}

export const getpayslip = async (employeeId:string): Promise<payroll> => {
    const response= await api.get<payroll>(`/payslip ${employeeId}`);
    return response.data;
}