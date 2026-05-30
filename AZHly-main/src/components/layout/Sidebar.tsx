import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, GraduationCap, Users, CalendarDays,
  Search, BarChart3, FileText, Settings, LogOut, X
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Rooms', path: '/rooms', icon: Building2 },
  { label: 'Departments', path: '/departments', icon: GraduationCap },
  { label: 'Faculty', path: '/faculty', icon: Users },
  { label: 'Timetables', path: '/timetables', icon: CalendarDays },
  { label: 'Room Finder', path: '/room-finder', icon: Search },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('azhly-user');
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#081B5B' }}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img
            src=""
            alt="AZHly Logo"
            className="h-10 w-auto object-contain"
          />
          {isOpen && (
            <div>
              <div className="text-white font-bold text-xl leading-none">AZHly</div>
              <div className="text-blue-300 text-xs mt-0.5">Smart Timetable System</div>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-white/60 hover:text-white p-1 rounded"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-900/40'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-blue-200 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 group"
        >
          <LogOut size={20} className="flex-shrink-0 group-hover:text-red-400" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 shadow-sidebar transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
        style={{ backgroundColor: '#081B5B' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 z-50 lg:hidden flex flex-col transition-transform duration-300 shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#081B5B' }}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
