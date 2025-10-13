
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreVertical, Eye, Edit, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { getEmployees, deleteEmployee } from "@/Services/ApiService"
import { useState,useEffect } from "react"
import { errorToast, successToast } from "@/lib/toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
export type Payment = {
  id: string
  employeeId: string
  name:string
  position: string
  department: string
  email: string
  mobile?: string
  joinDate:string
  status:string
  fullData?: any
}

// View Employee Details Component
function ViewEmployeeDetails({ employee, open, onOpenChange }: { employee: Payment, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!employee.fullData) return null
  
  const emp = employee.fullData
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">First Name</label>
                <p className={`text-sm ${!emp.firstName ? 'text-gray-500 font-bold' : ''}`}>{emp.firstName || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Name</label>
                <p className={`text-sm ${!emp.lastName ? 'text-gray-500 font-bold' : ''}`}>{emp.lastName || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className={`text-sm ${!emp.email ? 'text-gray-500 font-bold' : ''}`}>{emp.email || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Mobile</label>
                <p className={`text-sm ${!emp.mobile ? 'text-gray-500 font-bold' : ''}`}>{emp.mobile || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Department</label>
                <p className={`text-sm ${!emp.deptName ? 'text-gray-500 font-bold' : ''}`}>{emp.deptName || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Blood Group</label>
                <p className={`text-sm ${!emp.bloodGroup ? 'text-gray-500 font-bold' : ''}`}>{emp.bloodGroup || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Religion</label>
                <p className={`text-sm ${!emp.religion ? 'text-gray-500 font-bold' : ''}`}>{emp.religion || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Marital Status</label>
                <p className="text-sm">{emp.isMarried ? 'Married' : 'Single'}</p>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Address</label>
                <p className={`text-sm ${!emp.currentAddress ? 'text-gray-500 font-bold' : ''}`}>{emp.currentAddress || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Permanent Address</label>
                <p className={`text-sm ${!emp.permanentAddress ? 'text-gray-500 font-bold' : ''}`}>{emp.permanentAddress || '—'}</p>
              </div>
            </div>
          </div>
          
          {/* Emergency Contact */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Name</label>
                <p className={`text-sm ${!emp.relationName ? 'text-gray-500 font-bold' : ''}`}>{emp.relationName || '—'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Phone</label>
                <p className={`text-sm ${!emp.relationPhone ? 'text-gray-500 font-bold' : ''}`}>{emp.relationPhone || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
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
    cell: ({ row }) => {
      const email = row.getValue("email") as string
      return <div className={`lowercase ${email === '—' ? 'text-gray-500 font-bold' : ''}`}>{email}</div>
    },
  },
    {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => {
      const mobile = row.getValue("mobile") as string
      return <div className={mobile === '—' ? 'text-gray-500 font-bold' : ''}>{mobile}</div>
    },
  },
   {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.getValue("department") as string
      return <div className={`capitalize ${department === '—' ? 'text-gray-500 font-bold' : ''}`}>{department}</div>
    },
  },
  
 
]
export function DataTableDemo() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Fetch employees data function
  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const employeeData = await getEmployees()
      
      // Check if response is valid and has data
      if (!Array.isArray(employeeData)) {
        console.error("Invalid response format:", employeeData)
        errorToast("API Error", "Invalid API response format.")
        setEmployees([])
        return
      }
      
      // Transform API response to match Payment interface
      const transformedData: Payment[] = employeeData.map((emp: any) => ({
        id: emp.empId || emp.id || emp.employeeId,
        employeeId: emp.empId || emp.employeeId || emp.id,
        name: `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Unknown',
        position: emp.position || emp.designation || '—',
        department: emp.deptName || emp.department || '—',
        email: emp.email || '—',
        mobile: emp.mobile || '—',
        joinDate: emp.joinDate || emp.joiningDate || '—',
        status: emp.status || emp.isActive ? 'Active' : 'Inactive',
        // Store full employee data for view details
        fullData: emp
      }))
      
     
      setEmployees(transformedData)
    } catch (error) {
     
      errorToast("Error loading employees", "Failed to load employee data")
      setEmployees([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  // Load employees on component mount
  useEffect(() => {
    fetchEmployees()
  }, [])

  // Create columns with access to fetchEmployees
  const columnsWithActions: ColumnDef<Payment>[] = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        const [viewDialogOpen, setViewDialogOpen] = React.useState(false)
        
        const handleView = () => {
          setViewDialogOpen(true)
        }
        
        const handleEdit = () => {
          navigate(`/add-employee?edit=${payment.employeeId}`)
        }
        
        const handleDelete = async () => {
          if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
              await deleteEmployee(payment.employeeId)
              successToast('Employee deleted successfully')
              fetchEmployees() // Refresh the table
            } catch (error) {
              errorToast('Failed to delete employee')
            }
          }
        }
        
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
                  Edit Employee
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
            
            <ViewEmployeeDetails 
              employee={payment} 
              open={viewDialogOpen} 
              onOpenChange={setViewDialogOpen} 
            />
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: employees,
    columns: columnsWithActions,
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
    return <div className="text-center py-6">Loading employees...</div>
  }


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
            <Button 
              onClick={() => navigate('/add-employee')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              + Add New
            </Button>

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
