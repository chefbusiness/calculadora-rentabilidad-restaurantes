import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface FormInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  error?: string;
  className?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder = '0',
  helpText,
  required = false,
  min = 0,
  max,
  step = 1,
  prefix = '$',
  suffix,
  error,
  className = '',
}: FormInputProps) {
  const [focused, setFocused] = React.useState(false);
  const [showHelp, setShowHelp] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Permitir campo vacío
    if (inputValue === '') {
      onChange(0);
      return;
    }
    
    // Convertir a número
    const numValue = parseFloat(inputValue.replace(/[^0-9.-]/g, ''));
    
    if (!isNaN(numValue)) {
      // Aplicar límites si están definidos
      let finalValue = numValue;
      if (min !== undefined && finalValue < min) finalValue = min;
      if (max !== undefined && finalValue > max) finalValue = max;
      
      onChange(finalValue);
    }
  };

  const formatDisplayValue = (val: number | undefined): string => {
    if (val === undefined || val === 0) return '';
    return val.toLocaleString('es-ES', { maximumFractionDigits: 0 });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
        
        {helpText && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowHelp(true)}
              onMouseLeave={() => setShowHelp(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            
            {showHelp && (
              <div className="absolute right-0 top-6 z-10 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg">
                <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 rotate-45" />
                {helpText}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="relative">
        <div className={`
          relative flex items-center rounded-lg border transition-all duration-200
          ${focused 
            ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-20' 
            : error 
              ? 'border-danger-500' 
              : 'border-gray-300 hover:border-gray-400'
          }
          ${error ? 'bg-danger-50' : 'bg-white'}
        `}>
          {/* Prefix */}
          {prefix && (
            <span className="pl-3 pr-1 text-gray-500 font-medium">
              {prefix}
            </span>
          )}
          
          {/* Input Field */}
          <input
            type="text"
            value={formatDisplayValue(value)}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            className={`
              flex-1 px-3 py-3 bg-transparent border-0 outline-none text-gray-900 placeholder-gray-400
              ${prefix ? 'pl-1' : 'pl-3'}
              ${suffix ? 'pr-1' : 'pr-3'}
            `}
          />
          
          {/* Suffix */}
          {suffix && (
            <span className="pr-3 pl-1 text-gray-500 font-medium">
              {suffix}
            </span>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-sm text-danger-600 flex items-center">
          <span className="w-4 h-4 mr-1">⚠️</span>
          {error}
        </p>
      )}
      
      {/* Help Text (when not in tooltip) */}
      {helpText && !showHelp && (
        <p className="text-xs text-gray-500">
          💡 Pasa el cursor sobre el ícono de ayuda para más información
        </p>
      )}
    </div>
  );
}

// Componente especializado para moneda
export function CurrencyInput(props: Omit<FormInputProps, 'prefix'>) {
  const { getCurrencySymbol } = useTranslation();
  
  return (
    <FormInput
      {...props}
      prefix={getCurrencySymbol()}
      step={1000}
    />
  );
}

// Componente especializado para porcentajes
export function PercentageInput(props: Omit<FormInputProps, 'suffix' | 'max'>) {
  return (
    <FormInput
      {...props}
      suffix="%"
      max={100}
      step={0.1}
    />
  );
}