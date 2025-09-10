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
import { useState,useEffect } from "react"
import { getLeave, putLeave, deleteLeave } from "@/Services/LeaveService"
import type { addleave } from "@/Services/type"
import { Textarea } from "@/components/ui/textarea"


type EditProps = {
  employeeId: string
  onSuccess?: () => void
}

function Edit({ employeeId, onSuccess }: EditProps) {
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

   useEffect(() => {
      if (!employeeId || !dialogOpen) return;

    getLeave(employeeId)
        .then((data) => {
        setFormData({
          employeeId: data.employeeId,
          employeeName: data.employeeName,
          leaveType:data.leaveType,
          fromDate:data.fromDate,
          toDate:data.toDate,
          numberofdays:data.numberofdays,
          reason:data.reason,    
      });
         if (data.fromDate) setFromDate(new Date(data.fromDate))
         if (data.toDate) setToDate(new Date(data.toDate))
      })
        .catch((err:any) => console.error(err));
      }, [employeeId , dialogOpen]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
      const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
      const handleUpdate = async (status: "Approved" | "Rejected") => {
             try {
             await putLeave(employeeId, { ...formData, fromDate: fromDate ? fromDate.toISOString() : null,  toDate: toDate ? toDate.toISOString() : null});
            console.log(`Leave ${status} successfully!`)
             setDialogOpen(false);
             if (onSuccess) onSuccess();
           } catch (err) {
             console.error(err);
             console.log("Failed to update leave");
           }
         };
         const handleDelete = async () => {
             if (!confirm("Are you sure you want to delete this leave?")) return;
             try {
               await deleteLeave(employeeId);
               console.log("leave deleted successfully!");
               setDialogOpen(false);
               if (onSuccess) onSuccess();
             } catch (err) {
               console.error(err);
               console.log("Failed to delete employee");
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
                  employeeId:"",
                  employeeName:"",
                  leaveType:"",
                  fromDate:"",
                  toDate:"",
                  numberofdays:"",
                  reason:""
              });
            }
            }}>
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
                     <Label htmlFor="employeeID">EmployeeId</Label>
                      <Input id="employeeId"  value={formData.employeeId} onChange={handleChange}  />
                                    </div>
                 <div className="grid gap-2">
                    <Label htmlFor="employeeName">Employee Name</Label>
                     <Input id="employeeName" placeholder="Enter employee name" value={formData.employeeName} onChange={handleChange} />
                 </div>
                <div className="grid gap-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                      <Select  value={formData.leaveType}
                        onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                          <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="medicalLeave">Medical Leave</SelectItem>
                            <SelectItem value="casualLeave">Casual Leave</SelectItem>  
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="fromDate" className="px-1">
                    From Date
                  </Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="fromDate"
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
                    setFormData({ ...formData, fromDate: date?.toISOString() ?? "" })
                    setOpenFrom(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="ToDate" className="px-1">
                     To Date
                    </Label>
                    <Popover open={openTo} onOpenChange={setOpenTo}>
                    <PopoverTrigger asChild>
                    <Button
                       variant="outline"
                       id="toDate"
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
                    setFormData({ ...formData, toDate: date?.toISOString() ?? "" })
                    setOpenTo(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="numberofdays">No of Days</Label>
                      <Input id="numberofdays" type="number"  value={formData.numberofdays} onChange={handleChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason" className="px-1">Reason</Label>
                  <Textarea id="reason" placeholder="Enter your reason here"  value={formData.reason} onChange={handleChange}/>
                </div>
              <DialogFooter>
                  <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                  </DialogClose>
                         <Button type="button" onClick={() => handleUpdate("Approved")}>Approve</Button>
                          <Button type="button" onClick={() => handleUpdate("Rejected")} className="bg-red-700">Reject</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Edit
