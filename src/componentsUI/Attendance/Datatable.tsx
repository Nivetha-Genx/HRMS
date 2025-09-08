"use client"
import * as React from "react"
import {  flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState} from "@tanstack/react-table"
import { ChevronDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import Edit from '../Attendance/Edit'
import Day from '../Attendance/Day'

const data: Payment[] = [
    {
    id: "ghqej43k",
    employeeId:"ET001",
    name:"Shivaji Maharaj",
    status:"Present",
    checkIn:"09.00 AM",
    checkOut:"04.45 PM",
    break: "30 Min",
    productionHours:"8.55 Hrs",
  },
  
  {
    id: "lhcej53d",
    employeeId:"ET002",
    name:"Shivani Nachiyar",
    status:"Present",
    checkIn:"09.02 AM",
    checkOut:"06.12 PM",
    break: "20 Mins",
    productionHours:"7.54 Hrs",
  },
    {
    id: "m5gr84i9",
    employeeId:"ET003",
    name:"Akila Sri",
    status:"Present",
    checkIn:"09.00 AM",
    checkOut:"06.15 PM",
    break: "50 Mins",
    productionHours:"8.54 Hrs",
  },
  {
    id: "3u1reuv4",
    employeeId:"ET004",
    name: "Jayashree",
    status:"Present",
    checkIn:"09.09 AM",
    checkOut:"06.30 PM",
    break: "20 Mins",
    productionHours:"8.54 Hrs",
  },
  {
    id: "derv1ws0",
    employeeId:"ET005",
    name:"Pavithra Sundaram",
    status:"Absent",
    checkIn:" ",
    checkOut:" ",
    break: " ",
    productionHours:" ",
  },
  {
    id: "5kma53ae",
    employeeId:"ET006",
    name:"Nisha Dhanasegaran",
    status:"Present",
    checkIn:"09.10 AM",
    checkOut:"07.12 PM",
    break: "35 Mins",
    productionHours:"7.54 Hrs",
  },
  {
    id: "bhqecj4p",
    employeeId:"ET007",
    name:"Sagana",
    status:"Absent",
    checkIn:" ",
    checkOut:" ",
    break: " ",
    productionHours:" ",
  },

]

export type Payment = {
  id: string
  employeeId: string
  name:string
  status:string
  checkIn: string
  checkOut: string
  break: string
  productionHours:string
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
    const name = row.getValue("name") as string
    return <div className="text-left font-medium">{name}</div>
  },
},

  {
   accessorKey: "status",
   header: "Status",
   cell: ({ row }) => {
    const status = row.getValue("status") as string;
    let textColor = "";

    switch (status.toLowerCase()) {
      case "present":
        textColor = "text-green-700 font-semibold";
        break;
      case "absent":
        textColor = "text-red-700 font-semibold";
        break;
      default:
        textColor = "text-gray-700";
    }
    return <div className={`capitalize ${textColor}`}>{status}</div>;
  },
},
  {
  accessorKey: "checkIn",
  header: () => <div className="text-left">CkeckIn</div>,
  cell: ({ row }) => {
    const checkIn = row.getValue("checkIn") as string
    return <div className="text-left">{checkIn}</div>
  },
},
   {
  accessorKey: "checkOut",
  header: () => <div className="text-left">CheckOut</div>,
  cell: ({ row }) => {
    const checkOut = row.getValue("checkOut") as string
    return <div className="text-left">{checkOut}</div>
  },
},
   {
    accessorKey: "break",
    header: "Break",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("break")}</div>
    ),
  },
  {
    accessorKey: "productionHours",
    header: "Production Hours",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productionHours")}</div>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //    const payment = row.original
  //    return (
  //     <Edit />
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

  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex gap-5 items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <div className="flex items-center gap-2">
          <Day table={table}  />
        </div>
        <div className="flex items-center gap-2 ml-auto">
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
