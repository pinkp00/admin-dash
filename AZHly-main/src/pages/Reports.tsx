import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { Download, TrendingUp, CalendarDays, DollarSign, Users, Building2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const MONTHLY_DATA = [
  { month: "Jan", bookings: 380, revenue: 6200, users: 42 },
  { month: "Feb", bookings: 420, revenue: 7100, users: 58 },
  { month: "Mar", bookings: 510, revenue: 8900, users: 71 },
  { month: "Apr", bookings: 640, revenue: 10800, users: 89 },
  { month: "May", bookings: 960, revenue: 15800, users: 112 },
  { month: "Jun", bookings: 820, revenue: 13400, users: 98 },
  { month: "Jul", bookings: 740, revenue: 12200, users: 87 },
  { month: "Aug", bookings: 880, revenue: 14600, users: 104 },
  { month: "Sep", bookings: 1020, revenue: 17200, users: 131 },
  { month: "Oct", bookings: 940, revenue: 15900, users: 118 },
  { month: "Nov", bookings: 1100, revenue: 19400, users: 145 },
  { month: "Dec", bookings: 1245, revenue: 24680, users: 164 },
];

const TOP_SPACES = [
  { name: "Study Room A", bookings: 435, revenue: 6525, occupancy: 92 },
  { name: "Conference Room", bookings: 312, revenue: 14040, occupancy: 78 },
  { name: "Private Office", bookings: 249, revenue: 7470, occupancy: 65 },
  { name: "Event Hall", bookings: 125, revenue: 18750, occupancy: 48 },
  { name: "Meeting Room 1", bookings: 124, revenue: 3100, occupancy: 55 },
];

const SUMMARY = [
  { label: "Total Sessions", value: "1,245", icon: CalendarDays, gradient: "gradient-blue-purple", change: "+12.5%" },
  { label: "Average Attendance", value: "24.8", icon: DollarSign, gradient: "gradient-purple-pink", change: "+18.4%" },
  { label: "Active Departments", value: "8", icon: Users, gradient: "gradient-teal-blue", change: "+9.7%" },
  { label: "Available Classrooms", value: "18", icon: Building2, gradient: "gradient-pink-orange", change: "+5.2%" },
];

const Reports: React.FC = () => {
  const [revenueView, setRevenueView] = useState<"revenue" | "bookings">("revenue");

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Classroom utilization, schedule trends, and department insights.</p>
        </div>
        <button
          onClick={() => toast.success("Report exported!")}
          className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUMMARY.map(({ label, value, icon: Icon, gradient, change }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 shadow-card card-hover">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-brand-sm", gradient)}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold mt-0.5">{value}</p>
            <p className="text-xs font-medium text-emerald-500 mt-1">↑ {change.replace("+", "")} from last month</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-card mb-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold">Annual Overview</h3>
          <div className="flex gap-2">
            {(["revenue", "bookings"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setRevenueView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                  revenueView === v ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="repGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px", color: "hsl(var(--foreground))" }}
            />
            <Area type="monotone" dataKey={revenueView} stroke="#8B5CF6" strokeWidth={2.5} fill="url(#repGrad)" dot={false} activeDot={{ r: 5, fill: "#8B5CF6" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Spaces + Monthly Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Spaces */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="text-base font-semibold mb-4">Top Performing Spaces</h3>
          <div className="space-y-3">
            {TOP_SPACES.map((space, i) => (
              <div key={space.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{space.name}</p>
                    <span className="text-xs text-primary font-semibold">{space.occupancy}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-purple-pink"
                      style={{ width: `${space.occupancy}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[11px] text-muted-foreground">{space.bookings} bookings</span>
                    <span className="text-[11px] text-muted-foreground">${space.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Users Bar */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h3 className="text-base font-semibold mb-4">New Users per Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px", color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="users" name="New Users" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
