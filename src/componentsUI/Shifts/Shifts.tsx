import { ShiftsTableDemo } from "../../components/ui/ShiftsTable"
import { IconClock } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { useState, useEffect } from "react"

interface ShiftStats {
  totalShifts: number
  activeShifts: number
  morningShifts: number
  nightShifts: number
}

export default function Shifts() {
  const [stats, setStats] = useState<ShiftStats>({
    totalShifts: 0,
    activeShifts: 0,
    morningShifts: 0,
    nightShifts: 0
  })

  // Mock stats for now - can be replaced with API call later
  useEffect(() => {
    setStats({
      totalShifts: 8,
      activeShifts: 6,
      morningShifts: 4,
      nightShifts: 2
    })
  }, [])

  return (
    <>
      <div className="flex flex-col mb-5">
        <SiteHeader title="Shifts" />
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
              
              <Card>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                      <IconClock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Shifts</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.totalShifts}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-pink-100 text-pink-600 font-medium">+12.5%</Badge>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600">
                      <IconClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Shifts</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.activeShifts}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-600 font-medium">+8.2%</Badge>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-600">
                      <IconClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Morning Shifts</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.morningShifts}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-600 font-medium">+15.3%</Badge>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600">
                      <IconClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Night Shifts</p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.nightShifts}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-600 font-medium">+5.7%</Badge>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
      <div>
        <ShiftsTableDemo />
      </div>
    </>
  )
}
