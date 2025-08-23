"use client"


import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type  {ChartConfig,} from "@/components/ui/chart"


export const description = "An interactive area chart"

const chartData = [
 
  { month: "Jan", completed: 120, pending: 30 },
  { month: "Feb", completed: 95, pending: 25 },
  { month: "Mar", completed: 140, pending: 20 },
  { month: "Apr", completed: 160, pending: 18 },
  { month: "May", completed: 175, pending: 22 },
  { month: "Jun", completed: 150, pending: 28 },
  { month: "Jul", completed: 180, pending: 25 },
  { month: "Aug", completed: 170, pending: 30 },
  { month: "Sep", completed: 160, pending: 20 },
  { month: "Oct", completed: 200, pending: 15 },
  { month: "Nov", completed: 190, pending: 18 },
  { month: "Dec", completed: 220, pending: 20 },
]

const pieData = [
  { name: "Completed Projects", value: chartData.reduce((sum, d) => sum + d.completed, 0) },
  { name: "Pending Projects", value: chartData.reduce((sum, d) => sum + d.pending, 0) },
  { name: "In Progress", value: 300 }, 
]
const COLORS = ["#1d4dd1", "#802aaa", "#dbcb1a"] 

const chartConfig = {
  Statistics: {
    label: "Project Statistics",
  },
  completed: {
    label: "completed",
    color: "var(--primary)",
  },
  pending: {
    label: "pending",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  

return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Job Statistics</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Pie Chart */}
          <div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          </div>
          <div>
        <CardDescription>
         Completed vs Pending Jobs </CardDescription>
      
      <div className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.completed.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.completed.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.pending.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.pending.color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32} />
             
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent />}
           
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              stroke={chartConfig.completed.color}
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke={chartConfig.pending.color}
            />
          </AreaChart>
        </ChartContainer>
        </div>
        </div>
        </div>
      </CardContent>

    </Card>
  )
}
