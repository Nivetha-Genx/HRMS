import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate , useLocation} from "react-router-dom"
import { verifyOtpApi } from '../Services/authservice'
import { useState } from "react"
import {Card,CardContent, CardDescription,CardHeader,CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from '../assets/logo.svg'
import { toast } from "react-toastify"

export function OTP({
  className,
  ...props
}: React.ComponentProps<"div">) {
    
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const location = useLocation()

  const email = (location.state as { email?: string })?.email || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {

      await verifyOtpApi({ email ,otp })
      navigate("/resetpassword")
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Invalid or expired OTP")
        toast("Invalid or expired OTP", { type: "error" })
      } else {
        setError("Failed to verify OTP. Try again.")
        toast("Failed to verify OTP. Try again.", { type: "error" })
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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="otp"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
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
