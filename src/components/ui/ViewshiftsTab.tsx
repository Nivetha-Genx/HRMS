"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { type Shift } from "./ShiftsTable"

interface ViewShiftDialogProps {
  shift: Shift
  open: boolean
  onOpenChange: (open: boolean) => void
}

const API_BASE_URL = "https://localhost:7271/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "accept": "*/*"
  }
}

const fetchShiftById = async (shiftId: string): Promise<Shift | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Shift/Get-shift-by-Id?id=${shiftId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("Error fetching shift:", error)
    return null
  }
}

export function ViewShiftDialog({ shift, open, onOpenChange }: ViewShiftDialogProps) {
  const [shiftDetails, setShiftDetails] = useState<Shift | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && shift) {
      setLoading(true)
      setShiftDetails(shift) // Use existing data first
      
      // Fetch fresh data from API
      fetchShiftById(shift.shiftId).then((freshData) => {
        if (freshData) {
          setShiftDetails(freshData)
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [open, shift])

  const formatTime = (timeString: string) => {
    if (!timeString || timeString === "string") return "Not specified"
    return timeString
  }

  const calculateShiftDuration = (start: string, end: string) => {
    if (!start || !end || start === "string" || end === "string") {
      return "Duration not available"
    }
    
    try {
      const startTime = new Date(`2000-01-01T${start}`)
      const endTime = new Date(`2000-01-01T${end}`)
      
      if (endTime < startTime) {
        // Handle overnight shifts
        endTime.setDate(endTime.getDate() + 1)
      }
      
      const diffMs = endTime.getTime() - startTime.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      
      return `${diffHours}h ${diffMinutes}m`
    } catch (error) {
      return "Duration calculation error"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Shift Details</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading shift details...</div>
          </div>
        ) : shiftDetails ? (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
               
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shift Name</label>
                  <p className="text-sm font-semibold text-foreground">{shiftDetails.shiftName}</p>
                </div>
              </div>
            </div>

            {/* Timing Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Timing Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Start Time</label>
                  <p className="text-sm text-foreground">{formatTime(shiftDetails.shiftStartTiming)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">End Time</label>
                  <p className="text-sm text-foreground">{formatTime(shiftDetails.shiftEndTiming)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duration</label>
                <p className="text-sm text-foreground">
                  {calculateShiftDuration(shiftDetails.shiftStartTiming, shiftDetails.shiftEndTiming)}
                </p>
              </div>
            </div>

            {/* Employee Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Employee Assignment</h3>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Assigned Employees</label>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-sm">
                    {shiftDetails.employees?.length || 0} employees assigned
                  </Badge>
                </div>
                {shiftDetails.employees && shiftDetails.employees.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {shiftDetails.employees.map((employee: any, index: number) => (
                      <div key={index} className="p-2 bg-muted/30 rounded border-border border">
                        <p className="text-sm font-medium">{employee.name || `Employee ${index + 1}`}</p>
                        {employee.department && (
                          <p className="text-xs text-muted-foreground">{employee.department}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">No employees currently assigned to this shift</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Failed to load shift details</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
