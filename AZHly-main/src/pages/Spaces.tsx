import React, { useState } from "react";
import { Search, Plus, Wifi, Projector, Users, MapPin } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SPACES } from "@/constants/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
  Available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Occupied: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Maintenance: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
};

const Spaces: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Available", "Occupied", "Maintenance"];

  const filtered = SPACES.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Spaces</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage all bookable spaces</p>
        </div>
        <button
          onClick={() => toast.success("Add space form opened")}
          className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Space
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search spaces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                filter === f ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-card border border-border hover:bg-muted text-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((space) => (
          <div key={space.id} className="card-hover bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{space.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{space.type}</p>
              </div>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", STATUS_STYLES[space.status])}>
                {space.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5 text-primary" />
                {space.capacity} people
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-pink-500" />
                {space.floor}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {space.amenities.map((a) => (
                <span key={a} className="px-2 py-0.5 bg-muted rounded-md text-[11px] text-muted-foreground">
                  {a}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-primary">${space.pricePerHour}<span className="text-xs text-muted-foreground font-normal">/hr</span></p>
              <button
                onClick={() => toast.success(`${space.name} details opened`)}
                className="px-3 py-1.5 text-xs font-semibold gradient-purple-pink text-white rounded-lg shadow-brand-sm hover:opacity-90 transition-opacity"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Spaces;
