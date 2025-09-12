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
import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"

export function Forgot({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

     try {
      const res = await forgotPasswordApi({ email })
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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