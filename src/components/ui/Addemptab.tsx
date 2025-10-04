import React, { useState } from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react"
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
import { postEmployee, getDepartments, getDesignations } from "@/Services/ApiService"

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
interface AddemptabProps {
  onSuccess?: () => void;
}

function Addemptab({ onSuccess }: AddemptabProps) {
  const [departments, setDepartments] = useState<any[]>([])
  const [designations, setDesignations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [dateOpen, setDateOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
  // Fetch departments and designations on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching departments and designations...")
        setIsLoading(true)
        const [deptResponse, desigResponse] = await Promise.all([
          getDepartments(),
          getDesignations()
        ])
        console.log("Departments:", deptResponse)
        console.log("Designations:", desigResponse)
        
        // Handle API response structure {success: true, data: Array(...)}
        const departmentData = (deptResponse as any)?.data || deptResponse || []
        const designationData = (desigResponse as any)?.data || desigResponse || []
        
        setDepartments(Array.isArray(departmentData) ? departmentData : [])
        setDesignations(Array.isArray(designationData) ? designationData : [])
      } catch (error) {
        console.error("Error fetching departments/designations:", error)
        // Set empty arrays as fallback to prevent UI issues
        setDepartments([])
        setDesignations([])
        errorToast("Error loading data", "Failed to load departments and designations")
      } finally {
        setIsLoading(false)
      }
    }
    
    // Only fetch when dialog is opened to avoid unnecessary API calls
    if (dialogOpen) {
      fetchData()
    }
  }, [dialogOpen])
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
    
    // Make actual API call
    await postEmployee(payload);
    
    successToast("Employee added successfully!", "The new employee has been added.");
    reset();
    setDialogOpen(false);
    
    // Call onSuccess callback to refresh data
    if (onSuccess) {
      onSuccess();
    }
  } catch (err) {
    console.error("Error adding employee:", err);
    errorToast("Error adding employee", "There was an issue adding the new employee.");
  }
};

  // Add error boundary to prevent page from going blank
  try {
    return (
      <div>
         <Dialog
          open={dialogOpen}
          onOpenChange={(isOpen) => {
          console.log("Dialog state changing to:", isOpen)
          setDialogOpen(isOpen);
          if (!isOpen) {
          reset();
           }
          }}>

          <DialogTrigger asChild>
            <Button className="ml-auto">
              + Add New
            </Button>
              </DialogTrigger>
               <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                   <DialogTitle>Add Employee</DialogTitle>
                   <DialogDescription>
                     Fill in the employee information below to add a new employee to the system.
                   </DialogDescription>
                </DialogHeader>
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p>Loading departments and designations...</p>
                    </div>
                  </div>
                ) : (
              <form className="grid gap-10"  onSubmit={handleSubmit(onSubmit)}>
              
                <Tabs defaultValue="basic" className="w-full">
                   <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4 sm:gap-4  bg-gray-100  rounded-xl">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="personal">Advance Information</TabsTrigger>
                    <TabsTrigger value="job">Salary Information</TabsTrigger>
                   </TabsList>

                <div className="h-[400px] md:h-[450px] lg:h-[500px] overflow-y-auto mt-5 ">
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
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter password" 
                          {...register("password")} 
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
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
                              <SelectItem key="role-1" value="1">Admin</SelectItem>
                              <SelectItem key="role-2" value="2">HR</SelectItem>
                              <SelectItem key="role-3" value="3">Employee</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <p className="text-red-700 text-sm">{errors.role?.message}</p>
                    </div>

                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="deptId">Department (Optional)</Label>
                      <Controller
                        control={control}
                        name="deptId"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="deptId" className="w-full h-10">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept, index) => (
                                <SelectItem key={dept.deptId || dept.id || `dept-${index}`} value={dept.deptId || dept.id}>
                                  {dept.deptName || dept.departmentName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <p className="text-red-700 text-sm">{errors.deptId?.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="grid gap-2 w-full my-4">
                      <Label htmlFor="designationId">Designation (Optional)</Label>
                      <Controller
                        control={control}
                        name="designationId"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="designationId" className="w-full h-10">
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                            <SelectContent>
                              {designations.map((desig, index) => (
                                <SelectItem key={desig.desigId || desig.id || `desig-${index}`} value={desig.desigId || desig.id}>
                                  {desig.desigName || desig.designationName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
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
                            <SelectItem key="blood-a-pos" value="A+">A+</SelectItem>
                            <SelectItem key="blood-a-neg" value="A-">A-</SelectItem>
                            <SelectItem key="blood-b-pos" value="B+">B+</SelectItem>
                            <SelectItem key="blood-b-neg" value="B-">B-</SelectItem>
                            <SelectItem key="blood-ab-pos" value="AB+">AB+</SelectItem>
                            <SelectItem key="blood-ab-neg" value="AB-">AB-</SelectItem>
                            <SelectItem key="blood-o-pos" value="O+">O+</SelectItem>
                            <SelectItem key="blood-o-neg" value="O-">O-</SelectItem>
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
                        <SelectItem key="nationality-indian" value="indian">Indian</SelectItem>
                        <SelectItem key="nationality-others" value="others">Others</SelectItem>
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
                      <SelectItem key="religion-hindu" value="hindu">Hindu</SelectItem>
                      <SelectItem key="religion-christian" value="christian">Christian</SelectItem>
                      <SelectItem key="religion-muslim" value="muslium">Muslium</SelectItem>
                      <SelectItem key="religion-others" value="others">Others</SelectItem>
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
                      <SelectItem key="marital-married" value="married">Married</SelectItem>
                      <SelectItem key="marital-unmarried" value="unmarried">Unmarried</SelectItem>
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
                )}
        </DialogContent>
      </Dialog>
    </div>
  )
  } catch (error) {
    console.error("Error rendering Addemptab component:", error)
    return (
      <div>
        <Button className="ml-auto" disabled>
          + Add New (Error)
        </Button>
      </div>
    )
  }
}

export default Addemptab
