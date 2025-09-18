import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card,CardContent,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signupApi } from "@/Services/authservice"
import logo from '../assets/logo.svg'
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { signupSchema } from "@/lib/Schema"
import type { signupRequest } from "@/Services/type"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type SignupFormValues = yup.InferType<typeof signupSchema>;

export function Signup({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

   const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
       resolver: yupResolver(signupSchema),
           defaultValues: {  
              firstName:"" ,
              lastName:"" ,
              email:"",
              dob:"",
              phoneNumber:"",
              password:"",
              confirmpassword:"",
             }
           });

   const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
  try {
      setLoading(true);
      setError("");
      setMessage("");

    if (data.password !== data.confirmpassword) {
      setError("Passwords do not match");
      errorToast(
        "Passwords do not match",
        "Please ensure both passwords are the same."
      );
      setLoading(false);
      return;
    }
        
   const payload : signupRequest = {
        firstName: data.firstName,
        lastName:data.lastName,
        email:data.email,
        dob:data.dob,
        phoneNumber:data.phoneNumber,
        password: data.password,
       };

      await signupApi(payload) 
      setMessage("Signup successful!")
      successToast("Signup successful", "You can now log in.")
      navigate("/")
    } catch (err: any) {
        setError(err.response.data.message)
        errorToast("Signup failed", err.response.data.message)
    } finally {
      setLoading(false)
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
          <CardTitle className=" flex items-center justify-center">SignUp</CardTitle>
         
        </CardHeader>

        <CardContent>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Input id="firstName" placeholder="First Name"{...register("firstName")} />
                 {errors.firstName && <p className="text-sm text-red-700">{errors.firstName.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="lastName" placeholder="Last Name" {...register("lastName")}/>
                 {errors.lastName && <p className="text-sm text-red-700">{errors.lastName?.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="email" placeholder="Email"{...register("email")}  />
                 {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="dob" placeholder="Birth Date" {...register("dob")}  />
                 {errors.dob && <p className="text-sm text-red-700">{errors.dob.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="phonenumber" placeholder="Phone Number"{...register("phoneNumber")}  />
                 {errors.phoneNumber && <p className="text-sm text-red-700">{errors.phoneNumber.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="password" placeholder="Password"{...register("password")} />
                 {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>} 
              </div>

              <div className="grid gap-3">
                <Input id="password" placeholder="Confirm Password"    {...register("confirmpassword")} />
                 {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>} 
              </div>
                
              {error && <p className="text-red-700 text-sm">{error}</p>}
              {message && <p className="text-green-700 text-sm">{message}</p>}

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full"  disabled={loading}>
                   {loading ? "Signing up..." : "SignUp"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                <Link to="/" className="underline underline-offset-4  text-blue-500">
                  Login
                </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}