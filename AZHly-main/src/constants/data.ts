import type { Room, Department, Faculty, TimetableEntry, Activity } from '@/types';

export const ROOMS: Room[] = [
  { id: '1', number: 'A-101', block: 'Block A', floor: 'First Floor', capacity: 60, status: 'available', department: 'CS', type: 'lecture' },
  { id: '2', number: 'A-102', block: 'Block A', floor: 'First Floor', capacity: 40, status: 'occupied', department: 'SE', type: 'seminar' },
  { id: '3', number: 'A-103', block: 'Block A', floor: 'First Floor', capacity: 30, status: 'available', department: 'AI', type: 'lab' },
  { id: '4', number: 'B-201', block: 'Block B', floor: 'Second Floor', capacity: 80, status: 'occupied', department: 'IT', type: 'lecture' },
  { id: '5', number: 'B-204', block: 'Block B', floor: 'Second Floor', capacity: 50, status: 'available', department: 'BBA', type: 'lecture' },
  { id: '6', number: 'B-205', block: 'Block B', floor: 'Second Floor', capacity: 35, status: 'occupied', department: 'CS', type: 'lab' },
  { id: '7', number: 'C-301', block: 'Block C', floor: 'Third Floor', capacity: 60, status: 'available', department: 'EE', type: 'lecture' },
  { id: '8', number: 'C-302', block: 'Block C', floor: 'Third Floor', capacity: 45, status: 'maintenance', department: 'SE', type: 'seminar' },
  { id: '9', number: 'C-303', block: 'Block C', floor: 'Third Floor', capacity: 70, status: 'occupied', department: 'AI', type: 'lecture' },
  { id: '10', number: 'D-401', block: 'Block D', floor: 'Fourth Floor', capacity: 100, status: 'occupied', department: 'IT', type: 'lecture' },
  { id: '11', number: 'D-402', block: 'Block D', floor: 'Fourth Floor', capacity: 40, status: 'available', department: 'BBA', type: 'lab' },
  { id: '12', number: 'D-403', block: 'Block D', floor: 'Fourth Floor', capacity: 55, status: 'occupied', department: 'CS', type: 'seminar' },
];

export const DEPARTMENTS: Department[] = [
  { id: '1', name: 'Computer Science', shortName: 'CS', head: 'Dr. Ahmed Khan', facultyCount: 18, roomCount: 22, color: '#7C3AED' },
  { id: '2', name: 'Software Engineering', shortName: 'SE', head: 'Dr. Sara Ali', facultyCount: 14, roomCount: 18, color: '#EC4899' },
  { id: '3', name: 'Artificial Intelligence', shortName: 'AI', head: 'Dr. Bilal Shah', facultyCount: 10, roomCount: 15, color: '#10B981' },
  { id: '4', name: 'Information Technology', shortName: 'IT', head: 'Dr. Aisha Raza', facultyCount: 12, roomCount: 20, color: '#3B82F6' },
  { id: '5', name: 'Business Administration', shortName: 'BBA', head: 'Prof. Usman Malik', facultyCount: 16, roomCount: 14, color: '#F59E0B' },
  { id: '6', name: 'Electrical Engineering', shortName: 'EE', head: 'Dr. Zara Hussain', facultyCount: 11, roomCount: 11, color: '#EF4444' },
];

export const FACULTY: Faculty[] = [
  { id: '1', name: 'Dr. Ahmed Khan', department: 'CS', designation: 'Professor', email: 'ahmed.khan@azhly.edu', phone: '+92 300 1234567', subjects: ['Data Structures', 'Algorithms'], status: 'active' },
  { id: '2', name: 'Dr. Sara Ali', department: 'SE', designation: 'Associate Professor', email: 'sara.ali@azhly.edu', phone: '+92 301 2345678', subjects: ['Software Design', 'UML'], status: 'active' },
  { id: '3', name: 'Dr. Bilal Shah', department: 'AI', designation: 'Assistant Professor', email: 'bilal.shah@azhly.edu', phone: '+92 302 3456789', subjects: ['Machine Learning', 'Deep Learning'], status: 'active' },
  { id: '4', name: 'Dr. Aisha Raza', department: 'IT', designation: 'Professor', email: 'aisha.raza@azhly.edu', phone: '+92 303 4567890', subjects: ['Networks', 'Security'], status: 'on-leave' },
  { id: '5', name: 'Prof. Usman Malik', department: 'BBA', designation: 'Senior Lecturer', email: 'usman.malik@azhly.edu', phone: '+92 304 5678901', subjects: ['Marketing', 'Management'], status: 'active' },
  { id: '6', name: 'Dr. Zara Hussain', department: 'EE', designation: 'Associate Professor', email: 'zara.hussain@azhly.edu', phone: '+92 305 6789012', subjects: ['Circuit Analysis', 'Electronics'], status: 'active' },
  { id: '7', name: 'Dr. Sarah Khan', department: 'CS', designation: 'Assistant Professor', email: 'sarah.khan@azhly.edu', phone: '+92 306 7890123', subjects: ['Web Development', 'Database'], status: 'active' },
  { id: '8', name: 'Mr. Hassan Ali', department: 'IT', designation: 'Lecturer', email: 'hassan.ali@azhly.edu', phone: '+92 307 8901234', subjects: ['Programming', 'OOP'], status: 'active' },
];

