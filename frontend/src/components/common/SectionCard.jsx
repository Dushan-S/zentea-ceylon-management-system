import React from 'react';

/**
 * SectionCard Component
 * Reusable card for grouping related content sections
 * with optional title, icon, and action buttons
 */
export default function SectionCard({ 
  title,
  icon: Icon,
  subtitle,
  action,
  children,
  className = '',
  noPadding = false
}) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2 rounded-lg bg-emerald-50">
                <Icon className="h-5 w-5 text-emerald-600" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      <div className={!noPadding ? 'p-6' : ''}>
        {children}
      </div>
    </div>
  );
}
