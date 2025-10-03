import React from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { postDesignation } from "@/Services/ApiService"

// Type for Designation form
type DesignationFormValues = {
  desigName: string;
};

interface AddDesigTabProps {
  onRefresh?: () => void;
}

function AddDesigTab({ onRefresh }: AddDesigTabProps) {
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<DesignationFormValues>({
      defaultValues: {
        desigName: "",
      }
    });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit: SubmitHandler<DesignationFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      
      const response = await postDesignation({
        desigName: data.desigName
      });

      if (response) {
        successToast("Designation created successfully!");
        reset();
        setDialogOpen(false);
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (error: any) {
      console.error('Error creating designation:', error);
      errorToast(error?.response?.data?.message || "Failed to create designation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    reset();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Add Designation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Designation</DialogTitle>
        </DialogHeader>
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
          </div>
          <DialogFooter>
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
              {isSubmitting ? "Creating..." : "Create Designation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDesigTab
