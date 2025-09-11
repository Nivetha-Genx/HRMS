import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signupApi } from "@/Services/authservice"
import logo from '../assets/logo.svg'
import { toast } from "react-toastify"

export function Signup({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      toast("Passwords do not match", { type: "error" })
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const res = await signupApi({
        firstName,
        lastName,
        email,
        dob,
        phoneNumber,
        password,
      })
      setMessage(res.message || "Signup successful!")
      toast.success("Signup successful!") 
      navigate("/")
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
        toast(err.response.data.message, { type: "error" })
      } else {
        setError("Signup failed. Try again.")
        toast("Signup failed. Try again.", { type: "error" })
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
          <CardTitle className=" flex items-center justify-center">SignUp</CardTitle>
         
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Input
                  id="firstname"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  />
              </div>

              <div className="grid gap-3">
                <Input
                  id="laststname"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                 />
              </div>

              <div className="grid gap-3">
                <Input
                  id="dob"
                  type="date"
                  placeholder="Birth Date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Input
                  id="phonenumber"
                  type="phonenumber"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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