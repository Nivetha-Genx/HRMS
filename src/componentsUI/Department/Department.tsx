import {DepartmentTableDemo} from "../../components/ui/Department_Table"
import {IconBuilding } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {Card,} from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function Department() {
  return (
    <>
    <div className="flex flex-col mb-5">
      <SiteHeader title="Departments" />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
 
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                    <IconBuilding className="w-6 h-6 text-white" />
                </div>
              <div>
                  <p className="text-sm text-gray-500">Total Departments</p>
                  <p className="text-2xl font-bold text-gray-900">
                  12
                  {/* {stats.totalDepartments} */}
                  </p>
            </div>
            </div>
              <Badge className="bg-blue-100 text-blue-600 font-medium">+5.2%</Badge>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between p-4">
               <div className="flex items-center space-x-4">
                 <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600">
                   <IconBuilding className="w-6 h-6 text-white"  />
                 </div>
              <div>
                <p className="text-sm text-gray-500">Active Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {/* {stats.activeDepartments} */}
                  10
                  </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-600 font-medium">+2.1%</Badge>
            </div>
          </Card>

        <Card>
         <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
               <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600">
                  <IconBuilding className="w-6 h-6 text-white"  />
                </div>
            <div>
                <p className="text-sm text-gray-500">Department Heads</p>
                <p className="text-2xl font-bold text-gray-900">
                {/* {stats.departmentHeads} */}
                8
                </p>
            </div>
            </div>
              <Badge className="bg-purple-100 text-purple-600 font-medium">+1.5%</Badge>
            </div> 
        </Card>

        <Card>
           <div className="flex items-center justify-between p-4">
             <div className="flex items-center space-x-4">
               <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-600">
                  <IconBuilding className="w-6 h-6 text-white"  />
              </div>
              <div>
                <p className="text-sm text-gray-500">Employees</p>
                <p className="text-2xl font-bold text-gray-900">
                  {/* {stats.totalEmployees} */}
                  156
                  </p>
              </div>
              </div>
              <Badge className="bg-orange-100 text-orange-600 font-medium">+8.3%</Badge>
            </div>
          </Card>

        </div>
      </div>
    </div>
  </div>
  <div>
  <DepartmentTableDemo />
  </div>
  </>
  )
}
