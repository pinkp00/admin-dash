export interface Booking {
  id: string;
  space: string;
  user: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  avatar?: string;
}

export interface ScheduleItem {
  startTime: string;
  endTime: string;
  space: string;
  user: string;
  avatar?: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  joined: string;
  bookings: number;
  avatar?: string;
}

export interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  status: "Available" | "Occupied" | "Maintenance";
  pricePerHour: number;
  floor: string;
  amenities: string[];
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface StatsCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  gradient: string;
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  bookings: number;
  revenue: number;
}

export interface DonutDataPoint {
  name: string;
  value: number;
  color: string;
}
