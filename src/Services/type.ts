

// AUTHSERVICE
export interface LoginRequest { email: string ,password: string}
export interface LoginResponse { 
 token: string
  user: {
    id: number
    name: string
  }
}

export interface SignupRequest {
  firstName: string
  lastName: string
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

export interface empData{
  id: string
  employeeId: string
  name:string
  position: string
  department: string
  email: string
  joinDate:string
  status:string
}
 
export interface addEmpReq{
    employeeId: string 
    empName: string
    email: string
    phoneNumber: string
    position: string
    department: string
    gender: string
    dob: string
    emergencyNumber: string
    bloodGroup: string
    nationality: string
    religion: string
    maritalStatus: string
    qualification: string
    experience: string
    address: string
}

// ATTENDANCE
export interface attendance{
  totalEmployee:string
  present: string
  unInformed:string
  permission:string
}

// LEAVE
export interface leave{
  totalPresent:string
  plannedLeaves:string
  unplannedLeaves:string
  pendingRequest:string
}
export interface addleave{
  employeeId:string
  employeeName:string
  leaveType:string
  fromDate:string | null
  toDate:string | null
  numberofdays:string
  reason:string
}
// PROJECTS
export interface project{
  projectId:string
  projectName:string
  leader:string
  team:string
  deadLine:string | null
  priority:string
  status:string
  description:string
}