import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Sun, Moon, ChevronDown, User, LogOut, Settings, Menu } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNotifications } from "@/contexts/NotificationContext";
import NotificationPanel from "@/components/features/NotificationPanel";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between gap-4 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-30">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-muted/60 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right: theme toggle, notifications, profile */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className={cn(
            "relative w-14 h-7 rounded-full flex items-center transition-all duration-300 px-0.5",
            isDark ? "bg-primary" : "bg-muted border border-border"
          )}
        >
          <Sun className={cn("absolute left-1.5 w-3.5 h-3.5 transition-opacity", isDark ? "opacity-40 text-white" : "opacity-100 text-yellow-500")} />
          <Moon className={cn("absolute right-1.5 w-3.5 h-3.5 transition-opacity", isDark ? "opacity-100 text-white" : "opacity-40 text-slate-400")} />
          <div className={cn(
            "w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300",
            isDark ? "translate-x-7" : "translate-x-0"
          )} />
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="notification-badge absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-purple-pink text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 fade-in">
              <NotificationPanel onClose={() => setShowNotifs(false)} />
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1.5 pr-2 rounded-xl hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-purple-pink flex items-center justify-center text-white font-bold text-sm shadow-brand-sm">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold leading-none">Admin</p>
              <p className="text-[11px] text-muted-foreground">Super Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-2xl shadow-lg overflow-hidden fade-in">
              <div className="p-3 border-b border-border">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-muted-foreground">admin@azh.ly</p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: "My Profile" },
                  { icon: Settings, label: "Settings" },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="border-t border-border py-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
