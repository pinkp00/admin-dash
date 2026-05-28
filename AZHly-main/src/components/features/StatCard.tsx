import React from 'react';
import MiniChart from './MiniChart';

interface StatCardProps {
  title: string;
  value: number;
  subtitle: string;
  trend: number[];
  color: 'purple' | 'green' | 'pink' | 'blue';
  icon: React.ReactNode;
}

const colorMap = {
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-400', line: '#7C3AED' },
  green:  { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', line: '#10B981' },
  pink:   { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400', line: '#EC4899' },
  blue:   { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', line: '#3B82F6' },
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trend, color, icon }) => {
  const c = colorMap[color];
  return (
    <div className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border flex flex-col gap-3 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
          <span className={c.text}>{icon}</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground font-medium">{title}</div>
          <div className="text-3xl font-bold text-foreground mt-0.5">{value}</div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">{subtitle}</div>
      <MiniChart data={trend} color={c.line} />
    </div>
  );
};

export default StatCard;
