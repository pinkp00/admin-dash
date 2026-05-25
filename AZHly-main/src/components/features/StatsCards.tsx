import React from "react";
import { CalendarDays, DollarSign, Users, Building2 } from "lucide-react";
import { TrendingUp } from "lucide-react";

const STATS = [
  {
    label: "Total Bookings",
    value: "1,245",
    change: "12.5% from last month",
    positive: true,
    gradient: "from-purple-500 to-violet-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    icon: CalendarDays,
  },
  {
    label: "Total Revenue",
    value: "$24,680",
    change: "18.4% from last month",
    positive: true,
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    icon: DollarSign,
  },
  {
    label: "Active Users",
    value: "856",
    change: "9.7% from last month",
    positive: true,
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: Users,
  },
  {
    label: "Available Spaces",
    value: "42",
    change: "5.2% from last month",
    positive: true,
    gradient: "from-violet-500 to-purple-700",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    icon: Building2,
  },
];

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="card-hover bg-card border border-border rounded-2xl p-5 flex items-start gap-4 shadow-card"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-brand-sm shrink-0`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium truncate">{stat.label}</p>
              <p className="text-2xl font-bold mt-0.5">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="text-xs text-emerald-500 font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
