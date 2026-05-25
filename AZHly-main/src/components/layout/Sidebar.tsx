import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import {
  LayoutDashboard, CalendarDays, Users, Building2,
  Settings, CreditCard, BarChart3, Star, Briefcase,
  Zap, ChevronLeft, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Bookings", icon: CalendarDays, path: "/bookings" },
  { label: "Spaces", icon: Building2, path: "/spaces" },
  { label: "Calendar", icon: CalendarDays, path: "/calendar" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "Services", icon: Briefcase, path: "/services" },
  { label: "Payments", icon: CreditCard, path: "/payments" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
  { label: "Reviews", icon: Star, path: "/reviews" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out shrink-0",
        collapsed ? "w-[68px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
        {!collapsed ? (
          <img
            src={isDark
              ? "https://cdn-ai.onspace.ai/onspace/project/uploads/4fwAzDdSJFcGQAjdQA88fN/pasted-image-1779532476240-0.png"
              : "https://cdn-ai.onspace.ai/onspace/files/jZaJAnFFfs9VGP6zT5LQS6/pasted-image-1779533586884-0.png"
            }
            alt="AZHly"
            className="h-10 w-auto object-contain"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl gradient-purple-pink flex items-center justify-center shadow-brand-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:shadow-brand-sm transition-all duration-200"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "nav-item-active"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      {!collapsed && (
        <div className="m-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border border-purple-100 dark:border-purple-800/40">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-full gradient-purple-pink flex items-center justify-center shadow-brand-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-xs font-bold text-center text-foreground mb-0.5">Upgrade to AZHly Pro</p>
          <p className="text-[11px] text-center text-muted-foreground mb-3">Unlock more features and enhance your experience.</p>
          <button className="w-full py-2 text-xs font-semibold text-white rounded-xl gradient-purple-pink shadow-brand-sm hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
