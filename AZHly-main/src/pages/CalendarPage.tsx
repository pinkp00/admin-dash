import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UPCOMING_SCHEDULE } from "@/constants/data";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MOCK_EVENTS: Record<number, { label: string; color: string }[]> = {
  22: [{ label: "Study Room A - Ali Khan", color: "bg-purple-500" }],
  23: [{ label: "Conference Room - Sara", color: "bg-pink-500" }],
  25: [{ label: "Event Hall - Hira Sheikh", color: "bg-blue-500" }],
  27: [{ label: "Private Office - Zain", color: "bg-teal-500" }],
  28: [{ label: "Study Room B - Usman", color: "bg-violet-500" }, { label: "Meeting Room 1 - Ayesha", color: "bg-pink-400" }],
};

const CalendarPage: React.FC = () => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground text-sm mt-0.5">View and manage your booking schedule</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Calendar Grid */}
        <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{MONTHS[viewMonth]} {viewYear}</h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextMonth} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              const hasEvents = day !== null && MOCK_EVENTS[day];
              const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
              const isSelected = day === selectedDay;
              return (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDay(day)}
                  className={cn(
                    "min-h-[52px] p-1 rounded-xl text-xs cursor-pointer transition-all",
                    day === null ? "opacity-0 pointer-events-none" : "hover:bg-muted/60",
                    isToday && "ring-2 ring-primary/60",
                    isSelected && !isToday && "bg-primary/10"
                  )}
                >
                  {day !== null && (
                    <>
                      <span className={cn(
                        "w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mb-0.5",
                        isToday ? "gradient-purple-pink text-white" : "text-foreground"
                      )}>
                        {day}
                      </span>
                      {hasEvents && (
                        <div className="space-y-0.5">
                          {MOCK_EVENTS[day].slice(0, 2).map((ev, i) => (
                            <div key={i} className={cn("w-full h-1 rounded-full", ev.color)} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold mb-4">Upcoming Schedule</h3>
          <div className="space-y-3">
            {UPCOMING_SCHEDULE.map((item, i) => (
              <div key={i} className="flex gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted/60 transition-colors">
                <div className={cn("w-1 rounded-full shrink-0", item.color)} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{item.space}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.user}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground">{item.startTime} – {item.endTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
