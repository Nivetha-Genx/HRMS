import React from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState} from 'react'
import type { addEmpReq } from '@/Services/type'
import { postEmployees } from '@/Services/EmployeeService'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"

function Addemptab() {
    
      const [dialogOpen, setDialogOpen] = React.useState(false);
      const [dateOpen, setDateOpen] = React.useState(false);
      const [date, setDate] = React.useState<Date | undefined>(undefined)
      const [formData, setFormData] = useState<addEmpReq>({
        employeeId: "",
        empName: "",
        email: "",
        phoneNumber: "",
        position: "",
        department: "",
        gender: "",
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

      const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        });
      };

      const handleSelectChange = (field: keyof addEmpReq, value: string) => {
      setFormData({
          ...formData,
          [field]: value,
      });
      };

    const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

    try {
    const payload = {
      ...formData,
      dob: date ? date.toISOString().split("T")[0] : "",
    };
    await postEmployees(payload);
    console.log("Employee added successfully!");
    toast.success("Employee added successfully!")
    setFormData({
      employeeId: "",
      empName: "",
      email: "",
      phoneNumber: "",
      position: "",
      department: "",
      gender: "",
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
    setDate(undefined);
    setDialogOpen(false);
  } catch (err) {
    console.log("Error adding employee:", err);
    toast.error("Failed to add employee. Please try again.");
  }
};

  return (
    <div>
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
            <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
               <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                   <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>
              <form className="grid gap-10"  onSubmit={handleSubmit}>
              
                <Tabs defaultValue="basic" className="w-full">
                   <TabsList className="grid w-full grid-cols-3 gap-4">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="personal">Advance Information</TabsTrigger>
                    <TabsTrigger value="job">Salary Information</TabsTrigger>
                   </TabsList>
                <TabsContent value="basic" className="space-y-8 mt-5">
                   <div className="grid gap-2">
                       <Label htmlFor="employeeID">EmployeeId</Label>
                        <Input id="employeeId"  value={formData.employeeId} onChange={handleChange}  />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="empName">Employee Name</Label>
                        <Input id="empName" placeholder="Enter employee name" value={formData.empName} onChange={handleChange} />
                  </div>
                  <div className="grid gap-2">
                       <Label htmlFor="email">Email</Label>
                       <Input id="email" placeholder="@gmail.com" value={formData.email} onChange={handleChange}/>
                  </div>
                  <div className="grid gap-2">
                       <Label htmlFor="phoneNumber">Phone Number</Label>
                       <Input id="phoneNumber" placeholder="Enter Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                  </div>
                <div className="grid gap-2">
                     <Label htmlFor="position">Position</Label>
                     <Select onValueChange={(val) => handleSelectChange("position", val)}>
                        <SelectTrigger id="position" className="w-full h-10">
                            <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="frontend developer">Frontend Developer</SelectItem>
                            <SelectItem value="backend developer">Backend Developer</SelectItem>
                            <SelectItem value="developer">Full stack developer</SelectItem>
                            <SelectItem value="designer">Designer</SelectItem>
                            <SelectItem value="teamlead">Team Lead</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                        </SelectContent>
                    </Select> 
                </div>
                <div className="grid gap-2">
                     <Label htmlFor="department">Department</Label>
                     <Select onValueChange={(val) => handleSelectChange("department", val)}>
                        <SelectTrigger id="department" className="w-full h-10">
                            <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="research and development">Research and development</SelectItem>
                            <SelectItem value="UI/UX">UI/UX</SelectItem>
                            <SelectItem value="human resource">Human Resource</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                        </SelectContent>
                    </Select> 
                </div>
            </TabsContent>
        
              <TabsContent value="personal" className="space-y-8 mt-4">
                 <div className="grid gap-4">
                 <Label>Gender</Label>
               <RadioGroup defaultValue="male" className="flex gap-6" onValueChange={(val) => handleSelectChange("gender", val)}>
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
                      setDialogOpen(false)
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
                <Select  onValueChange={(val) => handleSelectChange("bloodGroup", val)}>
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
                <Select onValueChange={(val) => handleSelectChange("nationality", val)}>
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
                 <Select onValueChange={(val) => handleSelectChange("religion", val)}>
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
                <Select onValueChange={(val) => handleSelectChange("maritalStatus", val)}>
                    <SelectTrigger id="maritalStatus" className="w-full h-10">
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
                <Input id="qualification" value={formData.qualification} onChange={handleChange}  />
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number' value={formData.experience} onChange={handleChange}/>
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Textarea id="address" placeholder="Enter your address here"  value={formData.address} onChange={handleChange}/>
              </div>
             </TabsContent>

              <TabsContent value="job" className="space-y-8 mt-5">
                <div className="flex gap-5">
                   <div className="grid gap-2">
                     <Label htmlFor="employeename">EmployeeName</Label>
                       <Select>
                         <SelectTrigger id="leader" className="w-full h-10">
                         <SelectValue placeholder="Select Team leader" />
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
    </div>
  )
}

export default Addemptab
