import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate , useLocation } from "react-router-dom"
import { useState } from "react"
import logo from '../assets/logo.svg'
import {Card, CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {resetPasswordApi } from '../Services/authservice'
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { resetSchema } from "@/lib/Schema"
import * as yup from "yup"
import type { ResetPasswordRequest } from "@/Services/type"

type resetFormValues = yup.InferType<typeof resetSchema>
export function Resetpassword({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const email = (location.state as { email?: string })?.email || ""

  const { register, handleSubmit, formState: { errors } } = useForm<resetFormValues>({
          resolver: yupResolver(resetSchema),
          defaultValues: {  
            newPassword:"",
            confirmPassword:""
          }
        });

  const onSubmit = async (data:resetFormValues) => {
              try {
                    setLoading(true);
                    setError("");
              const payload : ResetPasswordRequest = {
                    email,
                    newPassword:data.newPassword,
                };
            await resetPasswordApi(payload);

            setMessage("Password reset successful. You can now log in.")
            successToast("Password reset successful", "You can now log in.")
            navigate("/")
          } catch (err: any) {
            setError("Failed to reset password. Try again.")
            errorToast("Failed to reset password", "Try again.")
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
          <CardTitle>Reset Password</CardTitle>
            <CardDescription>
                You can reset your new password here
            </CardDescription>
          </CardHeader>
        <CardContent>

           <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">New Password</Label>
                    <Input
                      id="newpassword"
                      placeholder="New Password"
                      {...register("newPassword")}
                      />
                       {errors.newPassword && <p className="text-sm text-red-700">{errors.newPassword.message}</p>} 
                </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="confirmpassword"
                    placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                      {errors.confirmPassword && <p className="text-sm text-red-700">{errors.confirmPassword.message}</p>} 
              </div>
              
              <div className="flex flex-col gap-3">
                {error && <p className="text-red-700 text-sm">{error}</p>}
                {message && <p className="text-green-700 text-sm">{message}</p>}
                    <Button type="submit" className="w-full">
                        {loading ? "Resetting..." : "Reset Password"}
                   </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
