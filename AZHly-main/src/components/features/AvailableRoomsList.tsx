import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROOMS, DEPARTMENTS } from '@/constants/data';
import type { Room } from '@/types';

interface AvailableRoomsListProps {
  filterDay?: string;
  filterTime?: string;
  filterDept?: string;
}

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

const AvailableRoomsList: React.FC<AvailableRoomsListProps> = ({ filterDept }) => {
  const departmentCode = filterDept
    ? DEPARTMENTS.find(d => d.shortName === filterDept || d.name === filterDept)?.shortName
    : undefined;

  const rooms = ROOMS
    .filter(r => r.status === 'available')
    .filter(r => !departmentCode || departmentCode === 'all' ? true : r.department === departmentCode)
    .slice(0, 3);

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card border border-border flex-1 min-w-0">
      <h2 className="text-base font-semibold text-foreground mb-4">Available Rooms</h2>
      <div className="space-y-2">
        {rooms.map(room => (
          <div key={room.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
            <div>
              <div className="font-semibold text-sm text-foreground">{room.number}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{room.block} · {room.floor}</div>
              <div className="text-xs text-muted-foreground">Capacity: {room.capacity}</div>
            </div>
            <StatusBadge status={room.status} />
          </div>
        ))}
        {rooms.length === 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">No available rooms found</div>
        )}
      </div>
      <Link
        to="/room-finder"
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 mt-4 transition-colors"
      >
        View All Rooms <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default AvailableRoomsList;
