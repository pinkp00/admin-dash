import React from 'react';
import { BarChart3 } from 'lucide-react';
import RoomStatusDonut from '@/components/features/RoomStatusDonut';
import WeeklyUsageChart from '@/components/features/WeeklyUsageChart';
import DepartmentUsageChart from '@/components/features/DepartmentUsageChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';

const monthlyData = [
  { month: 'Jan', bookings: 320, available: 180 },
  { month: 'Feb', bookings: 380, available: 160 },
  { month: 'Mar', bookings: 420, available: 140 },
  { month: 'Apr', bookings: 360, available: 200 },
  { month: 'May', bookings: 450, available: 120 },
  { month: 'Jun', bookings: 390, available: 170 },
];

const peakHoursData = [
  { hour: '8 AM', occupancy: 35 },
  { hour: '9 AM', occupancy: 62 },
  { hour: '10 AM', occupancy: 85 },
  { hour: '11 AM', occupancy: 78 },
  { hour: '12 PM', occupancy: 40 },
  { hour: '1 PM', occupancy: 55 },
  { hour: '2 PM', occupancy: 72 },
  { hour: '3 PM', occupancy: 68 },
  { hour: '4 PM', occupancy: 30 },
];

const Analytics: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 size={22} className="text-primary" /> Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Comprehensive usage and performance insights</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Daily Bookings', value: '42', change: '+8%', positive: true },
          { label: 'Peak Utilization', value: '85%', change: '+5%', positive: true },
          { label: 'Idle Hours/Week', value: '128', change: '-12%', positive: true },
          { label: 'Conflict Rate', value: '2.1%', change: '-0.4%', positive: true },
        ].map(kpi => (
          <div key={kpi.label} className="bg-card rounded-2xl p-4 shadow-card border border-border">
            <div className="text-xs text-muted-foreground mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className={`text-xs font-medium mt-1 ${kpi.positive ? 'text-emerald-500' : 'text-red-500'}`}>
              {kpi.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RoomStatusDonut />
        <WeeklyUsageChart />
        <DepartmentUsageChart />
      </div>

      {/* Monthly Trend */}
      <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Booking Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="availableGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#7C3AED" strokeWidth={2} fill="url(#bookingsGrad)" dot={{ r: 3 }} />
            <Area type="monotone" dataKey="available" name="Available" stroke="#10B981" strokeWidth={2} fill="url(#availableGrad)" dot={{ r: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Peak Hours */}
      <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Peak Hours Occupancy (%)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={peakHoursData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="hour" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip formatter={(v: number) => [`${v}%`, 'Occupancy']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
            <Bar dataKey="occupancy" radius={[6, 6, 0, 0]} barSize={24}>
              {peakHoursData.map((entry, i) => (
                <Cell key={i} fill={entry.occupancy >= 70 ? '#EC4899' : entry.occupancy >= 50 ? '#7C3AED' : '#A78BFA'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
