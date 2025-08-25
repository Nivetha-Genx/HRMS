
import { Link, useLocation } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


type NavItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

export function NavMain({ items }: { items: NavItem[] }) {
  const location = useLocation() 
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.url

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link to={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
