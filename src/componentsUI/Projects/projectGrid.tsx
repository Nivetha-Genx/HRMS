import { Card} from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileCheck2 } from 'lucide-react';

export default function ProjectCard() {
  return (
       <div className="flex flex-col mb-5">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
         <Card className="p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold">Office Management</h3>
              <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              An office management app project streamlines administrative tasks by
              integrating tools for scheduling, communication, and task management,...
            </p>
        <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src=" https://i.pravatar.cc/150?img=12" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Shivaji Maharaj</p>
              <p className="text-xs text-muted-foreground">Project Leader</p>
            </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">29 sep 2025</p>
            </div>
           </div>
            <hr />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-green-500">
                     <FileCheck2 />
                  </span>
                <span>
                  Tasks : <span className="font-medium">6/10</span>
                </span>
                </div>

            <div className="flex -space-x-2">
               <Avatar className="h-7 w-7 border-2 border-white">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                  <AvatarFallback>A</AvatarFallback>
               </Avatar>
               <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/23.jpg" />
               <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-7 w-7 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/67.jpg" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
              </Badge>
            </div>
          </div>
        </Card>
        <Card className="p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold">Clinic Management</h3>
              <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              A clinic management project streamlines patient records, appointments, and billing processes to improve operational efficiency.
            </p>
        <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Shivani Nachiyar</p>
              <p className="text-xs text-muted-foreground">Project Leader</p>
            </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">20 dec 2025</p>
            </div>
           </div>
            <hr />
          <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-green-500">
                     <FileCheck2 />
                  </span>
                <span>
                  Tasks : <span className="font-medium">7/10</span>
                </span>
                </div>

            <div className="flex -space-x-2">
               <Avatar className="h-7 w-7 border-2 border-white">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                  <AvatarFallback>A</AvatarFallback>
               </Avatar>
               <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/23.jpg" />
               <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-7 w-7 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/67.jpg" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
              </Badge>
            </div>
          </div>
        </Card>
            <Card className="p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold">Educational Platform</h3>
              <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
             An educational platform project provides a centralized space for delivering online courses, tracking progress, and managing student assessments.
            </p>
        <hr />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Jayashree</p>
              <p className="text-xs text-muted-foreground">Project Leader</p>
            </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">20 oct 2025</p>
            </div>
           </div>
            <hr  />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-green-500">
                     <FileCheck2 />
                  </span>
                <span>
                  Tasks : <span className="font-medium">5/10</span>
                </span>
                </div>

            <div className="flex -space-x-2">
               <Avatar className="h-7 w-7 border-2 border-white">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                  <AvatarFallback>A</AvatarFallback>
               </Avatar>
               <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/23.jpg" />
               <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-7 w-7 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/67.jpg" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
              </Badge>
            </div>
          </div>
        </Card>
         <Card className="p-4 rounded-xl shadow-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold">Travel planning website</h3>
              <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            A travel planning website helps users explore destinations, compare flights and accommodations, and create personalized itineraries.
            </p>
        <hr  />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            <div>
              <p className="text-sm font-medium">Sagana</p>
              <p className="text-xs text-muted-foreground">Project Leader</p>
            </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className="text-sm font-medium">30 sep 2025</p>
            </div>
           </div>
            <hr />
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-green-500">
                     <FileCheck2 />
                  </span>
                <span>
                  Tasks : <span className="font-medium">8/10</span>
                </span>
                </div>

            <div className="flex -space-x-2">
               <Avatar className="h-7 w-7 border-2 border-white">
                  <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" />
                  <AvatarFallback>A</AvatarFallback>
               </Avatar>
               <Avatar className="h-7 w-7 border-2 border-white">
              <AvatarImage src="https://randomuser.me/api/portraits/men/23.jpg" />
               <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="h-7 w-7 border-2 border-white">
                <AvatarImage src="https://randomuser.me/api/portraits/women/67.jpg" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                +1
              </Badge>
            </div>
          </div>
        </Card>
      </div>
      </div>
      </div>
      </div>
  )
}
