import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WEEKLY_USAGE } from '@/constants/data';

const WeeklyUsageChart: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Room Usage (Mon - Fri)</h3>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={WEEKLY_USAGE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
          <Tooltip
            formatter={(v: number) => [`${v}%`, 'Usage']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
          />
          <Area type="monotone" dataKey="usage" stroke="#7C3AED" strokeWidth={2.5} fill="url(#usageGrad)" dot={{ r: 4, fill: '#7C3AED', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyUsageChart;
