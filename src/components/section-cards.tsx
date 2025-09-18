import { IconTrendingDown, IconTrendingUp,IconUsers, IconBriefcase,IconUsersGroup,IconCashBanknoteEdit  } from "@tabler/icons-react"
// import type { dashboard } from "@/Services/type"
// import { getDashboard } from "@/Services/DashService"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { useState,useEffect } from "react"
// import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"

export function SectionCards() {
  //   const [stats, setStats] = useState<dashboard | null>(null);

  //   useEffect(() => {
  //   getDashboard()
  //     .then((data) => setStats(data))
  //     .then(() => successToast("Dashboard data loaded", ""))
  //     .then(() => infoToast("Info", "Dashboard data is up to date"))
  //     .then(() => warningToast("Warning", "Check your dashboard settings"))
  //     .catch(() => errorToast("Error", "Failed to load dashboard data"))
  //     // .then((data) => console.log("Dashboard data:", data)) 
  //     .catch((err) => console.error("Error fetching dashboard:", err));
  // }, []);


  // if (!stats) {
  //   return <div className="text-center">Loading...</div>;
  // }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-blue-400">
        <CardHeader>
          <CardDescription className="text-black font-bold">Total Employees</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
           {/* {stats.totalEmployees} */}
            250
          </CardTitle>
          <CardAction>
            <Badge className="bg-emerald-600">
              <IconTrendingUp />
              10.0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-row items-start gap-55 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This Week
          </div>
          <div className=""><IconUsersGroup className="size-5"/></div>
        </CardFooter>
      </Card>

          <Card className="@container/card  bg-blue-400">
        <CardHeader>
          <CardDescription className="text-black font-bold">Job Applications</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {/* {stats.jobApplications} */}
            23
          </CardTitle>
          <CardAction>
            <Badge className="bg-emerald-600">
              <IconTrendingUp />
              22.0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-row items-start gap-55 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This Week 
          </div>
          <div className="">< IconBriefcase className="size-5"/></div>
        </CardFooter>
      </Card>

       <Card className="@container/card  bg-blue-400">
        <CardHeader>
          <CardDescription className="text-black font-bold">Projects</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {/* {stats.projects} */}
            77
          </CardTitle>
          <CardAction>
            <Badge className="bg-emerald-600 ">
              <IconTrendingUp />
              12.0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-row items-start gap-55 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This Week 
          </div>
          <div className="">< IconCashBanknoteEdit className="size-5"/></div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card  bg-blue-400">
        <CardHeader>
          <CardDescription className="text-black font-bold">Clients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {/* {stats.clients} */}
            43
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-800">
              <IconTrendingDown />
              7.0%
            </Badge >
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-row items-start gap-55 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            This Week 
          </div>
          <div className="">< IconUsers className="size-5"/></div>
        </CardFooter>
      </Card>
      
    </div>
  )
}
