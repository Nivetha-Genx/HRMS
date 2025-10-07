
// AUTHSERVICE
export interface LoginRequest { email: string ,password: string}
export interface LoginResponse { 
 token: string
  user: {id: number, name: string }
}

export interface signupRequest {
  firstName: string
  lastName?: string 
  email: string
  dob: string
  phoneNumber: string
  password: string
}

export interface SignupResponse { message: string, userId: number }

export interface ForgotPasswordRequest {email: string}

export interface ForgotPasswordResponse {message: string}

export interface VerifyOtpRequest {  email: string ,otp: string }

export interface VerifyOtpResponse { message: string }

export interface ResetPasswordRequest { email: string , newPassword: string }

// Dashboard
export interface dashboard { 
  totalEmployees:string
  jobApplications:string
  projects:string
  clients:string
}
export interface ChartRecord {
  month: string;
  completed: number;
  pending: number;
}

export interface PieRecord {
  name: string;
  value: number;
}

export interface ChartResponse {
  chartData: ChartRecord[];
  pieData: PieRecord[];
}

// Employee
export interface cardemp{
  totalEmployee:number
  active:number
  inactive:number
  newJoiners:number
}

export interface addEmpReq{
    employeeId: string 
    employeeName: string
    email: string
    phoneNumber: string
    position: string
    department: string
    joinDate:string
    status:string
    gender: string
    dob : string
    emergencyNumber: string
    bloodGroup?: string
    nationality: string
    religion: string
    maritalStatus?: string
    qualification: string
    experience?: string
    address: string
    netSalary: number
    basic: number
    conveyance: number
    medicalAllowance: number
    ESI: number
    PF: number
    laborWelfare: number
}

// ATTENDANCE
export interface attendance{
  totalEmployee:string
  present: string
  unInformed:string
  permission:string
}

export interface addAttendance{
  employeeName:string
  date:string
  checkin:string
  checkout:string
  break:string
  productionHours:string
  status:string
}

// LEAVE
export interface leave{
  totalPresent:string
  plannedLeaves:string
  unplannedLeaves:string
  pendingRequest:string
}

export interface LeaveType {
  total: string
  remainingLeaves: string
}

export interface empLeave {
  annualLeaves: LeaveType
  medicalLeaves: LeaveType
  casualLeaves: LeaveType
  otherLeaves?: LeaveType
}

export interface addleave{
  employeeId:string
  employeeName:string
  leaveType:string
  fromDate:string | null
  toDate:string | null
  dayBreakdown?:string
  numberofdays:number
  reason:string
}

// PROJECTS
export interface project{
  projectId:string
  projectName:string
  leader:string
  team:string[]
  deadLine:string | null
  priority:string
  status:string
  description:string
}

//PAYROLL
export interface payroll{
  employeeId:string
  position:string
  department:string
  email:string
  joinDate:string
  salary:string
  payslip:string
  name:{
    empname:string
    avatar:string
  }
  id: string;
  year: number;
  month: number;
}

export interface Payslip {
  employeeName: string;
  employeeId: string;
  year: number;
  month: number;
  payPeriod: string;
  paidDays: number;
  lopDays: number;
  payDate: string;
  basic:string;
  ESI:string;
  conveyance:string;
  labourWelfare:string;
  medicalAllowance:string;
  providentFund:string;
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  amountInWords: string;
}


