import React, { createContext, useContext, useState, useCallback } from "react";
import type { Notification } from "@/types";
import { NOTIFICATIONS } from "@/constants/data";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  addNotification: (n: Omit<Notification, "id" | "read" | "time">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllRead: () => {},
  markRead: () => {},
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const addNotification = useCallback((n: Omit<Notification, "id" | "read" | "time">) => {
    const newN: Notification = {
      ...n,
      id: `N${Date.now()}`,
      read: false,
      time: "Just now",
    };
    setNotifications((prev) => [newN, ...prev]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead, markRead, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
