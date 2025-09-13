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
import type { addEmpReq } from '@/Services/type'
import { postEmployees } from '@/Services/EmployeeService'
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { employeeSchema } from "@/lib/Schema"
import * as yup from "yup"
import { Controller } from "react-hook-form"

type EmployeeFormValues = yup.InferType<typeof employeeSchema>;

function Addemptab() {
       const { register, handleSubmit, control, reset, formState: { errors } } =
  useForm<EmployeeFormValues>({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
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
      netSalary: 0,
      basic: 0,
      conveyance: 0,
      medicalAllowance: 0,
      ESI: 0,
      PF: 0,
      laborWelfare: 0,
    }
  });
      const [dialogOpen, setDialogOpen] = React.useState(false);
      const [dateOpen, setDateOpen] = React.useState(false);
      const [date, setDate] = React.useState<Date | undefined>(undefined);
      const onSubmit: SubmitHandler<EmployeeFormValues> = async (data) => {
    try {
    const payload: addEmpReq = {
      employeeId: data.employeeId,
      employeeName: data.employeeName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      position: data.position,
      department: data.department,
      gender: data.gender,
      dob: date ? date.toISOString().split("T")[0] : "", 
      emergencyNumber: data.emergencyNumber || "",
      bloodGroup: data.bloodGroup || "",
      nationality: data.nationality,
      religion: data.religion,
      maritalStatus: data.maritalStatus || "",
      qualification: data.qualification,
      experience: data.experience || "",
      address: data.address,
      netSalary: data.netSalary,
      basic: data.basic,
      conveyance: data.conveyance,
      medicalAllowance: data.medicalAllowance,
      ESI: data.ESI,
      PF: data.PF,
      laborWelfare: data.laborWelfare,
};
    await postEmployees(payload);
    successToast("Employee added successfully!", "The new employee has been added.");
    reset();
  } catch (err) {
    errorToast("Error adding employee", "There was an issue adding the new employee.");
  }
};

  return (
    <div>
       <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => {
          setDialogOpen(isOpen);
          if (!isOpen) {
          reset();
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
              <form className="grid gap-10"  onSubmit={handleSubmit(onSubmit)}>
              
                <Tabs defaultValue="basic" className="w-full">
                   <TabsList className="grid w-full grid-cols-3 gap-4">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="personal">Advance Information</TabsTrigger>
                    <TabsTrigger value="job">Salary Information</TabsTrigger>
                   </TabsList>
                <TabsContent value="basic" className="space-y-8 mt-5">
                  <div className="grid gap-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                      <Input id="employeeId" {...register("employeeId")} />
                        <p className="text-red-700 text-sm">{errors.employeeId?.message}</p>
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="empName">Employee Name</Label>
                        <Input id="empName"{...register("employeeName")} placeholder="Enter employee name"/>
                          <p className="text-red-700 text-sm">{errors.employeeName?.message}</p>
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                       <Input id="email" placeholder="@gmail.com" {...register("email")}/>
                         <p className="text-red-700 text-sm">{errors.email?.message}</p>
                  </div>
                  <div className="grid gap-2">
                       <Label htmlFor="phoneNumber">Phone Number</Label>
                       <Input id="phoneNumber" placeholder="Enter Phone Number" {...register("phoneNumber")} />
                         <p className="text-red-700 text-sm">{errors.phoneNumber?.message}</p>
                  </div>
                <div className="grid gap-2">
                     <Label htmlFor="position">Position</Label>
                    <Controller
                          control={control}
                        name="position"
                        render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
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
                   )}  />
                  <p className="text-red-700 text-sm">{errors.position?.message}</p>
                </div>
                <div className="grid gap-2">
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="department" className="w-full h-10">
                  <SelectValue placeholder="Select department" />
                 </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="research and development">Research and Development</SelectItem>
                      <SelectItem value="UI/UX">UI/UX</SelectItem>
                      <SelectItem value="human resource">Human Resource</SelectItem>
                     <SelectItem value="administration">Administration</SelectItem>
                  </SelectContent>
                  </Select>
                  )}
                />
                <p className="text-red-700 text-sm">{errors.department?.message}</p>
                </div>
            </TabsContent>
        
              <TabsContent value="personal" className="space-y-8 mt-4">
                 <div className="grid gap-4">
                 <Controller
                    name="gender"
                    control={control}
                    defaultValue="male"
                    render={({ field }) => (
                 <div className="grid gap-4">
                  <Label>Gender</Label>
                <RadioGroup
                   className="flex gap-6"
                    value={field.value}
                    onValueChange={field.onChange}>
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
              {errors.gender && (
                <p className="text-red-700 text-sm">{errors.gender.message}</p>
             )}
            </div>
          )}
          />
          </div>
            <div className="grid gap-2">
          <Label htmlFor="dob" className="px-1">Date of Birth</Label>
        <Controller
           name="dob"
           control={control}
            render={({ field }) => (
        <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dob"
            className="justify-between font-normal"
          >
            {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value ? new Date(field.value) : undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (date) {
                field.onChange(date ? date.toLocaleDateString("en-CA") : "");
              }
              setDateOpen(false)
            }}
          />
          </PopoverContent>
          </Popover>
        )}
        />
        {errors.dob && (
         <p className="text-red-700 text-sm">{errors.dob.message}</p>
          )}
      </div>

          <div className="grid gap-2">
            <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
              <Input id="emergencyNumber" type="tel" placeholder="Enter phone number" {...register("emergencyNumber")}/>
               <p className="text-red-700 text-sm">{errors.emergencyNumber?.message}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bloodgroup">Blood-Group</Label>
              <Controller
                  control={control}
                  name="bloodGroup"
                  render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
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
                    )}  />
                    <p className="text-red-700 text-sm">{errors.bloodGroup?.message}</p>
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Controller
                    control={control}
                    name="nationality"
                    render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="nationality" className="w-full h-10">
                      <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                       </SelectContent>
                      </Select> 
                  )}  />
                  <p className="text-red-700 text-sm">{errors.nationality?.message}</p>
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="religion">Religion</Label>
                <Controller
                    control={control}
                    name="religion"
                    render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}  />
                <p className="text-red-700 text-sm">{errors.religion?.message}</p>
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="marital status">Marital status</Label>
               <Controller
                    control={control}
                    name="maritalStatus"
                     render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="maritalStatus" className="w-full h-10">
                      <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="unmarried">Unmarried</SelectItem>
                    </SelectContent>
                  </Select> 
                )}  />
                <p className="text-red-700 text-sm">{errors.maritalStatus?.message}</p>
              </div> 
               <div className="grid gap-2">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <Input id="qualification" {...register("qualification")} />
                  <p className="text-red-700 text-sm">{errors.qualification?.message}</p>
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number'{...register("experience")}/>
                  <p className="text-red-700 text-sm">{errors.experience?.message}</p>
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Textarea id="address" placeholder="Enter your address here" {...register("address")}/>
                  <p className="text-red-700 text-sm">{errors.address?.message}</p>
              </div>
             </TabsContent>

              <TabsContent value="job" className="space-y-8 mt-5">
                <div className="flex gap-5">
                    <div className="grid gap-2">
                       <Label htmlFor="netsalary">Net Salary</Label>
                        <Input type="number" id="netsalary" {...register("netSalary")} />
                          <p className="text-red-700 text-sm">{errors.netSalary?.message}</p>
                    </div>
                  </div>
                   <h3 className="font-medium mb-4">Earnings</h3>
                    <div className="flex gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="basic">Basic</Label>
                         <Input type="number" id="basic" {...register("basic")}/>
                          <p className="text-red-700 text-sm">{errors.basic?.message}</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="conveyance">Conveyance</Label>
                        <Input type="number" id="conveyance" {...register("conveyance")}/>
                        <p className="text-red-700 text-sm">{errors.conveyance?.message}</p>
                      </div>
                    </div>

                   <div className="flex gap-5">
                       <div className="grid gap-2">
                         <Label htmlFor="medicalallowance">Medical Allowance</Label>
                         <Input type="number" id="medicalallowance" {...register("medicalAllowance")}/>
                          <p className="text-red-700 text-sm">{errors.medicalAllowance?.message}</p>
                       </div>
                    </div>
                      
                    <h3 className="font-medium mb-4">Deductions</h3>
                    <div className="flex gap-5">
                        <div className="grid gap-2">
                          <Label htmlFor="ESI">ESI</Label>
                          <Input type="number" id="ESI" {...register("ESI")}/>
                        <p className="text-red-700 text-sm">{errors.ESI?.message}</p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="PF">PF</Label>
                          <Input type="number" id="PF" {...register("PF")}/>
                        <p className="text-red-700 text-sm">{errors.PF?.message}</p>
                        </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="grid gap-2">
                         <Label htmlFor="labourwelfare">Labour Welfare</Label>
                         <Input type="number" id="labourwelfare" {...register("laborWelfare")} />
                        <p className="text-red-700 text-sm">{errors.laborWelfare?.message}</p>
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
