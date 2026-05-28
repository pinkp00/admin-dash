import React, { useState } from 'react';
import { Menu, Search, Bell, Calendar, ChevronDown, Sun, Moon, Download, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const NOTIFICATIONS = [
  { id: 1, text: 'Room A-101 is now available', time: '2 min ago', read: false },
  { id: 2, text: 'Timetable conflict detected in CS', time: '15 min ago', read: false },
  { id: 3, text: 'New faculty Dr. Sarah Khan added', time: '1 hr ago', read: false },
  { id: 4, text: 'Room C-302 maintenance scheduled', time: '3 hrs ago', read: true },
  { id: 5, text: 'Weekly report is ready', time: 'Yesterday', read: true },
];

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#0f1a3e] shadow-navbar border-b border-border flex items-center gap-3 px-4 py-3">
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-muted border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm transition-all"
          />
          {searchVal && (
            <button onClick={() => setSearchVal('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* Date */}
      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-2 rounded-xl">
        <Calendar size={15} />
        <span>{today}</span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Export */}
      <button
        onClick={() => toast.success('Report exported successfully!')}
        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-opacity shadow-brand"
      >
        <Download size={14} />
        <span>Export</span>
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(p => !p); setShowProfile(false); }}
          className="relative p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-card-hover z-50 overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="font-semibold text-sm">Notifications</span>
              <button onClick={() => toast.info('All notifications cleared')} className="text-xs text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className={`px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-start gap-2">
                    {!n.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                    <div className={!n.read ? '' : 'ml-4'}>
                      <p className="text-sm">{n.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => { setShowProfile(p => !p); setShowNotifications(false); }}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold leading-none">Admin</div>
            <div className="text-xs text-muted-foreground mt-0.5">Super Admin</div>
          </div>
          <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
        </button>
        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-card-hover z-50 overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b border-border">
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@azhly.edu</div>
            </div>
            {['My Profile', 'Account Settings', 'Help & Support'].map(item => (
              <button key={item} onClick={() => { setShowProfile(false); toast.info(`Opening ${item}...`); }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                {item}
              </button>
            ))}
            <div className="border-t border-border">
              <button onClick={() => toast.info('Logged out')}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