export const TIMETABLE: TimetableEntry[] = [
  { id: '1', day: 'Monday', timeSlot: '08:00 AM - 09:00 AM', subject: 'Data Structures', faculty: 'Dr. Ahmed Khan', room: 'A-101', department: 'CS', section: 'A' },
  { id: '2', day: 'Monday', timeSlot: '09:00 AM - 10:00 AM', subject: 'Software Design', faculty: 'Dr. Sara Ali', room: 'B-204', department: 'SE', section: 'B' },
  { id: '3', day: 'Monday', timeSlot: '10:00 AM - 11:00 AM', subject: 'Machine Learning', faculty: 'Dr. Bilal Shah', room: 'C-301', department: 'AI', section: 'A' },
  { id: '4', day: 'Tuesday', timeSlot: '08:00 AM - 09:00 AM', subject: 'Networks', faculty: 'Dr. Aisha Raza', room: 'D-401', department: 'IT', section: 'A' },
  { id: '5', day: 'Tuesday', timeSlot: '11:00 AM - 12:00 PM', subject: 'Circuit Analysis', faculty: 'Dr. Zara Hussain', room: 'A-103', department: 'EE', section: 'A' },
  { id: '6', day: 'Wednesday', timeSlot: '10:00 AM - 11:00 AM', subject: 'Marketing', faculty: 'Prof. Usman Malik', room: 'B-205', department: 'BBA', section: 'C' },
  { id: '7', day: 'Thursday', timeSlot: '09:00 AM - 10:00 AM', subject: 'Algorithms', faculty: 'Dr. Ahmed Khan', room: 'A-102', department: 'CS', section: 'B' },
  { id: '8', day: 'Friday', timeSlot: '02:00 PM - 03:00 PM', subject: 'Web Development', faculty: 'Dr. Sarah Khan', room: 'C-303', department: 'CS', section: 'A' },
];

export const ACTIVITIES: Activity[] = [
  { id: '1', type: 'room-assigned', title: 'Room A-101 assigned to AI (Section B)', description: 'Lecture hall assigned for AI course', by: 'Admin', time: '10:30 AM', date: 'Today' },
  { id: '2', type: 'timetable-updated', title: 'Timetable updated for Monday', description: 'CS Department timetable revised', by: 'Admin', time: '09:45 AM', date: 'Today' },
  { id: '3', type: 'room-added', title: 'New room C-302 added', description: 'Seminar room added in Block C', by: 'Admin', time: '', date: 'Yesterday' },
  { id: '4', type: 'department-updated', title: 'Department SE information updated', description: 'Head of department changed', by: 'Admin', time: '', date: 'Yesterday' },
  { id: '5', type: 'faculty-added', title: 'New faculty member added: Dr. Sarah Khan', description: 'Assistant Professor in CS dept', by: 'Admin', time: '', date: '21 May 2025' },
  { id: '6', type: 'room-assigned', title: 'Room B-201 assigned to IT (Section A)', description: 'Networks lab scheduled', by: 'Admin', time: '', date: '20 May 2025' },
  { id: '7', type: 'timetable-updated', title: 'Timetable updated for Wednesday', description: 'BBA Department slots revised', by: 'Admin', time: '', date: '19 May 2025' },
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TIME_SLOTS = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
];

export const WEEKLY_USAGE = [
  { day: 'Mon', usage: 60 },
  { day: 'Tue', usage: 72 },
  { day: 'Wed', usage: 85 },
  { day: 'Thu', usage: 70 },
  { day: 'Fri', usage: 65 },
];

export const DEPARTMENT_USAGE = [
  { dept: 'CS', usage: 85 },
  { dept: 'SE', usage: 70 },
  { dept: 'AI', usage: 60 },
  { dept: 'IT', usage: 45 },
  { dept: 'BBA', usage: 35 },
  { dept: 'EE', usage: 25 },
];

export const ROOM_TREND = [40, 45, 42, 55, 50, 58, 52];
export const AVAILABLE_TREND = [20, 18, 22, 15, 20, 18, 22];
export const OCCUPIED_TREND = [60, 65, 58, 72, 68, 75, 70];
export const DEPT_TREND = [5, 6, 6, 6, 6, 6, 6];
