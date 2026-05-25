import React, { useState } from "react";
import { User, Bell, Shield, Palette, Globe, CreditCard, Save } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
];

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@azh.ly",
    phone: "+1 (555) 000-0000",
    org: "AZHly HQ",
    timezone: "UTC+5:00",
  });
  const [notifSettings, setNotifSettings] = useState({
    bookingConfirmed: true,
    bookingCancelled: true,
    newUser: false,
    paymentReceived: true,
    systemAlerts: true,
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar Tabs */}
        <div className="lg:w-52 shrink-0">
          <div className="bg-card border border-border rounded-2xl p-2 shadow-card space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === id ? "nav-item-active" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-5">
              <h2 className="font-semibold text-base border-b border-border pb-3">Profile Information</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-purple-pink flex items-center justify-center text-white text-2xl font-bold shadow-brand-md">A</div>
                <div>
                  <p className="font-semibold">Admin User</p>
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                  <button className="text-xs text-primary hover:underline mt-1">Change avatar</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name" as const },
                  { label: "Email Address", key: "email" as const },
                  { label: "Phone Number", key: "phone" as const },
                  { label: "Organization", key: "org" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
                    <input
                      value={profileData[key]}
                      onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => toast.success("Profile updated successfully!")}
                  className="flex items-center gap-2 px-5 py-2.5 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-4">
              <h2 className="font-semibold text-base border-b border-border pb-3">Notification Preferences</h2>
              {Object.entries(notifSettings).map(([key, val]) => {
                const labels: Record<string, { title: string; desc: string }> = {
                  bookingConfirmed: { title: "Booking Confirmed", desc: "Receive alerts when a booking is approved" },
                  bookingCancelled: { title: "Booking Cancelled", desc: "Receive alerts when a booking is rejected" },
                  newUser: { title: "New User Registered", desc: "Get notified when a new user joins" },
                  paymentReceived: { title: "Payment Received", desc: "Alerts for successful payments" },
                  systemAlerts: { title: "System Alerts", desc: "Critical platform warnings and errors" },
                };
                return (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{labels[key]?.title}</p>
                      <p className="text-xs text-muted-foreground">{labels[key]?.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifSettings({ ...notifSettings, [key]: !val })}
                      className={cn(
                        "w-10 h-5.5 rounded-full transition-all duration-200 relative",
                        val ? "bg-primary" : "bg-muted border border-border"
                      )}
                      style={{ height: "22px", width: "40px" }}
                    >
                      <div className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200", val ? "translate-x-5" : "translate-x-0.5")} />
                    </button>
                  </div>
                );
              })}
              <div className="flex justify-end pt-2">
                <button onClick={() => toast.success("Notification preferences saved!")} className="flex items-center gap-2 px-5 py-2.5 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-5">
              <h2 className="font-semibold text-base border-b border-border pb-3">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Current Password", placeholder: "Enter current password" },
                  { label: "New Password", placeholder: "Enter new password" },
                  { label: "Confirm Password", placeholder: "Confirm new password" },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
                    <input
                      type="password"
                      placeholder={placeholder}
                      className="w-full px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Two-Factor Authentication</p>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">Enable 2FA for additional account security.</p>
                <button onClick={() => toast.info("2FA setup initiated")} className="mt-2 px-3 py-1.5 text-xs font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                  Enable 2FA
                </button>
              </div>
              <div className="flex justify-end">
                <button onClick={() => toast.success("Password updated successfully!")} className="flex items-center gap-2 px-5 py-2.5 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity">
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-5">
              <h2 className="font-semibold text-base border-b border-border pb-3">Appearance</h2>
              <div>
                <p className="text-sm font-medium mb-3">Theme Mode</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Light Mode", dark: false, desc: "Clean white interface" },
                    { label: "Dark Mode", dark: true, desc: "Dark purple/neon aesthetic" },
                  ].map(({ label, dark, desc }) => (
                    <button
                      key={label}
                      onClick={() => { if (isDark !== dark) toggleTheme(); }}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all",
                        isDark === dark ? "border-primary shadow-brand-sm bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-xl mb-2 flex items-center justify-center", dark ? "bg-slate-800" : "bg-white border border-border")}>
                        <Palette className={cn("w-4 h-4", dark ? "text-violet-400" : "text-purple-500")} />
                      </div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Language</p>
                <select className="w-full sm:w-64 px-3 py-2 text-sm bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  <option>English (US)</option>
                  <option>Arabic</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card space-y-5">
              <h2 className="font-semibold text-base border-b border-border pb-3">Billing & Subscription</h2>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/40 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Current Plan</p>
                    <p className="text-xl font-bold mt-1">AZHly Free</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Limited to 50 bookings/month</p>
                  </div>
                  <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">Free</span>
                </div>
              </div>
              <div className="p-4 border border-primary/40 bg-primary/5 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">Recommended</p>
                    <p className="text-xl font-bold mt-1">AZHly Pro</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Unlimited bookings + analytics + priority support</p>
                    <p className="text-2xl font-bold text-primary mt-2">$29<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  </div>
                </div>
                <button onClick={() => toast.success("Redirecting to upgrade page...")} className="mt-3 px-5 py-2.5 gradient-purple-pink text-white text-sm font-semibold rounded-xl shadow-brand-sm hover:opacity-90 transition-opacity">
                  Upgrade to Pro
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
