import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSidebar } from '@/hooks/useSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen, isMobileOpen, toggleSidebar, closeMobile } = useSidebar();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar isOpen={isOpen} isMobileOpen={isMobileOpen} onClose={closeMobile} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
