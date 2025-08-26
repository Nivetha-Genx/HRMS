
import {DataTableDemo} from "@/components/ui/emptab"
import {IconUsersGroup } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
} from "@/components/ui/card"



export default function Employee() {
  return (
    <>
    
    <div className="flex flex-col mb-5">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
 
  <Card>
    <div className="flex items-center">
      <div className="flex items-center justify-center mx-4 w-12 h-12 rounded-full bg-gray-800">
        <IconUsersGroup className="w-6 h-6 text-white"  />
      </div>
      <div>
        <p className="text-sm text-gray-500">Total Employee</p>
        <p className="text-2xl font-bold text-gray-900">250</p>
      </div>
    <div><Badge className="bg-pink-300 text-pink-500 font-medium ml-30">+19.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div className="flex items-center justify-center mx-4 w-12 h-12 rounded-full bg-green-800">
        <IconUsersGroup className="w-6 h-6 text-white"  />
      </div>
      <div>
        <p className="text-sm text-gray-500">Active</p>
        <p className="text-2xl font-bold text-gray-900">210</p>
      </div>
    <div><Badge className="bg-orange-300 text-orange-500 font-medium ml-43">+19.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div className="flex items-center justify-center mx-4 w-12 h-12 rounded-full bg-red-800">
        <IconUsersGroup className="w-6 h-6 text-white"  />
      </div>
      <div>
        <p className="text-sm text-gray-500">InActive</p>
        <p className="text-2xl font-bold text-gray-900">10</p>
      </div>
    <div><Badge className="bg-gray-300 text-gray-500 font-medium ml-42">+19.01%</Badge></div> </div>
  </Card>

  <Card>
    <div className="flex items-center">
      <div className="flex items-center justify-center mx-4 w-12 h-12 rounded-full bg-blue-600">
        <IconUsersGroup className="w-6 h-6 text-white"  />
      </div>
      <div>
        <p className="text-sm text-gray-500">New Joiners</p>
        <p className="text-2xl font-bold text-gray-900">30</p>
      </div>
    <div><Badge className="bg-blue-300 text-blue-500 font-medium ml-36">+19.01%</Badge></div> </div>
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
