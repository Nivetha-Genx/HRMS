import React, { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useForm, Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  postEmployee,
  postEmployeeBio,
  postEmployeeEducation,
  postEmployeeEmergencyContact,
  getDepartments,
  getDesignations,
  getShifts,
} from "@/Services/ApiService";
import { successToast, errorToast } from "@/lib/toast";
import { Eye, EyeOff } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
// Form data type for API
type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  deptId?: string | null;
  designationId?: string | null;
  shiftId?: string | null;
  joinDate: string;
};
// Employee Bio form data type
type EmployeeBioFormData = {
  mobile: string;
  bloodGroup: string;
  religion: string;
  currentAddress: string;
  permanentAddress: string;
  isMarried: boolean;
  spouseName: string;
  spouseOccupation: string;
  totalChildren: number;
};
// Employee Education form data type
type EducationDetail = {
  educationType: string;
  educationStream: string;
  marksScored: number;
  startYear: number;
  passedoutYear: number;
  percentage: number;
  schoolOrUniversity: string;
};
type EmployeeEducationFormData = {
  educationDetails: EducationDetail[];
};

// Employee Emergency Contact form data type
type EmployeeEmergencyContactFormData = {
  relationName: string;
  relation: string;
  relationPhone: string;
  relationAddress: string;
};
const AddEmployee: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState("details");
  const [activeSubTab, setActiveSubTab] = useState("basic");
  const [departments, setDepartments] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValidToken, setHasValidToken] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  // Check for valid token on mount - improved validation
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      console.log("=== TOKEN VALIDATION DEBUG ===");
      console.log("Token exists:", !!token);
      console.log("Token value:", token ? token.substring(0, 50) + "..." : "No token");
     
      if (token) {
        // Validate JWT token format (should have 3 parts separated by dots)
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          setHasValidToken(true);
          console.log("Valid JWT token found with", tokenParts.length, "parts");
        } else {
          console.log("Invalid token format - not a valid JWT, parts:", tokenParts.length);
          setHasValidToken(false);
          localStorage.removeItem("token"); // Remove invalid token
        }
      } else {
        console.log("No token found in localStorage");
        setHasValidToken(false);
      }
    };
    
    checkToken();
    
    // Also check token when localStorage changes (e.g., after login)
    const handleStorageChange = () => {
      console.log("Storage changed, rechecking token...");
      checkToken();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  // React Hook Form setup for Employee Registration
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: 3,
      deptId: null,
      designationId: null,
      shiftId: null,
      joinDate: today,
    },
  });
  // React Hook Form setup for Employee Bio
  const {
    register: registerBio,
    handleSubmit: handleSubmitBio,
    control: controlBio,
    reset: resetBio,
    watch: watchBio,
    formState: { errors: errorsBio },
  } = useForm<EmployeeBioFormData>({
    defaultValues: {
      mobile: "",
      bloodGroup: "",
      religion: "",
      currentAddress: "",
      permanentAddress: "",
      isMarried: false,
      spouseName: "",
      spouseOccupation: "",
      totalChildren: 0,
    },
  });
  // Watch marital status to conditionally enable/disable spouse fields
  const isMarried = watchBio("isMarried");
  // React Hook Form setup for Employee Education
  const {
    register: registerEducation,
    handleSubmit: handleSubmitEducation,
    control: controlEducation,
    reset: resetEducation,
    setValue: setValueEducation,
    getValues: getValuesEducation,
    formState: { errors: errorsEducation },
  } = useForm<EmployeeEducationFormData>({
    defaultValues: {
      educationDetails: [
        {
          educationType: "",
          educationStream: "",
          marksScored: 0,
          startYear: 0,
          passedoutYear: 0,
          percentage: 0,
          schoolOrUniversity: "",
        },
      ],
    },
  });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: controlEducation,
    name: "educationDetails",
  });

  // React Hook Form setup for Employee Emergency Contact
  const {
    register: registerEmergencyContact,
    handleSubmit: handleSubmitEmergencyContact,
    control: controlEmergencyContact,
    reset: resetEmergencyContact,
    formState: { errors: errorsEmergencyContact },
  } = useForm<EmployeeEmergencyContactFormData>({
    defaultValues: {
      relationName: "",
      relation: "",
      relationPhone: "",
      relationAddress: "",
    },
  });
  // Fetch departments and designations on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [deptResponse, desigResponse, shiftsResponse] = await Promise.all([
          getDepartments(),
          getDesignations(),
          getShifts(),
        ]);
        // Handle API response structure
        const departmentData =
          (deptResponse as any)?.data || deptResponse || [];
        const designationData =
          (desigResponse as any)?.data || desigResponse || [];
        const shiftsData = (shiftsResponse as any)?.data || shiftsResponse || [];
        setDepartments(
          Array.isArray(departmentData) ? departmentData : []
        );
        setDesignations(
          Array.isArray(designationData) ? designationData : []
        );
        setShifts(Array.isArray(shiftsData) ? shiftsData : []);
      } catch (error) {
        console.error(
          "Error fetching departments/designations/shifts:",
          error
        );
        setDepartments([]);
        setDesignations([]);
        setShifts([]);
        errorToast(
          "Error loading data",
          "Failed to load departments, designations, and shifts"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  // Form submission handler for Employee Registration
  const onSubmit = async (data: EmployeeFormData) => {
    try {
      setIsLoading(true);
      // Create payload matching the API structure
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
        deptId: data.deptId || null,
        designationId: data.designationId || null,
        shiftId: data.shiftId || null,
        joinDate: new Date(data.joinDate).toISOString(),
      };
      await postEmployee(payload);
      successToast(
        "Employee registered successfully!",
        "The new employee has been added to the system."
      );
      reset();
    } catch (error) {
      console.error("Error registering employee:", error);
      errorToast(
        "Registration failed",
        "There was an error registering the employee. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
 
  const onSubmitBio = async (data: EmployeeBioFormData) => {
    const token = localStorage.getItem("token");
    console.log("=== BIO FORM SUBMISSION DEBUG ===");
    console.log("Token exists:", !!token);
    console.log("Token preview:", token ? token.substring(0, 50) + "..." : "No token");
   
    if (!token) {
      console.error("No token found for bio form!");
      errorToast("Authentication required", "Please log in to save bio details.");
      return;
    }
    
    // Validate JWT token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error("Invalid JWT token format!");
      errorToast("Authentication Error", "Invalid token format. Please log in again.");
      localStorage.removeItem("token");
      setHasValidToken(false);
      return;
    }
   
    try {
      setIsLoading(true);
    
     
      // Create payload matching the API structure
      const payload = {
        mobile: data.mobile,
        bloodGroup: data.bloodGroup,
        religion: data.religion,
        currentAddress: data.currentAddress,
        permanentAddress: data.permanentAddress,
        isMarried: data.isMarried,
        spouseName: data.spouseName || "",
        spouseOccupation: data.spouseOccupation || "",
        totalChildren: data.totalChildren || 0,
      };
     
      console.log("API payload:", payload);
      const result = await postEmployeeBio(payload);
      console.log("API response:", result);
     
      successToast(
        "Employee bio saved successfully!",
        "The employee bio information has been saved."
      );
      resetBio();
      setHasValidToken(true); // Update token status on successful API call
    } catch (error: any) {
      console.error("Error saving employee bio:", error);
      console.error("Error response:", error.response);
     
      if (error.response?.status === 401 || error.response?.status === 403) {
        errorToast("Authentication Error", "Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setHasValidToken(false);
        // Optional: Redirect to login page
        // window.location.href = "/login";
      } else {
        const errorMessage = error.response?.data?.message ||
                           error.response?.data?.title ||
                           error.message ||
                           "Unknown error occurred";
        errorToast(
          "Save Failed",
          `Error: ${errorMessage}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Education form submission handler
  const onSubmitEducation = async (data: EmployeeEducationFormData) => {
    const token = localStorage.getItem("token");
    console.log("=== EDUCATION FORM SUBMISSION DEBUG ===");
    console.log("Token exists:", !!token);
    console.log("Token length:", token ? token.length : 0);
    console.log("Token preview:", token ? token.substring(0, 50) + "..." : "No token");
    
    if (!token) {
      console.error("No token found for education form!");
      errorToast("Authentication required", "Please log in to save education details.");
      return;
    }
    
    // Validate JWT token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error("Invalid JWT token format!");
      errorToast("Authentication Error", "Invalid token format. Please log in again.");
      localStorage.removeItem("token");
      setHasValidToken(false);
      return;
    }
   
    try {
      setIsLoading(true);
     
      // Filter out empty education entries
      const filteredEducationDetails = data.educationDetails.filter(
        (edu) => edu.educationType.trim() !== "" && edu.schoolOrUniversity.trim() !== ""
      );
     
      if (filteredEducationDetails.length === 0) {
        errorToast("No Education Data", "Please add at least one education entry.");
        return;
      }
     
      const payload = {
        educationDetails: filteredEducationDetails,
      };
     
      console.log("Education API payload:", payload);
      const result = await postEmployeeEducation(payload);
      console.log("Education API response:", result);
     
      successToast(
        "Education details saved successfully!",
        "The education information has been saved."
      );
      resetEducation();
    } catch (error: any) {
      console.error("Error saving education:", error);
      console.error("Error response:", error.response);
     
      if (error.response?.status === 401 || error.response?.status === 403) {
        errorToast("Authentication Error", "Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setHasValidToken(false);
      } else {
        const errorMessage = error.response?.data?.message ||
                           error.response?.data?.title ||
                           error.message ||
                           "Unknown error occurred";
        errorToast(
          "Save Failed",
          `Error: ${errorMessage}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Emergency Contact form submission handler
  const onSubmitEmergencyContact = async (data: EmployeeEmergencyContactFormData) => {
    const token = localStorage.getItem("token");
    console.log("=== EMERGENCY CONTACT FORM SUBMISSION DEBUG ===");
    console.log("Token exists:", !!token);
    console.log("Token preview:", token ? token.substring(0, 50) + "..." : "No token");
    
    if (!token) {
      console.error("No token found for emergency contact form!");
      errorToast("Authentication required", "Please log in to save emergency contact details.");
      return;
    }
    
    // Validate JWT token format
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error("Invalid JWT token format!");
      errorToast("Authentication Error", "Invalid token format. Please log in again.");
      localStorage.removeItem("token");
      setHasValidToken(false);
      return;
    }
   
    try {
      setIsLoading(true);
     
      const payload = {
        relationName: data.relationName,
        relation: data.relation,
        relationPhone: data.relationPhone,
        relationAddress: data.relationAddress,
      };
     
      console.log("Emergency Contact API payload:", payload);
      const result = await postEmployeeEmergencyContact(payload);
      console.log("Emergency Contact API response:", result);
     
      successToast(
        "Emergency contact saved successfully!",
        "The emergency contact information has been saved."
      );
      resetEmergencyContact();
    } catch (error: any) {
      console.error("Error saving emergency contact:", error);
      console.error("Error response:", error.response);
     
      if (error.response?.status === 401 || error.response?.status === 403) {
        errorToast("Authentication Error", "Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setHasValidToken(false);
      } else {
        const errorMessage = error.response?.data?.message ||
                           error.response?.data?.title ||
                           error.message ||
                           "Unknown error occurred";
        errorToast(
          "Save Failed",
          `Error: ${errorMessage}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const mainTabs = [
    { id: "details", label: "Employee Details" },
    { id: "salary", label: "Salary Information" },
    { id: "transfer", label: "Employee Transfer" }
  ];
  const subTabs = [
    { id: "basic", label: "Basic Information" },
    { id: "bio", label: "Employee Bio" },
    { id: "education", label: "Education / Skills" },
    { id: "emergency", label: "Emergency Contact" },
    { id: "experience", label: "Employee Experience" },
  ];
  const [skillsRows, setSkillsRows] = useState([
    {
      skill: "Graphic Design",
      institution: "Adithya Institution",
      priority: "Core Skill",
      level: "Advanced",
      experience: "3 years",
      cert: null,
    },
    {
      skill: "Java",
      institution: "Self Learning",
      priority: "Secondary Skill",
      level: "Beginner",
      experience: "1 years",
      cert: null,
    },
    {
      skill: "UI/UX Design",
      institution: "Tho Institution",
      priority: "Optional",
      level: "Intermediate",
      experience: "2 years",
      cert: null,
    },
    {
      skill: "",
      institution: "",
      priority: "",
      level: "",
      experience: "",
      cert: null,
    },
  ]);
  const [experienceRows, setExperienceRows] = useState([
    {
      company: "TCS",
      job: "Junior Software Engineer",
      start: "01/04/2020",
      end: "05/03/2021",
      type: "Full-Time",
      cert: null,
    },
    {
      company: "Company",
      job: "Senior Software Engineer",
      start: "05/06/2021",
      end: "03/04/2022",
      type: "Part-time",
      cert: null,
    },
    {
      company: "Genx Thofa",
      job: "Lead Engineer",
      start: "01/06/2022",
      end: "Currently",
      type: "Full-Time",
      cert: null,
    },
    {
      company: "",
      job: "",
      start: "",
      end: "",
      type: "",
      cert: null,
    },
  ]);
  const updateSkillsRow = (index: number, field: string, value: string) => {
    setSkillsRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };
  const updateExperienceRow = (index: number, field: string, value: string) => {
    setExperienceRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };
  const addSkillsRow = () => {
    setSkillsRows([
      ...skillsRows,
      {
        skill: "",
        institution: "",
        priority: "",
        level: "",
        experience: "",
        cert: null,
      },
    ]);
  };
  const addExperienceRow = () => {
    setExperienceRows([
      ...experienceRows,
      { company: "", job: "", start: "", end: "", type: "", cert: null },
    ]);
  };
  const removeSkillsRow = (index: number) => {
    setSkillsRows(skillsRows.filter((_, i) => i !== index));
  };
  const removeExperienceRow = (index: number) => {
    setExperienceRows(experienceRows.filter((_, i) => i !== index));
  };
  const saveSkills = () => {
    // TODO: Implement API call for skills
    console.log("Saving skills:", skillsRows.filter(row => row.skill.trim() !== ""));
    successToast("Skills saved!", "Skills information updated.");
  };
  const saveExperience = () => {
    // TODO: Implement API call for experience
    console.log("Saving experience:", experienceRows.filter(row => row.company.trim() !== ""));
    successToast("Experience saved!", "Experience information updated.");
  };
  const renderSubContent = () => {
    switch (activeSubTab) {
      case "basic":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <h3 className="text-lg font-semibold mb-4">Employee Registration</h3>
            {isLoading && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                <span>Loading...</span>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="border border-input rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="role" className="text-sm font-medium">
                  Role *
                </label>
                <Controller
                  control={control}
                  name="role"
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        field.onChange(parseInt(value))
                      }
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">HR</SelectItem>
                        <SelectItem value="3">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="joinDate" className="text-sm font-medium">
                  Join Date *
                </label>
                <input
                  type="date"
                  id="joinDate"
                  {...register("joinDate", {
                    required: "Join date is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errors.joinDate && (
                  <p className="text-red-500 text-sm">
                    {errors.joinDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="department" className="text-sm font-medium">
                  Department (Optional)
                </label>
                <Controller
                  control={control}
                  name="deptId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept, index) => (
                          <SelectItem
                            key={dept.deptId || dept.id || `dept-${index}`}
                            value={dept.deptId || dept.id}
                          >
                            {dept.deptName || dept.departmentName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="designation" className="text-sm font-medium">
                  Designation (Optional)
                </label>
                <Controller
                  control={control}
                  name="designationId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designations.map((desig, index) => (
                          <SelectItem
                            key={
                              desig.desigId || desig.id || `desig-${index}`
                            }
                            value={desig.desigId || desig.id}
                          >
                            {desig.desigName || desig.designationName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="shift" className="text-sm font-medium">
                  Shift (Optional)
                </label>
                <Controller
                  control={control}
                  name="shiftId"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                      <SelectContent>
                        {shifts.map((shift, index) => (
                          <SelectItem
                            key={shift.shiftId || shift.id || `shift-${index}`}
                            value={shift.shiftId || shift.id}
                          >
                            {shift.shiftName || shift.name} (
                            {shift.shiftStartTiming || shift.startTime} -{" "}
                            {shift.shiftEndTiming || shift.endTime})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {/* Empty div for layout balance */}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => reset()}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register Employee"}
              </button>
            </div>
          </div>
        );
      case "bio":
        return (
          <form
            onSubmit={handleSubmitBio(onSubmitBio)}
            className="transition-opacity duration-300 ease-in-out opacity-100"
          >
            <h3 className="text-lg font-semibold mb-4">Employee Bio</h3>
            {isLoading && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                <span>Loading...</span>
              </div>
            )}
            {!localStorage.getItem("token") && (
              <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
                <div className="font-semibold mb-2">Authentication Required</div>
                <div className="text-sm">
                  Please log in to save bio details.
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="mobile" className="text-sm font-medium">
                  Mobile *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Enter mobile number"
                  {...registerBio("mobile", {
                    required: "Mobile number is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errorsBio.mobile && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.mobile.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="bloodGroup" className="text-sm font-medium">
                  Blood Group *
                </label>
                <Controller
                  control={controlBio}
                  name="bloodGroup"
                  rules={{ required: "Blood group is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errorsBio.bloodGroup && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.bloodGroup.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="religion" className="text-sm font-medium">
                  Religion *
                </label>
                <Controller
                  control={controlBio}
                  name="religion"
                  rules={{ required: "Religion is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hindu">Hindu</SelectItem>
                        <SelectItem value="Muslim">Muslim</SelectItem>
                        <SelectItem value="Christian">Christian</SelectItem>
                        <SelectItem value="Sikh">Sikh</SelectItem>
                        <SelectItem value="Buddhist">Buddhist</SelectItem>
                        <SelectItem value="Jain">Jain</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errorsBio.religion && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.religion.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="isMarried" className="text-sm font-medium">
                  Marital Status *
                </label>
                <Controller
                  control={controlBio}
                  name="isMarried"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">Single</SelectItem>
                        <SelectItem value="true">Married</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="currentAddress" className="text-sm font-medium">
                  Current Address *
                </label>
                <textarea
                  id="currentAddress"
                  rows={3}
                  placeholder="Enter current address"
                  {...registerBio("currentAddress", {
                    required: "Current address is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                {errorsBio.currentAddress && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.currentAddress.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="permanentAddress" className="text-sm font-medium">
                  Permanent Address *
                </label>
                <textarea
                  id="permanentAddress"
                  rows={3}
                  placeholder="Enter permanent address"
                  {...registerBio("permanentAddress", {
                    required: "Permanent address is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                {errorsBio.permanentAddress && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.permanentAddress.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="spouseName" className="text-sm font-medium">
                  {" "}
                  Spouse Name {isMarried && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="spouseName"
                  placeholder={
                    isMarried ? "Enter spouse name" : "Select married status first"
                  }
                  disabled={!isMarried}
                  {...registerBio("spouseName", {
                    required: isMarried
                      ? "Spouse name is required when married"
                      : false,
                  })}
                  className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    isMarried
                      ? "border-input focus:ring-primary/20 focus:border-primary"
                      : "border-muted bg-muted/30 cursor-not-allowed text-muted-foreground"
                  }`}
                />
                {errorsBio.spouseName && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.spouseName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="spouseOccupation" className="text-sm font-medium">
                  {" "}
                  Spouse Occupation {isMarried && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="spouseOccupation"
                  placeholder={
                    isMarried
                      ? "Enter spouse occupation"
                      : "Select married status first"
                  }
                  disabled={!isMarried}
                  {...registerBio("spouseOccupation", {
                    required: isMarried
                      ? "Spouse occupation is required when married"
                      : false,
                  })}
                  className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    isMarried
                      ? "border-input focus:ring-primary/20 focus:border-primary"
                      : "border-muted bg-muted/30 cursor-not-allowed text-muted-foreground"
                  }`}
                />
                {errorsBio.spouseOccupation && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.spouseOccupation.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="totalChildren" className="text-sm font-medium">
                  Total Children
                </label>
                <input
                  type="number"
                  id="totalChildren"
                  min="0"
                  placeholder={
                    isMarried ? "Enter number of children" : "Select married status first"
                  }
                  disabled={!isMarried}
                  {...registerBio("totalChildren", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Cannot be negative" },
                  })}
                  className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                    isMarried
                      ? "border-input focus:ring-primary/20 focus:border-primary"
                      : "border-muted bg-muted/30 cursor-not-allowed text-muted-foreground"
                  }`}
                />
                {errorsBio.totalChildren && (
                  <p className="text-red-500 text-sm">
                    {errorsBio.totalChildren.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {/* Empty div for layout balance */}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => resetBio()}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isLoading || !localStorage.getItem("token")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Bio"}
              </button>
            </div>
          </form>
        );
      case "emergency":
        return (
          <form
            onSubmit={handleSubmitEmergencyContact(onSubmitEmergencyContact)}
            className="transition-opacity duration-300 ease-in-out opacity-100"
          >
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            {isLoading && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                <span>Loading...</span>
              </div>
            )}
            {!localStorage.getItem("token") && (
              <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
                <div className="font-semibold mb-2">Authentication Required</div>
                <div className="text-sm">
                  Please log in to save emergency contact details.
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="relationName" className="text-sm font-medium">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="relationName"
                  placeholder="Enter Contact Name"
                  {...registerEmergencyContact("relationName", {
                    required: "Contact name is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errorsEmergencyContact.relationName && (
                  <p className="text-red-500 text-sm">
                    {errorsEmergencyContact.relationName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="relation" className="text-sm font-medium">
                  Relation *
                </label>
                <Controller
                  control={controlEmergencyContact}
                  name="relation"
                  rules={{ required: "Relation is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select Relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Brother">Brother</SelectItem>
                        <SelectItem value="Sister">Sister</SelectItem>
                        <SelectItem value="Son">Son</SelectItem>
                        <SelectItem value="Daughter">Daughter</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errorsEmergencyContact.relation && (
                  <p className="text-red-500 text-sm">
                    {errorsEmergencyContact.relation.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="relationPhone" className="text-sm font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="relationPhone"
                  placeholder="Enter Phone Number"
                  {...registerEmergencyContact("relationPhone", {
                    required: "Phone number is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {errorsEmergencyContact.relationPhone && (
                  <p className="text-red-500 text-sm">
                    {errorsEmergencyContact.relationPhone.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {/* Empty div for layout balance */}
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="relationAddress" className="text-sm font-medium">
                  Address *
                </label>
                <textarea
                  id="relationAddress"
                  rows={3}
                  placeholder="Enter Address"
                  {...registerEmergencyContact("relationAddress", {
                    required: "Address is required",
                  })}
                  className="border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                {errorsEmergencyContact.relationAddress && (
                  <p className="text-red-500 text-sm">
                    {errorsEmergencyContact.relationAddress.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => resetEmergencyContact()}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !localStorage.getItem("token")}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Emergency Contact"}
              </button>
            </div>
          </form>
        );
      case "education":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <form onSubmit={handleSubmitEducation(onSubmitEducation)}>
              <div className="bg-muted border rounded-lg p-4 mb-6">
                <h4 className="text-lg font-semibold mb-2">Employee Education</h4>
                {isLoading && (
                  <div className="flex items-center justify-center py-4 mb-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
                    <span>Loading...</span>
                  </div>
                )}
                {!localStorage.getItem("token") && (
                  <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
                    <div className="font-semibold mb-2">Authentication Required</div>
                    <div className="text-sm">
                      Please log in to save education details.
                    </div>
                  </div>
                )}
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() =>
                      appendEducation({
                        educationType: "",
                        educationStream: "",
                        marksScored: 0,
                        startYear: 0,
                        passedoutYear: 0,
                        percentage: 0,
                        schoolOrUniversity: "",
                      })
                    }
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
                  >
                    Add +
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border border-border rounded-md overflow-hidden min-w-[800px]">
                    <thead className="bg-muted">
                      <tr>
                        <th className="border border-border p-2 text-left">Education Type</th>
                        <th className="border border-border p-2 text-left">Education Stream</th>
                        <th className="border border-border p-2 text-left">School/University</th>
                        <th className="border border-border p-2 text-left">Start Year</th>
                        <th className="border border-border p-2 text-left">Graduation Year</th>
                        <th className="border border-border p-2 text-left">Marks Scored</th>
                        <th className="border border-border p-2 text-left">Percentage</th>
                        <th className="border border-border p-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educationFields.map((field, index) => (
                        <tr
                          key={field.id}
                          className={
                            !field.educationType
                              ? "border-2 border-primary/20 bg-primary/5"
                              : ""
                          }
                        >
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.educationType`}
                              control={controlEducation}
                              rules={{ required: "Education type is required" }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="text"
                                    placeholder="Education Type"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.educationStream`}
                              control={controlEducation}
                              rules={{ required: "Education stream is required" }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="text"
                                    placeholder="Education Stream"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.schoolOrUniversity`}
                              control={controlEducation}
                              rules={{ required: "School/University is required" }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="text"
                                    placeholder="School/University"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.startYear`}
                              control={controlEducation}
                              rules={{
                                required: "Start year is required",
                                min: { value: 1950, message: "Year must be after 1950" },
                                max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                              }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="number"
                                    placeholder="Start Year"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.passedoutYear`}
                              control={controlEducation}
                              rules={{
                                required: "Graduation year is required",
                                min: { value: 1950, message: "Year must be after 1950" },
                                max: { value: new Date().getFullYear() + 10, message: "Year seems too far in future" }
                              }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="number"
                                    placeholder="Graduation Year"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.marksScored`}
                              control={controlEducation}
                              rules={{
                                required: "Marks scored is required",
                                min: { value: 0, message: "Marks cannot be negative" }
                              }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="number"
                                    placeholder="Marks Scored"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2">
                            <Controller
                              name={`educationDetails.${index}.percentage`}
                              control={controlEducation}
                              rules={{
                                required: "Percentage is required",
                                min: { value: 0, message: "Percentage cannot be negative" },
                                max: { value: 100, message: "Percentage cannot exceed 100" }
                              }}
                              render={({ field: f, fieldState: { error } }) => (
                                <div>
                                  <input
                                    {...f}
                                    type="number"
                                    step="0.01"
                                    placeholder="Percentage"
                                    className="w-full border-0 focus:outline-none bg-transparent"
                                  />
                                  {error && (
                                    <p className="text-red-500 text-xs mt-1">
                                      {error.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </td>
                          <td className="border border-border p-2 text-center">
                            {educationFields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeEducation(index)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded flex items-center justify-center mx-auto"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetEducation();
                    }}
                    className="bg-muted hover:bg-muted/80 text-foreground px-6 py-2 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !localStorage.getItem("token")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Saving..." : "Save Education"}
                  </button>
                </div>
              </div>
            </form>
            <div className="bg-muted border rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2">Employee Skills</h4>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={addSkillsRow}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Add +
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-md overflow-hidden min-w-[600px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border border-border p-2 text-left">
                        Skill Name
                      </th>
                      <th className="border border-border p-2 text-left">
                        Institution Name
                      </th>
                      <th className="border border-border p-2 text-left">
                        Skill Priority
                      </th>
                      <th className="border border-border p-2 text-left">
                        Proficiency Level
                      </th>
                      <th className="border border-border p-2 text-left">
                        Experience With Skill
                      </th>
                      <th className="border border-border p-2 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {skillsRows.map((row, index) => (
                      <tr
                        key={index}
                        className={
                          !row.skill
                            ? "border-2 border-primary/20 bg-primary/5"
                            : ""
                        }
                      >
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.skill}
                            onChange={(e) => updateSkillsRow(index, "skill", e.target.value)}
                            placeholder="Skill Name"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.institution}
                            onChange={(e) => updateSkillsRow(index, "institution", e.target.value)}
                            placeholder="Institution Name"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.priority}
                            onChange={(e) => updateSkillsRow(index, "priority", e.target.value)}
                            placeholder="Skill Priority"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.level}
                            onChange={(e) => updateSkillsRow(index, "level", e.target.value)}
                            placeholder="Proficiency Level"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.experience}
                            onChange={(e) => updateSkillsRow(index, "experience", e.target.value)}
                            placeholder="Experience With Skill"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2 text-center">
                          {index < skillsRows.length - 1 && (
                            <button
                              type="button"
                              onClick={() => removeSkillsRow(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded flex items-center justify-center mx-auto"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setSkillsRows([
                    ...skillsRows.slice(0, 3),
                    { skill: "", institution: "", priority: "", level: "", experience: "", cert: null },
                  ]);
                }}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveSkills}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Save Skills
              </button>
            </div>
            <div className="bg-muted border rounded-lg p-4 mt-6">
              <h4 className="text-lg font-semibold mb-2">Employee Experience</h4>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={addExperienceRow}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Add +
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-md overflow-hidden min-w-[600px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border border-border p-2 text-left">
                        Company
                      </th>
                      <th className="border border-border p-2 text-left">
                        Job Title / Designation
                      </th>
                      <th className="border border-border p-2 text-left">
                        Start Date
                      </th>
                      <th className="border border-border p-2 text-left">
                        End Date
                      </th>
                      <th className="border border-border p-2 text-left">
                        Employment Type
                      </th>
                      <th className="border border-border p-2 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {experienceRows.map((row, index) => (
                      <tr
                        key={index}
                        className={
                          !row.company
                            ? "border-2 border-primary/20 bg-primary/5"
                            : ""
                        }
                      >
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.company}
                            onChange={(e) => updateExperienceRow(index, "company", e.target.value)}
                            placeholder="Company"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.job}
                            onChange={(e) => updateExperienceRow(index, "job", e.target.value)}
                            placeholder="Job Title / Designation"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.start}
                            onChange={(e) => updateExperienceRow(index, "start", e.target.value)}
                            placeholder="Start Date"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.end}
                            onChange={(e) => updateExperienceRow(index, "end", e.target.value)}
                            placeholder="End Date"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.type}
                            onChange={(e) => updateExperienceRow(index, "type", e.target.value)}
                            placeholder="Employment Type"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2 text-center">
                          {index < experienceRows.length - 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperienceRow(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded flex items-center justify-center mx-auto"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setExperienceRows([
                    ...experienceRows.slice(0, 3),
                    { company: "", job: "", start: "", end: "", type: "", cert: null },
                  ]);
                }}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveExperience}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Save Experience
              </button>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <div className="bg-muted border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Employee Experience</h3>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={addExperienceRow}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  Add +
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-md overflow-hidden min-w-[600px]">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border border-border p-2 text-left">
                        Company
                      </th>
                      <th className="border border-border p-2 text-left">
                        Job Title / Designation
                      </th>
                      <th className="border border-border p-2 text-left">
                        Start Date
                      </th>
                      <th className="border border-border p-2 text-left">
                        End Date
                      </th>
                      <th className="border border-border p-2 text-left">
                        Employment Type
                      </th>
                      <th className="border border-border p-2 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {experienceRows.map((row, index) => (
                      <tr
                        key={index}
                        className={
                          !row.company
                            ? "border-2 border-primary/20 bg-primary/5"
                            : ""
                        }
                      >
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.company}
                            onChange={(e) => updateExperienceRow(index, "company", e.target.value)}
                            placeholder="Company"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.job}
                            onChange={(e) => updateExperienceRow(index, "job", e.target.value)}
                            placeholder="Job Title / Designation"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.start}
                            onChange={(e) => updateExperienceRow(index, "start", e.target.value)}
                            placeholder="Start Date"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.end}
                            onChange={(e) => updateExperienceRow(index, "end", e.target.value)}
                            placeholder="End Date"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2">
                          <input
                            type="text"
                            value={row.type}
                            onChange={(e) => updateExperienceRow(index, "type", e.target.value)}
                            placeholder="Employment Type"
                            className="w-full border-0 focus:outline-none bg-transparent"
                          />
                        </td>
                        <td className="border border-border p-2 text-center">
                          {index < experienceRows.length - 1 && (
                            <button
                              type="button"
                              onClick={() => removeExperienceRow(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded flex items-center justify-center mx-auto"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveExperience}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <p>Content for {activeSubTab} coming soon...</p>
          </div>
        );
    }
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/employee"> Employee </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Employee</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Employee Data
          </h1>
          <div className="mb-4 md:mb-6">
            <ul className="flex flex-wrap gap-1 md:gap-2 bg-muted/50 rounded-2xl p-2">
              {mainTabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`px-2 md:px-4 py-2 rounded-xl cursor-pointer transition-colors duration-200 text-xs md:text-sm ${
                    activeMainTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-muted/30"
                  }`}
                  onClick={() => setActiveMainTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
              <li className="flex-1" />
            </ul>
          </div>
          {activeMainTab === "details" && (
            <div className="mb-4 md:mb-6">
              <ul className="flex flex-wrap gap-1 md:gap-2 bg-muted/50 rounded-2xl p-2">
                {subTabs.map((tab) => (
                  <li
                    key={tab.id}
                    className={`px-2 md:px-3 py-2 rounded-xl text-xs md:text-sm cursor-pointer transition-colors duration-200 ${
                      activeSubTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-muted/30"
                    }`}
                    onClick={() => setActiveSubTab(tab.id)}
                  >
                    {tab.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Content */}
          <div className="bg-background rounded-lg p-4 md:p-6 shadow-sm border border-border">
            {activeMainTab === "details" ? (
              activeSubTab === "basic" ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderSubContent()}
                </form>
              ) : (
                renderSubContent()
              )
            ) : (
              <div className="transition-opacity duration-300 ease-in-out opacity-100">
                <p>Content for {activeMainTab} coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEmployee;