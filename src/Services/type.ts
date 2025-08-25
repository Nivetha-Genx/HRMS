export interface LoginRequest { email: string ,password: string
}
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