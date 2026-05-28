export interface Room {
  id: string;
  number: string;
  block: string;
  floor: string;
  capacity: number;
  status: 'available' | 'occupied' | 'maintenance';
  department?: string;
  type: 'lecture' | 'lab' | 'seminar' | 'office';
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  head: string;
  facultyCount: number;
  roomCount: number;
  color: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  subjects: string[];
  avatar?: string;
  status: 'active' | 'on-leave';
}

export interface TimetableEntry {
  id: string;
  day: string;
  timeSlot: string;
  subject: string;
  faculty: string;
  room: string;
  department: string;
  section: string;
}

export interface Activity {
  id: string;
  type: 'room-assigned' | 'timetable-updated' | 'room-added' | 'faculty-added' | 'department-updated';
  title: string;
  description: string;
  by: string;
  time: string;
  date: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface StatCard {
  title: string;
  value: number;
  subtitle: string;
  trend: number[];
  color: 'purple' | 'green' | 'pink' | 'blue';
  icon: string;
}
