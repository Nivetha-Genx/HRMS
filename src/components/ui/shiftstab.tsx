"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { AddShiftDialog } from "@/components/ui/AddshiftsTab"
import { EditShiftDialog } from "@/components/ui/editshiftsTab"
import { ViewShiftDialog } from "@/components/ui/ViewshiftsTab"

export type Shift = {
  shiftId: string
  shiftName: string
  shiftStartTiming: string
  shiftEndTiming: string
  employees: any[]
}

// API functions
const API_BASE_URL = "https://localhost:7271/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "accept": "*/*"
  }
}

const fetchAllShifts = async (): Promise<Shift[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Shift/Get-All-Shifts`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result.data || []
  } catch (error) {
    console.error("Error fetching shifts:", error)
    toast.error("Failed to fetch shifts")
    return []
  }
}

const deleteShift = async (shiftId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Shift/Delete-shift-${shiftId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    toast.success("Shift deleted successfully")
    return true
  } catch (error) {
    console.error("Error deleting shift:", error)
    toast.error("Failed to delete shift")
    return false
  }
}

export const columns: ColumnDef<Shift>[] = [
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
    accessorKey: "shiftName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shift Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("shiftName")}</div>
    ),
  },
  {
    accessorKey: "shiftStartTiming",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("shiftStartTiming")}</div>
    ),
  },
  {
    accessorKey: "shiftEndTiming",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("shiftEndTiming")}</div>
    ),
  },
  {
    accessorKey: "employees",
    header: "Employees",
    cell: ({ row }) => {
      const employees = row.getValue("employees") as any[]
      return (
        <Badge variant="secondary">
          {employees?.length || 0} employees
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const shift = row.original
      const [editDialogOpen, setEditDialogOpen] = useState(false)
      const [viewDialogOpen, setViewDialogOpen] = useState(false)

      const handleDelete = async () => {
        const success = await deleteShift(shift.shiftId)
        if (success) {
          // Refresh the table data
          const meta = table.options.meta as any
          if (meta?.refreshData) {
            meta.refreshData()
          }
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                Edit shift
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600"
              >
                Delete shift
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ViewShiftDialog
            shift={shift}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />
          
          <EditShiftDialog
            shift={shift}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSuccess={() => {
              const meta = table.options.meta as any
              if (meta?.refreshData) {
                meta.refreshData()
              }
            }}
          />
        </>
      )
    },
  },
]

export function ShiftsTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const refreshData = async () => {
    setLoading(true)
    const shifts = await fetchAllShifts()
    setData(shifts)
    setLoading(false)
  }

  useEffect(() => {
    refreshData()
  }, [])

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
    meta: {
      refreshData,
    },
  })

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading shifts...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter shifts..."
            value={(table.getColumn("shiftName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("shiftName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Shift
          </Button>
        </div>
      </div>
      <div className="rounded-md border-border border">
        <Table>
          <TableHeader>
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
                  No shifts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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

      <AddShiftDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={refreshData}
      />
    </div>
  )
}
