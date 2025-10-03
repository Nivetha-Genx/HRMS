"use client"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreVertical, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem,DropdownMenuSeparator,} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import EditDesigTab from './editdesigTab.tsx'
import AddDesigTab from './AdddesigTab.tsx'
import { getDesignations } from '@/Services/ApiService'

// Designation data will be fetched dynamically

export type Employee = {
  empName: string
  deptName: string | null
}

export type Designation = {
  id: string
  desigId: string
  desigName: string
  employees: Employee[]
}

const createColumns = (onRefresh: () => void): ColumnDef<Designation>[] => [
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
    accessorKey: "desigName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Designation Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("desigName")}</div>,
  },
  {
    accessorKey: "employees",
    header: "Employees",
    cell: ({ row }) => {
      const employees = row.getValue("employees") as Employee[];
      return (
        <div className="max-w-xs">
          {employees && employees.length > 0 ? (
            <div className="space-y-1">
              {employees.slice(0, 3).map((emp: Employee, index: number) => (
                <div key={index} className="text-xs">
                  <div className="font-medium">{emp.empName}</div>
                  {emp.deptName && (
                    <div className="text-muted-foreground">Dept: {emp.deptName}</div>
                  )}
                </div>
              ))}
              {employees.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{employees.length - 3} more
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">No employees</div>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const designation = row.original
      const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
      
      const handleView = () => {
        setViewDialogOpen(true);
      };

      const handleEdit = () => {
        // Find and click the hidden edit button
        const hiddenEditButton = document.querySelector(`[data-desig-id="${designation.desigId}"] button`);
        if (hiddenEditButton) {
          (hiddenEditButton as HTMLButtonElement).click();
        }
      };

      const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${designation.desigName}" designation?`)) {
          try {
            // TODO: Implement delete API call
            console.log('Delete designation:', designation.desigId);
            onRefresh(); // Refresh the table after deletion
          } catch (error) {
            console.error('Error deleting designation:', error);
          }
        }
      };
      
      return (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleView}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Designation
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* View Details Modal */}
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Designation Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Designation Name:</span>
                  <span className="col-span-2">{designation.desigName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Employees:</span>
                  <span className="col-span-2">{designation.employees?.length || 0}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Employee List:</span>
                  <div className="col-span-2">
                    {designation.employees && designation.employees.length > 0 ? (
                      <div className="space-y-2">
                        {designation.employees.map((emp: Employee, index: number) => (
                          <div key={index} className="flex flex-col space-y-1">
                            <Badge variant="secondary" className="mr-1 mb-1 w-fit">
                              {emp.empName}
                            </Badge>
                            {emp.deptName && (
                              <span className="text-xs text-muted-foreground ml-1">
                                Department: {emp.deptName}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No employees assigned</span>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]

export function DesignationTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Designation[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchDesignations = React.useCallback(async () => {
    try {
      setLoading(true)
      const response = await getDesignations()
      
      // Handle both direct array response and wrapped response with data property
      const designationsData = Array.isArray(response) ? response : (response as any)?.data || []
      
      if (designationsData && Array.isArray(designationsData)) {
        const formattedData = designationsData.map((item: any) => ({
          id: item.desigId,
          desigId: item.desigId,
          desigName: item.desigName,
          employees: item.employees || []
        }))
        setData(formattedData)
      }
    } catch (error) {
      console.error('Error fetching designations:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchDesignations()
  }, [fetchDesignations])

  const columns = React.useMemo(() => createColumns(fetchDesignations), [fetchDesignations])

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

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading designations...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter designations..."
          value={(table.getColumn("desigName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("desigName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
        <AddDesigTab onRefresh={fetchDesignations} />
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
                  {/* Hidden edit trigger */}
                  <div data-desig-id={row.original.desigId} className="hidden">
                    <EditDesigTab designation={row.original} onRefresh={fetchDesignations} />
                  </div>
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
    </div>
  )
}
