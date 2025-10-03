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
import EditDeptTab from './editdepttab'
import AddDeptTab from './Adddepttab'
import { getDepartments } from '@/Services/ApiService'

// Department data will be fetched dynamically

export type Department = {
  id: string
  deptId: string
  deptName: string
  deptHeadName: string
  employees: any[]
}

const createColumns = (onRefresh: () => void): ColumnDef<Department>[] => [
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
    accessorKey: "deptName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("deptName")}</div>,
  },
  {
    accessorKey: "deptHeadName",
    header: "Department Head",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deptHeadName")}</div>
    ),
  },
  {
    accessorKey: "employees",
    header: "Employees Count",
    cell: ({ row }) => {
      const employees = row.getValue("employees") as any[];
      return <div className="text-center">{employees?.length || 0}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const department = row.original
      const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
      
      const handleView = () => {
        setViewDialogOpen(true);
      };

      const handleEdit = () => {
        // Find and click the hidden edit button
        const hiddenEditButton = document.querySelector(`[data-dept-id="${department.deptId}"] button`);
        if (hiddenEditButton) {
          (hiddenEditButton as HTMLButtonElement).click();
        }
      };

      const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${department.deptName}" department?`)) {
          try {
            // TODO: Implement delete API call
            console.log('Delete department:', department.deptId);
            onRefresh(); // Refresh the table after deletion
          } catch (error) {
            console.error('Error deleting department:', error);
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
                Edit Department
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
                <DialogTitle>Department Details</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Department Name:</span>
                  <span className="col-span-2 font-semibold">{department.deptName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Department Head:</span>
                  <span className="col-span-2">{department.deptHeadName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Employee Count:</span>
                  <Badge variant="secondary" className="w-fit">
                    {department.employees?.length || 0} employees
                  </Badge>
                </div>
               
              </div>
            </DialogContent>
          </Dialog>

          {/* Hidden Edit Department Component */}
          <div 
            data-dept-id={department.deptId}
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          >
            <EditDeptTab 
              departmentId={department.deptId} 
              onSuccess={onRefresh}
            />
          </div>
        </div>
      )
    },
  },
]

export function DepartmentTableDemo() {
  const [data, setData] = React.useState<Department[]>([])
  const [loading, setLoading] = React.useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Fetch departments when component mounts
  React.useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      console.log('Fetching departments using ApiService...');
      
      try {
        // Try to use the API service first
        const result = await getDepartments();
        console.log('Department API Response:', result);
        
        // Handle both direct array and wrapped response
        const departmentArray = (result as any)?.data || result;
        const departmentData = Array.isArray(departmentArray) ? departmentArray.map((dept: any) => ({
          id: dept.deptId,
          deptId: dept.deptId,
          deptName: dept.deptName,
          deptHeadName: dept.deptHeadName,
          employees: dept.employees || []
        })) : [];
        
        setData(departmentData);
      } catch (apiError) {
        console.warn('Department API endpoint not available, using mock data:', apiError);
        
        // Fallback to mock data when API is not available
        const mockDepartments = [
          {
            id: "dept001",
            deptId: "5e6019b4-6fda-4333-b169-8a9529e4dd34",
            deptName: "Information Technology",
            deptHeadName: "John Doe",
            employees: []
          },
          {
            id: "dept002", 
            deptId: "7f8029c5-8feb-5444-c27a-9b0630f5ee45",
            deptName: "Human Resources",
            deptHeadName: "Jane Smith",
            employees: []
          },
          {
            id: "dept003",
            deptId: "9g9039d6-9fec-6555-d38b-ac1741g6ff56", 
            deptName: "Finance",
            deptHeadName: "Mike Johnson",
            employees: []
          },
          {
            id: "dept004",
            deptId: "ah1049e7-afed-7666-e49c-bd2852h7gg67",
            deptName: "Marketing",
            deptHeadName: "Sarah Wilson",
            employees: []
          },
        ];
        
        setData(mockDepartments);
        console.log('Using mock department data:', mockDepartments);
      }
    } catch (err) {
      console.error('Error fetching departments:', err);
      // Set empty data on error to show "No results" instead of loading forever
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo(() => createColumns(fetchDepartments), []);

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
      <div className="w-full max-w mx-auto px-5 py-8">
        <div className="text-center">Loading departments...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter department names..."
          value={(table.getColumn("deptName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("deptName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm" />
         <div className="flex items-center gap-2 ml-auto">
            <AddDeptTab onSuccess={fetchDepartments} />

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
