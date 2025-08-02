import React from 'react';
import { DollarSign } from 'lucide-react';
import { useTranslation, Currency, CURRENCIES } from '../hooks/useTranslation';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, t, language } = useTranslation();

  return (
    <div className="relative">
      <label className="sr-only">{t('currency.label')}</label>
      <div className="flex items-center space-x-2">
        <DollarSign className="w-4 h-4 text-gray-500" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="bg-transparent border-none text-sm text-gray-600 focus:outline-none focus:ring-0 cursor-pointer"
          title={t('currency.select')}
        >
          {CURRENCIES.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.symbol} {curr.code} - {language === 'es' ? curr.nameEs : curr.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};