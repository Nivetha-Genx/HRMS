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
import { useState,useEffect } from 'react'
import { getEmployee,putEmployee,deleteEmployee } from '@/Services/EmployeeService'
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast} from "@/lib/toast"

function editemptab({ employeeId, onSuccess }: { employeeId: string, onSuccess?: () => void }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<any>({
    employeeId: "",
    empName: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    gender: "male",
    dob: "",
    emergencyNumber: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    qualification: "",
    experience: "",
    address: "",
  });

   useEffect(() => {
    if (!employeeId || !open) return;

    getEmployee(employeeId)
      .then((data) => {
        setFormData({
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          position: data.position,
          department: data.department,
          gender: data.gender,
          dob: data.dob ? new Date(data.dob) : undefined,
          emergencyNumber: data.emergencyNumber,
          bloodGroup: data.bloodGroup,
          nationality: data.nationality,
          religion: data.religion,
          maritalStatus: data.maritalStatus,
          qualification: data.qualification,
          experience: data.experience,
          address: data.address,
        });
        if (data.dob) setDate(new Date(data.dob));
      })
      .catch((err:any) => console.error(err));
  }, [employeeId , open]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
 const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putEmployee(employeeId, { ...formData, dob: date ? date.toISOString() : null });
      console.log("Employee updated successfully!");
      successToast("Employee updated successfully!", "The employee details have been updated.")
      setDialogOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      console.log("Failed to update employee");
      errorToast("Failed to update employee", "Please try again.")
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(employeeId);
      console.log("Employee deleted successfully!");
      successToast("Employee deleted successfully!", "The employee has been removed.")
      setDialogOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      console.log("Failed to delete employee");
      errorToast("Failed to delete employee", "Please try again.")
    }
  };

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
           <Dialog
              open={dialogOpen}
              onOpenChange={(isOpen) => {
              setDialogOpen(isOpen);
              if (!isOpen) {
              setFormData({
                employeeId: "",empName: "",email: "",phoneNumber: "",position: "",department: "",gender: "male",
                dob: "",emergencyNumber: "",bloodGroup: "",nationality: "",religion: "", maritalStatus: "",qualification: "",experience: "",address: "",});
                setDate(undefined);
              }
            }}>
            <DialogTrigger asChild>
              <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4" onSubmit={handleUpdate}>
               <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 gap-4">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="personal">Advance Information</TabsTrigger>
                  <TabsTrigger value="job">Salary Information</TabsTrigger>
                  </TabsList>
                <TabsContent value="basic" className="space-y-8 mt-4">
                 <div className="grid gap-2">
                    <Label htmlFor="employeeID">EmployeeId</Label>
                    <Input id="employeeId" value={formData.employeeId} onChange={handleChange} />
                 </div>
                  <div className="grid gap-2">
                     <Label htmlFor="empName">Employee Name</Label>
                     <Input id="empName" placeholder="Enter employee name" value={formData.empName} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="@gmail.com"  value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type='tel' placeholder="Enter Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position"  value={formData.position} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" value={formData.department} onChange={handleChange} />
                </div>
            </TabsContent>

              <TabsContent value="personal" className="space-y-8 mt-4">
                 <div className="grid gap-4">
                   <Label>Gender</Label>
                   <RadioGroup defaultValue="male" className="flex gap-6" 
                    value={formData.gender} 
                     onValueChange={(value) => setFormData({ ...formData, gender: value })}>
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
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
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
                      setDateOpen(false)
                      }}/>
                  </PopoverContent>
                  </Popover>
                </div>
              <div className="grid gap-2">
                  <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
                  <Input id="emergencyNumber" type="tel" placeholder="Enter phone number"  value={formData.emergencyNumber} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="bloodgroup">Blood-Group</Label>
                    <Select 
                        value={formData.bloodGroup}
                        onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}>
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
                <Select value={formData.nationality}
                        onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
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
                 <Select 
                        value={formData.religion}
                        onValueChange={(value) => setFormData({ ...formData, religion: value })}>
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
                <Select  value={formData.maritalstatus}
                        onValueChange={(value) => setFormData({ ...formData, maritalstatus: value })}>
                    <SelectTrigger id="maritalstatus" className="w-full h-10">
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
                <Input id="qualification"   value={formData.qualification} onChange={handleChange} />
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number'  value={formData.experience} onChange={handleChange}/>
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Textarea id="address" placeholder="Enter your address here"  value={formData.address} onChange={handleChange}/>
              </div>
             </TabsContent>

             <TabsContent value="job" className="space-y-8 mt-5">
              <div className="flex gap-5">
                  <div className="grid gap-2">
                     <Label htmlFor="netsalary">Net Salary</Label>
                        <Input id="netsalary" />
                   </div>
                </div>
                  
                  <h3 className="font-medium mb-4">Earnings</h3>
                    <div className="flex gap-5">
                       <div className="grid gap-2">
                          <Label htmlFor="basic">Basic</Label>
                           <Input id="basic" />
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="conveyance">Conveyance</Label>
                           <Input id="conveyance" />
                        </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="grid gap-2">
                          <Label htmlFor="medicalallowance">Medical Allowance</Label>
                          <Input id="" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="others"> Others</Label>
                          <Input id="" />
                        </div>
                    </div>
                   <h3 className="font-medium mb-4">Deductions</h3>
                   <div className="flex gap-5">
                       <div className="grid gap-2">
                          <Label htmlFor="ESI">ESI</Label>
                          <Input id="ESI" />
                       </div>
                       <div className="grid gap-2">
                          <Label htmlFor="PF">PF</Label>
                          <Input id="PF" />
                       </div>
                       {/* <div className="grid gap-2">
                         <Label htmlFor="leave">Leave</Label>
                         <Input id="leave" />
                       </div> */}
                   </div>
                   <div className="flex gap-5">
                      <div className="grid gap-2">
                         <Label htmlFor="labourwelfare">Labour Welfare</Label>
                         <Input id="labourwelfare" />
                      </div>
                      <div className="grid gap-2">
                         <Label htmlFor="others">Others</Label>
                         <Input id="others" />
                      </div>
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
            <DropdownMenuItem  onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default editemptab
