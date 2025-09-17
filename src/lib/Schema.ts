import * as yup from "yup"

export const loginSchema = yup.object({
  email     : yup.string().email("Invalid email")
                  .required("Email is required")              
                  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/, "Invalid email format"),
  password  : yup.string()
                  .required("Password is required")
                  .min(8, "Password must be at least 8 characters long")                                  
                  .matches(/[A-Za-z]/, "Password must contain at least one letter")
                  .matches(/\d.*\d.*\d/, "Password must contain at least 3 numbers")
                  .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const signupSchema= yup.object({
  firstName     : yup.string()
                      .required("First Name is required")
                      .matches(/^[A-Za-z ]+$/),
  lastName      : yup.string()
                      .required("Last Name is required")
                      .matches(/^[A-Za-z ]+$/, "Last name must contain only letters"),
                      
  email         : yup .string()
                      .email("Invalid email")
                      .required("Email is required")              
                      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/, "Invalid email format"),
  dob           : yup.string().required("DOB is required"),
  phoneNumber   : yup.string()
                     .matches(/^[0-9]{10}$/, "Must be 10 digits")
                     .required("Phone number is required"),
 password       : yup.string()
                      .required("Password is required")
                      .min(8, "Password must be at least 8 characters long")                                  
                      .matches(/[A-Za-z]/, "Password must contain at least one letter")
                      .matches(/\d.*\d.*\d/, "Password must contain at least 3 numbers")
                      .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
confirmpassword : yup.string()
                     .required("Password is required")
                     .min(8, "Password must be at least 8 characters long")                                  
                     .matches(/[A-Za-z]/, "Password must contain at least one letter")
                     .matches(/\d.*\d.*\d/, "Password must contain at least 3 numbers")
                     .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
                     .oneOf([yup.ref("password")], "Passwords must match"), 
})

export const forgotSchema = yup.object({
  email               : yup .string()
                            .email("Invalid email")
                            .required("Email is required")              
                            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/, "Invalid email format"),
})

export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("Enter OTP")
    .test("is-numeric", "OTP must be exactly 6 digits", (value) => {
      return typeof value === "string" && /^[0-9]{6}$/.test(value.trim());
    })
});

export const resetSchema = yup.object({
  newPassword: yup.string()
                  .required("Password is required")
                  .min(8, "Password must be at least 8 characters long")                                  
                  .matches(/[A-Za-z]/, "Password must contain at least one letter")
                  .matches(/\d.*\d.*\d/, "Password must contain at least 3 numbers")
                  .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

   confirmPassword: yup.string()
                  .required("Password is required")
                  .oneOf([yup.ref("newPassword")], "Passwords do not match"),
})

export const employeeSchema = yup.object({
  employeeId            : yup.string().required("Employee ID is required"),
  employeeName          : yup.string()
                             .required("Employee Name is required")
                             .trim() 
                             .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Only alphabets and single spaces allowed"),

  email                 : yup.string().email("Invalid email")
                                      .required("Email is required")
                                      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/, "Invalid email format"),
  phoneNumber           : yup.string()
                             .matches(/^[0-9]{10}$/, "Must be 10 digits")
                             .required("Phone number is required"),
  position              : yup.string().required("Position is required"),
  department            : yup.string().required("Department is required"),
  gender                : yup.string().required("Gender is required"),
  dob                   : yup.string().required("Date of Birth is required"), 
  emergencyNumber       : yup.string()
                             .matches(/^[0-9]{10}$/, "Must be 10 digits")
                             .required("Emergency number is required"),
  bloodGroup            : yup.string().required("Blood Group is required"),
  nationality           : yup.string().required("Nationality is required"),
  religion              : yup.string().required("Religion is required"),
  maritalStatus         : yup.string().required("Marital Status is required"), 
  qualification         : yup.string().required("Qualification is required"),
  experience            : yup.string().required("Experience is required"),
  address               : yup.string().required("Address is required"),


  netSalary             : yup.number()
                             .typeError("Net Salary must be a number")
                             .positive("Net Salary must be positive")
                             .required("Net Salary is required"),
  basic                 : yup.number()
                             .typeError("Basic must be a number")
                             .positive("Basic must be positive")
                             .required("Basic is required"),
  conveyance            : yup.number()
                             .typeError("Conveyance must be a number")
                             .positive("Conveyance must be positive")
                             .required("Conveyance is required"),
  medicalAllowance      : yup.number()
                             .typeError("Medical Allowance must be a number")
                             .positive("Medical Allowance must be positive")
                             .required("Medical Allowance is required"),
  ESI                   : yup.number()
                             .typeError("ESI must be a number")
                             .positive("ESI must be positive")
                             .min(0, "ESI cannot be negative")
                             .required("ESI is required"),
  PF                   : yup.number()
                            .typeError("PF must be a number")
                            .positive("PF must be positive")
                            .min(0, "PF cannot be negative")
                            .required("PF is required"),
  laborWelfare          : yup.number()
                             .typeError("Labor Welfare must be a number")
                             .positive("Labour Welfare must be positive")
                             .min(0, "Labor Welfare cannot be negative")
                             .required("Labor Welfare is required"),
});


export const leaveSchema = yup.object({

  employeeId    : yup.string().required("Employee ID is required"),
  employeeName  : yup.string().required("Employee Name is required")
                              .matches(/^[A-Za-z ]+$/),
  leaveType     : yup.string().required("Leave Type is required"),
  fromDate      : yup.string().required("From Date is required"),
  toDate        : yup.string().required("To Date is required"),
  numberofdays   : yup.number().typeError("Number of Days must be a number")
                               .positive("Number of Days must be positive")
                               .required("Number of Days is required"),
  reason        : yup.string().required("Reason is required"),
});

export const projectSchema = yup.object({

  projectId     : yup.string().required("Project ID is required"),
  projectName   : yup.string().required("Project Name is required"),
  leader        : yup.string().required("Project Leader is required"),
  team          : yup.array()
                     .of(yup.string().required())
                     .min(2, "Select at least two team member")
                     .required("Team is required"), 
  deadLine      : yup.string().required("Deadline is required"),
  priority      : yup.string().required("Priority is required"),
  status        : yup.string().required("Status is required"),
  description   : yup.string().required("Description is required"),
});