import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Occupied', value: 85, color: '#081B5B' },
  { name: 'Available', value: 35, color: '#7C3AED' },
  { name: 'Under Maintenance', value: 5, color: '#EC4899' },
];

const RoomStatusDonut: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-1">Room Status (Overall)</h3>
      <div className="flex items-center gap-4 mt-2">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} rooms`, '']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-foreground">120</span>
            <span className="text-xs text-muted-foreground">Total Rooms</span>
          </div>
        </div>
        <div className="space-y-2">
          {data.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <div>
                <div className="text-xs font-medium text-foreground">{d.name}</div>
                <div className="text-xs text-muted-foreground">{d.value} ({((d.value / 125) * 100).toFixed(1)}%)</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomStatusDonut;
