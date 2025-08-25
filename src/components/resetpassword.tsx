import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate , useLocation } from "react-router-dom"
import { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {resetPasswordApi } from '../Services/authservice'

export function Resetpassword({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  const email = (location.state as { email?: string })?.email || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      await resetPasswordApi({ email, newPassword })
      setMessage("Password reset successful. You can now log in.")
      navigate("/")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err: any) {
      setError("Failed to reset password. Try again.")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
            <CardDescription>
                You can reset your new password here
            </CardDescription>
          </CardHeader>
        <CardContent>

           <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">Email</Label>
                    <Input
                      id="newpassword"
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      />
                </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Email</Label>
                  <Input
                    id="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
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
