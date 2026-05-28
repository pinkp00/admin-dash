import React, { useState } from 'react';
import { Plus, Search, Filter, Building2 } from 'lucide-react';
import { ROOMS } from '@/constants/data';
import type { Room } from '@/types';
import { toast } from 'sonner';

const StatusBadge: React.FC<{ status: Room['status'] }> = ({ status }) => {
  const map = {
    available:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    occupied:    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    maintenance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const TypeBadge: React.FC<{ type: Room['type'] }> = ({ type }) => {
  const map = {
    lecture:  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    lab:      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    seminar:  'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    office:   'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${map[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const Rooms: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalRooms = ROOMS.length;
  const availableRooms = ROOMS.filter(room => room.status === 'available').length;
  const occupiedRooms = ROOMS.filter(room => room.status === 'occupied').length;

  const filtered = ROOMS.filter(r => {
    const matchSearch = r.number.toLowerCase().includes(search.toLowerCase()) ||
      r.block.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Building2 size={22} className="text-primary" /> Rooms
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{ROOMS.length} total rooms across all blocks</p>
        </div>
        <button
          onClick={() => toast.success('Add Room dialog opened')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand self-start sm:self-auto"
        >
          <Plus size={16} /> Add Room
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: totalRooms, color: 'text-foreground', bg: 'bg-muted' },
          { label: 'Available', value: availableRooms, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Occupied', value: occupiedRooms, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center border border-border`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by room number or block..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-muted-foreground" />
            {['all', 'available', 'occupied', 'maintenance'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {['Room No.', 'Block', 'Floor', 'Type', 'Capacity', 'Department', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(room => (
                <tr key={room.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">{room.number}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{room.block}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{room.floor}</td>
                  <td className="px-4 py-3"><TypeBadge type={room.type} /></td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{room.capacity}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{room.department || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={room.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => toast.info(`Editing ${room.number}`)} className="text-xs text-primary hover:underline">Edit</button>
                      <button onClick={() => toast.error(`Delete ${room.number}?`)} className="text-xs text-red-500 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No rooms found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
