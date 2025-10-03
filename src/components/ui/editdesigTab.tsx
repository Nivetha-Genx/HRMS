import React from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Pencil, Trash2 } from "lucide-react"
import { getDesignation, putDesignation, deleteDesignation } from "@/Services/ApiService"

// Type for Designation form
type DesignationFormValues = {
  desigName: string;
};

// Designation type
type Designation = {
  desigId: string;
  desigName: string;
  employees: any[];
};

interface EditDesigTabProps {
  designation: Designation;
  onRefresh: () => void;
}

function EditDesigTab({ designation, onRefresh }: EditDesigTabProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } =
    useForm<DesignationFormValues>({
      defaultValues: {
        desigName: "",
      }
    });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Load designation data when dialog opens
  React.useEffect(() => {
    if (dialogOpen && designation) {
      loadDesignationData();
    }
  }, [dialogOpen, designation]);

  const loadDesignationData = async () => {
    try {
      setLoading(true);
      const response = await getDesignation(designation.desigId);
      
      if (response && response.data) {
        setValue("desigName", response.data.desigName);
      }
    } catch (error) {
      console.error('Error loading designation data:', error);
      errorToast("Failed to load designation data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<DesignationFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      
      const response = await putDesignation(designation.desigId, {
        desigName: data.desigName
      });

      if (response) {
        successToast("Designation updated successfully!");
        setDialogOpen(false);
        onRefresh();
      }
    } catch (error: any) {
      console.error('Error updating designation:', error);
      errorToast(error?.response?.data?.message || "Failed to update designation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${designation.desigName}"? This action cannot be undone.`)) {
      try {
        setIsSubmitting(true);
        await deleteDesignation(designation.desigId);
        successToast("Designation deleted successfully!");
        setDialogOpen(false);
        onRefresh();
      } catch (error: any) {
        console.error('Error deleting designation:', error);
        errorToast(error?.response?.data?.message || "Failed to delete designation");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    reset();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Designation</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading designation data...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="desigName" className="text-right text-foreground">
                  Designation Name
                </Label>
                <div className="col-span-3">
                  <Input
                    id="desigName"
                    placeholder="Enter designation name"
                    className="border-input bg-background text-foreground focus:ring-primary/20 focus:border-primary"
                    {...register("desigName", {
                      required: "Designation name is required",
                      minLength: {
                        value: 2,
                        message: "Designation name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.desigName && (
                    <p className="text-red-500 text-sm mt-1">{errors.desigName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right text-foreground">
                  Employees
                </Label>
                <div className="col-span-3 text-sm text-muted-foreground">
                  {designation.employees?.length || 0} employee(s) assigned
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="mr-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
              
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleDialogClose}
                    className="border-border text-foreground hover:bg-muted/80"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Updating..." : "Update Designation"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditDesigTab
