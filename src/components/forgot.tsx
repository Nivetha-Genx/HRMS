import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate} from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Forgot({
  className,
  ...props
}: React.ComponentProps<"div">) {
const navigate = useNavigate()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password ?</CardTitle>
          <CardDescription>
            You can reset your new password here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full"  onClick={() => navigate("/otp")}>
                   Send My OTP
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}