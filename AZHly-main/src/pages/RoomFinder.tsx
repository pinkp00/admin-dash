import React, { useState } from 'react';
import { Search, MapPin, Users, ChevronDown, Filter } from 'lucide-react';
import { ROOMS, DAYS, TIME_SLOTS, DEPARTMENTS } from '@/constants/data';
import type { Room } from '@/types';
import { toast } from 'sonner';

const StatusBadge: React.FC<{ status: Room['status'] }> = ({ status }) => {
  const map = {
    available:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    occupied:    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    maintenance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  };
  return (
    <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RoomFinder: React.FC = () => {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('10:00 AM - 11:00 AM');
  const [dept, setDept] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    toast.success('Room search complete!');
  };

  const results = searched
    ? ROOMS.filter(r => r.status === 'available' && (typeFilter === 'all' || r.type === typeFilter))
    : [];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Search size={22} className="text-primary" /> Room Finder
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Find available rooms by day, time slot, and department</p>
      </div>

      {/* Search Panel */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
        <h2 className="font-semibold text-foreground mb-4">Search Criteria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Day</label>
            <div className="relative">
              <select value={day} onChange={e => setDay(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 cursor-pointer">
                {DAYS.map(d => <option key={d}>{d}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Time Slot</label>
            <div className="relative">
              <select value={time} onChange={e => setTime(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 cursor-pointer">
                {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Department</label>
            <div className="relative">
              <select value={dept} onChange={e => setDept(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 cursor-pointer">
                <option value="all">All Departments</option>
                {DEPARTMENTS.map(d => <option key={d.id} value={d.shortName}>{d.name}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Room Type</label>
            <div className="relative">
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:border-primary/50 cursor-pointer">
                <option value="all">All Types</option>
                <option value="lecture">Lecture Hall</option>
                <option value="lab">Lab</option>
                <option value="seminar">Seminar Room</option>
                <option value="office">Office</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand"
        >
          <Search size={16} /> Find Available Rooms
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">{results.length} Rooms Available</h2>
            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-lg">{day} · {time}</span>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map(room => (
                <div key={room.id} className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-card-hover transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{room.number}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {room.block} · {room.floor}
                      </p>
                    </div>
                    <StatusBadge status={room.status} />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>Capacity: <span className="font-semibold text-foreground">{room.capacity}</span></span>
                    </div>
                    <span className="capitalize bg-muted px-2 py-0.5 rounded-md text-xs">{room.type}</span>
                  </div>
                  <button
                    onClick={() => toast.success(`${room.number} booked successfully!`)}
                    className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-500/10 text-primary text-sm font-medium hover:from-purple-600/20 hover:to-pink-500/20 transition-colors border border-primary/20"
                  >
                    Book This Room
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-12 text-center border border-border shadow-card">
              <Search size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
              <p className="text-muted-foreground">No available rooms match your criteria.</p>
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="bg-card rounded-2xl p-12 text-center border border-border shadow-card">
          <Search size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
          <p className="text-lg font-medium text-muted-foreground">Set your criteria and click "Find Available Rooms"</p>
          <p className="text-sm text-muted-foreground mt-1">Results will appear here</p>
        </div>
      )}
    </div>
  );
};

export default RoomFinder;
