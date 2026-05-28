import React, { useState } from 'react';
import { Plus, Search, Users, Mail, Phone } from 'lucide-react';
import { FACULTY } from '@/constants/data';
import { toast } from 'sonner';

const DEPT_COLORS: Record<string, string> = {
  CS: '#7C3AED', SE: '#EC4899', AI: '#10B981',
  IT: '#3B82F6', BBA: '#F59E0B', EE: '#EF4444',
};

const Faculty: React.FC = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const filtered = FACULTY.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'all' || f.department === deptFilter;
    return matchSearch && matchDept;
  });

  const depts = ['all', 'CS', 'SE', 'AI', 'IT', 'BBA', 'EE'];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users size={22} className="text-primary" /> Faculty
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{FACULTY.length} faculty members</p>
        </div>
        <button
          onClick={() => toast.success('Add Faculty dialog opened')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-brand self-start"
        >
          <Plus size={16} /> Add Faculty
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {depts.map(d => (
              <button
                key={d}
                onClick={() => setDeptFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  deptFilter === d
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(f => (
          <div key={f.id} className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-card-hover transition-shadow animate-fade-in">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: DEPT_COLORS[f.department] || '#7C3AED' }}
              >
                {f.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{f.name}</h3>
                <p className="text-xs text-muted-foreground">{f.designation}</p>
                <span
                  className="inline-block mt-1 text-xs px-2 py-0.5 rounded-md text-white font-medium"
                  style={{ backgroundColor: DEPT_COLORS[f.department] + 'cc' }}
                >
                  {f.department}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg font-medium flex-shrink-0 ${
                f.status === 'active'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
              }`}>
                {f.status === 'active' ? 'Active' : 'On Leave'}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail size={12} className="flex-shrink-0" />
                <span className="truncate">{f.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone size={12} className="flex-shrink-0" />
                <span>{f.phone}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Subjects</p>
              <div className="flex flex-wrap gap-1.5">
                {f.subjects.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <button onClick={() => toast.info(`Editing ${f.name}`)} className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">Edit</button>
              <button onClick={() => toast.info(`Viewing ${f.name}'s schedule`)} className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">Schedule</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-border">
          No faculty members found.
        </div>
      )}
    </div>
  );
};

export default Faculty;
