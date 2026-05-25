import type { Booking, ScheduleItem, User, Space, Notification, ChartDataPoint, DonutDataPoint } from "@/types";

export const RECENT_BOOKINGS: Booking[] = [
  { id: "#BKG1025", space: "Study Room A", user: "Ali Khan", date: "May 22, 2025", time: "10:00 AM", status: "Confirmed" },
  { id: "#BKG1024", space: "Conference Room", user: "Sara Malik", date: "May 22, 2025", time: "01:00 PM", status: "Pending" },
  { id: "#BKG1023", space: "Private Office", user: "Zain Abbas", date: "May 22, 2025", time: "03:00 PM", status: "Confirmed" },
  { id: "#BKG1022", space: "Event Hall", user: "Hira Sheikh", date: "May 22, 2025", time: "06:00 PM", status: "Cancelled" },
  { id: "#BKG1021", space: "Study Room B", user: "Usman Raza", date: "May 21, 2025", time: "11:00 AM", status: "Confirmed" },
  { id: "#BKG1020", space: "Meeting Room 1", user: "Ayesha Noor", date: "May 21, 2025", time: "02:00 PM", status: "Completed" },
  { id: "#BKG1019", space: "Conference Room", user: "Bilal Ahmed", date: "May 20, 2025", time: "09:00 AM", status: "Confirmed" },
  { id: "#BKG1018", space: "Private Office", user: "Fatima Qureshi", date: "May 20, 2025", time: "04:00 PM", status: "Pending" },
];

export const UPCOMING_SCHEDULE: ScheduleItem[] = [
  { startTime: "10:00 AM", endTime: "12:00 PM", space: "Study Room A", user: "Ali Khan", color: "bg-purple-500" },
  { startTime: "01:00 PM", endTime: "02:30 PM", space: "Conference Room", user: "Sara Malik", color: "bg-pink-500" },
  { startTime: "03:00 PM", endTime: "04:30 PM", space: "Private Office", user: "Zain Abbas", color: "bg-blue-500" },
  { startTime: "06:00 PM", endTime: "09:00 PM", space: "Event Hall", user: "Hira Sheikh", color: "bg-teal-500" },
];

export const USERS: User[] = [
  { id: "USR001", name: "Ali Khan", email: "ali.khan@email.com", role: "Member", status: "Active", joined: "Jan 10, 2025", bookings: 24 },
  { id: "USR002", name: "Sara Malik", email: "sara.malik@email.com", role: "Member", status: "Active", joined: "Feb 5, 2025", bookings: 18 },
  { id: "USR003", name: "Zain Abbas", email: "zain.abbas@email.com", role: "Admin", status: "Active", joined: "Dec 1, 2024", bookings: 47 },
  { id: "USR004", name: "Hira Sheikh", email: "hira.sheikh@email.com", role: "Member", status: "Inactive", joined: "Mar 14, 2025", bookings: 6 },
  { id: "USR005", name: "Usman Raza", email: "usman.raza@email.com", role: "Member", status: "Active", joined: "Apr 2, 2025", bookings: 12 },
  { id: "USR006", name: "Ayesha Noor", email: "ayesha.noor@email.com", role: "Moderator", status: "Active", joined: "Nov 20, 2024", bookings: 31 },
  { id: "USR007", name: "Bilal Ahmed", email: "bilal.ahmed@email.com", role: "Member", status: "Suspended", joined: "May 1, 2025", bookings: 3 },
  { id: "USR008", name: "Fatima Qureshi", email: "fatima.q@email.com", role: "Member", status: "Active", joined: "Jan 28, 2025", bookings: 15 },
];

