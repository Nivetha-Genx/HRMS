"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu, DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
// import axios from "axios"
import Edit from '../Payroll/Edit'
import Add from '../Payroll/Add'
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "@/components/site-header"

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
      avatar:"https://randomuser.me/api/portraits/women/67.jpg"
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
    salary:"45000",
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
    salary:"35000",
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
  accessorFn: (row) => row.name.empname,  
  id: "name",                             
  header: () => <div className="text-left">Name</div>,
  cell: ({ row }) => {
    const { empname, avatar } = row.original.name;
    return (
      <div className="text-left font-medium flex gap-2">
        <Avatar>
          <AvatarImage src={avatar} alt={empname} />
          <AvatarFallback>{empname.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="capitalize">{empname}</span>
      </div>
    );
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
//   {
//   accessorKey: "payslip",
//   header: "Payslip",
//   cell: ({ row }) => {
//     const employee = row.original;

//     const handleGeneratePayslip = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/payslip/generate",
//           { employeeId: employee.employeeId }, 
//           { responseType: "blob" }
//         );

//         const blob = new Blob([res.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         window.open(url);
//         setTimeout(() => window.URL.revokeObjectURL(url), 10000);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     return (
//       <button
//         onClick={handleGeneratePayslip}
//         className="px-3 py-1 bg-[#3E8EDF] text-white rounded hover:bg-[#0b78e6]"
//       >
//         Generate Payslip
//       </button>
//     );
//   },
// },


{
  accessorKey: "payslip",
  header: "Payslip",
  cell: ({ row }) => {
    const employee = row.original;
    const navigate = useNavigate();

    const handlePreviewPayslip = () => {
      navigate("/payslip", { state: { employee } });
    };
    // const handlePreview = () => navigate("/payslip", { state: { employeeId: row.original.employeeId } });

    return (
      <button
        onClick={handlePreviewPayslip}
        className="px-3 py-1 bg-[#3E8EDF] text-white rounded hover:bg-[#0b78e6]"
      >
        Generate Payslip
      </button>
    );
  },
},

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original
  //     return (
  //       <Edit />
  //     )
  //   },
  // },
  {
   id: "actions",
   enableHiding: false,
   cell: () => {
     return <Edit />;
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
     <div className="flex flex-col mb-5">
        <SiteHeader title="Payroll" />
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
            <Add />
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
    </div>
  )
}
