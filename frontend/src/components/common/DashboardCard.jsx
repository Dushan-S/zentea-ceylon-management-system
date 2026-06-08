import React from 'react';

/**
 * DashboardCard Component
 * Reusable card for displaying key statistics or information
 * with icon, title, value, and optional badge
 */
export default function DashboardCard({ 
  icon: Icon,
  title, 
  value, 
  subtitle,
  trend,
  trendUp = true,
  accentColor = 'emerald',
  onClick
}) {
  const accentClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  const accentClass = accentClasses[accentColor] || accentClasses.emerald;
  const trendClass = trendUp 
    ? 'text-emerald-600 bg-emerald-50' 
    : 'text-rose-600 bg-rose-50';

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${trendClass}`}>
              <span>{trendUp ? '↑' : '↓'}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg p-3 ${accentClass} border`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
