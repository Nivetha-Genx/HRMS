import React from 'react'
"use client"
import { Dialog,DialogClose,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { successToast,errorToast } from "@/lib/toast"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"
import { Pencil, Trash2 } from "lucide-react"
import { getEmployees } from "@/Services/ApiService"

// Type for Department form
type DepartmentFormValues = {
  deptName: string;
  deptHeadId: string;
};

// Employee type
type Employee = {
  id: string;
  name: string;
};

interface EditDeptTabProps {
  departmentId: string;
  onSuccess: () => void;
}

function EditDeptTab({ departmentId, onSuccess }: EditDeptTabProps) {
  const { register, handleSubmit, control, reset, setValue, formState: { errors } } =
    useForm<DepartmentFormValues>({
      defaultValues: {
        deptName: "",
        deptHeadId: "",
      }
    });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = React.useState(false);

  // Load department data and employees when dialog opens
  React.useEffect(() => {
    if (dialogOpen && departmentId) {
      loadDepartmentData();
      fetchEmployees();
    }
  }, [dialogOpen, departmentId]);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      console.log('Fetching employees using ApiService...');
      
      try {
        // Try to use the existing API service first
        const result = await getEmployees();
        console.log('Employee API Response:', result);
        
        // Handle the API response structure: { success: true, data: [...] }
        const employees = result?.data || result;
        const employeeData = Array.isArray(employees) ? employees.map((emp: any) => ({
          id: emp.empId,
          name: `${emp.firstName} ${emp.lastName}`.trim()
        })) : [];
        
        setEmployees(employeeData);
      } catch (apiError) {
        console.error('Error fetching employees from API:', apiError);
        errorToast("Error loading employees", "Failed to load employee list from server.");
        setEmployees([]);
      }
    } catch (err) {
      console.error('Error fetching employees:', err);
      errorToast("Error loading employees", "Failed to load employee list.");
      // Set empty array on error
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const loadDepartmentData = async () => {
    try {
      setLoading(true);
      
      // TODO: Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Department/Department-Id?id=${departmentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        const department = result.data;
        
        setValue("deptName", department.deptName);
        setValue("deptHeadId", department.deptHeadId || "");
      } else {
        throw new Error('Failed to load department data');
      }
    } catch (err) {
      errorToast("Error loading department", "Failed to load department data.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<DepartmentFormValues> = async (data) => {
    try {
      const payload = {
        deptName: data.deptName,
        deptHeadId: data.deptHeadId,
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Department/Update-Department?id=${departmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        successToast("Department updated successfully!", "The department has been updated.");
        setDialogOpen(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Failed to update department');
      }
    } catch (err) {
      errorToast("Error updating department", "There was an issue updating the department.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this department?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Department/Delete-Department?id=${departmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        successToast("Department deleted successfully!", "The department has been removed.");
        setDialogOpen(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Failed to delete department');
      }
    } catch (err) {
      errorToast("Error deleting department", "There was an issue deleting the department.");
    }
  };

  return (
    <div className="flex gap-2">
      <Dialog
        open={dialogOpen}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen);
          if (!isOpen) {
            reset();
          }
        }}>

        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          ) : (
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              
              <div className="grid gap-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input 
                  id="deptName" 
                  {...register("deptName", { required: "Department name is required" })} 
                  placeholder="Enter department name" 
                />
                {errors.deptName && (
                  <p className="text-red-700 text-sm">{errors.deptName.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deptHeadId">Department Head</Label>
                <Controller
                  control={control}
                  name="deptHeadId"
                  rules={{ required: "Department head is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="deptHeadId">
                        <SelectValue placeholder="Select department head" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingEmployees ? (
                          <SelectItem value="loading" disabled>Loading employees...</SelectItem>
                        ) : employees.length > 0 ? (
                          employees.map((employee: Employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-employees" disabled>No employees found</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.deptHeadId && (
                  <p className="text-red-700 text-sm">{errors.deptHeadId.message}</p>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="mr-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Update Department</Button>
                </div>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditDeptTab
