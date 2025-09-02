import {IconUsersGroup } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card } from "@/components/ui/card"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { DataTableDemo } from "./Datatable"
  
export default function Attendance(){
  return (
    <>
          <div className="flex flex-col mb-5">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <h2 className="mx-5 my-2 font-medium">Attendance Details Today</h2>
                <p className="mx-5">Data from the 250+ total no of employees</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
                
  <Card>
    <div className="flex items-center">
      <div className="ms-5">
        <p className="text-sm text-gray-500 font-medium">Present</p>
        <p className="text-2xl font-bold text-gray-900">230</p>
      </div>
    <div><Badge className ="bg-emerald-600 text-white font-medium ml-55">
        <IconTrendingUp />
        +1.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div  className="ms-5">
        <p className="text-sm text-gray-500 font-medium">uninformed</p>
        <p className="text-2xl font-bold text-gray-900">10</p>
      </div>
    <div><Badge className="bg-red-800 text-white font-medium ml-48">
       <IconTrendingDown />
       -12.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div  className="ms-5">
        <p className="text-sm text-gray-500 font-medium">Permission</p>
        <p className="text-2xl font-bold text-gray-900">03</p>
      </div>
    <div><Badge className="bg-emerald-600 text-white font-medium ml-50">
       <IconTrendingUp />
       +1.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div  className="ms-5">
        <p className="text-sm text-gray-500 font-medium">Absent</p>
        <p className="text-2xl font-bold text-gray-900">12</p>
      </div>
    <div><Badge className="bg-red-800 text-white font-medium ml-55">
       <IconTrendingDown />
       -19.01%</Badge></div> </div>
  </Card>

</div>
     </div>
     </div>
    </div>
    <div>
      <DataTableDemo />
    </div>
    </>
  )
}


