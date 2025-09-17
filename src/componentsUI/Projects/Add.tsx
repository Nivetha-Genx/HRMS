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
import { Textarea } from "@/components/ui/textarea"
import { successToast,errorToast} from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { projectSchema } from "@/lib/Schema"
import * as yup from "yup"
import { Controller } from "react-hook-form"
import ReactSelect from "react-select";

type ProjectFormValues = yup.InferType<typeof projectSchema>;

const Add = () => {
     const [open, setOpen] = React.useState(false)
     const [date, setDate] = React.useState<Date | undefined>(undefined)
     const [dialogOpen, setDialogOpen] = React.useState(false);

    const { register, handleSubmit, control,reset, formState: { errors } } = useForm<ProjectFormValues>({
      resolver: yupResolver(projectSchema),
      defaultValues: {  
        projectId: '',
        projectName: '',
        leader: '', 
        team: [],
        deadLine: '',
        priority: '',
        status: '',
        description: ''
      }
    });
    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
      try {
        const payload : project = {
          projectId: data.projectId,
          projectName: data.projectName,
          leader: data.leader,
          team: data.team,
          deadLine: data.deadLine,
          priority: data.priority,
          status: data.status,
          description: data.description
        };
        await postProject(payload);
        console.log('Project added successfully');
        successToast("Project added successfully", "")
        reset();
        setDialogOpen(false);
      } catch (error) {
        console.log('Error adding project:', error);
        errorToast("Error adding project", "")
      } 
    };
       
  return (
    <div>
           <Dialog
              open={dialogOpen}
              onOpenChange={(isOpen) => {
              setDialogOpen(isOpen);
              if (!isOpen) {
              reset();
              setDate(undefined);
            }
            }}>
              <DialogTrigger asChild>
                <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] gap-8">
                <DialogHeader>
                   <DialogTitle>Add Project</DialogTitle>
                      <DialogDescription>
                           Fill in project details and click save.
                      </DialogDescription>
                </DialogHeader>
                   <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>

                <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto "> 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="projectID">ProjectId</Label>
                     <Input id="projectId" {...register("projectId")}   />
                       {errors.projectId && <p className="text-sm text-red-700">{errors.projectId.message}</p>} 
                </div>
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="projectName">ProjectName</Label>
                      <Input id="projectName" {...register("projectName")}   />
                       {errors.projectName && <p className="text-sm text-red-700">{errors.projectName.message}</p>} 
                </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="leader">Team Leader</Label>
                      <Controller
                          control={control}
                          name="leader"
                          render={({ field }) => (
                          <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
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
                          )}
                      />
                 {errors.leader && <p className="text-sm text-red-700">{errors.leader.message}</p>} 
                </div>
                <div className="grid gap-2 w-full my-5">
                   <Label htmlFor="team">Select Team Members</Label>
                     <Controller
                        name="team"
                        control={control}
                        render={({ field }) => (
                      <ReactSelect
                        isMulti
                        options={[
                            { value: "shivaji", label: "Shivaji" },
                            { value: "shivani", label: "Shivani" },
                            { value: "jayashree", label: "Jayashree" },
                            { value: "akilasri", label: "Akila Sri" },
                            { value: "pavithra", label: "Pavithra" },
                            { value: "nisha", label: "Nisha" },
                            { value: "sagana", label: "Sagana" },
                          ]}
                        className="w-full"
                        onChange={(selected) =>
                        field.onChange(selected ? selected.map((s) => s.value) : [])
                    }
                  value={(field.value as string[] | undefined)?.map((val) => ({
                  value: val,
                  label: val,
                  })) || []}
                />
              )}
              />
                {errors.team && <p className="text-sm text-red-700">{errors.team.message}</p>}
                </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
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
                     {errors.deadLine && <p className="text-sm text-red-700">{errors.deadLine.message}</p>} 
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="priority">Priority</Label>
                     <Controller
                        control={control}
                        name="priority"
                        render={({ field }) => (
                    <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                        <SelectTrigger id="priority" className="w-full h-10">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                             <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select> 
                        )}
                      />
                  {errors.priority && <p className="text-sm text-red-700">{errors.priority.message}</p>}
                </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="grid gap-2 w-full my-5">
                  <Label htmlFor="status">Status</Label>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                    <Select {...field} onValueChange={(value) => field.onChange(value)} value={field.value}>
                    <SelectTrigger id="status" className="w-full h-10">
                    <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
               )}
                 />
              {errors.status && <p className="text-sm text-red-700">{errors.status.message}</p>}
              </div>
                      
              <div className="grid gap-2 w-full my-5">
                <Label htmlFor="description">Description</Label>
                 <Textarea placeholder="Type your message here." id="description"  {...register("description")} />
                   {errors.description && <p className="text-sm text-red-700">{errors.description.message}</p>}
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
