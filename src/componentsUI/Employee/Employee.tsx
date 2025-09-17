
import {DataTableDemo} from "@/components/ui/emptab"
import {IconUsersGroup } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {Card,} from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
// import { useState,useEffect } from "react"
// import type { cardemp } from "@/Services/type"
// import { getcardemp } from "@/Services/EmployeeService"
// import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"


export default function Employee() {
//   const [stats, setStats] = useState<cardemp | null>(null);

//    useEffect(() => {
//      getcardemp()
//      .then((data) => setStats(data))
//      .then(() => successToast("Employee data loaded", ""))
//      .then(() => infoToast("Info", "Employee data is up to date"))
//      .then(() => warningToast("Warning", "Check your employee settings"))
//      .catch(() => errorToast("Error", "Failed to load employee data"))
//      .then((data) => console.log("Dashboard data:", data))
//       .catch((err) => console.error("Error fetching dashboard:", err));
//    }, []);

//  if (!stats) {
//     return <div className="text-center">Loading...</div>;
//   }
  return (
    <>
    <div className="flex flex-col mb-5">
      <SiteHeader title="Employees" />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
 
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
                    <IconUsersGroup className="w-6 h-6 text-white" />
                </div>
              <div>
                  <p className="text-sm text-gray-500">Total Employee</p>
                  <p className="text-2xl font-bold text-gray-900">
                  250
                  {/* {stats.totalEmployee} */}
                  </p>
            </div>
            </div>
              <Badge className="bg-pink-100 text-pink-600 font-medium">+19.01%</Badge>
            </div>
          </Card>


            <Card>
             <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                   <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-800">
                      <IconUsersGroup className="w-6 h-6 text-white"  />
                    </div>
                <div>
                    <p className="text-sm text-gray-500">Active</p>
                    <p className="text-2xl font-bold text-gray-900">
                    {/* {stats.active} */}
                    210
                    </p>
                </div>
                </div>
                  <Badge className="bg-orange-300 text-orange-500 font-medium">+19.01%</Badge>
                </div> 
            </Card>

            <Card>
               <div className="flex items-center justify-between p-4">
                 <div className="flex items-center space-x-4">
                   <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-800">
                      <IconUsersGroup className="w-6 h-6 text-white"  />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">InActive</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {/* {stats.inactive} */}
                      10
                      </p>
                  </div>
                  </div>
                  <Badge className="bg-gray-300 text-gray-500 font-medium">+19.01%</Badge>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between p-4">
                   <div className="flex items-center space-x-4">
                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                       <IconUsersGroup className="w-6 h-6 text-white"  />
                     </div>
                  <div>
                    <p className="text-sm text-gray-500">New Joiners</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {/* {stats.newJoiners} */}
                      30
                      </p>
                  </div>
                </div>
                <Badge className="bg-blue-300 text-blue-500 font-medium">+19.01%</Badge>
                </div>
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
