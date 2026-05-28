import React from 'react';
import { Plus, GraduationCap, Users, Building2 } from 'lucide-react';
import { DEPARTMENTS } from '@/constants/data';
import { toast } from 'sonner';

const Departments: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap size={22} className="text-primary" /> Departments
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{DEPARTMENTS.length} active departments</p>
        </div>
        <button
          onClick={() => toast.success('Add Department dialog opened')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand self-start"
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DEPARTMENTS.map(dept => (
          <div key={dept.id} className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-card-hover transition-shadow animate-fade-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: dept.color }}
                >
                  {dept.shortName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{dept.name}</h3>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-md text-white"
                    style={{ backgroundColor: dept.color + 'cc' }}
                  >
                    {dept.shortName}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.info(`Editing ${dept.name}`)} className="text-xs text-primary hover:underline">Edit</button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-3">
              <span className="font-medium text-foreground">Head:</span> {dept.head}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/60 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                  <Users size={14} />
                  <span className="text-xs">Faculty</span>
                </div>
                <div className="text-xl font-bold text-foreground">{dept.facultyCount}</div>
              </div>
              <div className="bg-muted/60 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-1">
                  <Building2 size={14} />
                  <span className="text-xs">Rooms</span>
                </div>
                <div className="text-xl font-bold text-foreground">{dept.roomCount}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Room Utilization</span>
                <span className="font-medium text-foreground">
                  {Math.round((dept.roomCount / 25) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.round((dept.roomCount / 25) * 100)}%`,
                    backgroundColor: dept.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
