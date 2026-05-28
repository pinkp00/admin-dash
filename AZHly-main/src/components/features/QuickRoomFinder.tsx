import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Clock, GraduationCap } from 'lucide-react';
import { DAYS, TIME_SLOTS, DEPARTMENTS } from '@/constants/data';
import { toast } from 'sonner';

interface QuickRoomFinderProps {
  onResults: (day: string, time: string, dept: string) => void;
}

const QuickRoomFinder: React.FC<QuickRoomFinderProps> = ({ onResults }) => {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('10:00 AM - 11:00 AM');
  const [dept, setDept] = useState('Computer Science');

  const handleSearch = () => {
    onResults(day, time, dept);
    toast.success(`Found available rooms for ${dept} on ${day}`);
  };

  const selectClass = "w-full flex items-center gap-2 px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus-within:border-primary/50 transition-colors appearance-none";

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border">
      <h2 className="text-base font-semibold text-foreground mb-4">Quick Room Finder</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Day</label>
          <div className="relative">
            <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={day}
              onChange={e => setDay(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
            >
              {DAYS.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Time Slot</label>
          <div className="relative">
            <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
            >
              {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Department</label>
          <div className="relative">
            <GraduationCap size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={dept}
              onChange={e => setDept(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
            >
              {DEPARTMENTS.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-brand mt-1"
        >
          <Search size={16} />
          Find Available Rooms
        </button>
      </div>
    </div>
  );
};

export default QuickRoomFinder;
