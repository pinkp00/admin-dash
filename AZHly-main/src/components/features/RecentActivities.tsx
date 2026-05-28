import React from 'react';
import { Building2, CalendarDays, PlusCircle, Users, GraduationCap } from 'lucide-react';
import { ACTIVITIES } from '@/constants/data';
import type { Activity } from '@/types';
import { toast } from 'sonner';

const iconMap: Record<Activity['type'], React.ReactNode> = {
  'room-assigned':      <Building2 size={16} />,
  'timetable-updated':  <CalendarDays size={16} />,
  'room-added':         <PlusCircle size={16} />,
  'faculty-added':      <Users size={16} />,
  'department-updated': <GraduationCap size={16} />,
};

const bgMap: Record<Activity['type'], string> = {
  'room-assigned':      'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  'timetable-updated':  'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  'room-added':         'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  'faculty-added':      'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  'department-updated': 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
};

const RecentActivities: React.FC = () => {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-foreground">Recent Activities</h2>
        <button
          onClick={() => toast.info('Viewing all activities...')}
          className="text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {ACTIVITIES.map(activity => (
          <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${bgMap[activity.type]}`}>
              {iconMap[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">by {activity.by}</p>
            </div>
            <div className="text-xs text-muted-foreground text-right flex-shrink-0">
              {activity.time || activity.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
