import React, { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { CHART_DATA } from "@/constants/data";
import { ChevronDown } from "lucide-react";

const PERIODS = ["This Month", "Last Month", "This Quarter", "This Year"];

const BookingsChart: React.FC = () => {
  const [period, setPeriod] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold">Bookings Overview</h3>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg transition-colors"
          >
            {period}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10 fade-in">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setShowDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${period === p ? "text-primary font-medium" : "text-foreground"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC4899" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#EC4899" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "12px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
          />
          <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#EC4899" strokeWidth={2.5} fill="url(#gradBookings)" dot={false} activeDot={{ r: 5, fill: "#EC4899" }} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#60A5FA" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} activeDot={{ r: 5, fill: "#60A5FA" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingsChart;
