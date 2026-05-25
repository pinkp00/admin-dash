import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DONUT_DATA } from "@/constants/data";
import { ChevronDown } from "lucide-react";

const PERIODS = ["This Month", "Last Month", "All Time"];

const SpacesDonutChart: React.FC = () => {
  const [period, setPeriod] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Bookings by Space</h3>
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

      <div className="flex flex-col items-center gap-4">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={DONUT_DATA}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {DONUT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "10px",
                fontSize: "12px",
                color: "hsl(var(--foreground))",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full space-y-2">
          {DONUT_DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-xs font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpacesDonutChart;
