"use client"

import { useState } from "react"
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

interface AddShiftDialogProps {
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

const addShift = async (shiftData: ShiftFormData): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Shift/Add-shift`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(shiftData),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    await response.json()
    toast.success("Shift added successfully")
    return true
  } catch (error) {
    console.error("Error adding shift:", error)
    toast.error("Failed to add shift")
    return false
  }
}

export function AddShiftDialog({ open, onOpenChange, onSuccess }: AddShiftDialogProps) {
  const [formData, setFormData] = useState<ShiftFormData>({
    shiftName: "",
    shiftStartTiming: "",
    shiftEndTiming: "",
  })
  const [loading, setLoading] = useState(false)

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
      const success = await addShift(formData)
      
      if (success) {
        // Reset form
        setFormData({
          shiftName: "",
          shiftStartTiming: "",
          shiftEndTiming: "",
        })
        
        onSuccess()
        onOpenChange(false)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form when canceling
    setFormData({
      shiftName: "",
      shiftStartTiming: "",
      shiftEndTiming: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Shift</DialogTitle>
          <DialogDescription>
            Create a new shift schedule. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shiftName">Shift Name *</Label>
            <Input
              id="shiftName"
              placeholder="e.g., Morning Shift, Night Shift"
              value={formData.shiftName}
              onChange={(e) => handleInputChange("shiftName", e.target.value)}
              className="border-input focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shiftStartTiming">Start Time *</Label>
            <Input
              id="shiftStartTiming"
              type="time"
              value={formData.shiftStartTiming}
              onChange={(e) => handleInputChange("shiftStartTiming", e.target.value)}
              className="border-input focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shiftEndTiming">End Time *</Label>
            <Input
              id="shiftEndTiming"
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
              {loading ? "Adding..." : "Add Shift"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
