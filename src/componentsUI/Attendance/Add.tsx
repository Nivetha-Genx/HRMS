"use client"
import React, { useState,useEffect } from "react"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { addAttendance } from "@/Services/type"
import { postAttendance } from "@/Services/AttendanceService"
import TimePicker from "react-time-picker"
import "react-time-picker/dist/TimePicker.css"
import "react-clock/dist/Clock.css"
import { errorToast, successToast } from "@/lib/toast"

function Add() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [employeeName, setEmployeeName] = useState("")
  const [checkIn, setCheckIn] = useState<string | null>(null)
  const [checkOut, setCheckOut] = useState<string | null>(null)
  const [breakTime, setBreakTime] = useState<string | null>(null)
  const [productionHours, setProductionHours] = useState<string>("")
  const [status, setStatus] = useState("")

 
  function calculateProduction(checkin: string, checkout: string, breakTime: string | null) {
  const [cinH, cinM] = checkin.split(":").map(Number)
  const [coutH, coutM] = checkout.split(":").map(Number)

  let start = cinH * 60 + cinM
  let end = coutH * 60 + coutM
  let total = end - start

  if (breakTime) {
    const [bH, bM] = breakTime.split(":").map(Number)
    total -= bH * 60 + bM
  }

  if (total < 0) return "00:00"
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}
  
useEffect(() => {
  if (checkIn && checkOut) {
    setProductionHours(calculateProduction(checkIn, checkOut, breakTime))
  }
}, [checkIn, checkOut, breakTime])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: addAttendance = {
      employeeName,
      date: date ? date.toISOString().split("T")[0] : "", 
      checkin: checkIn || "",
      checkout: checkOut || "",
      break: breakTime || "",
      productionHours: productionHours || "",
      status,
    }
    console.log("Submitting Attendance:", payload)

    try {
      const res = await postAttendance(payload)
      console.log("Attendance saved ", res)
      successToast("Attendance saved successfully")
      setDialogOpen(false)
    } catch (err) {
      console.error("Error saving attendance ", err)
      errorToast("Error saving attendance")
    }
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="ml-auto">+ Add New</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px]  max-h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-3">Add Attendance</DialogTitle>
          </DialogHeader>

          <form className="grid gap-10" onSubmit={handleSubmit}>
             <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto mt-5 ">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="grid gap-2 w-full my-5">
              <Label htmlFor="employeeName">Employee Name</Label>
              <Select value={employeeName} onValueChange={setEmployeeName}>
                <SelectTrigger id="employeeName" className="w-full h-10">
                  <SelectValue placeholder="Select EmployeeName" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shivaji">Shivaji</SelectItem>
                  <SelectItem value="shivani">Shivani</SelectItem>
                  <SelectItem value="jayashree">Jayashree</SelectItem>
                  <SelectItem value="akilasri">Akila Sri</SelectItem>
                  <SelectItem value="pavithra">Pavithra</SelectItem>
                  <SelectItem value="nisha">Nisha</SelectItem>
                  <SelectItem value="sagana">Sagana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 w-full my-4">
              <Label htmlFor="date" className="px-1">
                Date
              </Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="justify-between font-normal">
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date)
                      setPopoverOpen(false)
                    }}/>
                </PopoverContent>
              </Popover>
            </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full my-5">
            <div className="grid gap-2 w-full my-4">
              <Label htmlFor="checkIn">CheckIn</Label>
              <TimePicker onChange={setCheckIn}  value={checkIn} disableClock format="HH:mm"/>
            </div>

            <div className="grid gap-2 w-full my-4">
              <Label htmlFor="checkOut">CheckOut</Label>
              <TimePicker onChange={setCheckOut} value={checkOut} disableClock format="HH:mm" />
            </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full my-5">
            <div className="grid gap-2 w-full my-4">
              <Label htmlFor="break">Break</Label>
              <TimePicker onChange={setBreakTime} value={breakTime} disableClock format="HH:mm" />
            </div>

            <div className="grid gap-2 w-full my-4">
             <Label htmlFor="productionHours">Production Hours</Label>
              <Input id="productionHours" value={productionHours} readOnly />
            </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full my-5">
            <div className="grid gap-2 mb-3 w-full-my-5 mt-3">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="w-full h-10">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>
            </div>
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

export default Add

