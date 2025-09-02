"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {

  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  
} from "@tanstack/react-table"
import type{
      ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
    {
    id: "ghqej43k",
    employeeId:"ET001",
    name:{
      empname:"Shivaji Maharaj",
      avatar:"https://i.pravatar.cc/150?img=12"
    },
    position:"Manager",
    department:"IT/Technology",
    email: "shivaji@example.com",
    joinDate:"20-4-2024",
    salary:"60000",
    payslip:""
  },
  
  {
    id: "lhcej53d",
    employeeId:"ET002",
    name:{
      empname:"Shivani Nachiyar",
      avatar:"https://randomuser.me/api/portraits/women/45.jpg"
    },
    position:"Frontend developer",
    department:"IT/Technology",
    email: "shivani@example.com",
    joinDate:"20-5-2024",
    salary:"40000",
    payslip:""
  },
    {
    id: "m5gr84i9",
    employeeId:"ET003",
    name:{
      empname:"Akila Sri",
      avatar:"https://i.pravatar.cc/150?img=4"
    },
    position: "Backend developer",
    department:"IT/Technology",
    email: "akila@example.com",
    joinDate:"20-8-2024",
    salary:"40000",
    payslip:""
  },
  {
    id: "3u1reuv4",
    employeeId:"ET004",
    name: {
      empname:"Jayashree",
      avatar:"https://github.com/leerob.png"
    },
    position: "Frontend developer",
    department:"IT/Technology",
    email: "jayashree@example.com",
    joinDate:"30-2-2025",
    salary:"450000",
    payslip:""
  },
  {
    id: "derv1ws0",
    employeeId:"ET005",
    name:{
      empname:"Pavithra Sundaram",
      avatar:"https://i.pravatar.cc/150?img=2"
    },
    position:"UI/UX designer",
    department:"IT/Technology",
    email: "pavithra@example.com",
    joinDate:"29-4-2025",
    salary:"50000",
    payslip:""
  },
  {
    id: "5kma53ae",
    employeeId:"ET006",
    name:{
      empname:"Nisha Dhanasegaran",
      avatar:"https://i.pravatar.cc/150?img=12"
    },
    position : "Team Lead",
    department:"IT/Technology",
    email: "nisha@example.com",
    joinDate:"10-6-2025",
    salary:"350000",
    payslip:""
  },
  {
    id: "bhqecj4p",
    employeeId:"ET007",
    name:{
      empname:"Sagana",
      avatar:"https://randomuser.me/api/portraits/women/67.jpg"
    },
    position:"Developer",
    department:"IT/Technology",
    email: "sagana@example.com",
    joinDate:"19-4-2025",
    salary:"40000",
    payslip:""
  },

]

export type Payment = {
  id: string
  employeeId: string
  position: string
  department: string
  email: string
  joinDate:string
  salary:string
  payslip:string
  name: {
    empname: string
    avatar: string
  }
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
    const name = row.getValue("name") as {
      empname: string;
      avatar: string;
    };
    return <div className="text-left font-medium flex gap-2 ">
       <Avatar>
         <AvatarImage src={name.avatar} alt={name.empname} />
          <AvatarFallback>{name.empname.charAt(0)}</AvatarFallback>
       </Avatar>
          <span className="capitalize">{name.empname}</span></div>
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
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("salary")}</div>
    ),
  },
  {
    accessorKey: "payslip",
    header: "Payslip",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payslip")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

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
                  <DialogDescription>
                      Edit employee details and click save
                  </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeID">EmployeeId</Label>
                     <Input id="employeeid" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                      <Input id="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="@gmail.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dateofbirth">BirthDate</Label>
                      <Input id="email" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                      <Input id="position" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                      <Input id="department" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="joinDate">Join-Date</Label>
                      <Input id="joindate" />
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

export default function DataTableDemo() {
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

  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <div className="flex items-center gap-2 ml-auto">
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
                  <div className="grid gap-2">
                    <Label htmlFor="allowance">Allowance</Label>
                      <Input id="" />
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
    </div>
  )
}
