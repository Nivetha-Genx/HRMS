import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AppSidebar } from "@/components/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

// Auth Pages
import { LoginForm } from '../authentication/Login-Page';
import { Signup as SignupForm } from '../authentication/Signup';
import { OTP as OTPForm } from '../authentication/OTP-Page';
import { Resetpassword as ResetPasswordForm } from '../authentication/Reset-Password';
import { Forgot as ForgotForm } from '../authentication/forgot';

// Dashboard Pages
import Dashboard1 from '../componentsUI/Dashboard/Dashboard1';
import Employee from '../componentsUI/Employee/Employee';
import Attendance from '../componentsUI/Attendance/Attendance';
import Leave from '../componentsUI/Leave/Leave';
import Projects from '../componentsUI/Projects/Projects';
import Payroll from '../componentsUI/Payroll/Payroll';
import Payslip from '../componentsUI/Payroll/Payslip';

// Auth Page Wrappers with Layout
function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}

function Forgot() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotForm />
      </div>
    </div>
  );
}

function OTP() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPForm />
      </div>
    </div>
  );
}

function Resetpassword() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}

// Layout component with sidebar
function DashboardLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        
        {/* Dashboard Routes with Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard1 />} />
          <Route path="dashboard1" element={<Dashboard1 />} />
          <Route path="employee" element={<Employee />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="projects" element={<Projects />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>
        
        {/* Standalone Routes */}
        <Route path="/payslip" element={<Payslip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;