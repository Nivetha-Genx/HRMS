import React from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {  MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function editemptab() {
      const [open, setOpen] = React.useState(false)
      const [date, setDate] = React.useState<Date | undefined>(undefined)
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
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4">
               <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="personal">Advance Information</TabsTrigger>
                  </TabsList>
                <TabsContent value="basic" className="space-y-8 mt-4">
                 <div className="grid gap-2">
                    <Label htmlFor="employeeID">EmployeeId</Label>
                    <Input id="employeeid" />
                 </div>
                  <div className="grid gap-2">
                     <Label htmlFor="empName">Employee Name</Label>
                     <Input id="empName" placeholder="Enter employee name" />
                  </div>
                  <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="@gmail.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phonenumber">Phone Number</Label>
                    <Input id="phonenumber" placeholder="Enter Phone Number" />
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                </div>
            </TabsContent>

              <TabsContent value="personal" className="space-y-8 mt-4">
                 <div className="grid gap-4">
                   <Label>Gender</Label>
                   <RadioGroup defaultValue="male" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <RadioGroupItem value="other" id="other" />
                   <Label htmlFor="other">Other</Label>
                </div>
                </RadioGroup>
                 </div>
                  <div className="grid gap-2">
                     <Label htmlFor="date" className="px-1">
                       Date of birth
                     </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                      id="date"
                      className=" justify-between font-normal" >
                      {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                      setDate(date)
                      setOpen(false)
                      }}/>
                  </PopoverContent>
                  </Popover>
                </div>
              <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="emergencynumber">Emergency Contact Number</Label>
                  <Input id="emergencynumber" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="bloodgroup">Blood-Group</Label>
                    <Select>
                        <SelectTrigger id="bloodgroup" className="w-full h-10">
                            <SelectValue placeholder="Select Blood-Group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                    </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select>
                    <SelectTrigger id="nationality" className="w-full h-10">
                      <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                       </SelectContent>
                      </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="religion">Religion</Label>
                 <Select>
                    <SelectTrigger id="religion" className="w-full h-10">
                      <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="muslium">Muslium</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="marital status">Marital status</Label>
                <Select>
                    <SelectTrigger id="marital status" className="w-full h-10">
                      <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="unmarried">Unmarried</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
               <div className="grid gap-2">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <Input id="qualifiction" />
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number' />
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Input id="address" placeholder="Enter address" />
              </div>
             </TabsContent>
             </Tabs>
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

export default editemptab
