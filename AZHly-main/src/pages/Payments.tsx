import React, { useState } from "react";
import { Search, Download, TrendingUp, DollarSign, CheckCircle, Clock, XCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TRANSACTIONS = [
  { id: "PAY001", booking: "#BKG1025", user: "Ali Khan", space: "Study Room A", amount: 30, method: "Credit Card", status: "Completed", date: "May 22, 2025", time: "10:00 AM" },
  { id: "PAY002", booking: "#BKG1024", user: "Sara Malik", space: "Conference Room", amount: 90, method: "PayPal", status: "Pending", date: "May 22, 2025", time: "01:00 PM" },
  { id: "PAY003", booking: "#BKG1023", user: "Zain Abbas", space: "Private Office", amount: 60, method: "Credit Card", status: "Completed", date: "May 22, 2025", time: "03:00 PM" },
  { id: "PAY004", booking: "#BKG1022", user: "Hira Sheikh", space: "Event Hall", amount: 450, method: "Bank Transfer", status: "Refunded", date: "May 22, 2025", time: "06:00 PM" },
  { id: "PAY005", booking: "#BKG1021", user: "Usman Raza", space: "Study Room B", amount: 24, method: "Credit Card", status: "Completed", date: "May 21, 2025", time: "11:00 AM" },
  { id: "PAY006", booking: "#BKG1020", user: "Ayesha Noor", space: "Meeting Room 1", amount: 50, method: "PayPal", status: "Completed", date: "May 21, 2025", time: "02:00 PM" },
  { id: "PAY007", booking: "#BKG1019", user: "Bilal Ahmed", space: "Conference Room", amount: 90, method: "Credit Card", status: "Failed", date: "May 20, 2025", time: "09:00 AM" },
  { id: "PAY008", booking: "#BKG1018", user: "Fatima Qureshi", space: "Private Office", amount: 60, method: "Bank Transfer", status: "Pending", date: "May 20, 2025", time: "04:00 PM" },
];

const STATUS_STYLES: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Refunded: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  Failed: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  Completed: <CheckCircle className="w-3.5 h-3.5" />,
  Pending: <Clock className="w-3.5 h-3.5" />,
  Refunded: <TrendingUp className="w-3.5 h-3.5" />,
  Failed: <XCircle className="w-3.5 h-3.5" />,
};

const SUMMARY_CARDS = [
  { label: "Total Revenue", value: "$24,680", change: "+18.4%", icon: DollarSign, gradient: "gradient-purple-pink" },
  { label: "Completed", value: "1,128", change: "+12.5%", icon: CheckCircle, gradient: "gradient-blue-purple" },
  { label: "Pending", value: "84", change: "-3.1%", icon: Clock, gradient: "gradient-teal-blue" },
  { label: "Refunded", value: "$1,240", change: "+2.0%", icon: TrendingUp, gradient: "gradient-pink-orange" },
];

const Payments: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Completed", "Pending", "Refunded", "Failed"];

  const filtered = TRANSACTIONS.filter((t) => {
    const matchSearch =
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.booking.toLowerCase().includes(search.toLowerCase()) ||
      t.space.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track all transactions and revenue</p>
        </div>
        <button
          onClick={() => toast.success("Report exported successfully!")}
          className="flex items-center gap-2 px-4 py-2 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SUMMARY_CARDS.map(({ label, value, change, icon: Icon, gradient }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-4 shadow-card card-hover">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-brand-sm", gradient)}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-xl font-bold mt-0.5">{value}</p>
            <p className={cn("text-xs font-medium mt-1", change.startsWith("+") ? "text-emerald-500" : "text-red-500")}>
              {change.startsWith("+") ? "↑" : "↓"} {change.replace(/[+-]/, "")} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search by user, booking ID, space..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                filter === f ? "gradient-purple-pink text-white shadow-brand-sm" : "bg-card border border-border hover:bg-muted text-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {["Transaction ID", "Booking", "User", "Space", "Amount", "Method", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{t.id}</td>
                  <td className="px-4 py-3 font-semibold text-primary text-xs">{t.booking}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{t.user}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.space}</td>
                  <td className="px-4 py-3 font-bold text-primary">${t.amount}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.method}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">{t.date} · {t.time}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold", STATUS_STYLES[t.status])}>
                      {STATUS_ICON[t.status]}
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">No transactions found.</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Payments;
