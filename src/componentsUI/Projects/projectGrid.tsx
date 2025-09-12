import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileCheck2 } from "lucide-react"
import Dropdown from "../Projects/dropdown"
import type { project } from "@/Services/type"
// import { useState,useEffect } from "react"
// import { getProjects } from "@/Services/projectService"
import { successToast,warningToast,errorToast,infoToast } from "@/lib/toast"

const projects: project[] = [
  {
    projectId: "1",
    projectName: "Office Management",
    leader: "Shivaji Maharaj",
    team: "Team A",
    deadLine: "29 sep 2025",
    priority: "High",
    status: "In Progress",
    description:
      "An office management app project streamlines administrative tasks by integrating tools for scheduling, communication, and task management,...",
  },
  {
    projectId: "2",
    projectName: "Clinic Management",
    leader: "Shivani Nachiyar",
    team: "Team B",
    deadLine: "20 dec 2025",
    priority: "Medium",
    status: "Pending",
    description:
      "A clinic management project streamlines patient records, appointments, and billing processes to improve operational efficiency.",
  },
  {
    projectId: "3",
    projectName: "Educational Platform",
    leader: "Jayashree",
    team: "Team C",
    deadLine: "20 oct 2025",
    priority: "High",
    status: "In Progress",
    description:
      "An educational platform project provides a centralized space for delivering online courses, tracking progress, and managing student assessments.",
  },
  {
    projectId: "4",
    projectName: "Travel Planning Website",
    leader: "Sagana",
    team: "Team D",
    deadLine: "30 sep 2025",
    priority: "Low",
    status: "Completed",
    description:
      "A travel planning website helps users explore destinations, compare flights and accommodations, and create personalized itineraries.",
  },
  {
    projectId: "5",
    projectName: "Hotel Booking App",
    leader: "Pavithra",
    team: "Team E",
    deadLine: "20 dec 2025",
    priority: "High",
    status: "In Progress",
    description:
      "A hotel booking app allows users to search, compare, and book accommodations with ease, offering a wide range of options.",
  },
  {
    projectId: "6",
    projectName: "Food Order App",
    leader: "Nisha Danasegaran",
    team: "Team F",
    deadLine: "20 nov 2025",
    priority: "Medium",
    status: "In Progress",  
    description:
      "A food order app allows users to browse menus, place orders, and track delivery from their favorite restaurants with ease.",
  },
  {
    projectId: "7",
    projectName: "Service Booking Software",
    leader: "Akila Sri",
    team: "Team G",
    deadLine: "20 feb 2026",
    priority: "High",
    status: "Pending",  
    description:
      "Service booking software enables users to schedule appointments, manage bookings, and handle payments for various services.",
  },
]

export default function ProjectCard() {
  // const [projects, setProjects] = useState<project[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)
  
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true)
  //       const data = await getProjects() 
  //       setProjects(data)
  //       successToast("Projects data loaded successfully", "")
  //       infoToast("Info", "Projects data is up to date")
  //       warningToast("Warning", "Check your project settings") 
  //       setError(null) 
  //     } catch (err) {
  //       setError("Failed to fetch projects")
  //       console.error(err)
  //       errorToast("Failed to load projects data", "")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProjects()
  // }, [])

  // if (loading) {
  //   return <p>Loading projects...</p>
  // }

  // if (error) {
  //   return <p className="text-red-500">{error}</p>
  // }

  return (
    <div className="flex flex-col mb-5 font-sans">
      <div className="@container/main flex flex-1 flex-col gap-2 ">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
            {projects.map((project) => (
              <Card key={project.projectId} className="p-4 rounded-xl shadow-sm">
                <div className="flex items-start justify-between">
                  <h3 className="text-base font-semibold">{project.projectName}</h3>
                  <Dropdown
                    projectId={project.projectId}
                    onSuccess={() => window.location.reload()}
                  />
                </div>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                 
                 {project.description}
                </p>

                <hr />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                      <AvatarFallback>{project.leader[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{project.leader}</p>
                      <p className="text-xs text-muted-foreground">Project Leader</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-sm font-medium">{project.deadLine}</p>
                  </div>
                </div>

                <hr />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center text-green-500">
                      <FileCheck2 />
                    </span>
                    <span className="font-medium">Tasks :</span> 6/10
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
                    <Badge className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs border-2 border-white">
                      +1
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

