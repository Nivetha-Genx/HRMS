"use client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import * as React from "react"
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
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {  ChevronDown, MoreHorizontal } from "lucide-react"

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
    employeeName:"Shivaji Maharaj",
    leaveType:"Medical Leave",
    from:"30-8-2025",
    to: "5-9-2025",
    numberofdays:"7 Days",
  },
  
  {
    id: "lhcej53d",
    employeeId:"ET002",
    employeeName:"Shivani Nachiyar",
    leaveType:"Casual Leave",
    from:"31-8-2025",
    to: "4-9-2025",
    numberofdays:"6 Days",
  },
    {
    id: "m5gr84i9",
    employeeId:"ET003",
    employeeName:"Akila Sri",
    leaveType:"Medical Leave",
    from:"25-8-2025",
    to: "29-8-2025",
    numberofdays:"5 Days",
 
  },
  {
    id: "3u1reuv4",
    employeeId:"ET004",
    employeeName: "Jayashree",
    leaveType:"Casual Leave",
    from:"6-9-2025",
    to: "8-9-2025",
    numberofdays:"3 Days",
  },
  {
    id: "derv1ws0",
    employeeId:"ET005",
    employeeName:"Pavithra Sundaram",
    leaveType:"Medical Leave",
    from:"7-8-2025",
    to: "8-9-2025",
    numberofdays:"2 Days",
  },
  {
    id: "5kma53ae",
    employeeId:"ET006",
    employeeName:"Nisha Dhanasegaran",
    leaveType:"Casual Leave",
    from:"10-9-2025",
    to: "15-9-2025",
    numberofdays:"6 Days",
  },
  {
    id: "bhqecj4p",
    employeeId:"ET007",
    employeeName:"Sagana",
    leaveType:"Casual Leave",
    from:"12-8-2025",
    to: "15-9-2025",
    numberofdays:"4 Days",
  },

]

export type Payment = {
  id: string
  employeeId: string
  employeeName:string
  leaveType: string
  from: string
  to: string
  numberofdays:string

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
  accessorKey: "employeeName",
  header: () => <div className="text-left">Employee Name</div>,
  cell: ({ row }) => {
    const employeeName = row.getValue("employeeName") as string
    return <div className="text-left font-medium">{employeeName}</div>
  },
},
{
    accessorKey: "leaveType",
    header: "Leave Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("leaveType")}</div>
    ),
  },
    {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("from")}</div>
    ),
  },
   {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("to")}</div>
    ),
  },
  {
    accessorKey: "numberofdays",
    header: "No of Days",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("numberofdays")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
      const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
      const [openFrom, setOpenFrom] = React.useState(false)
      const [openTo, setOpenTo] = React.useState(false)


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
                <DialogTitle>Edit Leave</DialogTitle>
                  <DialogDescription>
                      Edit leave details and click save
                  </DialogDescription>
              </DialogHeader>
              <form className="grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="employeeName">Employee Name</Label>
                      <Select>
                         <SelectTrigger id="employeeName" className="w-full h-10" >
                          <SelectValue placeholder="Select Employee Name" />
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
                  <Label htmlFor="leaveType">Leave Type</Label>
                      <Select>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                          <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="leaveType">Medical Leave</SelectItem>
                            <SelectItem value="leaveType">Casual Leave</SelectItem>  
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="from-date" className="px-1">
                    From Date
                  </Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="from-date"
                      className="justify-between font-normal">
                      {fromDate ? fromDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setFromDate(date)
                    setOpenFrom(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="date" className="px-1">
                   To Date
                  </Label>
                  <Popover open={openTo} onOpenChange={setOpenTo}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal">
                      {toDate ? toDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setToDate(date)
                    setOpenTo(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>

                </div>
                <div className="grid gap-2">
                  <Label htmlFor="numberofdays">No of Days</Label>
                      <Input id="numberofdays" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="to-date" className="px-1">
                     Reason
                  </Label>
                  <Input id="reason" />
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

export default function DataTable() {
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
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined)
  const [openFrom, setOpenFrom] = React.useState(false)
  const [openTo, setOpenTo] = React.useState(false)

  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("employeeName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
         <div className="flex items-center gap-2 ml-auto">
          <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-auto">+ Add Leave</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] gap-6">
                <DialogHeader>
                   <DialogTitle>Add Leave</DialogTitle>
                      <DialogDescription>
                           Fill in leave details and click add leave.
                      </DialogDescription>
                </DialogHeader>
              <form className="grid gap-8">
                <div className="grid gap-2">
                  <Label htmlFor="employeeName">Employee Name</Label>
                      <Select>
                         <SelectTrigger id="employeeName" className="w-full h-10">
                           <SelectValue placeholder="Select Employee Name" />
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
                  <Label htmlFor="leaveType">Leave Type</Label>
                      <Select>
                         <SelectTrigger id="leaveType" className="w-full h-10">
                           <SelectValue placeholder="Select Leave Type" />
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="leaveType">Medical Leave</SelectItem>
                            <SelectItem value="leaveType">Casual Leave</SelectItem>  
                         </SelectContent>
                    </Select>  
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="from-date" className="px-1">
                    From Date
                  </Label>
                  <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="from-date"
                      className="justify-between font-normal">
                      {fromDate ? fromDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setFromDate(date)
                    setOpenFrom(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="to-date" className="px-1">
                     To Date
                  </Label>
                  <Popover open={openTo} onOpenChange={setOpenTo}>
                  <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      id="to-date"
                      className="justify-between font-normal">
                      {toDate ? toDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                    setToDate(date)
                    setOpenTo(false)
                    }}
                    />
                  </PopoverContent>
                  </Popover>

                </div>
                <div className="grid gap-2">
                  <Label htmlFor="numberofdays">No of Days</Label>
                      <Input id="numberofdays" type="number" />
                </div>
                <div className="grid gap-2">
                      <Label htmlFor="to-date" className="px-1">
                     Reason
                  </Label>
                      <Input id="reason" />
                </div>
              <DialogFooter>
                  <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                  </DialogClose>
                     <Button type="submit">Add Leave</Button>
              </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
               <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                    Leave Type <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                  <DropdownMenuItem>Medical Leave</DropdownMenuItem>
                  <DropdownMenuItem>Casual Leave</DropdownMenuItem>
                  <DropdownMenuItem>Annual Leave</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
