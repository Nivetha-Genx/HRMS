import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown} from "lucide-react"

function Day() {
  return (
    <>
    <div>
       <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Day <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          <DropdownMenuItem>Today</DropdownMenuItem>
          <DropdownMenuItem>Yesterday</DropdownMenuItem>
          <DropdownMenuItem>Last 7 days</DropdownMenuItem>
          <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
       </div>
       <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
            Select Status <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          <DropdownMenuItem>Present</DropdownMenuItem>
          <DropdownMenuItem>Absent</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </>
  )
}

export default Day
