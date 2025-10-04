"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { type Shift } from "./shiftstab"

interface EditShiftDialogProps {
  shift: Shift
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

interface ShiftFormData {
  shiftName: string
  shiftStartTiming: string
  shiftEndTiming: string
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

const updateShift = async (shiftId: string, shiftData: ShiftFormData): Promise<boolean> => {
  try {
    // Fix the URL format based on the curl example - there's a missing slash
    const response = await fetch(`${API_BASE_URL}/Shift/Update-shift?id=${shiftId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(shiftData),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    await response.json()
    toast.success("Shift updated successfully")
    return true
  } catch (error) {
    console.error("Error updating shift:", error)
    toast.error("Failed to update shift")
    return false
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
    toast.error("Failed to fetch shift details")
    return null
  }
}

export function EditShiftDialog({ shift, open, onOpenChange, onSuccess }: EditShiftDialogProps) {
  const [formData, setFormData] = useState<ShiftFormData>({
    shiftName: "",
    shiftStartTiming: "",
    shiftEndTiming: "",
  })
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  // Load shift data when dialog opens
  useEffect(() => {
    if (open && shift) {
      setFetchingData(true)
      
      // First try to use the data we already have
      setFormData({
        shiftName: shift.shiftName || "",
        shiftStartTiming: shift.shiftStartTiming || "",
        shiftEndTiming: shift.shiftEndTiming || "",
      })
      
      // Optionally fetch fresh data from API
      fetchShiftById(shift.shiftId).then((freshData) => {
        if (freshData) {
          setFormData({
            shiftName: freshData.shiftName || "",
            shiftStartTiming: freshData.shiftStartTiming || "",
            shiftEndTiming: freshData.shiftEndTiming || "",
          })
        }
        setFetchingData(false)
      }).catch(() => {
        setFetchingData(false)
      })
    }
  }, [open, shift])

  const handleInputChange = (field: keyof ShiftFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.shiftName.trim()) {
      toast.error("Shift name is required")
      return
    }
    
    if (!formData.shiftStartTiming.trim()) {
      toast.error("Start time is required")
      return
    }
    
    if (!formData.shiftEndTiming.trim()) {
      toast.error("End time is required")
      return
    }

    setLoading(true)
    
    try {
      const success = await updateShift(shift.shiftId, formData)
      
      if (success) {
        onSuccess()
        onOpenChange(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form to original values when canceling
    setFormData({
      shiftName: shift.shiftName || "",
      shiftStartTiming: shift.shiftStartTiming || "",
      shiftEndTiming: shift.shiftEndTiming || "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shift</DialogTitle>
          <DialogDescription>
            Update the shift information. Make changes and click save.
          </DialogDescription>
        </DialogHeader>
        
        {fetchingData ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading shift data...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-shiftName">Shift Name *</Label>
              <Input
                id="edit-shiftName"
                placeholder="e.g., Morning Shift, Night Shift"
                value={formData.shiftName}
                onChange={(e) => handleInputChange("shiftName", e.target.value)}
                className="border-input focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-shiftStartTiming">Start Time *</Label>
              <Input
                id="edit-shiftStartTiming"
                type="time"
                value={formData.shiftStartTiming}
                onChange={(e) => handleInputChange("shiftStartTiming", e.target.value)}
                className="border-input focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-shiftEndTiming">End Time *</Label>
              <Input
                id="edit-shiftEndTiming"
                type="time"
                value={formData.shiftEndTiming}
                onChange={(e) => handleInputChange("shiftEndTiming", e.target.value)}
                className="border-input focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Updating..." : "Update Shift"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
