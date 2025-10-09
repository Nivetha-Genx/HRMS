import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

type LeaveCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: string; 
  extra?: string;
  subtitle?:string;
  remainingLeaves?:string;
  role?: "admin" | "employee";
  extraField1?: string;
  extraField2?: string;

};

export default function LeaveCard({ icon, title, value, color, extra, subtitle, remainingLeaves,role="admin",extraField1, extraField2}: LeaveCardProps) {

  return (
    <div className="relative flex items-center bg-white rounded-xl shadow p-4 overflow-hidden">
       <div
          className={`absolute left-0 top-0 h-full w-20 sm:w-24 ${color} flex items-center justify-center`}
             style={{ clipPath: "polygon(0 0, 60% 0, 100% 100%, 100% 160%, 0 150%)",}}>
                {icon}
       </div>

       <div className="ml-24 sm:ml-28">
          <p className="text-gray-800 font-bold text-sm">{title}</p>
          <p className="text-xl font-bold text-gray-500">
              {value} {extra && <span className="text-gray-400">{extra}</span>}
          </p>
          {subtitle && remainingLeaves && (
          <p className="text-gray-500 text-sm">
            {subtitle} : {remainingLeaves}
          </p>
        )}

        {role === "employee" && (
          <div className="mt-2 space-y-1">
            {extraField1 && <p className="text-gray-600 text-sm">{extraField1}</p>}
            {extraField2 && <p className="text-gray-600 text-sm">{extraField2}</p>}
          </div>
        )}
         
         
       </div>
    </div>
  );
}
