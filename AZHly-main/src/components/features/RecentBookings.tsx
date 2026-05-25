import React from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Booking } from "@/types";

interface Props {
  bookings: Booking[];
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Cancelled: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

const RecentBookings: React.FC<Props> = ({ bookings, showViewAll = true, onViewAll }) => {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold">Recent Bookings</h3>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Booking ID", "Space", "User", "Date", "Time", "Status", ""].map((col) => (
                <th key={col} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr
                key={b.id}
                className={cn(
                  "border-b border-border/50 hover:bg-muted/30 transition-colors",
                  i === bookings.length - 1 && "border-b-0"
                )}
              >
                <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{b.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{b.space}</td>
                <td className="px-4 py-3 whitespace-nowrap">{b.user}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{b.date}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{b.time}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", STATUS_STYLES[b.status])}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
