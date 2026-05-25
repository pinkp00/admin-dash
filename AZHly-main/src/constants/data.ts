import type { Booking, Classroom, ScheduleItem, User, Space, Notification, ChartDataPoint, DonutDataPoint } from "@/types";

export const CLASSROOMS: Classroom[] = [
  { id: "CLS-601", department: "CS", room: "B-108", floor: "1st", block: "Arfa Kareem", capacity: 42, status: "Available", lastUsed: "Today 08:00 AM" },
  { id: "CLS-602", department: "EE", room: "C-302", floor: "3rd", block: "Iqbal Block", capacity: 30, status: "Occupied", lastUsed: "Today 10:30 AM" },
  { id: "CLS-603", department: "Math", room: "D-210", floor: "2nd", block: "Noble Block", capacity: 35, status: "Maintenance", lastUsed: "Yesterday 04:00 PM" },
  { id: "CLS-604", department: "Physics", room: "A-501", floor: "5th", block: "Arfa Kareem", capacity: 45, status: "Available", lastUsed: "Today 09:15 AM" },
  { id: "CLS-605", department: "Biology", room: "F-110", floor: "1st", block: "Iqbal Block", capacity: 28, status: "Occupied", lastUsed: "Today 11:00 AM" },
  { id: "CLS-606", department: "CS", room: "B-112", floor: "1st", block: "Arfa Kareem", capacity: 40, status: "Available", lastUsed: "Today 07:30 AM" },
  { id: "CLS-607", department: "EE", room: "C-221", floor: "2nd", block: "Noble Block", capacity: 32, status: "Occupied", lastUsed: "Today 09:45 AM" },
  { id: "CLS-608", department: "Math", room: "D-108", floor: "1st", block: "Arfa Kareem", capacity: 36, status: "Available", lastUsed: "Today 08:30 AM" },
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
  { id: "CLS-108", name: "B-108", department: "CS", room: "B-108", floor: "1st", block: "Arfa Kareem", capacity: 42, status: "Available", pricePerHour: 0, amenities: ["WiFi", "Whiteboard", "AC"] },
  { id: "CLS-302", name: "C-302", department: "EE", room: "C-302", floor: "3rd", block: "Iqbal Block", capacity: 30, status: "Occupied", pricePerHour: 0, amenities: ["WiFi", "Projector", "AV System"] },
  { id: "CLS-210", name: "D-210", department: "Math", room: "D-210", floor: "2nd", block: "Noble Block", capacity: 35, status: "Maintenance", pricePerHour: 0, amenities: ["WiFi", "Whiteboard"] },
  { id: "CLS-501", name: "A-501", department: "Physics", room: "A-501", floor: "5th", block: "Arfa Kareem", capacity: 45, status: "Available", pricePerHour: 0, amenities: ["WiFi", "Lab Equipment"] },
  { id: "CLS-110", name: "F-110", department: "Biology", room: "F-110", floor: "1st", block: "Iqbal Block", capacity: 28, status: "Occupied", pricePerHour: 0, amenities: ["WiFi", "Laboratory Sink"] },
  { id: "CLS-112", name: "B-112", department: "CS", room: "B-112", floor: "1st", block: "Arfa Kareem", capacity: 40, status: "Available", pricePerHour: 0, amenities: ["WiFi", "AC"] },
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
  { date: "May 1", bookings: 14, revenue: 128 },
  { date: "May 3", bookings: 18, revenue: 156 },
  { date: "May 6", bookings: 20, revenue: 190 },
  { date: "May 8", bookings: 22, revenue: 205 },
  { date: "May 11", bookings: 26, revenue: 240 },
  { date: "May 13", bookings: 30, revenue: 275 },
  { date: "May 16", bookings: 32, revenue: 310 },
  { date: "May 18", bookings: 28, revenue: 290 },
  { date: "May 21", bookings: 24, revenue: 260 },
  { date: "May 23", bookings: 20, revenue: 228 },
];

export const DONUT_DATA: DonutDataPoint[] = [
  { name: "CS", value: 35, color: "#8B5CF6" },
  { name: "EE", value: 25, color: "#60A5FA" },
  { name: "Math", value: 20, color: "#EC4899" },
  { name: "Physics", value: 10, color: "#34D399" },
  { name: "Biology", value: 10, color: "#A78BFA" },
];

export const ACTIVITY_LOG = [
  { action: "Booking Confirmed", detail: "#BKG1025 — Study Room A", time: "2 min ago", type: "success" },
  { action: "New Registration", detail: "Fatima Qureshi joined AZHly", time: "1 hr ago", type: "info" },
  { action: "Booking Cancelled", detail: "#BKG1022 — Event Hall", time: "2 hr ago", type: "error" },
  { action: "Payment Processed", detail: "$45 received for #BKG1024", time: "3 hr ago", type: "success" },
  { action: "Space Updated", detail: "Event Hall marked as Maintenance", time: "4 hr ago", type: "warning" },
  { action: "Admin Login", detail: "Admin logged in from Chrome", time: "5 hr ago", type: "info" },
];
