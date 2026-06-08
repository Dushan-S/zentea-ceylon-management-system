import React from 'react';

/**
 * FormField Component
 * Reusable form input with consistent styling
 * supports text, email, password, number, select, textarea
 */
export default function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  options,
  rows,
  className = '',
  help,
  ...rest
}) {
  const isSelect = type === 'select';
  const isTextarea = type === 'textarea';

  const inputClasses = `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
    error ? 'border-red-500 focus:ring-red-500' : ''
  } ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''} ${
    Icon ? 'pl-10' : ''
  }`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        {isSelect ? (
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClasses}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows || 4}
            className={`${inputClasses} resize-none`}
            {...rest}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClasses}
            {...rest}
          />
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {help && (
        <p className="mt-1 text-sm text-gray-500">{help}</p>
      )}
    </div>
  );
}
