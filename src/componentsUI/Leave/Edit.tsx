import React, { useState, useEffect } from "react";
"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaveSchema } from "@/lib/Schema";
import * as yup from "yup";
import { getDropdownData, putLeave, getLeave } from "../../Services/ApiService";
import { successToast, errorToast } from "@/lib/toast";
import { useParams } from "react-router-dom";

type LeaveFormValues = yup.InferType<typeof leaveSchema>;

const EditLeaveRequest: React.FC = () => {
  const { leaveId } = useParams<{ leaveId: string }>();

  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [leaveTypes, setLeaveTypes] = useState<{ id: number; name: string; value: string }[]>([]);
  const [teamLeads, setTeamLeads] = useState<{ id: number; name: string }[]>([]);

  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<LeaveFormValues>({
    resolver: yupResolver(leaveSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      dayBreakdown: "",
      reqfromtl: "",
      numberofdays: 0,
      reason: "",
    },
  });

  // Fetch dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const { leaveTypes, teamLeads } = await getDropdownData();
        setLeaveTypes(leaveTypes);
        setTeamLeads(teamLeads);
      } catch {
        console.log("Failed to load dropdowns");
      }
    };
    fetchDropdowns();
  }, []);

  // Fetch leave details by ID
  useEffect(() => {
    const fetchLeave = async () => {
      if (!leaveId) return;
      try {
        const leave = await getLeave(leaveId);
        reset({
          employeeId: leave.employeeId,
          employeeName: leave.employeeName,
          leaveType: leave.leaveType,
          fromDate: leave.fromDate ?? undefined, 
          toDate: leave.toDate ?? undefined, 
          dayBreakdown: leave.dayBreakdown,
          reqfromtl: leave.reqfromtl,
          numberofdays: leave.numberofdays,
          reason: leave.reason,
        });
        setFromDate(leave.fromDate ? new Date(leave.fromDate) : undefined);
        setToDate(leave.toDate ? new Date(leave.toDate) : undefined);
      } catch (err) {
        console.log("Failed to fetch leave details", err);
      }
    };
    fetchLeave();
  }, [leaveId, reset]);

  // Update number of days when dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const diff = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      setValue("numberofdays", diff);
    } else {
      setValue("numberofdays", 0);
    }
  }, [fromDate, toDate, setValue]);

  const onSubmit = async (data: LeaveFormValues) => {
     if (!leaveId) return;
    try {
      const payload = {
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        leaveType: data.leaveType,
        fromDate: fromDate ? fromDate.toISOString().split("T")[0] : "",
        toDate: toDate ? toDate.toISOString().split("T")[0] : "",
        dayBreakdown: data.dayBreakdown,
        numberofdays: data.numberofdays,
        reqfromtl: data.reqfromtl,
        reason: data.reason,
      };
      await putLeave(leaveId, payload);
      successToast("Leave updated successfully", "The leave request has been updated.");
    } catch (err) {
      console.log("Error updating leave request", err);
      errorToast("Error updating leave request", "Please try again.");
    }
  };

  return (
    <div className="w-full px-20 md:px-20 py-20 bg-white">
      <h3 className="text-lg font-semibold mb-6">Edit Leave Request</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-15 w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Employee ID */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">EmployeeId</label>
          <Input id="employeeId" {...register("employeeId")} />
          {errors.employeeId && <p className="text-sm text-red-700">{errors.employeeId.message}</p>}
        </div>

        {/* Employee Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Employee Name</label>
          <input
            type="text"
            {...register("employeeName")}
            readOnly
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
          />
        </div>

        {/* Leave Type */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Leave Type</label>
          <Controller
            control={control}
            name="leaveType"
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="leaveType" className="w-full h-10">
                  <SelectValue placeholder="Select Leave Type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.length > 0 ? (
                    leaveTypes.map((type) => <SelectItem key={type.id} value={type.value}>{type.name}</SelectItem>)
                  ) : (
                    <SelectItem disabled value="loading">Loading...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.leaveType && <p className="text-sm text-red-700">{errors.leaveType.message}</p>}
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Start Date</label>
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <Popover open={openFrom} onOpenChange={setOpenFrom}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="fromDate" className="justify-between font-normal">
                    {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => {
                      setFromDate(date || undefined);
                      field.onChange(date ? date.toLocaleDateString("en-CA") : "");
                      setOpenFrom(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.fromDate && <p className="text-sm text-red-700">{errors.fromDate.message}</p>}
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">End Date</label>
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <Popover open={openTo} onOpenChange={setOpenTo}>
                <PopoverTrigger asChild>
                  <Button variant="outline" id="toDate" className="justify-between font-normal">
                    {field.value ? new Date(field.value).toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => {
                      setToDate(date || undefined);
                      field.onChange(date ? date.toLocaleDateString("en-CA") : "");
                      setOpenTo(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.toDate && <p className="text-sm text-red-700">{errors.toDate.message}</p>}
        </div>

        {/* Number of Days */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Number of Days</label>
          <Input id="numberofdays" type="number" {...register("numberofdays")} />
          {errors.numberofdays && <p className="text-sm text-red-700">{errors.numberofdays.message}</p>}
        </div>

        {/* Day Breakdown */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Day Breakdown (if Same-day)</label>
          <Controller
            control={control}
            name="dayBreakdown"
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="daybreakdown" className="w-full h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Day">Full Day</SelectItem>
                  <SelectItem value="Half Day">Half Day</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.dayBreakdown && <p className="text-sm text-red-700">{errors.dayBreakdown.message}</p>}
        </div>

        {/* Request from Team Lead */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Request from Team Lead</label>
          <Controller
            control={control}
            name="reqfromtl"
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="reqfromtl" className="w-full h-10">
                  <SelectValue placeholder="Select Team Lead" />
                </SelectTrigger>
                <SelectContent>
                  {teamLeads.length > 0 ? (
                    teamLeads.map((lead) => <SelectItem key={lead.id} value={lead.name}>{lead.name}</SelectItem>)
                  ) : (
                    <SelectItem disabled value="loading">Loading...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.reqfromtl && <p className="text-sm text-red-700">{errors.reqfromtl.message}</p>}
        </div>

        {/* Remarks */}
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm text-gray-700 mb-1 font-semibold">Remarks</label>
          <Textarea id="reason" placeholder="Enter your reason here" {...register("reason")} />
          {errors.reason && <p className="text-sm text-red-700">{errors.reason.message}</p>}
        </div>

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-xl text-sm bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm hover:bg-gray-900"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeaveRequest;
