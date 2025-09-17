import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; 
import { setPayrollPeriod } from "@/Services/PayrollService";

export default function PayrollToolbar() {
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const handleSendToBackend = async (selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  try {
    await setPayrollPeriod(year, month);
    console.log("Sent to backend:", { year, month });
  } catch (err) {
    console.error("Error sending period:", err);
  }
};

  return (
    <div className="flex items-center gap-3 ml-auto">
      <div className="relative">
        <Button variant="default" onClick={() => setOpen(!open)}>
          {date ? `${date.getFullYear()} - ${date.getMonth() + 1}` : "Select Period"}
        </Button>
        {open && (
          <div className="absolute right-0 mt-2 z-10">
            <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={(d) => {
                if (d) {
                setDate(d);
                setOpen(false);
                handleSendToBackend(d); 
             }
                }}
            className="rounded-lg border bg-white shadow-lg"
        />
        </div>
        )}
      </div>
    </div>
  );
}
