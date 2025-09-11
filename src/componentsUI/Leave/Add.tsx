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
import { useState,useEffect} from "react"
import type { addleave } from "@/Services/type"
import { postLeave } from "@/Services/LeaveService"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"


function Add() {
      const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
      const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
      const [openFrom, setOpenFrom] = React.useState(false)
      const [openTo, setOpenTo] = React.useState(false)
      const [dialogOpen, setDialogOpen] = React.useState(false);
      const [formData, setFormData] = useState<addleave>({
          employeeId:"",
          employeeName:"",
          leaveType:"",
          fromDate:"",
          toDate:"",
          numberofdays:"",
          reason:"",
       });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData,[e.target.id]: e.target.value,});
      };
       
      const handleSelectChange = (field: keyof addleave, value: string) => {
         setFormData({...formData,[field]: value, });
      };
       
      const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
      
      try {
        const payload = {
          ...formData,
          fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
          toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        };

      await postLeave(payload);
      console.log("Leave added successfully!")
      toast.success("Leave added successfully!")
      setFormData({
          employeeId: "",
          employeeName: "",
          leaveType: "",
          fromDate: "",
          toDate: "",
          numberofdays: "",
          reason: "",
    });
      setFromDate(undefined);
      setToDate(undefined);
      setDialogOpen(false);
  } catch (err) {
      console.log("Error adding leave", err);
      toast.error("Failed to add leave");
  }
};

   useEffect(() => {
     if (fromDate && toDate) {
       const diff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1; 
       setFormData((prev) => ({
       ...prev,
       numberofdays: diff.toString(),
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      numberofdays: "",
    }));
  }
}, [fromDate, toDate]);

  return (
    <div>
         <Dialog
            open={dialogOpen}
            onOpenChange={(isOpen) => {
            setDialogOpen(isOpen);
            if (!isOpen) {
            setFormData({employeeId:"",
            employeeName:"",
            leaveType:"",
            fromDate:"",
            toDate:"",
            numberofdays:""  ,
            reason:"",
          });
         }
      }}>
        <DialogTrigger asChild>
          <Button className="ml-auto">+ Add Leave</Button>
        </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] gap-6">
              <DialogHeader>
                 <DialogTitle>Add Leave</DialogTitle>
                    <DialogDescription>
                       Fill in leave details and click add leave.
                    </DialogDescription>
              </DialogHeader>
               <form className="grid gap-8"  onSubmit={handleSubmit}>
                 <div className="grid gap-2">
                   <Label htmlFor="employeeId">EmployeeId</Label>
                     <Input id="employeeId" value={formData.employeeId} onChange={handleChange} />
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="employeeName">Employee Name</Label>
                      <Select  onValueChange={(val) => handleSelectChange("employeeName", val)}>
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                      <Select  onValueChange={(val) => handleSelectChange("leaveType", val)}>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                           <SelectValue placeholder="Select Leave Type" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="MedicalLeave">Medical Leave</SelectItem>
                            <SelectItem value="CasualLeave">Casual Leave</SelectItem>  
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
                   <Label htmlFor="to-date" className="px-1">
                     To Date
                   </Label>
                     <Popover open={openTo} onOpenChange={setOpenTo}>
                       <PopoverTrigger asChild>
                         <Button
                           variant="outline"
                           id="to-date"
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
                      <Input id="numberofdays" type="number" value={formData.numberofdays} readOnly />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="reason" className="px-1">Reason</Label>
                    <Textarea id="reason" placeholder="Enter your reason here"  value={formData.reason} onChange={handleChange}/>
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
