import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
// import { loginApi } from "../Services/authservice"
import logo from '../assets/logo.svg'
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "@/lib/Schema"
import * as yup from "yup"
import type { LoginRequest } from "@/Services/type"

type loginFormValues = yup.InferType<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [error, setError] = useState("")
  const navigate=useNavigate();

      const { register, handleSubmit, formState: { errors } } = useForm<loginFormValues>({
        resolver: yupResolver(loginSchema),
        defaultValues: {  
         email:"",
         password:""
        }
      });
    
  const onSubmit: SubmitHandler<loginFormValues> = async (data) => {
           try {
             const payload : LoginRequest = {
               email: data.email,
               password: data.password,
             };
    
           

  // Hardcoded check 
   if (data.email === "admin@example.com" && data.password === "password@123") {
        successToast("Login successful", "Welcome back!");
        navigate("/masterLayout/dashboard1");
      } else {
        setError("Invalid email or password");
      }


    //   const res = await loginApi({ payload})
      // successToast("Login successful", "Welcome back!")
    //   localStorage.setItem("token", res.token) 
    //   localStorage.setItem("user", JSON.stringify(res.user))
    //    navigate("/dashboard");
    } catch (err: any) {

      if (err.response?.status === 401) {
        setError("Invalid email or password")
       errorToast("Login failed", "Invalid email or password")
      } else {
        setError("Login failed. Try again later.")
      }
    
    }
  };
   
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>  
      <Card>
        <CardHeader className="flex flex-col items-center space-y-4">
            <img
                  src={logo}
                  alt="Logo"
                  className="h-12 w-auto "/>
          <CardTitle>Login to your account</CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="m@example.com"
                     {...register("email")} 
                  />
                   {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>} 
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                    <Link  to="/forgot"
                       className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-500"
                      >
                        Forgot your password?
                    </Link>
                </div>
                  <Input 
                    id="password" 
                     {...register("password")} 
                    required />
                     {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>} 
                </div>

                <div className="flex flex-col gap-3">
                      {error && <p className="text-red-700 text-sm">{error}</p>}
                  <Button type="submit" className="w-full">Login
                      {/* {loading ? "Logging in..." : "Login"} */}
                   
                  </Button>
                  <Button variant="outline" className="w-full">
                       Login With Google
                  </Button>
                </div>
            </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4  text-blue-500">
                      Sign up
                  </Link>
                </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
