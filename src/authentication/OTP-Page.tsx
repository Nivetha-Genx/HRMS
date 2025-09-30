import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate , useLocation} from "react-router-dom"
import { verifyOtpApi } from '../Services/authservice'
import { useState } from "react"
import {Card,CardContent, CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from '../assets/logo.svg'
import { successToast,errorToast } from "@/lib/toast"
import  { otpSchema } from "@/lib/Schema"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { VerifyOtpRequest } from "@/Services/type"

type otpFormValues = yup.InferType<typeof otpSchema>

export function OTP({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation()

  const email = (location.state as { email?: string })?.email || ""

  const { register, handleSubmit, formState: { errors } } = useForm<otpFormValues>({
          resolver: yupResolver(otpSchema),
          defaultValues: {  
          otp:""
          }
        });

 const onSubmit: SubmitHandler<otpFormValues> = async (data) => {
   try {
         setLoading(true);
          setError("");
          const payload : VerifyOtpRequest = {
              email,
              otp:data.otp,
         };

      await verifyOtpApi( payload )
      successToast("OTP send to your mail Id")
      navigate("/resetpassword")
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Invalid or expired OTP")
        errorToast("Invalid or expired OTP", "Please check the OTP and try again.")
      } else {
        setError("Failed to verify OTP. Try again.")
        errorToast("Failed to verify OTP", "Try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
         <CardHeader className="flex flex-col items-center space-y-4">
            <img
                  src={logo}
                  alt="Logo"
                  className="h-12 w-auto "/>
          <CardTitle>Confirm OTP</CardTitle>
          <CardDescription>
            Enter the OTP we just sent you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6} 
                  placeholder="Enter OTP"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.currentTarget;
                  target.value = target.value.replace(/\D/g, "");}}
                   {...register("otp")}/>
                    {errors.otp && <p className="text-sm text-red-700">{errors.otp.message}</p>} 
              </div>
             
              <div className="flex flex-col gap-3">
                {error && <p className="text-red-700 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                   {loading ? "Verifying..." : "Confirm"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
