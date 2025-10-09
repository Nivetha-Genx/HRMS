import { IconUserEdit, IconUserCheck, IconUserExclamation, IconUserQuestion } from '@tabler/icons-react';
import DataTable from "./dataTable";
import { SiteHeader } from "@/components/site-header";
import LeaveCard from "./LeaveCard"; 
import { useState,useEffect } from "react"
// import { getCardLeave } from "../../Services/ApiService"
// import type { leave} from "@/Services/type"
// import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"


 export default function Leave() {
  const [role, setRole] = useState<"admin" | "employee">("employee"); 

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); 
    if (storedRole === "admin" || storedRole === "employee") {
      setRole(storedRole);
    }
  }, []);


  const employeeExtraFields = role === "employee" 
    ? { extraField1: "Remaining Leaves: 2", extraField2: "CarryForward leaves: 10" } 
    : {};

//   const [stats, setStats] = useState<leave| null>(null);

//    useEffect(() => {
//       const fetchData = async () => {
//       try {
//       const data = await getCardLeave();
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
                 title="Total Present"
                 value="180"
              // subtitle="Remaining Leaves"
              // remainingLeaves="07"
              // value={stats.totalPresent}
                 extra="/200"
                 color="bg-green-600"
                 role={role}
                  {...employeeExtraFields} 
             />

        <LeaveCard
          icon={<IconUserEdit className="text-white w-6 h-6" />}
          title="Planned Leaves"
          value="10"
          // value= {stats.plannedLeaves}
          color="bg-orange-600"
           role={role}
          {...employeeExtraFields} 
        />

        <LeaveCard
          icon={<IconUserExclamation className="text-white w-6 h-6" />}
          title="Unplanned Leaves"
          value="10"
          // value={stats.unplannedLeavesl}
          color="bg-pink-600"
           role={role}
          {...employeeExtraFields} 
        />

        <LeaveCard
          icon={<IconUserQuestion className="text-white w-6 h-6" />}
          title="Pending Request"
          value="15"
          // value={stats.pendingRequest}
          color="bg-blue-600"
           role={role}
          {...employeeExtraFields} 
        />
      </div>

      <div>
        <h2 className="font-semibold mx-5">Employee's Leave List</h2>
        <DataTable />
      </div>
    </div>
  );
}
