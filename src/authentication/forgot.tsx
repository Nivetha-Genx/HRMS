import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { forgotPasswordApi } from "../Services/authservice"
import logo from '../assets/logo.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { successToast,warningToast,errorToast } from "@/lib/toast"
import  { forgotSchema } from "@/lib/Schema"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import type { ForgotPasswordRequest } from "@/Services/type"

type forgotFormValues = yup.InferType<typeof forgotSchema>

export function Forgot({                                                                                                                                                                 
  className,
  ...props
}: React.ComponentProps<"div">) { 

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

   const { register, handleSubmit, formState: { errors } } = useForm<forgotFormValues>({
          resolver: yupResolver(forgotSchema),
          defaultValues: {  
           email:""
          }
        });
              
  const onSubmit: SubmitHandler<forgotFormValues> = async (data) => {
      try {
        const payload : ForgotPasswordRequest = {
                   email: data.email,
                 };
      const res = await forgotPasswordApi(payload)
      setMessage(res.message || "Check your email for OTP.")
      successToast("OTP sent", "Check your email for OTP.")
      navigate("/otp")
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Email not found")
        warningToast("Email not found", "The provided email does not exist.")
      } else {
        setError("Failed to send OTP. Try again later.")
        errorToast("Failed to send OTP", "Try again later.")  
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
          <CardTitle>Forgot Password ?</CardTitle>
          <CardDescription>
            You can reset your new password here
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" {...register("email")} />
                  {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>} 
            </div>
              
            <div className="flex flex-col gap-3">
                {error && <p className="text-red-700 text-sm">{error}</p>}
                {message && <p className="text-green-700 text-sm">{message}</p>}
              <Button type="submit" className="w-full" >
                    {loading ? "Sending..." : "Send OTP"}
              </Button>
              
             </div>
          </div>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}