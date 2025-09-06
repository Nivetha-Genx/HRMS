import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown} from "lucide-react"

function Day({ table }: { table: any }) {
  
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
          <DropdownMenuItem
             onClick={() => table.getColumn("status")?.setFilterValue("Present")}
             >
            Present
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn("status")?.setFilterValue("Absent")}
            >
            Absent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
            >
            Show All
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
    </>
  )
}

export default Day
