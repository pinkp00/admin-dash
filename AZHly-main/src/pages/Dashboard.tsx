import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCards from "@/components/features/StatsCards";
import BookingsChart from "@/components/features/BookingsChart";
import SpacesDonutChart from "@/components/features/SpacesDonutChart";
import RecentBookings from "@/components/features/RecentBookings";
import UpcomingSchedule from "@/components/features/UpcomingSchedule";
import RecentActivity from "@/components/features/RecentActivity";
import { RECENT_BOOKINGS, UPCOMING_SCHEDULE } from "@/constants/data";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Welcome back, Admin! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl text-sm text-muted-foreground shadow-card">
          <CalendarDays className="w-4 h-4 text-primary" />
          <span>{today}</span>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">
        <div className="xl:col-span-2">
          <BookingsChart />
        </div>
        <div className="xl:col-span-1">
          <SpacesDonutChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5">
        <div className="xl:col-span-2">
          <RecentBookings
            bookings={RECENT_BOOKINGS.slice(0, 5)}
            onViewAll={() => navigate("/bookings")}
          />
        </div>
        <div className="xl:col-span-1">
          <UpcomingSchedule items={UPCOMING_SCHEDULE} onViewCalendar={() => navigate("/calendar")} />
        </div>
      </div>

      {/* Activity */}
      <div className="mt-5">
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
