import React from 'react'
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog,DialogClose,  DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { project } from '@/Services/type'
import { postProject } from '@/Services/projectService' 
import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"

const Add = () => {
     const [open, setOpen] = React.useState(false)
     const [date, setDate] = React.useState<Date | undefined>(undefined)
     const [dialogOpen, setDialogOpen] = React.useState(false);
     const [formData, setFormData] = useState<project>({
        projectId: '',
        projectName: '',
        leader: '',
        team: '',
        deadLine: '',
        priority: '',
        status: '',
        description: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({...formData,[e.target.id]: e.target.value, });
    };

    const handleSelectChange = (field: keyof project, value: string) => {
      setFormData({...formData,[field]: value,});
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

       try {
          await postProject(formData);
          console.log('Project added successfully');
          setFormData({
            projectId: '',
            projectName: '',
            leader: '',
            team: '',
            deadLine: '',
            priority: '',
            status: '',
            description: ''
        });
          successToast("Project added successfully", "")
          setOpen(false);
        } catch (error) {
          console.log('Error adding project:', error);
          errorToast("Error adding project", "")
        }   
      }
  return (

    <div>
           <Dialog
              open={dialogOpen}
              onOpenChange={(isOpen) => {
              setDialogOpen(isOpen);
              if (!isOpen) {
              setFormData({
                 projectId: '',projectName: '', leader: '',team: '',  deadLine: '', priority: '' , status: '',description: ''
             });
              setDate(undefined);
            }
            }}>
              <DialogTrigger asChild>
                <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] gap-8">
                <DialogHeader>
                   <DialogTitle>Add Project</DialogTitle>
                      <DialogDescription>
                           Fill in project details and click save.
                      </DialogDescription>
                </DialogHeader>
                   <form className="grid gap-8" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="projectID">ProjectId</Label>
                     <Input id="projectid"   value={formData.projectId} onChange={handleChange}  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectName">ProjectName</Label>
                      <Input id="projectName" value={formData.projectName} onChange={handleChange}  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leader">Team Leader</Label>
                      <Select onValueChange={(value) => handleSelectChange('leader', value)}>
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
                  <Label htmlFor="team">Team</Label>
                     <Select onValueChange={(value) => handleSelectChange('team', value)}>
                        <SelectTrigger id="team" className="w-full h-10">
                             <SelectValue placeholder="Select Team members" />
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
                      <Label htmlFor="date" className="px-1">
                    DeadLine
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
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                     <Select onValueChange={(value) => handleSelectChange('status', value)}>
                        <SelectTrigger id="priority" className="w-full h-10">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                             <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select> 
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value) => handleSelectChange('status', value)}>
                         <SelectTrigger id="status" className="w-full h-10">
                             <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                        </Select>
                </div>
                 <div className="grid gap-2">
                 <Label htmlFor="description">Description</Label>
                 <Textarea placeholder="Type your message here." id="description" value={formData.description} onChange={handleChange} />
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
