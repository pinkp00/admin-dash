import React, { useState } from 'react';
import { Building2, CheckCircle, XCircle, GraduationCap, ArrowRight } from 'lucide-react';
import StatCard from '@/components/features/StatCard';
import QuickRoomFinder from '@/components/features/QuickRoomFinder';
import AvailableRoomsList from '@/components/features/AvailableRoomsList';
import RecentActivities from '@/components/features/RecentActivities';
import RoomStatusDonut from '@/components/features/RoomStatusDonut';
import WeeklyUsageChart from '@/components/features/WeeklyUsageChart';
import DepartmentUsageChart from '@/components/features/DepartmentUsageChart';
import { ROOMS, DEPARTMENTS, ROOM_TREND, AVAILABLE_TREND, OCCUPIED_TREND, DEPT_TREND } from '@/constants/data';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const [filterDay, setFilterDay] = useState('Monday');
  const [filterTime, setFilterTime] = useState('10:00 AM - 11:00 AM');
  const [filterDept, setFilterDept] = useState('CS');

  const totalRooms = ROOMS.length;
  const availableRooms = ROOMS.filter(room => room.status === 'available').length;
  const occupiedRooms = ROOMS.filter(room => room.status === 'occupied').length;
  const departmentsCount = DEPARTMENTS.length;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here's what's happening with AZHly today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl shadow-card text-sm text-muted-foreground self-start sm:self-auto">
          <span className="text-base">📅</span>
          <span>{today}</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Rooms"
          value={totalRooms}
          subtitle="All rooms in system"
          trend={ROOM_TREND}
          color="purple"
          icon={<Building2 size={22} />}
        />
        <StatCard
          title="Available Rooms"
          value={availableRooms}
          subtitle="Currently available"
          trend={AVAILABLE_TREND}
          color="green"
          icon={<CheckCircle size={22} />}
        />
        <StatCard
          title="Occupied Rooms"
          value={occupiedRooms}
          subtitle="Currently occupied"
          trend={OCCUPIED_TREND}
          color="pink"
          icon={<XCircle size={22} />}
        />
        <StatCard
          title="Departments"
          value={departmentsCount}
          subtitle="Total departments"
          trend={DEPT_TREND}
          color="blue"
          icon={<GraduationCap size={22} />}
        />
      </div>

      {/* Room Finder + Available Rooms + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Finder + Rooms List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickRoomFinder
            onResults={(d, t, dept) => {
              setFilterDay(d);
              setFilterTime(t);
              setFilterDept(dept);
            }}
          />
          <AvailableRoomsList filterDay={filterDay} filterTime={filterTime} filterDept={filterDept} />
        </div>

        {/* Recent Activities */}
        <div>
          <RecentActivities />
        </div>
      </div>

      {/* Analytics Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Analytics Overview</h2>
          <button
            onClick={() => toast.info('Opening full analytics...')}
            className="flex items-center gap-1.5 text-sm font-semibold text-pink-500 hover:text-pink-600 transition-colors"
          >
            View All Analytics <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RoomStatusDonut />
          <WeeklyUsageChart />
          <DepartmentUsageChart />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        © 2025 AZHly – Smart Timetable System. All rights reserved. &nbsp;|&nbsp; Version 1.0.0 ❤️
      </footer>
    </div>
  );
};

export default Dashboard;
