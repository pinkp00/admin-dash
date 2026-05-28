import React, { useState } from 'react';
import { CalendarDays, Plus, ChevronDown } from 'lucide-react';
import { TIMETABLE, DAYS } from '@/constants/data';
import { toast } from 'sonner';

const DEPT_COLORS: Record<string, string> = {
  CS: '#7C3AED', SE: '#EC4899', AI: '#10B981',
  IT: '#3B82F6', BBA: '#F59E0B', EE: '#EF4444',
};

const Timetables: React.FC = () => {
  const [activeDay, setActiveDay] = useState('Monday');

  const dayEntries = TIMETABLE.filter(e => e.day === activeDay);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays size={22} className="text-primary" /> Timetables
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{TIMETABLE.length} scheduled sessions this week</p>
        </div>
        <button
          onClick={() => toast.success('Add Timetable entry dialog opened')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand self-start"
        >
          <Plus size={16} /> Add Entry
        </button>
      </div>

      {/* Day selector */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
        <div className="flex flex-wrap gap-2">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeDay === day
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-brand'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly overview cards */}
      <div className="grid grid-cols-5 gap-2">
        {DAYS.map(day => {
          const count = TIMETABLE.filter(e => e.day === day).length;
          return (
            <div
              key={day}
              onClick={() => setActiveDay(day)}
              className={`rounded-2xl p-3 text-center cursor-pointer transition-all border ${
                activeDay === day
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-border bg-card hover:bg-muted/50'
              }`}
            >
              <div className="text-xs font-medium text-muted-foreground">{day.slice(0, 3)}</div>
              <div className="text-2xl font-bold text-foreground mt-1">{count}</div>
              <div className="text-xs text-muted-foreground">sessions</div>
            </div>
          );
        })}
      </div>

      {/* Day schedule */}
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">{activeDay} Schedule</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{dayEntries.length} sessions scheduled</p>
        </div>
        {dayEntries.length > 0 ? (
          <div className="divide-y divide-border">
            {dayEntries.map(entry => (
              <div key={entry.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-muted/30 transition-colors">
                <div className="flex-shrink-0 w-40">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">{entry.timeSlot}</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{entry.subject}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{entry.faculty}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs bg-muted px-3 py-1.5 rounded-lg">
                    <span className="text-muted-foreground">Room: </span>
                    <span className="font-medium text-foreground">{entry.room}</span>
                  </div>
                  <div className="text-xs bg-muted px-3 py-1.5 rounded-lg">
                    <span className="text-muted-foreground">Section: </span>
                    <span className="font-medium text-foreground">{entry.section}</span>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-lg text-white font-medium"
                    style={{ backgroundColor: DEPT_COLORS[entry.department] + 'cc' }}
                  >
                    {entry.department}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.info('Edit entry')} className="text-xs text-primary hover:underline">Edit</button>
                  <button onClick={() => toast.error('Delete entry?')} className="text-xs text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <CalendarDays size={40} className="mx-auto mb-3 opacity-30" />
            <p>No sessions scheduled for {activeDay}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetables;
