import React from "react";
import { CheckCheck, X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

interface Props {
  onClose: () => void;
}

const TYPE_ICON: Record<Notification["type"], React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
};

const TYPE_BG: Record<Notification["type"], string> = {
  success: "bg-emerald-50 dark:bg-emerald-950/30",
  error: "bg-red-50 dark:bg-red-950/30",
  warning: "bg-amber-50 dark:bg-amber-950/30",
  info: "bg-blue-50 dark:bg-blue-950/30",
};

const NotificationPanel: React.FC<Props> = ({ onClose }) => {
  const { notifications, unreadCount, markAllRead, markRead, removeNotification } = useNotifications();

  return (
    <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-sm">Notifications</h4>
          {unreadCount > 0 && (
            <span className="w-5 h-5 rounded-full gradient-purple-pink text-white text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              title="Mark all as read"
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-h-[340px] overflow-y-auto scrollbar-thin divide-y divide-border/50">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={cn(
                "flex gap-3 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors",
                !n.read && "bg-muted/20"
              )}
            >
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5", TYPE_BG[n.type])}>
                {TYPE_ICON[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <p className={cn("text-xs font-semibold leading-snug", !n.read && "text-foreground")}>{n.title}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                    className="shrink-0 p-0.5 rounded hover:bg-muted transition-colors"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
            </div>
          ))
        )}
      </div>

      <div className="border-t border-border px-4 py-2.5">
        <button className="w-full text-center text-xs text-primary font-medium hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
