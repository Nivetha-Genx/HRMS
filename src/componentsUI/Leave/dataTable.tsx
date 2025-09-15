"use client"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import {  ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import Edit from '../Leave/Edit'
import Add from '../Leave/Add'
// import type { addleave } from "@/Services/type"
// import { getLeaves } from "@/Services/LeaveService"
// import { useEffect } from "react"
// import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"
// import { se } from "date-fns/locale"

const data: Payment[] = [
    {
    id: "ghqej43k",
    employeeId:"ET001",
    employeeName:"Shivaji Maharaj",
    leaveType:"Medical Leave",
    from:"30-8-2025",
    to: "5-9-2025",
    numberofdays:"7 Days",
    status:"Approved"
  },
  {
    id: "lhcej53d",
    employeeId:"ET002",
    employeeName:"Shivani Nachiyar",
    leaveType:"Casual Leave",
    from:"31-8-2025",
    to: "4-9-2025",
    numberofdays:"6 Days",
    status:"Rejected"
  },
    {
    id: "m5gr84i9",
    employeeId:"ET003",
    employeeName:"Akila Sri",
    leaveType:"Medical Leave",
    from:"25-8-2025",
    to: "29-8-2025",
    numberofdays:"5 Days",
    status:"Approved"
  },
  {
    id: "3u1reuv4",
    employeeId:"ET004",
    employeeName: "Jayashree",
    leaveType:"Casual Leave",
    from:"6-9-2025",
    to: "8-9-2025",
    numberofdays:"3 Days",
    status:"Rejected"
  },
  {
    id: "derv1ws0",
    employeeId:"ET005",
    employeeName:"Pavithra Sundaram",
    leaveType:"Medical Leave",
    from:"7-8-2025",
    to: "8-9-2025",
    numberofdays:"2 Days",
    status:"pending"
  },
  {
    id: "5kma53ae",
    employeeId:"ET006",
    employeeName:"Nisha Dhanasegaran",
    leaveType:"Casual Leave",
    from:"10-9-2025",
    to: "15-9-2025",
    numberofdays:"6 Days",
    status:"pending"
  },
  {
    id: "bhqecj4p", 
    employeeId:"ET007",
    employeeName:"Sagana",
    leaveType:"Casual Leave",
    from:"12-8-2025",
    to: "15-9-2025",
    numberofdays:"4 Days",
    status:"Approved"
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
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("status")}</div>
  //   ),
  // },
  {
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => {
    const status = row.getValue("status") as string;
    let textColor = "";

    switch (status.toLowerCase()) {
      case "approved":
        textColor = "text-green-700 font-semibold";
        break;
      case "pending":
        textColor = "text-yellow-700 font-semibold";
        break;
      case "rejected":
        textColor = "text-red-700 font-semibold";
        break;
      default:
        textColor = "text-gray-700";
    }

    return <div className={`capitalize ${textColor}`}>{status}</div>;
  },
},
{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const emp = row.original
    return <Edit employeeId={emp.employeeId} onSuccess={() => window.location.reload()} />
  },
},

]

export default function DataTable() {
  //   const [data, setData] = React.useState<addleave[]>([])
  // const [loading, setLoading] = React.useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try { 
  //      const leaves = await getLeaves(); 
  //      setData(leaves);
  //       successToast("Leave data loaded successfully", "")
  //       infoToast("Info", "Leave data is up to date")
  //       warningToast("Warning", "Check your leave settings")
  //     } catch (error) {
  //       console.error(" Failed to fetch employees:", error)
  //       errorToast("Failed to load leave data", "")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchData()
  // }, [])

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
  //  if (loading) {
  //   return <div className="text-center py-6">Loading leave data...</div>
  // }

  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex flex-wrap items-center gap-4 py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("employeeName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="w-full sm:max-w-sm"
        />
         <div className="flex items-center gap-2 ml-auto">
            <Add />
             
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline"  className="flex items-center gap-1">
                    Leave Type <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" >
                  <DropdownMenuItem
                      onClick={() => {
                              table.getColumn("leaveType")?.setFilterValue("Medical Leave")
                             }}
                             > Medical Leave</DropdownMenuItem>
                  <DropdownMenuItem
                      onClick={() => {
                              table.getColumn("leaveType")?.setFilterValue("Casual Leave")
                              }}
                              >Casual Leave</DropdownMenuItem>
                 <DropdownMenuItem
                     onClick={() => {
                              table.getColumn("leaveType")?.setFilterValue("Annual Leave")
                              }}
                              >Annual Leave</DropdownMenuItem>
                  <DropdownMenuItem
                      onClick={() => {
                              table.getColumn("leaveType")?.setFilterValue(undefined)
                              }}
                              >Show All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline"className="flex items-center gap-1">
                    Columns <ChevronDown className="w-4 h-4"/>
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
