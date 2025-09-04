"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog,DialogClose,  DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import ProjectCard from "./projectGrid"

const data: Payment[] = [
    {
    id: "ghqej43k",
    projectId:"PRO-001",
    projectName:"Office management App",
    leader: {
    name: "Shivaji Maharaj",
    avatar: "https://i.pravatar.cc/150?img=12"},
    team: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png" },
      { name: "Jane Smith", avatar: "https://github.com/evilrabbit.png" },
      { name: "Sam Lee", avatar: "https://github.com/leerob.png" },
    ],
    priority: "High",
    deadLine:"20-9-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-002",
    projectName:"Clinic Management",
    leader: {
        name: "shivani Nachiyar",
        avatar:"https://github.com/evilrabbit.png"},
    team: [
      { name: "John Doe", avatar: "https://github.com/leerob.png" },
      { name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
      { name: "Sam Lee", avatar: "https://github.com/evilrabbit.png" },
    ],
    priority: "Low",
    deadLine:"20-12-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-003",
    projectName:"Educational Platform",
    leader:{
        name:"Jayashree",
        avatar: "https://i.pravatar.cc/150?img=2"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Medium",
    deadLine:"20-10-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-004",
    projectName:"Travel Planning Website",
    leader: {
        name:"sagana",
        avatar:"https://i.pravatar.cc/150?img=4"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=3" },
    ],
    priority: "High",
    deadLine:"30-9-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-005",
    projectName:"Hotel Booking App",
    leader:{
        name:"Pavithra",
        avatar:"https://github.com/leerob.png" },
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Low",
    deadLine:"20-12-2025",
    status:"InActive",
  },
  {
    id: "lhcej53d",
    projectId:"PrO-006",
    projectName:"Food Order App",
    leader:{
        name:"Nisha Danasegaran",
        avatar:"https://i.pravatar.cc/150?img=4"},
    team: [
      { name: "John Doe", avatar: "https://github.com/leerob.png" },
      { name: "Jane Smith", avatar: "https://github.com/leerob.png" },
      { name: "Sam Lee", avatar: "https://github.com/leerob.png" },
    ],
    priority: "medium",
    deadLine:"20-11-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-007",
    projectName:"Service Booking Software",
    leader: {
        name:"Akila Sri",
        avatar:"https://github.com/leerob.png"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Low",
    deadLine:"20-2-2026",
    status:"InActive",
  },
]

export type TeamMember = {
  name: string
  avatar: string
} 
export type Payment = {
  id: string
  projectId: string
  projectName:string
  leader:{
    name:string
    avatar:string
  }
  team: TeamMember[]
  priority: string
  deadLine:string
  status:string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "projectId",
    header: "ProjectId",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("projectId")}</div>
    ),
  },
    {
  accessorKey: "projectName",
  header: () => <div className="text-left">Project Name</div>,
  cell: ({ row }) => {
    const projectName = row.getValue("projectName") as string
    return <div className="text-left font-medium">{projectName}</div>
  },
},
   {
  accessorKey: "leader",
  header: "Leader",
  cell: ({ row }) => {
    const leader = row.original.leader as { name: string; avatar: string }

    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={leader.avatar} alt={leader.name} />
          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="capitalize">{leader.name}</span>
      </div>
    )
  },
},
 {
  accessorKey: "team",
  header: "Team Members",
  cell: ({ row }) => {
    const team = row.getValue("team") as { name: string; avatar: string }[]

    return (
      <div className="flex -space-x-2">
        {team.map((member, index) => (
          <Avatar key={index} className="border-2 border-white">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ))}
         <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
          </Badge>
      </div>
    )
  },
 },
   {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("priority")}</div>
    ),
  },
  {
    accessorKey: "deadLine",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deadLine")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const [open, setOpen] = React.useState(false)
      const [date, setDate] = React.useState<Date | undefined>(undefined)

      return (
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
          <Dialog>
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
              <form className="grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="projectID">ProjectId</Label>
                     <Input id="projectid" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectName">ProjectName</Label>
                      <Input id="projectName" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leader">Leader</Label>
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
                  <Label htmlFor="team">Team</Label>
                     <Select>
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
                     <Select>
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
                        <Select>
                         <SelectTrigger id="status" className="w-full h-10">
                             <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
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
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
export default function Projects() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
 const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Project Names..."
          value={(table.getColumn("projectName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <div className="flex items-center gap-2 ml-auto">
          <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] gap-8">
                <DialogHeader>
                   <DialogTitle>Add Project</DialogTitle>
                      <DialogDescription>
                           Fill in project details and click save.
                      </DialogDescription>
                </DialogHeader>
                   <form className="grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="projectID">ProjectId</Label>
                     <Input id="projectid" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="projectName">ProjectName</Label>
                      <Input id="projectName" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="leader">Team Leader</Label>
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
                  <Label htmlFor="team">Team</Label>
                     <Select>
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
                     <Select>
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
                        <Select>
                         <SelectTrigger id="status" className="w-full h-10">
                             <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader  className=" bg-neutral-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <div><ProjectCard /></div>
    </div>
  )
}

