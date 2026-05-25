import React from "react";
import { MoreVertical, User } from "lucide-react";
import type { ScheduleItem } from "@/types";

interface Props {
  items: ScheduleItem[];
  onViewCalendar?: () => void;
}

const UpcomingSchedule: React.FC<Props> = ({ items, onViewCalendar }) => {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold">Upcoming Schedule</h3>
        <button
          onClick={onViewCalendar}
          className="text-sm text-primary font-medium hover:underline"
        >
          View Calendar
        </button>
      </div>
      <div className="divide-y divide-border/50">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors">
            <div className="flex flex-col items-end shrink-0 w-16">
              <span className="text-xs font-bold text-foreground">{item.startTime}</span>
              <span className="text-[11px] text-muted-foreground">{item.endTime}</span>
            </div>
            <div className={`w-1 rounded-full self-stretch shrink-0 ${item.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{item.space}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground truncate">{item.user}</span>
              </div>
            </div>
            <button className="p-1 rounded-lg hover:bg-muted transition-colors shrink-0">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedule;
