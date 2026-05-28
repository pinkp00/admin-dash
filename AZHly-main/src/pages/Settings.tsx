import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@azhly.edu');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-muted-foreground/30'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Backup', icon: Database },
    { id: 'email', label: 'Email Config', icon: Mail },
  ];

  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon size={22} className="text-primary" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your system preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar Nav */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-card rounded-2xl p-2 shadow-card border border-border">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  activeSection === s.id
                    ? 'bg-gradient-to-r from-purple-600/10 to-pink-500/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <s.icon size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {activeSection === 'profile' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Profile Settings</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">A</div>
                <button onClick={() => toast.info('Upload photo dialog')} className="text-sm text-primary hover:underline">Change Photo</button>
              </div>
              {[
                { label: 'Full Name', value: name, setter: setName },
                { label: 'Email Address', value: email, setter: setEmail },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Role</label>
                <input value="Super Admin" readOnly className="w-full px-3 py-2.5 bg-muted border border-border rounded-xl text-sm text-muted-foreground cursor-not-allowed" />
              </div>
              <button onClick={() => toast.success('Profile saved successfully!')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Notification Preferences</h2>
              {[
                { label: 'Email Notifications', desc: 'Receive updates via email', val: notifEmail, set: () => setNotifEmail(p => !p) },
                { label: 'Push Notifications', desc: 'Browser push notifications', val: notifPush, set: () => setNotifPush(p => !p) },
                { label: 'SMS Alerts', desc: 'Critical alerts via SMS', val: notifSMS, set: () => setNotifSMS(p => !p) },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                  <Toggle checked={item.val} onChange={item.set} />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Appearance</h2>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">Dark Mode</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Switch between light and dark theme</div>
                </div>
                <Toggle checked={isDark} onChange={toggleTheme} />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-3">Theme Color</div>
                <div className="flex gap-3">
                  {['#7C3AED', '#2563EB', '#059669', '#D97706', '#DC2626', '#EC4899'].map(color => (
                    <button
                      key={color}
                      onClick={() => toast.info('Theme color applied')}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Security Settings</h2>
              {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50" />
                </div>
              ))}
              <button onClick={() => toast.success('Password updated!')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand">
                Update Password
              </button>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Data & Backup</h2>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <div className="text-sm font-medium text-foreground">Auto Backup</div>
                  <div className="text-xs text-muted-foreground">Backup data daily at midnight</div>
                </div>
                <Toggle checked={autoBackup} onChange={() => setAutoBackup(p => !p)} />
              </div>
              <div className="py-3">
                <div className="text-sm font-medium text-foreground mb-2">Last Backup</div>
                <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-xl">27 May 2025, 12:00 AM · 45.2 MB</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => toast.success('Backup started...')}
                  className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                  Backup Now
                </button>
                <button onClick={() => toast.info('Restore dialog opened')}
                  className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors">
                  Restore Data
                </button>
              </div>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-4">
              <h2 className="font-semibold text-foreground">Email Configuration</h2>
              {[
                { label: 'SMTP Host', placeholder: 'smtp.gmail.com' },
                { label: 'SMTP Port', placeholder: '587' },
                { label: 'From Email', placeholder: 'noreply@azhly.edu' },
                { label: 'SMTP Username', placeholder: 'username' },
                { label: 'SMTP Password', placeholder: '••••••••' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
                  <input type={field.label.includes('Password') ? 'password' : 'text'} placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50" />
                </div>
              ))}
              <button onClick={() => toast.success('Email configuration saved!')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand">
                Save Configuration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
