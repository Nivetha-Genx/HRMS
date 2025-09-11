"use client"
import React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { IconEdit } from '@tabler/icons-react';
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"


function Edit() {
      const [hour, setHour] = useState("09");
      const [minute, setMinute] = useState("00");
      const [ampm, setAmPm] = useState("AM");
      const [open, setOpen] = React.useState(false)
      const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconEdit />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle className="mb-3">Add Attendance</DialogTitle>
            </DialogHeader>
            <form className="grid gap-5">
                <div className="grid gap-2">
                    <Label htmlFor="date" className="px-1">
                        Date of birth
                    </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal">
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
                    setOpen(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>

                </div>
                <div className="flex gap-2">
                    <Label htmlFor="checkIn">CheckIn</Label>
                    <Input
                        id="hour"
                        type="number"
                        min="1"
                        max="12"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className="w-16"
                        />
                    <span className="text-lg">:</span>

                    <Input
                        id="minute"
                        type="number"
                        min="0"
                        max="59"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="w-16"
                        />

                    <Select value={ampm} onValueChange={setAmPm}>
                        <SelectTrigger className="w-20">
                        <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <p className="text-sm text-gray-500">
                    Selected: {hour}:{minute} {ampm}
                </p>
 
                <div className="flex gap-2">
                    <Label htmlFor="checkOut">CheckOut</Label>
                    <Input
                        id="hour"
                        type="number"
                        min="1"
                        max="12"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className="w-16"
                        />
                    <span className="text-lg">:</span>

                    <Input
                        id="minute"
                        type="number"
                        min="0"
                        max="59"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="w-16"
                    />

                    <Select value={ampm} onValueChange={setAmPm}>
                    <SelectTrigger className="w-20">
                    <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <p className="text-sm text-gray-500">
                    Selected: {hour}:{minute} {ampm}
                 </p>
               
                <div className="grid gap-2">
                    <Label htmlFor="break">Break</Label>
                    <Input id="break" type="time" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="productionHour">Production Hours</Label>
                    <Input id="productionHours" type="time" />
                </div>
                <div className="grid gap-2 mb-3">
                    <Label htmlFor="status">Status</Label>
                        <Select>
                        <SelectTrigger id="status" className="w-full h-10">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">Present</SelectItem>
                            <SelectItem value="Medium">Absent</SelectItem>
                        </SelectContent>
                        </Select> 
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
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Edit
