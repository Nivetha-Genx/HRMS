import { IconUserEdit, IconUserCheck, IconUserExclamation, IconUserQuestion } from '@tabler/icons-react';
import EmpDataTable from "../Leave/EmpDataTable"
import { SiteHeader } from "@/components/site-header";
import LeaveCard from "./LeaveCard"; 
import { useState,useEffect } from "react"
import { getEmpCardLeave } from "../../Services/ApiService"
import type { empLeave} from "@/Services/type"
import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"


 export default function EmployeeLeave() {
//   const [stats, setStats] = useState<empLeave| null>(null);

//    useEffect(() => {
//       const fetchData = async () => {
//       try {
//       const data = await getEmpCardLeave();
//       setStats(data);
//         successToast("Leave data loaded successfully", "")
//         infoToast("Info", "Leave data is up to date")
//         warningToast("Warning", "Check your leave settings")
//       } catch (err) {
//       console.error("Error fetching dashboard:", err);
//       errorToast("Failed to load leave data", "")
//     }
//   };

//   fetchData();
//   }, []);

//   if (!stats) {
//     return <div className="text-center">Loading...</div>;
//   }


  return (
    <div className="flex flex-col">
      <SiteHeader title="Leave" />

      <div className="grid grid-cols-1 gap-4 px-4 mt-5 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
        <LeaveCard
          icon={<IconUserCheck className="text-white w-6 h-6" />}
          title="Annual Leaves"
          value="05"
          subtitle="Remaining Leaves"
          remainingLeaves='3'
        //   value={stats.annualLeaves.total}
        //   remainingLeaves={stats.annualLeaves.remainingLeaves}
          color="bg-green-600"
        />

        <LeaveCard
          icon={<IconUserEdit className="text-white w-6 h-6" />}
          title="Medical Leaves"
          value="10"
          subtitle="Remaining Leaves"
          remainingLeaves='4'
          //value={stats.medicalleaves.total}
        // remainingLeaves={stats.medicalleaves.remainingLeaves}
          color="bg-orange-600"
        />

        <LeaveCard
          icon={<IconUserExclamation className="text-white w-6 h-6" />}
          title="Casual Leaves"
          value="10"
          subtitle="Remaining Leaves"
          remainingLeaves='8'
          //value={stats.casualleaves.total}
        //  remainingLeaves={stats.casualleaves.remainingLeaves}
          color="bg-pink-600"
        />

        <LeaveCard
          icon={<IconUserQuestion className="text-white w-6 h-6" />}
          title="Other Leaves"
          value="15"
          subtitle="Remaining Leaves"
          remainingLeaves='12'
         //value={stats.otherleaves.total}
        // remainingLeaves={stats.otherleaves.remainingLeaves}
          color="bg-blue-600"
        />
      </div>

      <div>
        <h2 className="font-semibold mx-5">Employee's Leave List</h2>
        <EmpDataTable />
      </div>
    </div>
  );
}
