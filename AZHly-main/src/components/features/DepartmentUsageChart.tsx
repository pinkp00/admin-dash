import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DEPARTMENT_USAGE } from '@/constants/data';

const COLORS = ['#EC4899', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const DepartmentUsageChart: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-4">Room Usage by Department</h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={DEPARTMENT_USAGE} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
          <XAxis dataKey="dept" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
          <Tooltip
            formatter={(v: number) => [`${v}%`, 'Usage']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
          />
          <Bar dataKey="usage" radius={[6, 6, 0, 0]} barSize={20}>
            {DEPARTMENT_USAGE.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentUsageChart;
