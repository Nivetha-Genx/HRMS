"use client"
import {Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


function Add() {
  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto">+ Add New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-max">
                <DialogHeader>
                   <DialogTitle>Add Employee Salary</DialogTitle>  
                </DialogHeader>
              <form className="grid gap-4">
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
                  
                   <h3 className="font-medium">Earnings</h3>
                    <div className="flex gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="basic">Basic</Label>
                         <Input id="basic" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="DA">DA(40%)</Label>
                        <Input id="DA" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="HRA">HRA(15%)</Label>
                        <Input id="HRA" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="conveyance">Conveyance</Label>
                        <Input id="conveyance" />
                      </div>
                    </div>

                   <div className="flex gap-5">
                       <div className="grid gap-2">
                         <Label htmlFor="allowance">Allowance</Label>
                         <Input id="" />
                        </div>
                       <div className="grid gap-2">
                         <Label htmlFor="medicalallowance">Medical Allowance</Label>
                         <Input id="" />
                       </div>
                       <div className="grid gap-2">
                         <Label htmlFor="others"> Others</Label>
                         <Input id="" />
                       </div>
                    </div>

                    <h3 className="font-medium">Deductions</h3>
                    <div className="flex gap-5">
                        <div className="grid gap-2">
                          <Label htmlFor="TDS">TDS</Label>
                          <Input id="TDS" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="ESI">ESI</Label>
                          <Input id="ESI" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="PF">PF</Label>
                          <Input id="PF" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="leave">Leave</Label>
                          <Input id="leave" />
                        </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="proftax">Prof.Tax</Label>
                        <Input id="proftax" />
                      </div>
                      <div className="grid gap-2">
                         <Label htmlFor="labourwelfare">Labour Welfare</Label>
                         <Input id="labourwelfare" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="others">Others</Label>
                        <Input id="others" />
                      </div>
                    </div>

              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Employee Salary</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Add
