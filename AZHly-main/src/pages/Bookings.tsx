import React, { useState } from "react";
import { Search, Filter, Plus, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import RecentBookings from "@/components/features/RecentBookings";
import { CLASSROOMS } from "@/constants/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUSES = ["All", "Available", "Occupied", "Maintenance"];

const Bookings: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = CLASSROOMS.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.department.toLowerCase().includes(search.toLowerCase()) ||
      b.room.toLowerCase().includes(search.toLowerCase()) ||
      b.block.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || b.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Find classrooms across the institution and review availability.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success("Classroom report exported successfully!")}
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-xl text-sm hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => toast.success("New classroom form opened")}
            className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Classroom
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-5 shadow-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID, department, room or block..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                  status === s
                    ? "gradient-purple-pink text-white shadow-brand-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <RecentBookings bookings={filtered} showViewAll={false} />
    </DashboardLayout>
  );
};

export default Bookings;
