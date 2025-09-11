
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import {DataTableDemo} from "@/components/ui/emptab"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
// import { Input } from "@/components/ui/input"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >

      <SidebarInset>
        <div className="flex flex-1 flex-col">
            <SiteHeader title="Dashboard" 
          //   actions={
          //   <Input
          //   type="search"
          //   placeholder="Search..."
          //   className="w-[200px] lg:w-[250px]"
          // />}
          />
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTableDemo />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
