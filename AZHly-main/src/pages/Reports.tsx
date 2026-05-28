import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Eye } from 'lucide-react';
import { toast } from 'sonner';

const REPORT_TYPES = [
  { id: 1, name: 'Room Utilization Report', desc: 'Detailed breakdown of room usage across all blocks', type: 'PDF', date: '28 May 2025', size: '2.4 MB', status: 'ready' },
  { id: 2, name: 'Weekly Timetable Summary', desc: 'Complete timetable overview for all departments', type: 'Excel', date: '27 May 2025', size: '1.8 MB', status: 'ready' },
  { id: 3, name: 'Faculty Schedule Report', desc: 'Individual faculty scheduling and workload analysis', type: 'PDF', date: '26 May 2025', size: '3.1 MB', status: 'ready' },
  { id: 4, name: 'Department Performance Overview', desc: 'Room booking rates per department', type: 'PDF', date: '25 May 2025', size: '1.2 MB', status: 'ready' },
  { id: 5, name: 'Monthly Room Occupancy', desc: 'Monthly trends and peak usage analysis', type: 'Excel', date: '24 May 2025', size: '4.5 MB', status: 'generating' },
  { id: 6, name: 'Maintenance Log Report', desc: 'Rooms under maintenance with expected return dates', type: 'PDF', date: '23 May 2025', size: '0.8 MB', status: 'ready' },
];

const Reports: React.FC = () => {
  const [filterType, setFilterType] = useState('all');

  const filtered = REPORT_TYPES.filter(r => filterType === 'all' || r.type === filterType);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText size={22} className="text-primary" /> Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Generate and download system reports</p>
        </div>
        <button
          onClick={() => toast.success('Generating new report...')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand self-start"
        >
          <FileText size={16} /> Generate Report
        </button>
      </div>

      {/* Quick Generate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Daily Report', desc: "Today's room activity summary", icon: '📋', color: 'from-purple-500 to-purple-700' },
          { title: 'Weekly Report', desc: 'This week breakdown by dept', icon: '📊', color: 'from-pink-500 to-pink-700' },
          { title: 'Monthly Report', desc: 'Full month analytics export', icon: '📈', color: 'from-blue-500 to-blue-700' },
        ].map(card => (
          <button
            key={card.title}
            onClick={() => toast.success(`${card.title} generation started`)}
            className={`bg-gradient-to-br ${card.color} text-white rounded-2xl p-5 text-left hover:opacity-90 transition-opacity shadow-brand`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="font-semibold text-base">{card.title}</div>
            <div className="text-sm text-white/80 mt-0.5">{card.desc}</div>
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border flex items-center gap-3">
        <Filter size={15} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filter:</span>
        {['all', 'PDF', 'Excel'].map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {t === 'all' ? 'All Types' : t}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Available Reports</h2>
        </div>
        <div className="divide-y divide-border">
          {filtered.map(report => (
            <div key={report.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-muted/30 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                report.type === 'PDF' ? 'bg-red-500' : 'bg-green-600'
              }`}>
                {report.type}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">{report.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{report.desc}</div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{report.date}</span>
                </div>
                <span>{report.size}</span>
                <span className={`px-2 py-0.5 rounded-md font-medium ${
                  report.status === 'ready'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                }`}>
                  {report.status === 'ready' ? 'Ready' : 'Generating...'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toast.info(`Previewing ${report.name}`)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <Eye size={13} /> Preview
                </button>
                <button
                  onClick={() => toast.success(`Downloading ${report.name}...`)}
                  disabled={report.status !== 'ready'}
                  className="flex items-center gap-1 text-xs bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={13} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
