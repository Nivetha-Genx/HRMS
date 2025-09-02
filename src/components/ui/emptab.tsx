"use client"
import { Dialog,DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const data: Payment[] = [
    {
    id: "ghqej43k",
    employeeId:"ET001",
    name:"Shivaji Maharaj",
    position:"Manager",
    department:"IT/Technology",
    email: "shivaji@example.com",
    joinDate:"20-4-2024",
    status:"Active",
  },  
  {
    id: "lhcej53d",
    employeeId:"ET002",
    name:"Shivani Nachiyar",
    position:"Frontend developer",
    department:"IT/Technology",
    email: "shivani@example.com",
    joinDate:"20-5-2024",
     status:"InActive",
  },
    {
    id: "m5gr84i9",
    employeeId:"ET003",
    name:"Akila Sri",
    position: "Backend developer",
    department:"IT/Technology",
    email: "akila@example.com",
    joinDate:"10-6-2024",
     status:"Active",
  },
  {
    id: "3u1reuv4",
    employeeId:"ET004",
    name: "Jayashree",
    position: "Frontend developer",
    department:"IT/Technology",
    email: "jayashree@example.com",
    joinDate:"20-8-2024",
     status:"Active",
  },
  {
    id: "derv1ws0",
    employeeId:"ET005",
    name:"Pavithra Sundaram",
    position:"UI/UX designer",
    department:"IT/Technology",
    email: "pavithra@example.com",
    joinDate:"30-2-2025",
     status:"InActive",
  },
  {
    id: "5kma53ae",
    employeeId:"ET006",
    name:"Nisha Dhanasegaran",
    position : "Team Lead",
    department:"IT/Technology",
    email: "nisha@example.com",
    joinDate:"29-4-2025",
    status:"Active",
  },
  {
    id: "bhqecj4p",
    employeeId:"ET007",
    name:"Sagana",
    position:"Developer",
    department:"IT/Technology",
    email: "sagana@example.com",
    joinDate:"10-6-2025",
    status:"Active",
  },
]
export type Payment = {
  id: string
  employeeId: string
  name:string
  position: string
  department: string
  email: string
  joinDate:string
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
        aria-label="Select all" />
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
    accessorKey: "employeeId",
    header: "EmployeeId",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("employeeId")}</div>
    ),
  },
    {
  accessorKey: "name",
  header: () => <div className="text-left">Name</div>,
  cell: ({ row }) => {
    const name = row.getValue("name") as string
    return <div className="text-left font-medium">{name}</div>
  },
},
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
    {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("position")}</div>
    ),
  },
   {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "joinDate",
    header: "Join-Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("joinDate")}</div>
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
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
              </DialogHeader>
              <form className="grid gap-4">
               <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="personal">Advance Information</TabsTrigger>
                  </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                 <div className="grid gap-2">
                   <Label htmlFor="employeeID">EmployeeId</Label>
                    <Input id="employeeid" />
                 </div>
                  <div className="grid gap-2">
                    <Label htmlFor="empName">Employee Name</Label>
                     <Input id="empName" placeholder="Enter employee name" />
                  </div>
                  <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="@gmail.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phonenumber">Phone Number</Label>
                    <Input id="phonenumber" placeholder="Enter Phone Number" />
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                </div>
            </TabsContent>
        {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4 mt-4">
                 <div className="grid gap-4">
                 <Label>Gender</Label>
               <RadioGroup defaultValue="male" className="flex gap-6">
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
                </div>
                </RadioGroup>
                 </div>
                  <div className="grid gap-2">
                  <Label htmlFor="date" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                      id="date"
                      className=" justify-between font-normal" >
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
                      }}/>
                  </PopoverContent>
                  </Popover>
                </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergencynumber">Emergency Contact Number</Label>
                <Input id="emergencynumber" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bloodgroup">Blood-Group</Label>
                <Select>
                        <SelectTrigger id="bloodgroup" className="w-full h-10">
                            <SelectValue placeholder="Select Blood-Group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                        </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select>
                    <SelectTrigger id="nationality" className="w-full h-10">
                      <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                       </SelectContent>
                      </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="religion">Religion</Label>
                 <Select>
                    <SelectTrigger id="religion" className="w-full h-10">
                      <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="muslium">Muslium</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="marital status">Marital status</Label>
                {/* <Input id="marital status" /> */}
                <Select>
                    <SelectTrigger id="marital status" className="w-full h-10">
                      <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="unmarried">Unmarried</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
               <div className="grid gap-2">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <Input id="qualifiction" />
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number' />
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Input id="address" placeholder="Enter address" />
              </div>
             </TabsContent>
             </Tabs>
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
export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
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
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm" />
         <div className="flex items-center gap-2 ml-auto">
          <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto">+ Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] overflow-scroll">
                <DialogHeader>
                   <DialogTitle>Add Employee</DialogTitle>
                </DialogHeader>
              <form className="grid gap-4">
               { /*Basic information tab*/}
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="personal">Advance Information</TabsTrigger>
                  </TabsList>
                <TabsContent value="basic" className="space-y-4 mt-4">
                 <div className="grid gap-2">
                   <Label htmlFor="employeeID">EmployeeId</Label>
                    <Input id="employeeid" />
                 </div>
                  <div className="grid gap-2">
                    <Label htmlFor="empName">Employee Name</Label>
                     <Input id="empName" placeholder="Enter employee name" />
                  </div>
                  <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="@gmail.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phonenumber">Phone Number</Label>
                    <Input id="phonenumber" placeholder="Enter Phone Number" />
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                </div>
            </TabsContent>
        {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4 mt-4">
                 <div className="grid gap-4">
                 <Label>Gender</Label>
               <RadioGroup defaultValue="male" className="flex gap-6">
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
                </div>
                </RadioGroup>
                 </div>
                  <div className="grid gap-2">
                  <Label htmlFor="date" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                      id="date"
                      className=" justify-between font-normal" >
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
                      }}/>
                  </PopoverContent>
                  </Popover>
                </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergencynumber">Emergency Contact Number</Label>
                <Input id="emergencynumber" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bloodgroup">Blood-Group</Label>
                <Select>
                        <SelectTrigger id="bloodgroup" className="w-full h-10">
                            <SelectValue placeholder="Select Blood-Group" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                        </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Select>
                    <SelectTrigger id="nationality" className="w-full h-10">
                      <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                       </SelectContent>
                      </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="religion">Religion</Label>
                 <Select>
                    <SelectTrigger id="religion" className="w-full h-10">
                      <SelectValue placeholder="Select Religion" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="muslium">Muslium</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="marital status">Marital status</Label>
                {/* <Input id="marital status" /> */}
                <Select>
                    <SelectTrigger id="marital status" className="w-full h-10">
                      <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="unmarried">Unmarried</SelectItem>
                    </SelectContent>
                  </Select> 
              </div> 
               <div className="grid gap-2">
                <Label htmlFor="qualification">Educational Qualification</Label>
                <Input id="qualifiction" />
              </div> 
              <div className="grid gap-2">
                <Label htmlFor="experience">Work experience if any</Label>
                <Input id="experience" type='number' />
              </div>
              <div className="grid gap-2">
               <Label htmlFor="address">Address</Label>
               <Input id="address" placeholder="Enter address" />
              </div>
             </TabsContent>
             </Tabs>
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
          <TableHeader className=" bg-neutral-200">
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
                  className="h-24 text-center">
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
            disabled={!table.getCanPreviousPage()} >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()} >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
