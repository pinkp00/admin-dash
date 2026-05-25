import React, { useState } from "react";
import { Search, Plus, Clock, Star, Wifi, Coffee, Monitor, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SERVICES = [
  { id: "SRV001", name: "High-Speed WiFi", category: "Connectivity", price: 0, unit: "Included", description: "Gigabit fiber internet access across all spaces.", icon: Wifi, available: true, rating: 4.9, bookings: 1245 },
  { id: "SRV002", name: "Catering & Refreshments", category: "Food & Beverage", price: 25, unit: "per person", description: "In-room catering with beverages, snacks, and full meals.", icon: Coffee, available: true, rating: 4.7, bookings: 384 },
  { id: "SRV003", name: "AV & Projection Setup", category: "Technology", price: 40, unit: "per session", description: "Full HD projector, screen, and audio system setup.", icon: Monitor, available: true, rating: 4.8, bookings: 512 },
  { id: "SRV004", name: "On-Site Receptionist", category: "Staffing", price: 60, unit: "per day", description: "Professional front desk support and visitor management.", icon: Users, available: false, rating: 4.6, bookings: 148 },
  { id: "SRV005", name: "Extended Hours Access", category: "Access", price: 20, unit: "per hour", description: "Book spaces outside standard operating hours (8PM–8AM).", icon: Clock, available: true, rating: 4.5, bookings: 276 },
  { id: "SRV006", name: "Premium Experience Pack", category: "Bundle", price: 120, unit: "per event", description: "WiFi + Catering + AV + Receptionist bundled for events.", icon: Star, available: true, rating: 5.0, bookings: 93 },
];

const CATEGORIES = ["All", "Connectivity", "Food & Beverage", "Technology", "Staffing", "Access", "Bundle"];

const Services: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = SERVICES.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || s.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage add-on services for space bookings</p>
        </div>
        <button
          onClick={() => toast.success("Add service form opened")}
          className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                category === c ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-card border border-border hover:bg-muted text-muted-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.id} className="card-hover bg-card border border-border rounded-2xl p-5 shadow-card flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl gradient-purple-pink flex items-center justify-center shadow-brand-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-semibold",
                  service.available
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                    : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                )}>
                  {service.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <h3 className="font-semibold text-base mb-1">{service.name}</h3>
              <span className="inline-block px-2 py-0.5 bg-muted rounded-md text-[11px] text-muted-foreground mb-2 self-start">{service.category}</span>
              <p className="text-sm text-muted-foreground flex-1 mb-4">{service.description}</p>

              <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-foreground">{service.rating}</span>
                </div>
                <span>·</span>
                <span>{service.bookings.toLocaleString()} bookings</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div>
                  {service.price === 0 ? (
                    <span className="text-lg font-bold text-emerald-500">Free</span>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      ${service.price}<span className="text-xs text-muted-foreground font-normal"> {service.unit}</span>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toast.success(`${service.name} details opened`)}
                  className="px-3 py-1.5 text-xs font-semibold gradient-purple-pink text-white rounded-lg shadow-brand-sm hover:opacity-90 transition-opacity"
                >
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground text-sm">No services found.</div>
      )}
    </DashboardLayout>
  );
};

export default Services;
