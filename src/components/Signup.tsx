
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"


export function Signup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className=" flex items-center justify-center">SignUp</CardTitle>
         
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Input
                id="firstname"
                type="text"
                placeholder="First Name"
                required
              />
              </div>
              <div className="grid gap-3">
                <Input
                id="laststname"
                type="text"
                placeholder="Last Name"
                required
              />
              </div>
              <div className="grid gap-3">
                <Input
                id="email"
                type="email"
                placeholder="Email"
                required
              />
              </div>
              <div className="grid gap-3">
                <Input
                id="dob"
                type="dob"
                placeholder="Birth Date"
                required
              />
              </div>
              <div className="grid gap-3">
                <Input
                id="phonenumber"
                type="phonenumber"
                placeholder="Phone Number"
                required
              />
              </div>
               <div className="grid gap-3">
                <Input
                id="password"
                type="password"
                placeholder="Password"
                required
              />
              </div>
               <div className="grid gap-3">
                <Input
                id="password"
                type="password"
                placeholder="Confirm Password"
                required
              />
              </div>
                
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  SignUp
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}