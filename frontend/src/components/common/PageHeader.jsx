import React from 'react';

/**
 * PageHeader Component
 * Reusable page header with title, subtitle, and optional action button
 */
export default function PageHeader({ 
  title, 
  subtitle, 
  action,
  icon: Icon 
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="mt-1 p-2 rounded-lg bg-emerald-100">
              <Icon className="h-6 w-6 text-emerald-600" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
