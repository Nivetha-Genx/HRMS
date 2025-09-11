import { IconUserEdit } from '@tabler/icons-react';
import { IconUserCheck } from '@tabler/icons-react';
import { IconUserExclamation } from '@tabler/icons-react';
import { IconUserQuestion } from '@tabler/icons-react';
import DataTable from "./dataTable";
import { SiteHeader } from "@/components/site-header"
import { toast } from 'react-toastify';
// import { useState,useEffect } from "react"
// import { getLeave } from '@/Services/LeaveService';
//  import type { leave} from "@/Services/type"
// import { toast } from "react-toastify"

 export default function Leave() {
  // const [stats, setStats] = useState<leave| null>(null);

  //  useEffect(() => {
  //     const fetchData = async () => {
  //     try {
  //     const data = await getLeave();
  //     setStats(data);
        // toast.success("Leave data loaded successfully")  
  //     } catch (err) {
  //     console.error("Error fetching dashboard:", err);
  //     toast.error("Failed to load leave data");
  //   }
  // };

  // fetchData();
  // }, []);

  // if (!stats) {
  //   return <div className="text-center">Loading...</div>;
  // }



  return (
    <>
    <div className="flex flex-col mt-5">
      <SiteHeader title="Leave" />
       <div className="grid grid-cols-1 gap-4 px-4 my-5 
                  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden">
           <div
             className="absolute left-0 top-0 h-full w-20 sm:w-24 bg-green-600 flex items-center justify-center"
             style={{ clipPath: "polygon(0 0, 60% 0, 100% 100%, 100% 160%, 0 150%)",}}>
               <IconUserCheck className="text-white w-6 h-6" />
           </div>
         <div className="ml-24 sm:ml-28">
          <p className="text-gray-500 text-sm">
             {/* {stats.totalPresent} */}
             Total Present</p>
          <p className="text-xl font-bold text-gray-800">
           180 <span className="text-gray-400">/200</span>
           </p>
        </div>
    </div>  
 

     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-20 sm:w-24 bg-orange-600 flex items-center justify-center"
          style={{clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)",}}>
            <IconUserEdit className="text-white w-6 h-6" />
       </div>
      <div className="ml-24 sm:ml-28">
        <p className="text-gray-500 text-sm">
           {/* {stats.plannedLeaves} */}
           Planned leaves</p>
        <p className="text-xl font-bold text-gray-800">
          10
        </p>
      </div>
    </div>

     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-20 sm:w-24 bg-pink-600 flex items-center justify-center"
        style={{clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)", }}>
           <IconUserExclamation className="text-white w-6 h-6" />
      </div>
      <div className="ml-24 sm:ml-28">
        <p className="text-gray-500 text-sm">
           {/* {stats.unplannedLeaves} */}
           Unplanned leaves</p>
        <p className="text-xl font-bold text-gray-800">
          10
        </p>
      </div>
    </div>
     <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-20 sm:w-24 bg-blue-600 flex items-center justify-center"
        style={{clipPath: "polygon(0 0, 60% 0, 100%  100%, 100%  160%, 0 150%)" }}>
          <IconUserQuestion className="text-white w-6 h-6" />
      </div>
      <div className="ml-24 sm:ml-28">
        <p className="text-gray-500 text-sm">
           {/* {stats.pendingRequest} */}
           Pending request</p>
        <p className="text-xl font-bold text-gray-800">
          15
        </p>
      </div>
      </div>   
      </div>
      <div><DataTable/></div>
      </div>
      </>
  )
}

