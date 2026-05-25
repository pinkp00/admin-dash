import React from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { ACTIVITY_LOG } from "@/constants/data";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<string, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
};

const TYPE_BG: Record<string, string> = {
  success: "bg-emerald-50 dark:bg-emerald-950/30",
  error: "bg-red-50 dark:bg-red-950/30",
  warning: "bg-amber-50 dark:bg-amber-950/30",
  info: "bg-blue-50 dark:bg-blue-950/30",
};

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold">Recent Activity</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>
      <div className="divide-y divide-border/50">
        {ACTIVITY_LOG.map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors slide-in">
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", TYPE_BG[item.type])}>
              {TYPE_ICON[item.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{item.action}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.detail}</p>
            </div>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
