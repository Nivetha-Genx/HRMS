"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import * as React from "react"
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table"
import type{ColumnDef,ColumnFiltersState,SortingState,VisibilityState,} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import ProjectCard from "./projectGrid"
import Edit from '../Projects/Edit'
import Add from '../Projects/Add'
import { SiteHeader } from "@/components/site-header"

const data: Payment[] = [
    {
    id: "ghqej43k",
    projectId:"PRO-001",
    projectName:"Office management App",
    leader: {
    name: "Shivaji Maharaj",
    avatar: "https://i.pravatar.cc/150?img=12"},
    team: [
      { name: "John Doe", avatar: "https://github.com/shadcn.png" },
      { name: "Jane Smith", avatar: "https://github.com/evilrabbit.png" },
      { name: "Sam Lee", avatar: "https://github.com/leerob.png" },
    ],
    priority: "High",
    deadLine:"20-9-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-002",
    projectName:"Clinic Management",
    leader: {
        name: "shivani Nachiyar",
        avatar:"https://github.com/evilrabbit.png"},
    team: [
      { name: "John Doe", avatar: "https://github.com/leerob.png" },
      { name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
      { name: "Sam Lee", avatar: "https://github.com/evilrabbit.png" },
    ],
    priority: "Low",
    deadLine:"20-12-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-003",
    projectName:"Educational Platform",
    leader:{
        name:"Jayashree",
        avatar: "https://i.pravatar.cc/150?img=2"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Medium",
    deadLine:"20-10-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-004",
    projectName:"Travel Planning Website",
    leader: {
        name:"sagana",
        avatar:"https://i.pravatar.cc/150?img=4"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=3" },
    ],
    priority: "High",
    deadLine:"30-9-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-005",
    projectName:"Hotel Booking App",
    leader:{
        name:"Pavithra",
        avatar:"https://github.com/leerob.png" },
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Low",
    deadLine:"20-12-2025",
    status:"InActive",
  },
  {
    id: "lhcej53d",
    projectId:"PrO-006",
    projectName:"Food Order App",
    leader:{
        name:"Nisha Danasegaran",
        avatar:"https://i.pravatar.cc/150?img=4"},
    team: [
      { name: "John Doe", avatar: "https://github.com/leerob.png" },
      { name: "Jane Smith", avatar: "https://github.com/leerob.png" },
      { name: "Sam Lee", avatar: "https://github.com/leerob.png" },
    ],
    priority: "medium",
    deadLine:"20-11-2025",
    status:"Active",
  },
  {
    id: "lhcej53d",
    projectId:"PRO-007",
    projectName:"Service Booking Software",
    leader: {
        name:"Akila Sri",
        avatar:"https://github.com/leerob.png"},
    team: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=3" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "Sam Lee", avatar: "https://i.pravatar.cc/150?img=5" },
    ],
    priority: "Low",
    deadLine:"20-2-2026",
    status:"InActive",
  },
]

export type TeamMember = {
  name: string
  avatar: string
} 
export type Payment = {
  id: string
  projectId: string
  projectName:string
  leader:{
    name:string
    avatar:string
  }
  team: TeamMember[]
  priority: string
  deadLine:string
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
    accessorKey: "projectId",
    header: "ProjectId",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("projectId")}</div>
    ),
  },
    {
  accessorKey: "projectName",
  header: () => <div className="text-left">Project Name</div>,
  cell: ({ row }) => {
    const projectName = row.getValue("projectName") as string
    return <div className="text-left font-medium">{projectName}</div>
  },
},
   {
  accessorKey: "leader",
  header: "Leader",
  cell: ({ row }) => {
    const leader = row.original.leader as { name: string; avatar: string }

    return (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={leader.avatar} alt={leader.name} />
          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="capitalize">{leader.name}</span>
      </div>
    )
  },
},
 {
  accessorKey: "team",
  header: "Team Members",
  cell: ({ row }) => {
    const team = row.getValue("team") as { name: string; avatar: string }[]

    return (
      <div className="flex -space-x-2">
        {team.map((member, index) => (
          <Avatar key={index} className="border-2 border-white">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ))}
         <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
          </Badge>
      </div>
    )
  },
 },
   {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("priority")}</div>
    ),
  },
  {
    accessorKey: "deadLine",
    header: "Deadline",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("deadLine")}</div>
    ),
  },
  {
   accessorKey: "status",
   header: "Status",
   cell: ({ row }) => {
    const status = row.getValue("status") as string;
    let textColor = "";

    switch (status.toLowerCase()) {
      case "active":
        textColor = "text-green-700 font-semibold";
        break;
      case "inactive":
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
  cell: ({ row }) => {
    const project = row.original
    return <Edit projectId={project.projectId} onSuccess={() => window.location.reload()} />
  },
}

]
export default function Projects() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({})
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
      <SiteHeader title="Projects" />
    <div className="w-full max-w mx-auto px-5 ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Project Names..."
          value={(table.getColumn("projectName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("projectName")?.setFilterValue(event.target.value)
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
          <TableHeader  className=" bg-neutral-200">
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
      <div><ProjectCard /></div>
    </div>
    </div>
  )
}

