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
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"

// Custom type for the new basic information structure
type BasicInfoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  deptId?: string;
  designationId?: string;
  // Keep existing fields for other tabs
  employeeId: string;
  employeeName: string;
  phoneNumber: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
  gender: string;
  dob: string;
  emergencyNumber: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  maritalStatus: string;
  qualification: string;
  experience: string;
  address: string;
  netSalary: number;
  basic: number;
  conveyance: number;
  medicalAllowance: number;
  ESI: number;
  PF: number;
  laborWelfare: number;
};

function Addemptab() {
       const { register, handleSubmit, control, reset, formState: { errors } } =
  useForm<BasicInfoFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: 0,
      deptId: "",
      designationId: "",
      // Keep existing fields for other tabs
      employeeId: "",
      employeeName: "",
      phoneNumber: "",
      position: "",
      department: "",
      joinDate:"",
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
      const onSubmit: SubmitHandler<BasicInfoFormValues> = async (data) => {
    try {
    // Create payload with new basic information structure
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      deptId: data.deptId || null,
      designationId: data.designationId || null,
    };
    
    // TODO: Replace with actual API call
    console.log("Employee payload:", payload);
    
    successToast("Employee added successfully!", "The new employee has been added.");
    reset();
    setDialogOpen(false);
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
           }
          }}>

          <DialogTrigger asChild>
            <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
               <DialogContent className="sm:max-w-[1000px] max-h-full overflow-y-auto">
                <DialogHeader>
                   <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>
              <form className="grid gap-10"  onSubmit={handleSubmit(onSubmit)}>
              
                <Tabs defaultValue="basic" className="w-full">
                   <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-4  bg-gray-100  rounded-xl">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="personal">Advance Information</TabsTrigger>
                    <TabsTrigger value="job">Salary Information</TabsTrigger>
                   </TabsList>

                <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto mt-5 ">
                <TabsContent value="basic" className="space-y-8 mt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" {...register("firstName")} placeholder="Enter first name" />
                      <p className="text-red-700 text-sm">{errors.firstName?.message}</p>
                    </div>

                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" {...register("lastName")} placeholder="Enter last name" />
                      <p className="text-red-700 text-sm">{errors.lastName?.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="@gmail.com" {...register("email")} />
                      <p className="text-red-700 text-sm">{errors.email?.message}</p>
                    </div>
                    
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter password" {...register("password")} />
                      <p className="text-red-700 text-sm">{errors.password?.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="role">Role</Label>
                      <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                          <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                            <SelectTrigger id="role" className="w-full h-10">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Admin</SelectItem>
                              <SelectItem value="2">HR</SelectItem>
                              <SelectItem value="3">Employee</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <p className="text-red-700 text-sm">{errors.role?.message}</p>
                    </div>

                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="deptId">Department ID (Optional)</Label>
                      <Input id="deptId" {...register("deptId")} placeholder="Enter department ID" />
                      <p className="text-red-700 text-sm">{errors.deptId?.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="designationId">Designation ID (Optional)</Label>
                      <Input id="designationId" {...register("designationId")} placeholder="Enter designation ID" />
                      <p className="text-red-700 text-sm">{errors.designationId?.message}</p>
                    </div>
                  </div>
                </TabsContent>
        
              <TabsContent value="personal" className="space-y-8 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                 <div className="grid gap-4 w-full my-4">
                 <Controller
                    name="gender"
                    control={control}
                    defaultValue="male"
                    render={({ field }) => (
                 <div className="grid gap-4 w-full">
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
            <div className="grid gap-2 my-4">
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
            field.onChange(date ?? null); 
            setDateOpen(false);
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
      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="grid gap-2 w-full my-4">
            <Label htmlFor="emergencyNumber">Emergency Contact Number</Label>
              <Input id="emergencyNumber" type="tel" placeholder="Enter phone number" {...register("emergencyNumber")}/>
               <p className="text-red-700 text-sm">{errors.emergencyNumber?.message}</p>
          </div>
          <div className="grid gap-2 w-full my-4">
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
              </div> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="grid gap-2 w-full ny-4">
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
              <div className="grid gap-2 w-full my-4">
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
              </div> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="grid gap-2 w-full my-4">
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
               <div className="grid gap-2 w-full my-4">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <Input id="qualification" {...register("qualification")} />
                  <p className="text-red-700 text-sm">{errors.qualification?.message}</p>
              </div> 
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="grid gap-2 w-full my-4">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number'{...register("experience")}/>
                  <p className="text-red-700 text-sm">{errors.experience?.message}</p>
              </div>
              <div className="grid gap-2 w-full my-4">
               <Label htmlFor="address">Address</Label>
               <Textarea id="address" placeholder="Enter your address here" {...register("address")}/>
                  <p className="text-red-700 text-sm">{errors.address?.message}</p>
              </div>
              </div>
             </TabsContent>

              <TabsContent value="job" className="space-y-8 mt-5">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full">
                       <Label htmlFor="netsalary">Net Salary</Label>
                        <Input type="number" id="netsalary" {...register("netSalary")} />
                          <p className="text-red-700 text-sm">{errors.netSalary?.message}</p>
                    </div>
                  </div>
                   <h3 className="font-medium mb-4">Earnings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="basic">Basic</Label>
                         <Input type="number" id="basic" {...register("basic")}/>
                          <p className="text-red-700 text-sm">{errors.basic?.message}</p>
                      </div>
                      <div className="grid gap-2 w-full">
                        <Label htmlFor="conveyance">Conveyance</Label>
                        <Input type="number" id="conveyance" {...register("conveyance")}/>
                        <p className="text-red-700 text-sm">{errors.conveyance?.message}</p>
                      </div>
                    </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                       <div className="grid gap-2 w-full">
                         <Label htmlFor="medicalallowance">Medical Allowance</Label>
                         <Input type="number" id="medicalallowance" {...register("medicalAllowance")}/>
                          <p className="text-red-700 text-sm">{errors.medicalAllowance?.message}</p>
                       </div>
                    </div>
                      
                    <h3 className="font-medium mb-4">Deductions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                        <div className="grid gap-2 w-full">
                          <Label htmlFor="ESI">ESI</Label>
                          <Input type="number" id="ESI" {...register("ESI")}/>
                        <p className="text-red-700 text-sm">{errors.ESI?.message}</p>
                        </div>
                        <div className="grid gap-2 w-full">
                          <Label htmlFor="PF">PF</Label>
                          <Input type="number" id="PF" {...register("PF")}/>
                        <p className="text-red-700 text-sm">{errors.PF?.message}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                      <div className="grid gap-2 w-full">
                         <Label htmlFor="labourwelfare">Labour Welfare</Label>
                         <Input type="number" id="labourwelfare" {...register("laborWelfare")} />
                        <p className="text-red-700 text-sm">{errors.laborWelfare?.message}</p>
                      </div>
                    </div>
              </TabsContent>
              </div>
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
