"use client"
import React from "react"
import { Dialog,DialogClose,  DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import type { project } from '@/Services/type'
import { getProject,putProject,deleteProject } from '@/Services/projectService'
import { useState,useEffect } from 'react' 
import { Textarea } from "@/components/ui/textarea"   

function Edit({projectId,onSuccess}: {projectId: string,onSuccess?: () => void}) {
       const [open, setOpen] = React.useState(false)
        const [dialogOpen, setDialogOpen] = React.useState(false);
        const [date, setDate] = React.useState<Date | undefined>(undefined)
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
    useEffect(() => {
          if (!projectId || !open) return;
       
           getProject(projectId)
             .then((data) => {
               setFormData({
                  projectId: data.projectId,
                  projectName: data.projectName,
                  leader: data.leader,
                  team: data.team,
                  deadLine: data.deadLine,
                  priority: data.priority,
                  status: data.status,
                  description: data.description
               });
            if (data.deadLine) setDate(new Date(data.deadLine));
             })
             .catch((err:any) => console.error(err));
         }, [projectId , open]);

         const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const { id, value } = e.target;
          setFormData({ ...formData, [id]: value });
        };

         const handleUpdate = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
              await putProject(projectId, { ...formData, deadLine: date ? date.toISOString() : null });
              console.log("Project updated successfully!");
              setDialogOpen(false);
              if (onSuccess) onSuccess();
            } catch (err) {
              console.error(err);
              console.log("Failed to update project");
            }
          };
          const handleDelete = async () => {
              if (!confirm("Are you sure you want to delete this project?")) return;
              try {
                await deleteProject(projectId);
                console.log("Project deleted successfully!");
                setDialogOpen(false);
                if (onSuccess) onSuccess();
              } catch (err) {
                console.error(err);
                console.log("Failed to delete Project");
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
                   projectId: '',projectName: '', leader: '',team: '',  deadLine: '',priority:'', status: '', description: ''});
                setDate(undefined);
                 }
              }}>
            <DialogTrigger asChild>
               <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-8">
              <DialogHeader>
                <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>
                      Edit Project details and click save
                  </DialogDescription>
              </DialogHeader>
              <form className="grid gap-8" onSubmit={handleUpdate}>
                 <div className="grid gap-2">
                   <Label htmlFor="projectID">ProjectId</Label>
                      <Input id="projectid" value={formData.projectId} onChange={handleChange}/>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="projectName">ProjectName</Label>
                       <Input id="projectName" value={formData.projectName} onChange={handleChange} />
                 </div>
                <div className="grid gap-2">
                   <Label htmlFor="leader">Leader</Label>
                       <Select  value={formData.leader}
                          onValueChange={(value) => setFormData({ ...formData, leader: value })}>
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
                     <Select  value={formData.team}
                        onValueChange={(value) => setFormData({ ...formData, team: value })}>
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
                     <Select  value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}>
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
                        <Select  value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}>
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
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Edit
