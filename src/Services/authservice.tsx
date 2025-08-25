import api from '../Services/apiclient' 
import type { LoginRequest , LoginResponse } from '../Services/type'
import type { ForgotPasswordRequest, ForgotPasswordResponse } from '../Services/type'
import type { VerifyOtpRequest, VerifyOtpResponse } from '../Services/type'
import type { ResetPasswordRequest } from '../Services/type'
import type { SignupRequest , SignupResponse} from '../Services/type'


export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data)
  return response.data
}

export async function signupApi(data: SignupRequest): Promise<SignupResponse> {
  const response = await api.post<SignupResponse>("/auth/signup", data)
  return response.data
}

export async function forgotPasswordApi(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const response = await api.post<ForgotPasswordResponse>("/auth/forgot-password", data)
  return response.data
}

export async function verifyOtpApi(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  const response = await api.post<VerifyOtpResponse>("/auth/verify-otp", data)
  return response.data
}

export async function resetPasswordApi(data: ResetPasswordRequest) {
  const response = await api.post("/auth/reset-password", data)
  return response.data
}

