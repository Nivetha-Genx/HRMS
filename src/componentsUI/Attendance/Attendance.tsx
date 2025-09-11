import { Badge } from "@/components/ui/badge"
import {Card } from "@/components/ui/card"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { DataTableDemo } from "./Datatable"
import { SiteHeader } from "@/components/site-header"
// import { useState,useEffect } from "react"
// import { getAttendance } from "@/Services/AttendanceService"
// import type { attendance } from "@/Services/type"
  // import { toast } from "react-toastify"

export default function Attendance(){
  // const [stats, setStats] = useState<attendance| null>(null);

  //  useEffect(() => {
  //     const fetchData = async () => {
  //     try {
  // //     const data = await getAttendance();
  //        toast.success("Attendance data loaded successfully")  
  //     setStats(data);
  //     } catch (err) {
  //     console.error("Error fetching dashboard:", err);
  //     toast.error("Failed to load attendance data"); 
  //   }
  // };

  // fetchData();
  // }, []);

  // if (!stats) {
  //   return <div className="text-center">Loading...</div>;
  // }

  return (
    <>
      <div className="flex flex-col mb-5">
          <SiteHeader title="Attendance" />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <p className="mx-5">  
                {/* {stats.totalEmployee} */}
                Data from the 250+ total no of employees</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
                
            <Card>
               <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Present</p>
                    <p className="text-2xl font-bold text-gray-900">
                    {/* {stats.present} */}
                    225
                    </p>
                  </div>
                 <Badge className="flex items-center space-x-1 bg-emerald-600 text-white font-medium px-2 py-1 rounded-lg">
                 <IconTrendingUp className="w-4 h-4" />
                 <span>+1.01%</span>
                 </Badge>
              </div>
            </Card>


            <Card>
              <div className="flex items-center justify-between p-4">
                <div>
                   <p className="text-sm text-gray-500 font-medium">uninformed</p>
                    <p className="text-2xl font-bold text-gray-900"> 
                       {/* {stats.unInformed} */}
                       10
                    </p>
                  </div>
                <Badge className="bg-red-800 text-white font-medium">
                 <IconTrendingDown className="w-4 h-4"/>
                 <span>-12.01%</span>
                 </Badge>
              </div> 
            </Card>

            <Card>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Permission</p>
                  <p className="text-2xl font-bold text-gray-900">
                     {/* {stats.permission} */}
                     03</p>
                </div>
                <Badge className="bg-emerald-600 text-white font-medium">
                  <IconTrendingUp />
                    <span>+1.01%</span>
                </Badge>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Absent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {Stats.absent} */}
                    12</p>
                </div>
                <Badge className="bg-red-800 text-white font-medium">
                  <IconTrendingDown />
                  <span>-19.01%</span>
                </Badge>
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


