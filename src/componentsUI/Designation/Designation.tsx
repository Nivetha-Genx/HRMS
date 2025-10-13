import {DesignationTableDemo} from "@/components/ui/Designation_Table"
import {IconBriefcase } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {Card,} from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"



export default function Designation() {


  return (
    <>
    <div className="flex flex-col mb-5">
      <SiteHeader title="Designations" />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
 
          <Card>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                    <IconBriefcase className="w-6 h-6 text-primary-foreground" />
                </div>
              <div>
                  <p className="text-sm text-muted-foreground">Total Designations</p>
                  <p className="text-2xl font-bold text-foreground">
                  15
                  {/* {stats.totalDesignations} */}
                  </p>
            </div>
            </div>
              <Badge className="bg-primary/10 text-primary font-medium">+12.5%</Badge>
            </div>
          </Card>

          
              <Card>
                <div className="flex items-center justify-between p-4">
                   <div className="flex items-center space-x-4">
                     <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                       <IconBriefcase className="w-6 h-6 text-primary-foreground"  />
                     </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Positions</p>
                    <p className="text-2xl font-bold text-foreground">
                      {/* {stats.activePositions} */}
                      12
                      </p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary font-medium">+8.3%</Badge>
                </div>
              </Card>

            <Card>
             <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                   <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                      <IconBriefcase className="w-6 h-6 text-primary-foreground"  />
                    </div>
                <div>
                    <p className="text-sm text-muted-foreground">Senior Level</p>
                    <p className="text-2xl font-bold text-foreground">
                    {/* {stats.seniorLevel} */}
                    5
                    </p>
                </div>
                </div>
                  <Badge className="bg-primary/10 text-primary font-medium">+15.2%</Badge>
                </div> 
            </Card>

            <Card>
               <div className="flex items-center justify-between p-4">
                 <div className="flex items-center space-x-4">
                   <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                      <IconBriefcase className="w-6 h-6 text-primary-foreground"  />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Entry Level</p>
                    <p className="text-2xl font-bold text-foreground">
                      {/* {stats.entryLevel} */}
                      7
                      </p>
                  </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary font-medium">+5.8%</Badge>
                </div>
              </Card>


            </div>
          </div>
        </div>
      </div>
    <div>
    <DesignationTableDemo />
    </div>
    </>
  )
}
