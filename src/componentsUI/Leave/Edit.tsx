"use client"
import React from "react"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

function Edit() {
        const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
        const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
        const [openFrom, setOpenFrom] = React.useState(false)
        const [openTo, setOpenTo] = React.useState(false)
  return (
    <div>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
                <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-8">
              <DialogHeader>
                <DialogTitle>Edit Leave</DialogTitle>
                  <DialogDescription>
                      Edit leave details and click save
                  </DialogDescription>
              </DialogHeader>
              <form className="grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="employeeName">Employee Name</Label>
                      <Select>
                         <SelectTrigger id="employeeName" className="w-full h-10" >
                          <SelectValue placeholder="Select Employee Name" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="name">Shivaji</SelectItem>
                            <SelectItem value="name">Shivani</SelectItem>
                            <SelectItem value="name">jayashree</SelectItem>
                            <SelectItem value="name">Akila Sri</SelectItem>
                            <SelectItem value="name">Pavithra</SelectItem>
                            <SelectItem value="name">Nisha</SelectItem>
                            <SelectItem value="name">Sagana</SelectItem>
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                      <Select>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                          <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="leaveType">Medical Leave</SelectItem>
                            <SelectItem value="leaveType">Casual Leave</SelectItem>  
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="from-date" className="px-1">
                    From Date
                  </Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="from-date"
                      className="justify-between font-normal">
                      {fromDate ? fromDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setFromDate(date)
                    setOpenFrom(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="date" className="px-1">
                     To Date
                    </Label>
                    <Popover open={openTo} onOpenChange={setOpenTo}>
                    <PopoverTrigger asChild>
                    <Button
                       variant="outline"
                       id="date"
                       className="justify-between font-normal">
                       {toDate ? toDate.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setToDate(date)
                    setOpenTo(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="numberofdays">No of Days</Label>
                      <Input id="numberofdays" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to-date" className="px-1">
                     Reason
                  </Label>
                  <Input id="reason" />
                </div>
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                  </DialogClose>
                     <Button type="submit">Save</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Edit
