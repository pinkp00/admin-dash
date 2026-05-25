import React, { useState } from "react";
import { Search, Plus, UserCheck, UserX, Shield, MoreVertical } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { USERS } from "@/constants/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Inactive: "bg-muted text-muted-foreground",
  Suspended: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
};

const ROLE_STYLES: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  Moderator: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  Member: "bg-muted text-muted-foreground",
};

const AVATAR_COLORS = [
  "from-purple-500 to-violet-600",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-cyan-500",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-amber-500",
  "from-indigo-500 to-blue-600",
];

const Users: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const roles = ["All", "Admin", "Moderator", "Member"];

  const filtered = USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage platform users and permissions</p>
        </div>
        <button
          onClick={() => toast.success("Invite user form opened")}
          className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Users", value: USERS.length, icon: UserCheck, color: "text-purple-500" },
          { label: "Active", value: USERS.filter((u) => u.status === "Active").length, icon: UserCheck, color: "text-emerald-500" },
          { label: "Inactive", value: USERS.filter((u) => u.status === "Inactive").length, icon: UserX, color: "text-amber-500" },
          { label: "Suspended", value: USERS.filter((u) => u.status === "Suspended").length, icon: Shield, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 shadow-card">
            <s.icon className={cn("w-5 h-5 mb-2", s.color)} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium transition-all",
                roleFilter === r ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["User", "Email", "Role", "Status", "Joined", "Bookings", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className={cn("border-b border-border/50 hover:bg-muted/30 transition-colors", i === filtered.length - 1 && "border-b-0")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold shrink-0", AVATAR_COLORS[i % AVATAR_COLORS.length])}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium whitespace-nowrap">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", ROLE_STYLES[user.role])}>{user.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", STATUS_STYLES[user.status])}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.joined}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{user.bookings}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toast.info(`Managing ${user.name}`)}
                      className="p-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
