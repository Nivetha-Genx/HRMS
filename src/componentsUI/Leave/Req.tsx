import React from "react";
"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect} from "react"
import type { addleave } from "@/Services/type"
import { postLeave } from "../../Services/ApiService"
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast} from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { leaveSchema } from "@/lib/Schema"
import * as yup from "yup"
import { Controller } from "react-hook-form"

type LeaveFormValues = yup.InferType<typeof leaveSchema>;

const LeaveRequest: React.FC = () => {
    const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
          const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
          const [openFrom, setOpenFrom] = React.useState(false)
          const [openTo, setOpenTo] = React.useState(false)

          const {
            register,handleSubmit,control,reset,setValue, formState: { errors },} = useForm<LeaveFormValues>({
                 resolver: yupResolver(leaveSchema),
                 defaultValues: {
                      employeeId:"",
                      employeeName: "",
                      leaveType: "",
                      fromDate: "",
                      toDate: "",
                      dayBreakdown:"",
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
                      dayBreakdown: data.dayBreakdown,
                      numberofdays: data.numberofdays,  
                      reason: data.reason,
                    };
                      await postLeave(payload); 
                      console.log("Leave added successfully!")
                      successToast("Leave added successfully", "The leave has been recorded.")
                      reset();    
                      setFromDate(undefined);
                      setToDate(undefined);
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
        <div className="w-full px-20 md:px-20 py-20 bg-white">
           <h3 className="text-xl font-semibold mb-6">Leave Request</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-15 w-full"  onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                     <label className="text-sm text-gray-700 mb-1 font-semibold">EmployeeID</label>
                         <Input id="employeeId" type="text" {...register("employeeId")} />
                             {errors.employeeId && <p className="text-sm text-red-700">{errors.employeeId.message}</p>}
                 </div>

                <div className="flex flex-col">
                     <label className="text-sm text-gray-700 mb-1 font-semibold">Employee Name</label>
                         <Input id="employeeName" type="text" {...register("employeeName")} />
                             {errors.employeeName && <p className="text-sm text-red-700">{errors.employeeName.message}</p>}
                 </div>

                 <div className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1 font-semibold">Leave Type</label>
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

                 <div className="flex flex-col">
                     <label className="text-sm text-gray-700 mb-1 font-semibold">Start Date</label>
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

                 <div className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1 font-semibold">End Date</label>
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

                 <div className="flex flex-col">
                     <label className="text-sm text-gray-700 mb-1 font-semibold">Number of Days</label>
                         <Input id="numberofdays" type="number" {...register("numberofdays")} />
                             {errors.numberofdays && <p className="text-sm text-red-700">{errors.numberofdays.message}</p>}
                 </div>

                 <div className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1 font-semibold">
                        Day Breakdown (if Same-day)
                    </label>
                    <Controller
                        control={control}
                        name="dayBreakdown"
                        render={({ field }) => (
                           <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                               <SelectTrigger id="daybreakdown" className="w-full h-10">
                                   <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full Day">Full Day</SelectItem>
                                    <SelectItem value="Half Day">Half Day</SelectItem>  
                                </SelectContent>
                            </Select>  
                         )}/>
                    {errors.dayBreakdown && <p className="text-sm text-red-700">{errors.dayBreakdown.message}</p>}
                 </div>

                 <div className="flex flex-col col-span-1 md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 font-semibold">Remarks</label>
                         <Textarea id="reason" placeholder="Enter your reason here"  {...register("reason")}/>
                              {errors.reason && <p className="text-sm text-red-700">{errors.reason.message}</p>}
                 </div>

                 <div className="flex flex-col col-span-1 md:col-span-2">
                    <label className="text-sm text-gray-700 mb-1 font-semibold">Attachment</label>
                       <input
                          type="file"
                          className="text-sm border border-gray-300 rounded-md px-3 py-2 w-full"/>
                 </div>

                 <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-xl text-sm bg-gray-100 hover:bg-gray-200">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm hover:bg-gray-900">
                        Submit
                    </button>
                 </div>
               </form>
         </div>
      );
   };

export default LeaveRequest;
