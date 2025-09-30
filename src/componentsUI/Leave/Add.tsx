"use client"
import React from "react"
import {Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect} from "react"
import type { addleave } from "@/Services/type"
import { postLeave } from "@/Services/ApiService"
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast} from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { leaveSchema } from "@/lib/Schema"
import * as yup from "yup"
import { Controller } from "react-hook-form"

type LeaveFormValues = yup.InferType<typeof leaveSchema>;

function Add() {
      const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
      const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
      const [openFrom, setOpenFrom] = React.useState(false)
      const [openTo, setOpenTo] = React.useState(false)
      const [dialogOpen, setDialogOpen] = React.useState(false);

      const {
        register,handleSubmit,control,reset,setValue,   
         formState: { errors },
          } = useForm<LeaveFormValues>({ resolver: yupResolver(leaveSchema),
         defaultValues: {
         employeeId: "",
          employeeName: "",
          leaveType: "",
          fromDate: "",
          toDate: "",
          numberofdays: 0,
          reason: "",
  },
});
    const onSubmit : SubmitHandler<LeaveFormValues> = async (data) => {
        try {
          const payload : addleave = { 
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            leaveType: data.leaveType,  
            fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
            toDate: toDate ? toDate.toISOString().split("T")[0] : "",
            numberofdays: data.numberofdays,  
            reason: data.reason,
          };
          await postLeave(payload); 
          console.log("Leave added successfully!")
          successToast("Leave added successfully", "The leave has been recorded.")
          reset();    
          setFromDate(undefined);
          setToDate(undefined);
          setDialogOpen(false);
        } catch (err) {
          console.log("Error adding leave", err);
          errorToast("Error adding leave", "Please try again.")
        } 
      };
      useEffect(() => {
          if (fromDate && toDate) {
          const diff =
             Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          setValue("numberofdays", diff);
          } else {
          setValue("numberofdays", 0);
          }
          }, [fromDate, toDate, setValue]);

  return (
    <div>
         <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
            setDialogOpen(isOpen);
            if (!isOpen) {
              reset();    
              setFromDate(undefined);
              setToDate(undefined);
         }
      }}>
        <DialogTrigger asChild>
          <Button className="ml-auto">+ Add Leave</Button>
        </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] gap-6  max-h-full overflow-y-auto">
              <DialogHeader>
                 <DialogTitle>Add Leave</DialogTitle>
                    <DialogDescription>
                       Fill in leave details and click add leave.
                    </DialogDescription>
              </DialogHeader>
               <form className="grid gap-8"   onSubmit={handleSubmit(onSubmit)}>
                <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto mt-5 ">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="employeeId">EmployeeId</Label>
                     <Input id="employeeId" {...register("employeeId")} />
                      {errors.employeeId && <p className="text-sm text-red-700">{errors.employeeId.message}</p>}
                 </div>

                 <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="employeeName">Employee Name</Label>
                      <Controller
                          control={control}
                          name="employeeName"
                          render={({ field }) => (
                          <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                         <SelectTrigger id="employeeName" className="w-full h-10">
                           <SelectValue placeholder="Select Employee Name" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="Shivaji">Shivaji</SelectItem>
                            <SelectItem value="Shivani">Shivani</SelectItem>
                            <SelectItem value="Jayashree">jayashree</SelectItem>
                            <SelectItem value="Akilasri">Akila Sri</SelectItem>
                            <SelectItem value="Pavithra">Pavithra</SelectItem>
                            <SelectItem value="Nisha">Nisha</SelectItem>
                            <SelectItem value="Sagana">Sagana</SelectItem>
                         </SelectContent>
                      </Select>  
                )}/>
                {errors.employeeName && <p className="text-sm text-red-700">{errors.employeeName.message}</p>}
                </div>
                </div>
                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="leaveType">Leave Type</Label>
                       <Controller
                            control={control}
                             name="leaveType"
                              render={({ field }) => (
                              <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                           <SelectValue placeholder="Select Leave Type" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="MedicalLeave">Medical Leave</SelectItem>
                            <SelectItem value="CasualLeave">Casual Leave</SelectItem>  
                         </SelectContent>
                     </Select>  
                )}/>
                {errors.leaveType && <p className="text-sm text-red-700">{errors.leaveType.message}</p>}
                </div>

                <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="fromDate" className="px-1">
                      From Date
                    </Label>
                     <Controller
                          name="fromDate"
                          control={control}
                          render={({ field }) => (
                     <Popover open={openFrom} onOpenChange={setOpenFrom}>
                       <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="fromDate"
                          className="justify-between font-normal">
                           {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                       </PopoverTrigger>
                       <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                              mode="single"
                              selected={fromDate}
                              onSelect={(date) => {
                              setFromDate(date || undefined);
                             field.onChange(date ? date.toLocaleDateString("en-CA") : "");
                              setOpenFrom(false);   
                    }}/>

                       </PopoverContent>
                     </Popover>
                      )}/>
                      {errors.fromDate && <p className="text-sm text-red-700">{errors.fromDate.message}</p>}
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="to-date" className="px-1">
                     To Date
                   </Label>
                    <Controller
                        name="toDate"
                        control={control}
                        render={({ field }) => (
                     <Popover open={openTo} onOpenChange={setOpenTo}>
                       <PopoverTrigger asChild>
                         <Button
                           variant="outline"
                           id="toDate"
                           className="justify-between font-normal">
                            {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                           <ChevronDownIcon />
                         </Button>
                       </PopoverTrigger>
                       <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={toDate}
                        onSelect={(date) => {
                        setToDate(date || undefined); 
                        field.onChange(date ? date.toLocaleDateString("en-CA") : "");
                        setOpenTo(false);          
                     }}/>

                        </PopoverContent>
                     </Popover>
                      )}/>
                      {errors.toDate && <p className="text-sm text-red-700">{errors.toDate.message}</p>}
                </div>
                
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="numberofdays">No of Days</Label>
                      <Input id="numberofdays" type="number" {...register("numberofdays")} />
                      {errors.numberofdays && <p className="text-sm text-red-700">{errors.numberofdays.message}</p>}
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                    <Label htmlFor="reason" className="px-1">Reason</Label>
                    <Textarea id="reason" placeholder="Enter your reason here"  {...register("reason")}/>
                    {errors.reason && <p className="text-sm text-red-700">{errors.reason.message}</p>}
                </div>
                </div>
                </div>
                
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                  </DialogClose>
                     <Button type="submit">Add Leave</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default Add