export const SPACES: Space[] = [
  { id: "SPC001", name: "Study Room A", type: "Study Room", capacity: 8, status: "Available", pricePerHour: 15, floor: "Floor 1", amenities: ["WiFi", "Whiteboard", "AC"] },
  { id: "SPC002", name: "Conference Room", type: "Conference", capacity: 20, status: "Occupied", pricePerHour: 45, floor: "Floor 2", amenities: ["WiFi", "Projector", "Video Call", "AC"] },
  { id: "SPC003", name: "Private Office", type: "Private Office", capacity: 4, status: "Available", pricePerHour: 30, floor: "Floor 2", amenities: ["WiFi", "Desk", "AC", "Phone"] },
  { id: "SPC004", name: "Event Hall", type: "Event Space", capacity: 100, status: "Maintenance", pricePerHour: 150, floor: "Ground Floor", amenities: ["WiFi", "Stage", "Sound System", "Catering"] },
  { id: "SPC005", name: "Study Room B", type: "Study Room", capacity: 6, status: "Available", pricePerHour: 12, floor: "Floor 1", amenities: ["WiFi", "Whiteboard"] },
  { id: "SPC006", name: "Meeting Room 1", type: "Meeting Room", capacity: 10, status: "Occupied", pricePerHour: 25, floor: "Floor 3", amenities: ["WiFi", "TV Screen", "AC"] },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "N001", type: "success", title: "Booking Approved Successfully", message: "Booking #BKG1025 for Study Room A has been confirmed.", time: "2 min ago", read: false },
  { id: "N002", type: "error", title: "Room Request Rejected", message: "Booking #BKG1022 for Event Hall has been rejected due to conflicts.", time: "15 min ago", read: false },
  { id: "N003", type: "info", title: "New User Registered", message: "Fatima Qureshi just created an account.", time: "1 hr ago", read: false },
  { id: "N004", type: "warning", title: "Error: Time Slot Already Reserved", message: "Conference Room at 3:00 PM on May 23 is already booked.", time: "2 hr ago", read: true },
  { id: "N005", type: "info", title: "Schedule Updated", message: "The weekly schedule has been updated for May 22–28.", time: "3 hr ago", read: true },
  { id: "N006", type: "success", title: "Payment Received", message: "Payment of $45 received for Conference Room booking.", time: "5 hr ago", read: true },
];

export const CHART_DATA: ChartDataPoint[] = [
  { date: "May 1", bookings: 120, revenue: 2100 },
  { date: "May 3", bookings: 180, revenue: 3200 },
  { date: "May 6", bookings: 240, revenue: 4100 },
  { date: "May 8", bookings: 310, revenue: 5300 },
  { date: "May 11", bookings: 580, revenue: 8900 },
  { date: "May 13", bookings: 720, revenue: 11200 },
  { date: "May 16", bookings: 960, revenue: 15800 },
  { date: "May 18", bookings: 820, revenue: 13200 },
  { date: "May 21", bookings: 680, revenue: 10900 },
  { date: "May 23", bookings: 540, revenue: 8700 },
];

export const DONUT_DATA: DonutDataPoint[] = [
  { name: "Study Room A", value: 35, color: "#8B5CF6" },
  { name: "Conference Room", value: 25, color: "#60A5FA" },
  { name: "Private Office", value: 20, color: "#EC4899" },
  { name: "Event Hall", value: 10, color: "#34D399" },
  { name: "Others", value: 10, color: "#A78BFA" },
];

export const ACTIVITY_LOG = [
  { action: "Booking Confirmed", detail: "#BKG1025 — Study Room A", time: "2 min ago", type: "success" },
  { action: "New Registration", detail: "Fatima Qureshi joined AZHly", time: "1 hr ago", type: "info" },
  { action: "Booking Cancelled", detail: "#BKG1022 — Event Hall", time: "2 hr ago", type: "error" },
  { action: "Payment Processed", detail: "$45 received for #BKG1024", time: "3 hr ago", type: "success" },
  { action: "Space Updated", detail: "Event Hall marked as Maintenance", time: "4 hr ago", type: "warning" },
  { action: "Admin Login", detail: "Admin logged in from Chrome", time: "5 hr ago", type: "info" },
];
