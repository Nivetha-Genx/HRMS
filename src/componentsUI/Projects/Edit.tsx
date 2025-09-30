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
import { getProject,putProject,deleteProject } from '@/Services/ApiService'
import { useState,useEffect } from 'react' 
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast } from "@/lib/toast"

function Edit({projectId,onSuccess}: {projectId: string,onSuccess?: () => void}) {
        const [datePickerOpen, setDatePickerOpen] = React.useState(false); 
        const [editDialogOpen, setEditDialogOpen] = React.useState(false);
        const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false); 
        const [date, setDate] = React.useState<Date | undefined>(undefined)
        const [formData, setFormData] = useState<project>({
           projectId: '',
           projectName: '',
           leader: '',
           team: [],
           deadLine: '',
           priority: '',
           status: '',
           description: ''
       })
       
    useEffect(() => {
          if (!projectId || !editDialogOpen) return;
       
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
         }, [projectId , editDialogOpen]);

         const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
          const { id, value } = e.target;
          setFormData({ ...formData, [id]: value });
        };

         const handleUpdate = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
              await putProject(projectId, { ...formData, deadLine: date ? date.toISOString() : null });
              console.log("Project updated successfully!");
              successToast("Project updated successfully!", "")
              setEditDialogOpen(false);
              if (onSuccess) onSuccess();
            } catch (err) {
              console.error(err);
              console.log("Failed to update project");
              errorToast("Failed to update project", "")
          };
        }
          const handleDelete = async () => {
              try {
                await deleteProject(projectId);
                console.log("Project deleted successfully!");
                successToast("Project deleted successfully!", "")
                setDeleteDialogOpen(false);
                if (onSuccess) onSuccess();
              } catch (err) {
                console.error(err);
                console.log("Failed to delete Project");
                errorToast("Failed to delete project", "")
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
               open={editDialogOpen}
               onOpenChange={(isOpen) => {
               setEditDialogOpen(isOpen);
               if (!isOpen) {
                setFormData({
                   projectId: '',projectName: '', leader: '',team: [],  deadLine: '',priority:'', status: '', description: ''});
                setDate(undefined);
                 }
              }}>
            <DialogTrigger asChild>
               <DropdownMenuItem  onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] gap-8  max-h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>
                      Edit Project details and click save
                  </DialogDescription>
              </DialogHeader>

              <form className="grid gap-8" onSubmit={handleUpdate}>
                
                <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto mt-5 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                 <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="projectID">ProjectId</Label>
                      <Input id="projectid" value={formData.projectId} onChange={handleChange}/>
                 </div>
                 <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="projectName">ProjectName</Label>
                       <Input id="projectName" value={formData.projectName} onChange={handleChange} />
                 </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="leader">Leader</Label>
                       <Select  value={formData.leader}
                          onValueChange={(value) => setFormData({ ...formData, leader: value })}>
                         <SelectTrigger id="leader" className="w-full h-10">
                            <SelectValue placeholder="Select Team leader" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="shivaji">Shivaji</SelectItem>
                            <SelectItem value="shivani">Shivani</SelectItem>
                            <SelectItem value="jayashree">jayashree</SelectItem>
                            <SelectItem value="akilasri">Akila Sri</SelectItem>
                            <SelectItem value="pavithra">Pavithra</SelectItem>
                            <SelectItem value="nisha">Nisha</SelectItem>
                            <SelectItem value="sagana">Sagana</SelectItem>
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="team">Team</Label>
                     <Select value={formData.team[0] ?? ""}  
                         onValueChange={(value) => setFormData({ ...formData, team: [value] })}>
                        <SelectTrigger id="team" className="w-full h-10">
                        <SelectValue placeholder="Select Team members" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="shivaji">Shivaji</SelectItem>
                             <SelectItem value="shivani">Shivani</SelectItem>
                             <SelectItem value="jayashree">jayashree</SelectItem>
                             <SelectItem value="akilasri">Akila Sri</SelectItem>
                            <SelectItem value="pavithra">Pavithra</SelectItem>
                            <SelectItem value="nisha">Nisha</SelectItem>
                             <SelectItem value="sagana">Sagana</SelectItem>
                        </SelectContent>
                    </Select>  
                </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="date" className="px-1">
                     DeadLine
                  </Label>
                  <Popover  open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                  <Button
                      type="button"
                      variant="outline"
                      id="deadline"
                      className="justify-between font-normal">
                      {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setDatePickerOpen(false);
                    }}
                    />
                  </PopoverContent>
                  </Popover>  
                </div>
                <div className="grid gap-2 w-full my-5">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
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
                 <div className="grid gap-2 w-full my-5">
                    <Label htmlFor="description">Description</Label>
                     <Textarea placeholder="Type your message here." id="description" value={formData.description} onChange={handleChange} />
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
             <DropdownMenuItem   onSelect={(e) => {
                e.preventDefault() 
                 setDeleteDialogOpen(true)      
                  }}>Delete</DropdownMenuItem>
                   <Dialog  open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                     <DialogTrigger asChild>
                      </DialogTrigger>
                     <DialogContent className="sm:max-w-md rounded-2xl">
                       <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                             <DialogDescription>
                                Are you sure you want to delete this project? This action cannot be undone.
                             </DialogDescription>
                       </DialogHeader>
                       <DialogFooter>
                         <Button  className="bg-gray-200 text-black hover:bg-gray-300"
                           onClick={() => setDeleteDialogOpen(false)}>
                             Cancel
                         </Button>
                         <Button  className="bg-red-700 text-white hover:bg-red-800"
                           onClick={handleDelete}>
                             Delete
                         </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Edit
