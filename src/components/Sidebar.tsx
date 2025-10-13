import * as React from "react"
import { useState, useEffect } from "react"
import logo from '../assets/logo.svg'
import { getCurrentUser } from "@/Services/ApiService"
import {
  IconCamera,
  IconBuilding,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconCalendar,IconUsers,
  IconReport,
 IconDoorExit,
  IconSearch,
  IconSettings,
  IconCreditCardPay,
  IconBriefcase,
  IconClock,
 
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard1",
      icon: IconDashboard,
    },
    {
      title: "Employees",
      url: "/employee",
      icon: IconUsers,
    },
    {
      title: "Department",
      url: "/department",
      icon: IconBuilding,
    },
    {
      title: "Designation",
      url: "/designation",
      icon: IconBriefcase,
    },
    {
      title: "Shifts",
      url: "/shifts",
      icon: IconClock,
    },
    {
      title: "Attendance",
      url: "/attendance",
      icon: IconCalendar,
    },
     {
      title: "Leave",
      url: "/leave",
      icon: IconDoorExit,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconFolder,
    },
    {
      title: "Pay roll",
      url: "/payroll",
      icon: IconCreditCardPay,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState(data.user) // Initialize with default data
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        
        // Check all possible localStorage keys for user data
        const storedUser = localStorage.getItem("user")
        const storedUserData = localStorage.getItem("userData") 
        const storedAuthUser = localStorage.getItem("authUser")
        
      
        
        // Try to find user data in any of these keys
        let foundUserData = null
        
        if (storedUser) {
          try {
            foundUserData = JSON.parse(storedUser)
          } catch (e) {
          }
        }
        
        if (!foundUserData && storedUserData) {
          try {
            foundUserData = JSON.parse(storedUserData)
          } catch (e) {
          
          }
        }
        
        if (!foundUserData && storedAuthUser) {
          try {
            foundUserData = JSON.parse(storedAuthUser)
           
          } catch (e) {
          
          }
        }
        
        if (foundUserData) {
          // Extract name and email properly
          let displayName = "Admin"
          let displayEmail = "admin@example.com"
          
          // Handle different possible data structures
          if (foundUserData.name) {
            // If name contains email format, extract both
            if (foundUserData.name.includes("@")) {
              displayEmail = foundUserData.name
              displayName = foundUserData.name.split("@")[0] // Use part before @ as name
            } else {
              displayName = foundUserData.name
            }
          }
          
          if (foundUserData.email) {
            displayEmail = foundUserData.email
          }
          
          if (foundUserData.firstName) {
            displayName = foundUserData.firstName + (foundUserData.lastName ? ` ${foundUserData.lastName}` : "")
          }
          
          const dynamicUser = {
            name: displayName,
            email: displayEmail,
            avatar: "/avatars/shadcn.jpg",
          }
          
       
          setUser(dynamicUser)
          setLoading(false)
          return
        }
        
      
        const token = localStorage.getItem("token")
       
        
        if (!token || token === "dummy-token") {
       
          setLoading(false)
          return
        }
        
        const response = await getCurrentUser()
      
        
        // Handle API response
        let userData = response
        if (response && response.data) {
          userData = response.data
        }
        
        const dynamicUser = {
          name: userData?.firstName || userData?.name || "Admin",
          email: userData?.email || "admin@example.com", 
          avatar: "/avatars/shadcn.jpg",
        }
        
      
        setUser(dynamicUser)
        
      } catch (error) {
      
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <img
            src={logo}
            alt="Logo"
            className="h-auto w-45"/>
        <SidebarMenu>     
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <div className="p-2 text-sm text-gray-500">Loading user...</div>
        ) : (
          <>
            <NavUser user={user} />
           
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
